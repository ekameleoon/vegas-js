"use strict" ;

import { Identifiable } from '../data/Identifiable.js' ;

import { ObjectOrder }    from './ObjectOrder.js' ;
import { ObjectListener } from './ObjectListener.js' ;
import { ObjectReceiver } from './ObjectReceiver.js' ;
import { ObjectScope }    from './ObjectScope.js' ;
import { ObjectStrategy } from './ObjectStrategy.js' ;

/**
 * The objects that form the backbone of your application and that are managed by the <b>IoC container</b> are called <b>object definitions</b>. An <b>object definition</b> is an object that is instantiated, assembled, and otherwise managed by the <b>IoC factory</b>.
 * <p>The <b>object definition</b> contains the information called configuration metadata which is needed for the container to know the followings :
 * <ul>
 * <li>How to create an object</li>
 * <li>Object's lifecycle details</li>
 * <li>Object's dependencies</li>
 * </ul>
 * </p>
 * @name ObjectDefinition
 * @class
 * @memberof system.ioc
 * @implements system.data.Identifiable
 * @extends system.data.Identifiable
 * @param {string} id - The unique index of the object definition register in the container.
 * @param {string|Function} type - The type of the object (the function reference of the class name).
 * @param {boolean} [singleton=false] - Indicates if the object definition scope is 'singleton' or not.
 * @param {boolean} [lazyInit=false] - Indicates if the object definition scope is 'lazyInit' or not.
 * @throws ReferenceError if the <code>id</code> and <code>type</code> arguments are <code>null</code> or <code>undefined</code>.
 */
