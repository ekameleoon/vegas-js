"use strict" ;

import { Property  } from '../data/Property.js' ;
import { Attribute } from '../data/Attribute.js' ;
import { Method    } from '../data/Method.js' ;

import { Action } from './Action.js' ;

/**
 * Enqueue a collection of members definitions (commands) to apply or invoke with the specified target object.
 * @summary Enqueue a collection of members definitions (commands) to apply or invoke with the specified target object.
 * @name Cache
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @param {Object} target - The object to map with this cache process.
 * @param {Array} init - The <code>Array</code> of <code>Property</code> to map in the target reference when the process is running.
 * @example
 * var Cache = system.process.Cache ;
 *
 * var object = {} ;
 *
 * object.a = 1 ;
 * object.b = 2 ;
 * object.c = 3 ;
 * object.d = 4 ;
 *
 * Object.defineProperties( object ,
 * {
 *     method1 :
 *     {
 *         value : function( value )
 *         {
 *             this.c = value ;
 *         }
 *     },
 *     method2 :
 *     {
 *         value : function( value1 , value2 )
 *         {
 *             this.d = value1 + value2 ;
 *         }
 *     }
 * });
 *
 * trace( object ) ; // {a:1,b:2,c:3,d:4}
 *
 * var cache = new Cache() ;
 *
 * cache.addAttribute( "a" , 10 ) ;
 * cache.addAttribute( "b" , 20 ) ;
 *
 * cache.addMethod( "method1" , 30 ) ;
 * cache.addMethodWithArguments( "method2" , [ 40 , 50 ] ) ;
 *
 * cache.target = object ;
 *
 * cache.run() ; // flush the cache and initialize the target or invoked this methods.
 *
 * trace( object ) ; // {a:10,b:20,c:30,d:90}
 * @see system.data.Property
 * @see system.data.Attribute
 * @see system.data.Method
 */
export function Cache ( target = null , init = null )
{
    Action.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * The target reference.
         * @memberof system.process.Cache
         * @instance
         * @type {object}
         */
        target : { value : target , writable : true } ,

        /**
         * @private
         */
        _queue : { value : [] , writable : true }
    }) ;

    if ( init && init instanceof Array && init.length > 0 )
    {
        init.forEach( function( prop )
        {
            if( prop instanceof Property )
            {
                this._queue.push( prop ) ;
            }
        }) ;
    }
}

Cache.prototype = Object.create( Action.prototype ,
{
    constructor : { writable : true , value : Cache },

    /**
     * Returns the number of properties.
     * @name length
     * @memberof system.process.Cache
     * @instance
     * @readonly
     */
    length :
    {
        get : function() { return this._queue.length ; }
    }
}) ;

/**
 * Enqueues a specific Property definition.
 * @name add
 * @memberof system.process.Cache
 * @instance
 * @function
 * @param {system.data.Property} property - The property to register.
 * @return The current <code>Cache</code> reference.
 * @see system.data.Attribute
 * @see system.data.Method
 */
Cache.prototype.add = function( property )
{
    if ( property instanceof Property )
    {
        this._queue.push( property ) ;
    }
    return this ;
}

/**
 * Enqueues an attribute name/value entry.
 * @name addAttribute
 * @memberof system.process.Cache
 * @instance
 * @function
 * @param {string} name - The name of the attribute to register.
 * @param {*} value - The value of the attribute to register.
 * @return The current <code>Cache</code> reference.
 */
Cache.prototype.addAttribute = function( name , value ) /*Cache*/
{
    if ( name !== '' && ( typeof(name) === 'string' || name instanceof String )  )
    {
        this._queue.push( new Attribute( name , value ) ) ;
    }
    return this ;
}

/**
 * Enqueues a method definition.
 * @name addMethod
 * @memberof system.process.Cache
 * @instance
 * @function
 * @param {string} name - The name of the method to register.
 * @param {Array} args - The optional parameters to fill in the method.
 * @return The current <code>Cache</code> reference.
 */
Cache.prototype.addMethod = function ( name , ...args ) /*Cache*/
{
    if ( name !== '' && ( typeof(name) === 'string' || name instanceof String )  )
    {
        this._queue.push( new Method( name , args ) ) ;
    }
    return this ;
}

/**
 * Enqueues a method definition.
 * @name addMethodWithArguments
 * @memberof system.process.Cache
 * @instance
 * @function
 * @param {string} name - The name of the method to register.
 * @param {Array} args - The optional parameters to fill in the method.
 * @return The current <code>Cache</code> reference.
 */
Cache.prototype.addMethodWithArguments = function ( name , args )
{
    if ( name !== '' && ( typeof(name) === 'string' || name instanceof String )  )
    {
        this._queue.push( new Method( name , args ) ) ;
    }
    return this ;
}

/**
 * Removes all commands in memory.
 * @name clear
 * @memberof system.process.Cache
 * @function
 * @instance
 */
Cache.prototype.clear = function()
{
   this._queue.length = 0 ;
}

/**
 * Returns a shallow copy of this object.
 * @name clone
 * @memberof system.process.Cache
 * @function
 * @instance
 * @return a shallow copy of this object.
 */
Cache.prototype.clone = function()
{
    return new Cache( this.target , this._queue ) ;
}

/**
 * Indicates if the tracker cache is empty.
 * @name isEmpty
 * @memberof system.process.Cache
 * @function
 * @instance
 */
Cache.prototype.isEmpty = function()
{
   return this._queue.length === 0 ;
}

/**
 * Run the process.
 * @name run
 * @memberof system.process.Cache
 * @function
 * @instance
 */
Cache.prototype.run = function()
{
    this.notifyStarted() ;
    if ( this.target )
    {
        var l = this._queue.length ;
        if ( l > 0 )
        {
            var item ;
            var name ;
            for ( var i = 0 ; i<l ; i++ )
            {
                item = this._queue.shift() ;
                if ( item instanceof Method )
                {
                    name = item.name ;
                    if ( name && name in this.target )
                    {
                        if ( this.target[name] instanceof Function )
                        {
                            this.target[name].apply( this.target , item.args ) ;
                        }
                    }
                }
                else if ( item instanceof Attribute )
                {
                    name = item.name ;
                    if ( name in this.target )
                    {
                        this.target[name] = item.value ;
                    }
                }
            }
        }
    }
    this.notifyFinished() ;
}