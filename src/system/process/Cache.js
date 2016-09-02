"use strict" ;

import { Action    } from './Action.js' ;
import { Property  } from './caches/Property.js' ;
import { Attribute } from './caches/Attribute.js' ;
import { Method    } from './caches/Method.js' ;

/**
 * Enqueue a collection of members definitions (commands) to apply or invoke with the specified target object.
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
 */
export function Cache ( target , init /*Array*/ )
{
    Action.call( this ) ;

    Object.defineProperties( this ,
    {
        _queue :
        {
            value    : [] ,
            writable : true
        }
    }) ;

    this.target = target ;

    if ( init instanceof Array && init.length > 0 )
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

/**
 * @extends Action
 */
Cache.prototype = Object.create( Action.prototype ,
{
    /**
     * Returns the number of properties.
     */
    length :
    {
        get : function() { return this._queue.length ; }
    }
}) ;

Cache.prototype.constructor = Cache ;

/**
 * Enqueues a specific Property definition.
 */
Cache.prototype.add = function( property ) /*Cache*/
{
    if ( property instanceof Property )
    {
        this._queue.push( property ) ;
    }
    return this ;
}

/**
 * Enqueues an attribute name/value entry.
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
 * @param name The name of the method.
 * @param args The optional arguments passed-in the method.
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
 * @param name The name of the method.
 * @param args The optional arguments passed-in the method.
 * @param scope The optional scope object of the method.
 */
Cache.prototype.addMethodWithArguments = function ( name , args ) /*Cache*/
{
    if ( name !== '' && ( typeof(name) === 'string' || name instanceof String )  )
    {
        this._queue.push( new Method( name , args ) ) ;
    }
    return this ;
}

/**
 * Removes all commands in memory.
 */
Cache.prototype.clear = function()
{
   this._queue.length = 0 ;
}

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
Cache.prototype.clone = function()
{
    return new Cache( this.target , this._queue ) ;
}

/**
 * Indicates if the tracker cache is empty.
 */
Cache.prototype.isEmpty = function()
{
   return this._queue.length === 0 ;
}

/**
 * Run the process.
 */
Cache.prototype.run = function() /*void*/
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
                            this.target[name].apply( item.scope || this.target, item.args ) ;
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

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
Cache.prototype.toString = function() /*String*/
{
    return '[Cache]' ;
}