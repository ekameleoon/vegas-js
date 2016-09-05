"use strict" ;

import { Identifiable } from '../data/Identifiable.js' ;

import { ObjectOrder }    from './ObjectOrder.js' ;
import { ObjectListener } from './ObjectListener.js' ;
import { ObjectReceiver } from './ObjectReceiver.js' ;
import { ObjectScope }    from './ObjectScope.js' ;

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
         * Returns the Array of all listener definitions of this object definition register after the object initialization.
         * @return the Array of all listener definitions of this object definition register after the object initialization.
         */
        afterListeners :
        {
            get : function()
            {
                return this._afterListeners ;
            }
        },

        /**
         * Returns the Array of all receiver definitions of this object definition register after the object initialization.
         * @return the Array of all receiver definitions of this object definition register after the object initialization.
         */
        afterReceivers :
        {
            get : function()
            {
                return this._afterReceivers ;
            }
        },

        /**
         * Returns the Array of all listener definitions of this object definition register before the object initialization.
         * @return the Array of all listener definitions of this object definition register before the object initialization.
         */
        beforeListeners :
        {
            get : function()
            {
                return this._beforeListeners ;
            }
        },

        /**
         * Returns the Array of all receiver definitions of this object definition register before the object initialization.
         * @return the Array of all receiver definitions of this object definition register before the object initialization.
         */
        beforeReceivers :
        {
            get : function()
            {
                return this._beforeReceivers ;
            }
        },

        /**
         * Returns the constructor arguments values of this object in a Array list.
         * @return the constructor arguments values of this object in a Array list.
         */
        constructorArguments : { value : null , enumerable : true , writable : true } ,

        /**
         * Defines the "dependsOn" collection.
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
         */
        destroyMethodName : { value : null , enumerable : true , writable : true } ,

        /**
         * Defines the "generates" collection.
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
         */
        id : { value : id , enumerable : true , writable : true } ,

        /**
         * Indicates if the object definition is a singleton and the type of the object is Identifiable if the object must be populated with the id of the definition when is instanciated.
         */
        identify : { value : false , enumerable : true , writable : true } ,

        /**
         * Determinates the name of the method invoked when the object is created.
         */
        initMethodName : { value : null , enumerable : true , writable : true } ,

        /**
         * Indicates if the object lazily initialized. Only applicable to a singleton object.
         * If false, it will get instantiated on startup by object factories that perform eager initialization of singletons.
         * @return A boolean who indicates if the object lazily initialized.
         */
        lazyInit :
        {
            get : function() /*Boolean*/
            {
                return this._lazyInit;
            },
            set : function( flag )
            {
                this._lazyInit = flag instanceof Boolean || typeof(flag) === 'boolean' ? flag : false ;
            }
        },

        /**
         * Sets the Array of all receiver definition of this object definition.
         * @param ar the Array of all receiver definitions of the object.
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
         */
        lock : { value : false , enumerable : true , writable : true } ,

        /**
         * Sets the Array representation of all properties of this definition.
         */
        properties : { value : null , enumerable : true , writable : true } ,

        /**
         * Sets the Array of all receiver definition of this object definition.
         * @param ar the Array of all receiver definitions of the object.
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
         * Determinates the scope of the object.
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
         */
        strategy :
        {
            enumerable : true ,
            get : function() { return this._strategy ; } ,
            set : function( strategy )
            {
                this._strategy = (strategy instanceof ObjectFactoryStrategy) ? strategy : null ;
            }
        },

        /**
         * Indicates the type of the object (the function reference of the class name).
         */
        type : { value : type , enumerable : true , writable : true } ,

        /**
         * @private
         */
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

/**
 * @extends Evaluable
 */
ObjectDefinition.prototype = Object.create( Identifiable.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value :  Identifiable , enumerable : true , writable : true },

    /**
     * Returns <code class="prettyprint">true</code> if the object in a Sigleton else the object is a prototype.
     * @return <code class="prettyprint">true</code> if the object in a Sigleton else the object is a prototype.
     */
    isSingleton : { value : function() /*Boolean*/
    {
        return this._singleton;
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return "[ObjectDefinition]" ; } } ,

    /**
     * @private
     */
    _filterStrings :
    {
        value : function( item ) /*Boolean*/
        {
            return (typeof(item) === 'string' || item instanceof String) && item.length > 0 ;
        }
    }
}) ;