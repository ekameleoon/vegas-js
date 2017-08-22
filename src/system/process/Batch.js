/*jshint laxbreak: true*/
"use strict" ;

import { Runnable } from './Runnable.js' ;

/**
 * Enables you to apply a common {@link system.process.Action|Action} to a group of {@link system.process.Action|Action} objects.
 * <p>All {@link system.process.Action|Action} objects are processed as a single unit.<p>
 * <p>This class use an internal typed Collection to register all {system.process.Runnable|Runnable} objects.</p>
 * @summary Enables you to apply a common {@link system.process.Action|Action} to a group of {@link system.process.Action|Action} objects.
 * @name Batch
 * @class
 * @memberof system.process
 * @augments system.process.Runnable
 * @implements system.process.Runnable
 * @param {array} [init=null] - The optional Array of Runnable objects to fill the batch.
 * @example
 * function Command( name )
 * {
 *     this.name = name ;
 * }
 *
 * Command.prototype = Object.create( system.process.Runnable.prototype ) ;
 * Command.constructor = Command ;
 *
 * Command.prototype.run = function()
 * {
 *     trace( this.name + " run") ;
 * }
 *
 * Command.prototype.toString = function()
 * {
 *     return '[Command ' + this.name + ']' ;
 * }
 *
 * var batch = new system.process.Batch() ;
 *
 * batch.add( new Command( "command1" ) ) ;
 * batch.add( new Command( "command2" ) ) ;
 *
 * console.info( batch.length ) ;
 *
 * batch.run() ;
 */
export function Batch( init = null )
{
    Object.defineProperties( this ,
    {
        _entries :
        {
            value        : [] ,
            enumerable   : false ,
            writable     : true ,
            configurable : false
        },
    }) ;

    if ( init && init instanceof Array && init.length > 0 )
    {
        init.forEach( ( element ) =>
        {
            if ( element instanceof Runnable )
            {
                this.add( element ) ;
            }
        }) ;
    }
}

Batch.prototype = Object.create( Runnable.prototype ,
{
    constructor : { writable : true , value : Batch },

    /**
     * Retrieves the number of elements in this batch.
     * @return the number of elements in this batch.
     * @name length
     * @memberof system.process.Batch
     * @instance
     * @readonly
     */
    length :
    {
        get : function ()
        {
            return this._entries.length ;
        }
    },

    /**
     * Adds the specified Runnable object in batch.
     * @param {system.process.Runnable} command - The command to register in the batch.
     * @return <code>true</code> if the command is registered.
     * @name add
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    add : { writable : true , value : function( command )
    {
        if ( command && command instanceof Runnable )
        {
            this._entries.push( command ) ;
            return true ;
        }
        return false ;
    }},

    /**
     * Removes all of the elements from this batch.
     * @name clear
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    clear : { writable : true , value : function()
    {
        this._entries.length = 0 ;
    }},

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        var b = new Batch() ;
        var l = this._entries.length ;
        for( var i = 0 ; i < l ; i++ )
        {
            b.add( this._entries[i] ) ;
        }
        return b ;
    }},

    /**
     * Returns {@code true} if this batch contains the specified element.
     * @param {system.process.Runnable} command - The command to search in the batch.
     * @return {@code true} if this batch contains the specified element.
     * @name contains
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    contains : { writable : true , value : function( command )
    {
        if ( command instanceof Runnable )
        {
            var l = this._entries.length ;
            while( --l > -1 )
            {
                if ( this._entries[l] === command )
                {
                    return true ;
                }
            }
        }
        return false ;
    }},

    /**
     * Returns the command from this batch at the passed index.
     * @param {*} key - The key to find a specific command in the batch.
     * @return the command from this batch at the passed index.
     * @name get
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    get : { writable : true , value : function( key )
    {
        return this._entries[ key ] ;
    }},

    /**
     * Returns the position of the passed object in the batch.
     * @param command the Runnable object to search in the collection.
     * @param fromIndex the index to begin the search in the collection.
     * @return the index of the object or -1 if the object isn't find in the batch.
     * @name indexOf
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    indexOf : { writable : true , value : function( command , fromIndex /*uint*/ )
    {
        if ( isNaN( fromIndex ) )
        {
            fromIndex = 0 ;
        }
        fromIndex = ( fromIndex > 0 ) ? Math.round(fromIndex) : 0 ;
        if ( command instanceof Runnable )
        {
            var l = this._entries.length ;
            var i = fromIndex ;
            for( i ; i < l ; i++ )
            {
                if ( this._entries[i] === command )
                {
                    return i ;
                }
            }
        }
        return -1 ;
    }},

    /**
     * Returns {@code true} if this batch contains no elements.
     * @return {@code true} if this batch is empty else {@code false}.
     * @name isEmpty
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    isEmpty : { writable : true , value : function ()
    {
        return this._entries.length === 0 ;
    }},

    /**
     * Removes a single instance of the specified element from this collection, if it is present (optional operation).
     * @param {system.process.Runnable} command - The command to register in the batch.
     * @return <code>true</code> if the command is removed.
     * @name remove
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    remove : { writable : true , value : function ( command )
    {
        var index = this.indexOf( command ) ;
        if ( index > -1 )
        {
            this._entries.splice( index , 1 ) ;
            return true ;
        }
        return false ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        var l = this._entries.length ;
        if ( l > 0 )
        {
            var i = -1 ;
            while ( ++i < l )
            {
                this._entries[i].run() ;
            }
        }
    }},

    /**
     * Stops all commands in the batch.
     * @name stop
     * @memberof system.process.Batch
     * @function
     * @instance
     */
    stop : { writable : true , value : function()
    {
        var l = this._entries.length ;
        if (l > 0)
        {
            this._entries.forEach( ( element ) =>
            {
                if ( element instanceof Runnable
                     &&( 'stop' in element )
                     && ( element.stop instanceof Function ) )
                {
                    element.stop() ;
                }
            }) ;
        }
    }},

    /**
     * Returns an array containing all of the elements in this batch.
     * @name toArray
     * @memberof system.process.Batch
     * @function
     * @instance
     * @return an array containing all of the elements in this batch.
     */
    toArray : { writable : true , value : function ()
    {
        return this._entries.slice() ;
    }},

    /**
     * Returns the source code string representation of the object.
     * @name toString
     * @memberof system.process.Batch
     * @function
     * @instance
     * @return the source code string representation of the object.
     */
    toString : { writable : true , value : function ()
    {
        var r = "[Batch";
        var l = this._entries.length ;
        if( l > 0 )
        {
            r += '[' ;
            this._entries.forEach( ( element , index ) =>
            {
                r += element ;
                if (index < (l-1))
                {
                    r += "," ;
                }
            }) ;
            r += ']' ;
        }
        r += "]";
        return r ;
    }}
});