/*jshint unused: false*/
"use strict" ;

import { ArrayIterator } from './ArrayIterator.js' ;
import { Iterator }      from '../Iterator.js' ;
import { Map }           from '../Map.js' ;

/**
 * Converts a <code>Map</code> to an iterator.
 */
export function MapIterator( map )
{
    if ( map && ( map instanceof Map) )
    {
        Object.defineProperties( this ,
        {
            _m : { value : map  , writable : true } ,
            _i : { value : new ArrayIterator( map.keys() ) , writable : true } ,
            _k : { value : null , writable : true }
        }) ;
    }
    else
    {
       throw new ReferenceError( this + " constructor failed, the passed-in Map argument not must be 'null'.") ;
    }
}

/**
 * @extends Object
 */
MapIterator.prototype = Object.create( Iterator.prototype ) ;
MapIterator.prototype.constructor = MapIterator ;

/**
 * Returns <code>true</code> if the iteration has more elements.
 * @return <code>true</code> if the iteration has more elements.
 */
MapIterator.prototype.hasNext = function()
{
    return this._i.hasNext() ;
}

/**
 * Returns the current key of the internal pointer of the iterator (optional operation).
 * @return the current key of the internal pointer of the iterator (optional operation).
 */
MapIterator.prototype.key = function()
{
    return this._k ;
}

/**
 * Returns the next element in the iteration.
 * @return the next element in the iteration.
 */
MapIterator.prototype.next = function()
{
    this._k = this._i.next() ;
    return this._m.get( this._k ) ;
}

/**
 * Removes from the underlying collection the last element returned by the iterator (optional operation).
 */
MapIterator.prototype.remove = function()
{
    this._i.remove() ;
    return this._m.delete( this._k ) ;
}

/**
 * Reset the internal pointer of the iterator (optional operation).
 */
MapIterator.prototype.reset = function()
{
    this._i.reset() ;
}

/**
 * Changes the position of the internal pointer of the iterator (optional operation).
 */
MapIterator.prototype.seek = function ( position )
{
    throw new Error( "This Iterator does not support the seek() method.") ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance
 */
MapIterator.prototype.toString = function ()
{
    return '[MapIterator]' ;
}