export function ObjectDefinition( id , type , singleton = false , lazyInit = false )
{
    if ( id === null || id === undefined )
    {
        throw new ReferenceError( this + " constructor failed, the 'id' value passed in argument not must be empty or 'null' or 'undefined'.") ;
    }

    if ( type === null || type === undefined )
    {
        throw new ReferenceError( this + " constructor failed, the string 'type' passed in argument not must be empty or 'null' or 'undefined'.") ;
    }

    Object.defineProperties( this ,
    {
        /**
         * The <code>Array</code> of all listener definitions of this object definition register after the object initialization.
         * @memberof system.ioc.ObjectDefinition
         * @instance
         * @readonly
         * @type Array
         */
        afterListeners : { get : function() { return this._afterListeners ; } },

        /**
         * Returns the Array of all receiver definitions of this object definition register after the object initialization.
         * @return the Array of all receiver definitions of this object definition register after the object initialization.
         * @name afterReceivers
         * @memberof system.ioc.ObjectDefinition
         * @instance
         * @readonly
         * @type Array
         */
        afterReceivers : { get : function() { return this._afterReceivers ; } },

        /**
         * Returns the Array of all listener definitions of this object definition register before the object initialization.
         * @return the Array of all listener definitions of this object definition register before the object initialization.
         * @name beforeListeners
         * @memberof system.ioc.ObjectDefinition
         * @instance
         * @readonly
         * @type Array
         */
        beforeListeners : { get : function() { return this._beforeListeners ; } },

        /**
         * Returns the Array of all receiver definitions of this object definition register before the object initialization.
         * @return the Array of all receiver definitions of this object definition register before the object initialization.
         * @name beforeReceivers
         * @memberof system.ioc.ObjectDefinition
         * @instance
         * @readonly
         * @type Array
         */
        beforeReceivers : { get : function() { return this._beforeReceivers ; } },

        /**
         * The constructor arguments values of this object in a Array list.
         * @name constructorArguments
         * @memberof system.ioc.ObjectDefinition
         * @instance
         */
        constructorArguments : { value : null , enumerable : true , writable : true } ,

        /**
         * Defines the "dependsOn" collection.
         * @name dependsOn
         * @memberof system.ioc.ObjectDefinition
         * @instance
         */
        dependsOn :
        {
            enumerable : true ,
            get : function() { return this._dependsOn ; } ,
            set : function( ar )
            {
                this._dependsOn = ( ar instanceof Array && ar.length > 0 ) ? ar.filter( this._filterStrings ) : null ;
            }
        },

        /**
         * Determinates the name of the method invoked when the object is destroyed.
         * @name destroyMethodName
         * @memberof system.ioc.ObjectDefinition
         * @instance
         */
        destroyMethodName : { value : null , enumerable : true , writable : true } ,

        /**
         * Defines the "generates" collection.
         * @name generates
         * @memberof system.ioc.ObjectDefinition
         * @instance
         */
        generates :
        {
            enumerable : true ,
            get : function() { return this._generates ; } ,
            set : function( ar )
            {
                this._generates = ( ar instanceof Array && ar.length > 0 ) ? ar.filter( this._filterStrings ) : null ;
            }
        },

        /**
         * Indicates the unique identifier value of this object.
         * @name id
         * @memberof system.ioc.ObjectDefinition
         * @instance
         * @type string
         */
        id : { value : id , enumerable : true , writable : true } ,

        /**
         * Indicates if the object definition is a singleton and the type of the object is Identifiable if the object must be populated with the id of the definition when is instanciated.
         * @name identify
         * @memberof system.ioc.ObjectDefinition
         * @instance
         * @type boolean
         */
        identify : { value : false , enumerable : true , writable : true } ,

        /**
         * Determinates the name of the method invoked when the object is created.
         * @name initMethodName
         * @memberof system.ioc.ObjectDefinition
         * @instance
         * @type string
         */
        initMethodName : { value : null , enumerable : true , writable : true } ,

        /**
         * Indicates if the object lazily initialized. Only applicable to a singleton object. If <code>false</code>, it will get instantiated on startup by object factories that perform eager initialization of singletons.
         * @name lazyInit
         * @memberof system.ioc.ObjectDefinition
         * @instance
         * @type boolean
         */
        lazyInit :
        {
            get : function() 
            {
                return this._lazyInit;
            },
            set : function( flag )
            {
                this._lazyInit = ((flag instanceof Boolean) || (typeof(flag) === 'boolean')) ? flag : false ;
            }
        },

        /**
         * Sets the Array of all receiver definition of this object definition.
         * @param ar the Array of all receiver definitions of the object.
         * @name listeners
         * @memberof system.ioc.ObjectDefinition
         * @instance
         */
        listeners :
        {
            set : function( ar )
            {
                this._afterListeners  = [] ;
                this._beforeListeners = [] ;
                if ( ar === null || !(ar instanceof Array) )
                {
                    return ;
                }
                var r /*ObjectListener*/ ;
                var l = ar.length ;
                if ( l > 0 )
                {
                    for( var i = 0 ; i < l ; i++ )
                    {
                        r = ar[i] ;
                        if ( r instanceof ObjectListener )
                        {
                            if( r.order === ObjectOrder.AFTER )
                            {
                                this._afterListeners.push( r ) ;
                            }
                            else
                            {
                                this._beforeListeners.push( r ) ;
                            }
                        }
                    }
                }
            }
        },

        /**
         * Indicates if the object definition lock this Lockable object during the population of the properties and the initialization of the methods defines in the object definition.
         * @name lock
         * @memberof system.ioc.ObjectDefinition
         * @instance
         * @type boolean
         */
        lock : { value : false , enumerable : true , writable : true } ,

        /**
         * Sets the Array representation of all properties of this definition.
         * @name properties
         * @memberof system.ioc.ObjectDefinition
         * @instance
         */
        properties : { value : null , enumerable : true , writable : true } ,

        /**
         * Sets the Array of all receiver definition of this object definition.
         * @param ar the Array of all receiver definitions of the object.
         * @name receivers
         * @memberof system.ioc.ObjectDefinition
         * @instance
         */
        receivers :
        {
            set : function( ar )
            {
                this._afterReceivers  = [] ;
                this._beforeReceivers = [] ;

                if ( ar === null || !(ar instanceof Array) )
                {
                    return ;
                }

                var r /*ObjectReceiver*/ ;
                var l = ar.length ;
                if ( l > 0 )
                {
                    for( var i = 0 ; i < l ; i++ )
                    {
                        r = ar[i] ;
                        if ( r instanceof ObjectReceiver )
                        {
                            if( r.order === ObjectOrder.AFTER )
                            {
                                this._afterReceivers.push( r ) ;
                            }
                            else
                            {
                                this._beforeReceivers.push( r ) ;
                            }
                        }
                    }
                }
            }
        },

        /**
         * Indicates if the object in a singleton else the object is a prototype (read only, use the scope property to change it).
         * @name singleton
         * @memberof system.ioc.ObjectDefinition
         * @instance
         * @type boolean
         * @type readonly
         */
        singleton :
        {
            get : function()
            {
                return this._singleton;
            }
        },

        /**
         * Determinates the scope of the object.
         * @name scope
         * @memberof system.ioc.ObjectDefinition
         * @instance
         */
        scope :
        {
            get : function() { return this._scope ; } ,
            set : function( scope )
            {
                this._scope = ObjectScope.validate( scope ) ? scope : ObjectScope.PROTOTYPE ;
                this._singleton = Boolean(this._scope === ObjectScope.SINGLETON) ;
            }
        },

        /**
         * Determinates the factory stategy of this definition to create the object.
         * @name strategy
         * @memberof system.ioc.ObjectDefinition
         * @instance
         */
        strategy :
        {
            enumerable : true ,
            get : function() { return this._strategy ; } ,
            set : function( strategy )
            {
                this._strategy = (strategy instanceof ObjectStrategy) ? strategy : null ;
            }
        },

        /**
         * Indicates the type of the object (the function reference of the class name).
         * @name type
         * @memberof system.ioc.ObjectDefinition
         * @instance
         */
        type : { value : type , enumerable : true , writable : true } ,

        _afterListeners  : { value : null , writable : true } ,
        _beforeListeners : { value : null , writable : true } ,
        _dependsOn       : { value : null , writable : true } ,
        _generates       : { value : null , writable : true } ,
        _lazyInit        : { value : lazyInit && singleton , writable : true } ,
        _singleton       : { value : Boolean(singleton) , writable : true } ,
        _scope           : { value : Boolean(singleton) ? ObjectScope.SINGLETON : ObjectScope.PROTOTYPE , writable : true } ,
        _strategy        : { value : null , writable : true }
    }) ;
}

ObjectDefinition.prototype = Object.create( Identifiable.prototype ,
{
    constructor : { value :  Identifiable , enumerable : true , writable : true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @memberof system.ioc.ObjectDefinition
     * @name toString
     * @instance
     * @function
     */
    toString : { value : function () { return "[ObjectDefinition]" ; } } ,

    /**
     * @private
     * @memberof system.ioc.ObjectDefinition
     * @name _filterStrings
     * @instance
     * @function
     */
    _filterStrings :
    {
        value : function( item ) 
        {
            return (typeof(item) === 'string' || item instanceof String) && item.length > 0 ;
        }
    }
}) ;