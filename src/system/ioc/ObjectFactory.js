"use strict" ;

import { invoke } from '../../core/reflect/invoke.js' ;

import { Evaluable } from '../Evaluable.js' ;
import { ArrayMap } from '../data/maps/ArrayMap.js' ;
import { isIdentifiable } from '../data/Identifiable.js' ;
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
 * The basic <b>Inversion of Control</b> container or factory.
 * @name ObjectFactory
 * @class
 * @memberof system.ioc
 * @extends system.ioc.ObjectDefinitionContainer
 * @example
 * var Point = function( x , y )
 * {
 *     this.x = x ;
 *     this.y = y ;
 *     console.log("constructor:" + this.toString() ) ;
 * };
 *
 * Point.prototype.test = function( message = null )
 * {
 *     console.log( 'test:' + this.toString() + " message:" + message ) ;
 * }
 *
 * Point.prototype.toString = function()
 * {
 *     return "[Point x:" + this.x + " y:" + this.y + "]" ;
 * } ;
 *
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
 *     {
 *         id   : "position" ,
 *         type : "Point" ,
 *         args : [ { value : 2 } , { ref : 'origin.y' }],
 *         properties :
 *         [
 *             { name : "x" , ref   :'origin.x' } ,
 *             { name : "y" , value : 100       }
 *         ]
 *     },
 *     {
 *         id         : "origin" ,
 *         type       : "Point" ,
 *         singleton  : true ,
 *         args       : [ { config : 'origin.x' } , { value : 20 }] ,
 *         properties :
 *         [
 *             { name : 'test' , args : [ { locale : 'messages.test' } ] }
 *         ]
 *     }
 * ];
 *
 * factory.run( objects );
 *
 * trace( factory.getObject('position') ) ;
 * @param {system.ioc.ObjectConfig} [config=null] - The configuration object of the factory.
 * @param {array} [objects=null] - The object definitions collection to initialize the factory.
 */
