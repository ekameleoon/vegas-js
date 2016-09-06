"use strict" ;

import { invoke } from '../../core/reflect/invoke.js' ;

import { Evaluable } from '../Evaluable.js' ;
import { ArrayMap } from '../data/maps/ArrayMap.js' ;
import { Identifiable } from '../data/Identifiable.js' ;
import { MultiEvaluator } from '../evaluators/MultiEvaluator.js' ;
import { Receiver } from '../signals/Receiver.js' ;
import { Signaler } from '../signals/Signaler.js' ;
import { isLockable } from '../process/Lockable.js' ;

import { createObjectDefinition } from './builders/createObjectDefinition.js' ;

import { ObjectFactoryMethod } from './strategies/ObjectFactoryMethod.js' ;
import { ObjectFactoryProperty } from './strategies/ObjectFactoryProperty.js' ;
import { ObjectReference } from './strategies/ObjectReference.js' ;
import { ObjectStaticFactoryMethod } from './strategies/ObjectStaticFactoryMethod.js' ;
import { ObjectStaticFactoryProperty } from './strategies/ObjectStaticFactoryProperty.js' ;
import { ObjectValue } from './strategies/ObjectValue.js' ;

import { logger } from './logger.js' ;

import { MagicReference } from './MagicReference.js' ;
import { ObjectArgument } from './ObjectArgument.js' ;
import { ObjectAttribute } from './ObjectAttribute.js' ;
import { ObjectConfig } from './ObjectConfig.js' ;
import { ObjectDefinition } from './ObjectDefinition.js' ;
import { ObjectDefinitionContainer } from './ObjectDefinitionContainer.js' ;
import { ObjectProperty } from './ObjectProperty.js' ;
import { ObjectMethod } from './ObjectMethod.js' ;
import { ObjectStrategy } from './ObjectStrategy.js' ;

/**
 * This object defines a listener definition in an object definition.
 * @param dispatcher The dispatcher expression reference of the listener.
 * @param type type name of the event dispatched by the dispatcher of this listener.
 * @param method The name of the method to invoke when the event is handle.
 * @param useCapture Determinates if the event flow use capture or not.
 * @param order Indicates the order to register the listener "after" or "before" (see the system.ioc.ObjectOrder enumeration class).
 * @example
 * var ObjectFactory = system.ioc.ObjectFactory ;
 *
 * var factory = new ObjectFactory();
 * var config  = factory.config ;
 *
 * config.setConfigTarget
 * ({
 *     origin : { x : 10 , y : 20 }
 * })
 *
 * config.setLocaleTarget
 * ({
 *     messages :
 *     {
 *         test : 'test'
 *     }
 * })
 *
 * var objects =
 * [
 *  {
 *      id   : "position" ,
 *      type : "Point" ,
 *      args : [ { value : 2 } , { ref : 'origin.y' }],
 *      properties :
 *      [
 *          { name : "x" , ref   :'origin.x' } ,
 *          { name : "y" , value : 100       }
 *      ]
 *  },
 *  {
 *      id         : "origin" ,
 *      type       : "Point" ,
 *      singleton  : true ,
 *      args       : [ { config : 'origin.x' } , { value : 20 }] ,
 *      properties :
 *      [
 *          { name : 'test' , args : [ { locale : 'messages.test' } ] }
 *      ]
 *  }
 * ];
 *
 * factory.run( objects );
 *
 * var pos = factory.getObject('position') ;
 *
 * trace( pos ) ;
 */
export function ObjectFactory( config /*ObjectConfig*/ = null , objects /*Array*/ = null )
{
    ObjectDefinitionContainer.call(this) ;
    Object.defineProperties( this ,
    {
        /**
         * The dispatcher expression reference of the listener.
         */
        config :
        {
            get : function() { return this._config } ,
            set : function( config )
            {
                if ( this._config )
                {
                    this._config.referenceEvaluator.factory = null ;
                }
                this._config = (config instanceof ObjectConfig) ? config : new ObjectConfig() ;
                this._config.referenceEvaluator.factory = this ;
            }
        },

        /**
         * This array contains objects to fill this factory with the run or create method.
         */
        objects : { value : (objects instanceof Array) ? objects : null , writable : true } ,

        /**
         * Returns the Map representation of all singletons register in this factory.
         * @return the Map representation of all singletons register in this factory.
         */
        singletons : { get : function() { return this._singletons ; } } ,

        /**
         * @private
         */
        bufferSingletons : { value : [] , writable : true } ,

        /**
         * @private
         */
        _config : { value : null , writable : true } ,

        /**
         * @private
         */
        _evaluator : { value : new MultiEvaluator() } ,

        /**
         * @private
         */
        _singletons : { value : new ArrayMap() }
    }) ;

    this.config = config ;
}

