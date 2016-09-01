/*jshint laxbreak: true*/
"use strict" ;

import { Runnable } from './Runnable.js' ;

/**
 * Creates a new Batch instance.
 * @param init The optional Array of Runnable objects to fill the batch.
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

 * var batch = new system.process.Batch() ;
 *
 * batch.add( new Command( "command1" ) ) ;
 * batch.add( new Command( "command2" ) ) ;
 *
 * console.info( batch.length ) ;
 *
 * batch.run() ;
 */
export function Batch( init /*Array*/ )
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

/**
 * @extends Runnable
 */
Batch.prototype = Object.create( Runnable.prototype ,
{
    /**
     * Retrieves the number of elements in this batch.
     * @return the number of elements in this batch.
     */
    length :
    {
        get : function ()
        {
            return this._entries.length ;
        }
    }
});
Batch.prototype.constructor = Batch;

/**
 * Adds the specified Runnable object in batch.
 */
Batch.prototype.add = function( command /*Runnable*/ ) /*Boolean*/
{
    if ( command && command instanceof Runnable )
    {
        this._entries.push( command ) ;
        return true ;
    }
    return false ;
}

/**
 * Removes all of the elements from this batch.
 */
Batch.prototype.clear = function() /*void*/
{
    this._entries.length = 0 ;
}

/**
 * Returns a shallow copy of the object.
 * @return a shallow copy of the object.
 */
Batch.prototype.clone = function()
{
    var b = new Batch() ;
    var l = this._entries.length ;
    for( var i = 0 ; i < l ; i++ )
    {
        b.add( this._entries[i] ) ;
    }
    return b ;
}

/**
 * Returns {@code true} if this batch contains the specified element.
 * @return {@code true} if this batch contains the specified element.
 */
Batch.prototype.contains = function( command /*Runnable*/ ) /*Boolean*/
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
}

/**
 * Returns the command from this batch at the passed index.
 * @return the command from this batch at the passed index.
 */
Batch.prototype.get = function( key )
{
    return this._entries[ key ] ;
}

/**
 * Returns the position of the passed object in the batch.
 * @param command the Runnable object to search in the collection.
 * @param fromIndex the index to begin the search in the collection.
 * @return the index of the object or -1 if the object isn't find in the batch.
 */
Batch.prototype.indexOf = function( command , fromIndex /*uint*/ ) /*int*/
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
}

/**
 * Returns {@code true} if this batch contains no elements.
 * @return {@code true} if this batch is empty else {@code false}.
 */
Batch.prototype.isEmpty = function () /*Boolean*/
{
    return this._entries.length === 0 ;
}

/**
 * Removes a single instance of the specified element from this collection, if it is present (optional operation).
 */
Batch.prototype.remove = function ( command /*Runnable*/ ) /*Boolean*/
{
    var index = this.indexOf( command ) ;
    if ( index > -1 )
    {
        this._entries.splice( index , 1 ) ;
        return true ;
    }
    return false ;
}

/**
 * Run the process.
 */
Batch.prototype.run = function() /*void*/
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
}

/**
 * Stops all commands in the batch.
 */
Batch.prototype.stop = function() /*void*/
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
}

/**
 * Returns an array containing all of the elements in this batch.
 * @return an array containing all of the elements in this batch.
 */
Batch.prototype.toArray = function () /*Array*/
{
    return this._entries.slice() ;
}

/**
 * Returns the source code string representation of the object.
 * @return the source code string representation of the object.
 */
Batch.prototype.toString = function () /*Array*/
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
}