export function ObjectFactory( config = null , objects = null )
{
    ObjectDefinitionContainer.call(this) ;
    Object.defineProperties( this ,
    {
        /**
         * This array contains objects to fill this factory with the run or create method.
         * @memberof system.ioc.ObjectFactory
         * @instance
         * @type Array
         */
        objects : { value : (objects instanceof Array) ? objects : null , writable : true } ,

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

ObjectFactory.prototype = Object.create( ObjectDefinitionContainer.prototype ,
{
    constructor : { value :  ObjectFactory },

    /**
     * Determinates the configuration object of the object factory.
     * @name config
     * @memberof system.ioc.ObjectFactory
     * @type {system.ioc.ObjectConfig}
     * @instance
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
     * The {@link system.data.maps.ArrayMap} representation of all <code>singletons</code> registered in this factory.
     * @name singletons
     * @memberof system.ioc.ObjectFactory
     * @type {system.data.maps.ArrayMap}
     * @instance
     * @readonly
     */
    singletons : { get : function() { return this._singletons ; } } ,

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    clone : { value : function()
    {
        return new ObjectFactory( this.config , [].concat( this.objects ) ) ;
    }},

    /**
     * Indicates if a singleton reference is register in the factory with the specified id.
     * @param {string} id - The index expression of the singleton.
     * @return <code>true</code> if the singleton reference is register in the factory.
     * @name hasSingleton
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    hasSingleton : { value : function( id )
    {
        return this._singletons.has(id) ;
    }},

    /**
     * This method returns an object with the specified <code>id</code> in argument.
     * @param {string} id - The index expression of the object to returns.
     * @return The instance of the object with the id passed in argument.
     * @name getObject
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    getObject : { value : function( id )
    {
        if ( !(id instanceof String || typeof(id) === 'string') )
        {
           return null ;
        }

        let instance = null ;

        try
        {
            let definition = this.getObjectDefinition( id ) ;

            if ( !(definition instanceof ObjectDefinition) )
            {
                throw new Error( this +  " getObject( " + id + " ) method failed, the object isn't register in the factory.") ;
            }

            if ( definition.singleton )
            {
                instance = this._singletons.get(id) || null ;
            }

            if ( !instance )
            {
                try
                {
                    if ( definition.strategy )
                    {
                        instance = this.createObjectWithStrategy( definition.strategy ) ;
                    }
                    else
                    {
                        let type = this.config.typeEvaluator.eval( definition.type )  ;
                        if ( type instanceof Function )
                        {
                            instance = invoke( type , this.createArguments( definition.constructorArguments ) ) ;
                        }
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
                        this._singletons.set( id , instance ) ;
                    }

                    this.dependsOn( definition ) ; // dependencies

                    this.populateIdentifiable ( instance , definition ) ; // identify

                    let flag = isLockable( instance ) && ( ( definition.lock === true ) || ( this.config.lock === true && definition.lock !== false ) ) ;

                    if ( flag )
                    {
                        instance.lock() ;
                    }

                    if( (definition.beforeListeners instanceof Array) && (definition.beforeListeners.length > 0) )
                    {
                        this.registerListeners( instance , definition.beforeListeners ) ;
                    }

                    if( (definition.beforeReceivers instanceof Array) && (definition.beforeReceivers.length > 0) )
                    {
                        this.registerReceivers( instance , definition.beforeReceivers ) ;
                    }

                    this.populateProperties( instance , definition ) ; // init properties

                    if( (definition.afterListeners instanceof Array) && (definition.afterListeners.length > 0) )
                    {
                        this.registerListeners( instance , definition.afterListeners ) ;
                    }

                    if( (definition.afterReceivers instanceof Array) && (definition.afterReceivers.length > 0) )
                    {
                        this.registerReceivers( instance , definition.afterReceivers ) ;
                    }

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
            this.warn( this + " getObject failed with the id '" + id + "' : " + e.toString() ) ;
        }

        return instance || null ;
    }},

    /**
     * Indicates if the <code>ObjectFactory</code> is dirty, must flush this buffer of not lazy-init singleton object definitions. The user must execute the run or create methods to flush this buffer.
     * @return <code>true</code> if the factory is dirty.
     * @name isDirty
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    isDirty : { value : function()
    {
        return this.bufferSingletons && (this.bufferSingletons instanceof Array) && this.bufferSingletons.length > 0 ;
    }},

    /**
     * Indicates whether an <b>object definition</b> is to be lazily initialized.
     * <p><b>Note:</b> The default behavior for {@link system.ioc.ObjectFactory|ObjectFactory} implementations is to eagerly pre-instantiate all singleton object definitions at startup. If the <b>object definition</b> <code>lazyInit</code> attribute is set to true, the <b>singleton</b> will not be initialized until referenced by another <b>object definition</b> or explicitly retrieved from the enclosing <b>ObjectFactory</b>. If present and set to false, the <b>object definition</b> will be instantiated on startup by factories that perform eager initialization of singletons.</p>
     * @param {string} id - The index expression of the object to check.
     * @return <code>true</code> if the specified object definition is lazyly initialized.
     * @name isLazyInit
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    isLazyInit : { value : function( id )
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
     * This method defined if the scope of the specified <b>object definition</b> is <code>singleton</code>.
     * @param {string} id - The index expression of the object to check.
     * @return <code>true</code> if the object is a singleton.
     * @name isSingleton
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    isSingleton : { value : function( id )
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
     * Removes and destroy a singleton in the <b>factory</b>.
     * <p>Invoke the <code>destroy</code> method of this object is it's define in the <code>ObjectDefinition</code> of this singleton.</p>
     * @param {string} id - The index expression of the object to remove.
     * @name removeSingleton
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
      */
    removeSingleton : { value : function( id )
    {
        if ( this.isSingleton(id) && this._singletons.has(id) )
        {
            this.invokeDestroyMethod( id ) ;
            this._singletons.delete( id ) ;
        }
    }},

    /**
     * Run the initialization of the factory with new object definitions and create the not lazy-init singleton objects.
     * @name run
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     * @example
     * var Point = function( x , y )
     * {
     *     this.x = x ;
     *     this.y = y ;
     * };
     *
     * Point.prototype.test = function( message = null )
     * {
     *     console.log( 'test:' + this.toString() + " message:" + message ) ;
     * }
     *
     * Point.prototype.toString = function()
     * {
     *     return "[Point x:" + this.x + " y:" + this.y + "]" ;
     * } ;
     *
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
     *     {
     *         id   : "position" ,
     *         type : "Point" ,
     *         args : [ { value : 2 } , { ref : 'origin.y' }],
     *         properties :
     *         [
     *             { name : "x" , ref   :'origin.x' } ,
     *             { name : "y" , value : 100       }
     *         ]
     *     },
     *     {
     *         id         : "origin" ,
     *         type       : "Point" ,
     *         singleton  : true ,
     *         args       : [ { config : 'origin.x' } , { value : 20 }] ,
     *         properties :
     *         [
     *             { name : 'test' , args : [ { locale : 'messages.test' } ] }
     *         ]
     *     }
     * ];
     *
     * factory.run( objects );
     *
     * trace( factory.getObject('position') ) ;
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
            while ( this.objects.length > 0 )
            {
                let init = this.objects.shift() ;

                if ( init !== null )
                {
                    let definition = createObjectDefinition( init ) ;

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
            let len = this.bufferSingletons.length ;
            for ( let i = 0 ; i < len ; i++ )
            {
                this.getObject( this.bufferSingletons[i] ) ;
            }
            this.bufferSingletons = null ;
        }

        this.notifyFinished() ;
    }},

    /**
     * The custom warn method of this factory to log a warning message in the application.
     * You can overrides this method, the prototype object is dynamic.
     * @name warn
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    warn : { value : function( ...args )
    {
        if ( this.config.useLogger )
        {
            logger.warning.apply( null , args ) ;
        }
    }},

    /**
     * Creates the arguments Array representation of the specified definition.
     * @return the arguments Array representation of the specified definition.
     * @name createArguments
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     * @private
     */
    createArguments : { value : function( args = null )
    {
        if ( args === null || !(args instanceof Array) || args.length === 0 )
        {
            return null ;
        }

        let stack = [] ;
        let len = args.length ;

        for ( let i = 0 ; i<len ; i++)
        {
            let item = args[i] ;
            if( item instanceof ObjectArgument )
            {
                let value = item.value ;

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
                catch( er )
                {
                    this.warn( this + " createArguments failed : " + er.toString() ) ;
                }
            }
        }

        return stack ;
    }},

    /**
     * Creates a new Object with a specified <code>ObjectFactoryStrategy</code> instance.
     * @return A new Object with a specified <code>ObjectFactoryStrategy</code> instance.
     * @private
     * @name createObjectWithStrategy
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    createObjectWithStrategy : { value : function( strategy )
    {
        if ( !(strategy instanceof ObjectStrategy) )
        {
            return null ;
        }

        let name = strategy.name ;

        let instance = null ;
        let object ;
        let ref ;

        if ( strategy instanceof ObjectMethod )
        {
            if ( strategy instanceof ObjectStaticFactoryMethod )
            {
                object = strategy.type ;
                if( object instanceof String || typeof(object) === 'string' )
                {
                    object = this.config.typeEvaluator.eval( object ) ;
                }
                if ( object && name && (name in object) && (object[name] instanceof Function) )
                {
                    instance = object[name].apply( object , this.createArguments( strategy.args ) ) ;
                }
            }
            else if ( strategy instanceof ObjectFactoryMethod )
            {
                ref = this.getObject( strategy.factory ) ;
                if ( ref && name && (name in ref) && (ref[name] instanceof Function) )
                {
                    instance = ref[name].apply( ref , this.createArguments( strategy.args ) ) ;
                }
            }
        }
        else if ( strategy instanceof ObjectProperty )
        {
            if ( strategy instanceof ObjectStaticFactoryProperty )
            {
                object = strategy.type ;
                if( object instanceof String || typeof(object) === 'string' )
                {
                    object = this.config.typeEvaluator.eval( object ) ;
                }
                if ( object && name && (name in object) )
                {
                    instance = object[name] ;
                }
            }
            else if ( strategy instanceof ObjectFactoryProperty )
            {
                ref = this.getObject(strategy.factory) ;
                if ( ref && name && (name in ref) )
                {
                    instance = ref[name] ;
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
     * @private
     * @name dependsOn
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    dependsOn : { value : function( definition ) // FIXME Array of String or String
    {
        if ( (definition instanceof ObjectDefinition) && (definition.dependsOn instanceof Array) && (definition.dependsOn.length > 0 ) )
        {
            let id ;
            let len = definition.dependsOn.length ;
            for ( let i = 0 ; i<len ; i++ )
            {
                id = definition.dependsOn[i] ;
                if ( this.hasObjectDefinition(id) )
                {
                    this.getObject(id) ; // not keep in memory
                }
            }
        }
    }} ,

    /**
     * Evaluates a value with an Array of evaluators or Evaluable references in the factory.
     * @param value The value to evaluate.
     * @param evaluators The Array who contains IEvaluator objects or String ids who representing a IEvaluator in the factory.
     * @return The new value after evaluation.
     * @private
     * @name eval
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    eval : { value : function( value , evaluators = null )
    {
        if ( !(evaluators instanceof Array) || (evaluators.length === 0) )
        {
            return value ;
        }
        this._evaluator.clear() ;
        let o ;
        let s = evaluators.length ;
        let a = [] ;
        for ( let i = 0 ; i < s ; i++ )
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
     * @private
     * @name generates
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    generates : { value : function( definition ) // FIXME can use a String or an Array of String ?
    {
        if ( (definition instanceof ObjectDefinition) && ( definition.generates instanceof Array ) )
        {
            let id ;
            let ar = definition.generates ;
            let len = ar.length ;
            if ( len > 0 )
            {
                for ( let i = 0 ; i<len ; i++ )
                {
                   id = ar[i] ;
                   if ( this.hasObjectDefinition(id) )
                   {
                       this.getObject(id) ; // not keep in memory
                   }
                }
            }
        }
    }},

    /**
     * Invokes the destroy method of the specified object, if the <code>destroyMethodName</code> property is define in the <code>ObjectDefinition</code> object.
     * @private
     * @name invokeDestroyMethod
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    invokeDestroyMethod : { value : function( id )
    {
        if( this.hasObjectDefinition(id) && this._singletons.has(id) )
        {
            let definition = this.getObjectDefinition(id) ;
            let o = this._singletons.get(id) ;

            let name = definition.destroyMethodName || null ;
            if ( name === null && this.config !== null )
            {
                name = this.config.defaultDestroyMethod ;
            }

            if( name && (name in o) && (o[name] instanceof Function) )
            {
                o[name].call(o) ;
            }
        }
    }},

    /**
     * Invokes the init method of the specified object, if the init method is define in the IDefinition object.
     * @private
     * @name invokeInitMethod
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    invokeInitMethod : { value : function( o , definition = null )
    {
        if( definition && (definition instanceof ObjectDefinition) )
        {
            let name = definition.initMethodName || null ;
            if ( (name === null) && this.config )
            {
                name = this.config.defaultInitMethod || null ;
            }
            if( name && (name in o) && (o[name] instanceof Function) )
            {
                o[name].call(o) ;
            }
        }
    }},

    /**
     * Populates the <code>Identifiable</code> singleton object, if the 'identify' flag is true the config of this factory and if specified the <code>IObjectDefinition</code> object scope is singleton.
     * @private
     * @name populateIdentifiable
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    populateIdentifiable : { value : function( o , definition = null )
    {
        if( definition && (definition instanceof ObjectDefinition) )
        {
            if ( definition.singleton && isIdentifiable(o) )
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
     * @private
     * @name populateProperties
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    populateProperties : { value : function( o , definition /*ObjectDefinition*/ = null )
    {
        if( definition && (definition instanceof ObjectDefinition) )
        {
            let properties = definition.properties ;
            if ( properties && (properties instanceof Array) && properties.length > 0 )
            {
                let id  = definition.id ;
                let len = properties.length ;
                for( let i = 0 ; i < len ; i++ )
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
     * @private
     * @name populateProperty
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    populateProperty : { value : function( o , prop , id )
    {
        if ( o === null )
        {
            this.warn( this + " populate a new property failed, the object not must be 'null' or 'undefined', see the factory with the object definition '" + id + "'." ) ;
            return ;
        }

        let name = prop.name ;
        let value = prop.value ;

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
     * @private
     * @name registerListeners
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    registerListeners : { value : function( o , listeners )
    {
        if ( o === null || listeners === null )
        {
            return ;
        }
        var size = listeners.length ;
        if ( size > 0 )
        {
            let dispatcher ;
            let method ;
            let listener ;
            for ( let i = 0 ; i<size ; i++ )
            {
                try
                {
                    method     = null ;
                    listener   = listeners[i] ;
                    dispatcher = this._config.referenceEvaluator.eval( listener.dispatcher ) ;
                    if ( dispatcher !== null && listener.type !== null )
                    {
                        if ( listener.method && (listener.method in o) && (o[listener.method] instanceof Function))
                        {
                            method = o[listener.method]   ;
                        }
                        else if( ('handleEvent' in o) && (o.handleEvent instanceof Function)  )
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
     * @private
     * @name registerReceivers
     * @memberof system.ioc.ObjectFactory
     * @instance
     * @function
     */
    registerReceivers : { value : function( o , receivers  = null )
    {
        if ( !(receivers instanceof Array) || (receivers.length === 0) )
        {
            return ;
        }

        let slot , signaler , receiver ;
        let len = receivers.length ;

        for (let i = 0 ; i<len ; i++ )
        {
            try
            {
                receiver = receivers[i] ;
                signaler = this._config.referenceEvaluator.eval( receiver.signal ) ;
                slot     = null ;

                if ( signaler instanceof Signaler )
                {
                    if ( (receiver.slot instanceof String || typeof(receiver.slot) === 'string') && (receiver.slot in o) && ( o[receiver.slot] instanceof Function ) )
                    {
                        slot = o[receiver.slot] ;
                    }
                    else if ( o instanceof Receiver )
                    {
                        slot = o ;
                    }

                    if ( (slot instanceof Receiver) || (slot instanceof Function) )
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
    }}
}) ;