/**
 * @extends Object
 */
ObjectFactory.prototype = Object.create( ObjectDefinitionContainer.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value :  ObjectFactory },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     */
    clone :
    {
        value : function()
        {
            return new ObjectFactory( this.config , [].concat( this.objects ) ) ;
        }
    },

    /**
     * Indicates if a singleton reference is register in the factory with the specified id.
     * @param The 'id' of the singleton.
     * @return <code class="prettyprint">true</code> if the singleton reference exist in the factory.
     */
    hasSingleton :
    {
        value : function( id ) /*Boolean*/
        {
            return this._singletons.has(id) ;
        }
    },

    /**
     * This method returns an object with the specified id in argument.
     * @param id The 'id' of the object to return.
     * @return the instance of the object with the id passed in argument.
     */
    getObject :
    {
        value : function( id )
        {
            if ( !(id instanceof String || typeof(id) === 'string') )
            {
               return null ;
            }

            var instance ;

            try
            {
                var definition = this.getObjectDefinition( id ) ;

                if ( !(definition instanceof ObjectDefinition) )
                {
                    throw new Error( this +  " getObject( " + id + " ) method failed, the object isn't register in the container.") ;
                }

                if ( definition.singleton )
                {
                    instance = this._singletons.get(id) || null ;
                }

                if ( !instance )
                {
                    try
                    {
                        var clazz    = this.config.typeEvaluator.eval( definition.type )  ;
                        var strategy = definition.strategy ;
                        if ( strategy )
                        {
                            instance = this.createObjectWithStrategy( strategy ) ;
                        }
                        else
                        {
                            instance = invoke( clazz , this.createArguments( definition.constructorArguments ) );
                        }
                    }
                    catch( e )
                    {
                        this.warn(this + " failed to create a new object, can't convert the instance with the specified type \"" + definition.type + "\" in the object definition \"" + definition.id + "\", this type don't exist in the application, or arguments limit exceeded, you can pass a maximum of 32 arguments.") ;
                    }

                    if ( instance )
                    {
                        if ( definition.singleton )
                        {
                            this._singletons.set( id, instance ) ;
                        }

                        this.dependsOn( definition ) ; // dependencies

                        this.populateIdentifiable ( instance , definition ) ; // identify

                        var flag = isLockable( instance ) && ( ( definition.lock === true ) || ( this.config.lock === true && definition.lock !== false ) ) ;

                        if ( flag )
                        {
                            instance.lock() ;
                        }

                        this.registerListeners( instance , definition.beforeListeners ) ;
                        this.registerReceivers( instance , definition.beforeReceivers ) ;

                        this.populateProperties( instance , definition ) ; // init properties

                        this.registerListeners( instance , definition.afterListeners ) ;
                        this.registerReceivers( instance , definition.afterReceivers ) ;

                        if ( flag )
                        {
                            instance.unlock() ;
                        }

                        this.invokeInitMethod( instance , definition ) ; // init

                        this.generates( definition ) ; // generates
                    }
                }
            }
            catch( e )
            {
                console.warn(e) ;
                this.warn( this + " getObject failed with the id '" + id + "' : " + e.toString() ) ;
            }

            return instance || null ;
        }
    },


    /**
     * Indicates if the factory is dirty, must flush this buffer of not lazy-init singleton object definitions.
     * The user must execute the run or create methods to flush this buffer.
     */
    isDirty : { value : function() /*Boolean*/
    {
        return this.bufferSingletons && (this.bufferSingletons instanceof Array) && this.bufferSingletons.length > 0 ;
    }},

    /**
     * This method indicates if the specified object definition is lazy init.
     * @param id The 'id' of the object definition to check..
     * @return <code class="prettyprint">true</code> if the specified object definition is lazy init.
     */
    isLazyInit : { value : function( id ) /*Boolean*/
    {
        if ( this.hasObjectDefinition( id ) )
        {
            return this.getObjectDefinition(id).lazyInit ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * This method defined if the scope of the specified object definition is "singleton".
     * @param The 'id' of the object.
     * @return <code class="prettyprint">true</code> if the object is a singleton.
     */
    isSingleton : { value : function( id ) /*Boolean*/
    {
        if ( this.hasObjectDefinition( id ) )
        {
            return this.getObjectDefinition(id).singleton ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Removes and destroy a singleton in the container.
     * Invoke the <b>'destroy'</b> method of this object is it's define in the <code class="prettyprint">IObjectDefinition</code> of this singleton.
     * @param id The id of the singleton to remove.
      */
    removeSingleton : { value : function( id )
    {
        if ( this.isSingleton(id) && this._singletons.has(id) )
        {
            this.invokeDestroyMethod( this._singletons.get(id), this.getObjectDefinition(id) ) ;
            this._singletons.delete( id ) ;
        }
    }},

    /**
     * Run the initialization of the factory with new object definitions and create the not lazy-init singleton objects.
     * <p><b>Example :</b></p>
     * <pre class="prettyprint">
     * import flash.text.TextField ;
     * import flash.text.TextFormat ;
     *
     * import system.ioc.ObjectFactory ;
     *
     * var factory:ObjectFactory = new ObjectFactory();
     *
     * factory.objects =
     * [
     *     {
     *         id         : "my_field" ,
     *         type       : "flash.text.TextField" ,
     *         properties :
     *         [
     *             { name:"defaultTextFormat" , value:new TextFormat("Verdana", 11) } ,
     *             { name:"selectable"        , value:false                         } ,
     *             { name:"text"              , value:"hello world"                 } ,
     *             { name:"textColor"         , value:0xF7F744                      } ,
     *             { name:"x"                 , value:100                           } ,
     *             { name:"y"                 , value:100                           }
     *         ]
     *     }
     * ];
     *
     * factory.run();
     *
     * var field:TextField = factory.getObject("my_field") as TextField ;
     *
     * addChild(field) ;
     * </pre>
     */
    run : { value : function( ...args )
    {
        if ( this.running )
        {
            return ;
        }

        this.notifyStarted() ;

        if ( args.length > 0 && (args[0] instanceof Array) )
        {
            this.objects = args[0] ;
        }

        if ( this.bufferSingletons === null )
        {
            this.bufferSingletons = [] ;
        }

        if ( (this.objects instanceof Array) && this.objects.length > 0)
        {
            var definition /*ObjectDefinition*/ ;

            var init ;

            while ( this.objects.length > 0 )
            {
                init = this.objects.shift() ;

                if ( init !== null )
                {
                    definition = createObjectDefinition( init ) ;

                    this.addObjectDefinition( definition ) ;

                    if ( definition.singleton && !definition.lazyInit )
                    {
                        if ( this.hasObjectDefinition( definition.id ) )
                        {
                            this.bufferSingletons.push( String( definition.id ) ) ;
                        }
                    }
                }
                else
                {
                    this.warn( this + " create new object definition failed with a 'null' or 'undefined' object." ) ;
                }
            }
        }

        // flush the buffer of singletons to initialize (no lazyInit)

        if ( (this.bufferSingletons instanceof Array) && this.bufferSingletons.length > 0 && !this._config.lazyInit && !this.isLocked() )
        {
            var size = this.bufferSingletons.length ;
            for ( var i = 0 ; i < size ; i++ )
            {
                this.getObject( this.bufferSingletons[i] ) ;
            }
            this.bufferSingletons = null ;
        }

        this.notifyFinished() ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return '[ObjectFactory]' ; } } ,

    /**
     * The custom warn method of this factory to log a warning message in the application.
     * You can overrides this method, the prototype object is dynamic.
     */
    warn : { value : function( ...args )
    {
        if ( this.config.useLogger && logger )
        {
            logger.warning.apply( null , args ) ;
        }
    }},

    /**
     * Creates the arguments Array representation of the specified definition.
     * @return the arguments Array representation of the specified definition.
     */
    createArguments : { value : function( args = null )
    {
        if ( args === null || !(args instanceof Array) || args.length === 0 )
        {
            return null ;
        }

        var len = args.length ;
        var i ;
        var stack = [] ;
        var item /*ObjectArgument*/ ;
        var value ;
        for ( i = 0 ; i<len ; i++)
        {
            item  = args[i] ;
            if( item instanceof ObjectArgument )
            {
                value = item.value ;
                try
                {
                    if ( item.policy === ObjectAttribute.REFERENCE )
                    {
                        value = this._config.referenceEvaluator.eval( value ) ;
                    }
                    else if ( item.policy === ObjectAttribute.CONFIG )
                    {
                        value = this._config.configEvaluator.eval( value ) ;
                    }
                    else if ( item.policy === ObjectAttribute.LOCALE )
                    {
                        value = this._config.localeEvaluator.eval( value ) ;
                    }

                    if ( item.evaluators !== null && item.evaluators.length > 0 )
                    {
                        value = this.eval( value , item.evaluators  ) ;
                    }

                    stack.push( value ) ;
                }
                catch( e )
                {
                    this.warn( this + " createArguments failed : " + e.toString() ) ;
                }
            }
        }

        return stack ;
    }},

    /**
     * Creates a new Object with a specified IObjectFactoryStrategy instance.
     * @return A new Object with a specified IObjectFactoryStrategy instance.
     */
    createObjectWithStrategy : { value : function( strategy )
    {
        if ( strategy instanceof ObjectStrategy )
        {
            return null ;
        }
        var args ;
        var instance = null ;
        var clazz ;
        var factory ;
        var ref ;
        var name ;
        var factoryMethod ;

        if ( strategy instanceof ObjectMethod )
        {
            factoryMethod = strategy ;

            name = factoryMethod.name ;
            args = this.createArguments( factoryMethod.arguments ) ;

            if ( factoryMethod instanceof ObjectStaticFactoryMethod )
            {
                clazz  = this.config.typeEvaluator.eval( factoryMethod.type );
                if ( clazz !== null && clazz.hasOwnProperty(name) )
                {
                    instance = clazz[name].apply( null, args ) ;
                }
            }
            else if ( factoryMethod instanceof ObjectFactoryMethod )
            {
                factory  = factoryMethod.factory ;
                ref      = this.getObject( factory ) ;
                if ( ( ref !== null ) && ( name !== null ) && ref.hasOwnProperty(name) )
                {
                    instance = ref[name].apply( null, args ) ;
                }
            }
        }
        else if ( strategy instanceof ObjectProperty )
        {
            var factoryProperty = strategy ;

            name = factoryProperty.name ;

            if ( factoryProperty instanceof ObjectStaticFactoryProperty )
            {
                clazz = this.config.typeEvaluator.eval( factoryProperty.type ) ;
                if ( clazz !== null && clazz.hasOwnProperty(name) )
                {
                    instance = clazz[name] ;
                }
            }
            else if ( factoryProperty instanceof ObjectFactoryProperty )
            {
                factory = factoryProperty.factory ;
                if ( factory !== null && this.hasObjectDefinition(factory) )
                {
                    ref = this.getObject(factory) ;
                    if ( ( ref !== null ) && ( name !== null ) && ref.hasOwnProperty(name) )
                    {
                        instance = ref[name] ;
                    }
                }
            }
        }
        else if ( strategy instanceof ObjectValue )
        {
            instance = strategy.value ;
        }
        else if ( strategy instanceof ObjectReference )
        {
            instance = this._config.referenceEvaluator.eval( strategy.ref ) ;
        }
        return instance ;
    }},


    /**
     * Invoked to creates all object in the factory register in the dependsOn collection.
     * <p>All objects in the dependsOn collection are initialized before the initialization of the current object build in the factory.</p>
     */
    dependsOn : { value : function( definition /*ObjectDefinition*/ )
    {
        if ( (definition instanceof ObjectDefinition) && definition.dependsOn !== null )
        {
            var id ;
            var ar = definition.dependsOn ;
            var len = ar.length ;
            if ( len > 0 )
            {
                for ( var i = 0 ; i<len ; i++ )
                {
                    id = ar[i] ;
                    if ( this.hasObjectDefinition(id))
                    {
                        this.getObject(id) ; // not keep in memory
                    }
                }
            }
        }
    }} ,

    /**
     * Evaluates a value with an Array of evaluators or Evaluable references in the factory.
     * @param value The value to evaluate.
     * @param evaluators The Array who contains IEvaluator objects or String ids who representing a IEvaluator in the factory.
     * @return The new value after evaluation.
     */
    eval : { value : function( value , evaluators /*Array*/ = null )
    {
        if ( !(evaluators instanceof Array) || (evaluators.length === 0) )
        {
            return value ;
        }
        this._evaluator.clear() ;
        var o ;
        var s = evaluators.length ;
        var a = [] ;
        for ( var i = 0 ; i < s ; i++ )
        {
            o = evaluators[i] ;
            if ( o === null )
            {
                continue ;
            }

            if ( o instanceof String || typeof(o) === 'string' )
            {
                o = this.getObject( o ) ;
            }

            if ( o instanceof Evaluable )
            {
                a.push( o ) ;
            }
        }
        if ( a.length > 0 )
        {
            this._evaluator.add( a ) ;
            value = this._evaluator.eval( value ) ;
            this._evaluator.clear() ;
        }
        return value ;
    }},

    /**
     * Invoked to creates all object in the factory register in the generates collection.
     * <p>All objects in the generates collection are initialized after the initialization of the current object build in the factory.</p>
     */
    generates : { value : function( definition /*ObjectDefinition*/  )
    {
        if ( (definition instanceof ObjectDefinition) && (definition.generates !== null) )
        {
            var id ;
            var ar = definition.generates ;
            var len = ar.length ;
            if ( len > 0 )
            {
                for ( var i = 0 ; i<len ; i++ )
                {
                   id = ar[i] ;
                   if ( this.hasObjectDefinition(id))
                   {
                       this.getObject(id) ; // not keep in memory
                   }
                }
            }
        }
    }},

    /**
     * Invokes the destroy method of the specified object, if the init method is define in the IDefinition object.
     */
    invokeDestroyMethod : { value : function( o , definition /*ObjectDefinition*/ = null )
    {
        if( definition && definition instanceof ObjectDefinition )
        {
            var name = definition.destroyMethodName ;
            if ( name === null && this.config !== null )
            {
                name = this.config.defaultDestroyMethod ;
            }
            if( (name !== null) && o.hasOwnProperty(name) && (o[name] instanceof Function) )
            {
                o[name].call(o) ;
            }
        }
    }},

    /**
     * Invokes the init method of the specified object, if the init method is define in the IDefinition object.
     */
    invokeInitMethod : { value : function( o , definition /*ObjectDefinition*/ = null )
    {
        if( definition && definition instanceof ObjectDefinition )
        {
            var name = definition.initMethodName ;
            if ( name === null && this.config !== null )
            {
                name = this.config.defaultInitMethod ;
            }
            if( (name !== null) && o.hasOwnProperty(name) && (o[name] instanceof Function) )
            {
                o[name].call(o) ;
            }
        }
    }},

    /**
     * Populates the <code class="prettyprint">Identifiable</code> singleton object, if the 'identify' flag is true the config of this factory and if specified the <code class="prettyprint">IObjectDefinition</code> object scope is singleton.
     */
    populateIdentifiable : { value : function( o , definition /*ObjectDefinition*/ = null )
    {
        if( definition && definition instanceof ObjectDefinition )
        {
            if ( definition.singleton && (o instanceof Identifiable) )
            {
                if ( ( definition.identify === true ) || ( this.config.identify === true && definition.identify !== false ) )
                {
                    o.id = definition.id ;
                }
            }
        }
    }},

    /**
     * Populates all properties in the Map passed in argument.
     */
    populateProperties : { value : function( o , definition /*ObjectDefinition*/ = null )
    {
        if( definition && (definition instanceof ObjectDefinition) )
        {
            var properties = definition.properties ;
            if ( properties && (properties instanceof Array) && properties.length > 0 )
            {
                var id = definition.id ;
                var size = properties.length ;
                for( var i = 0 ; i < size ; i++ )
                {
                    this.populateProperty( o , properties[i] , id ) ;
                }
            }
        }
    }},

    /**
     * Populates a property in the specified object with the passed-in ObjectProperty object.
     * @param o The object to populate.
     * @param prop The ObjectProperty used to populate the object.
     * @param id The id of the current IObjectDefinition.
     */
    populateProperty : { value : function( o , prop /*ObjectProperty*/ , id )
    {
        if ( o === null )
        {
            this.warn( this + " populate a new property failed, the object not must be 'null' or 'undefined', see the factory with the object definition '" + id + "'." ) ;
            return ;
        }

        var name = prop.name ;
        var value = prop.value ;

        //////////// #init magic strategy to populate the property

        if( name === MagicReference.INIT )
        {
            if ( (prop.policy === ObjectAttribute.REFERENCE) && (value instanceof String || typeof(value) === 'string' ))
            {
                value = this._config.referenceEvaluator.eval( value ) ;
            }
            else if ( prop.policy === ObjectAttribute.CONFIG )
            {
                value = this.config.configEvaluator.eval( value ) ;
            }
            else if ( prop.policy === ObjectAttribute.LOCALE )
            {
                value = this.config.localeEvaluator.eval( value) ;
            }

            if ( prop.evaluators && prop.evaluators.length > 0 )
            {
                value = this.eval( value , prop.evaluators ) ;
            }

            if ( value )
            {
                for( var member in value )
                {
                    if( value.hasOwnProperty(member) )
                    {
                        o[member] = value[member] ;
                    }
                }
            }
            else
            {
                this.warn( this + " populate a new property failed with the magic name #init, the object to enumerate not must be null, see the factory with the object definition '" + id + "'." ) ;
            }

            return ;
        }

        //////////// default strategy to populate the property

        if ( !( name in o ) )
        {
            this.warn( this + " populate a new property failed with the name:" + name + ", this property don't exist in the object:" + o + ", see the factory with the object definition '" + id + "'." ) ;
            return ;
        }

        if ( o[name] instanceof Function )
        {
            if( prop.policy === ObjectAttribute.ARGUMENTS )
            {
                o[ name ].apply( o , this.createArguments( value  ) ) ;
                return ;
            }
            else if ( (prop.policy === ObjectAttribute.VALUE) )
            {
                o[ name ]() ;
                return ;
            }
        }

        try
        {
            if ( (prop.policy === ObjectAttribute.REFERENCE) )
            {
                value = this._config.referenceEvaluator.eval( value ) ;
            }
            else if ( prop.policy === ObjectAttribute.CONFIG )
            {
                value = this.config.configEvaluator.eval( value ) ;
            }
            else if ( prop.policy === ObjectAttribute.LOCALE )
            {
                value = this.config.localeEvaluator.eval( value ) ;
            }
            if ( prop.evaluators && prop.evaluators.length > 0 )
            {
                value = this.eval( value , prop.evaluators ) ;
            }
            o[ name ] = value ;
        }
        catch( e )
        {
            this.warn( this + " populateProperty failed with the name '" + name + "' in the object '" + o + ", see the factory with the object definition '" + id + "' error: " + e.toString() ) ;
        }
    }},

    /**
     * Initialize the listener callback of the specified object.
     */
    registerListeners : { value : function( o , listeners /*Array*/ )
    {
        if ( o === null || listeners === null )
        {
            return ;
        }
        var size = listeners.length ;
        if ( size > 0 )
        {
            var dispatcher ;
            var method ;
            var listener ;
            for (var i = 0 ; i<size ; i++ )
            {
                try
                {
                    method     = null ;
                    listener   = listeners[i] ;
                    dispatcher = this._config.referenceEvaluator.eval( listener.dispatcher ) ;
                    if ( dispatcher !== null && listener.type !== null )
                    {
                        if ( listener.method !== null && o.hasOwnProperty(listener.method) && (o[listener.method] instanceof Function))
                        {
                            method = o[listener.method]   ;
                        }
                        else if( o.hasOwnProperty('handleEvent') && (o.handleEvent instanceof Function)  )
                        {
                            method = o.handleEvent ;
                        }
                        if ( method !== null )
                        {
                            dispatcher.addEventListener( listener.type , method , listener.useCapture ) ;
                        }
                    }
                }
                catch( e )
                {
                    this.warn( this + " registerListeners failed with the target '" + o + "' , in the collection of this listeners at {" + i + "} : " + e.toString() ) ;
                }
            }
        }
    }},

    /**
     * Initialize the receiver callback of the specified object.
     */
    registerReceivers : { value : function( o , receivers /*Array*/ = null )
    {
        if ( o === null || receivers === null )
        {
            return ;
        }
        var size = receivers.length ;
        if ( size > 0 )
        {
            var signaler ;
            var receiver ;
            var slot ;
            for (var i = 0 ; i<size ; i++ )
            {
                try
                {
                    receiver = receivers[i] ;
                    signaler = this._config.referenceEvaluator.eval( receiver.signal ) ;
                    slot     = null ;
                    if ( signaler instanceof Signaler )
                    {
                        if ( o.hasOwnProperty(receiver.slot) && ( o[receiver.slot] instanceof Function ) )
                        {
                            slot = o[receiver.slot] ;
                        }
                        else if ( o instanceof Receiver )
                        {
                            slot = o.receive ;
                        }
                        if ( slot !== null )
                        {
                            signaler.connect( slot , receiver.priority, receiver.autoDisconnect ) ;
                        }
                    }
                }
                catch( e )
                {
                    this.warn( this + " registerReceivers failed with the target '" + o + "' , in the collection of this receivers at {" + i + "} : " + e.toString() ) ;
                }
            }
        }
    }}
}) ;