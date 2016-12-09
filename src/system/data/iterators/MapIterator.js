/*jshint unused: false*/
"use strict" ;

import { ArrayIterator } from './ArrayIterator.js' ;
import { Iterator }      from '../Iterator.js' ;
import { KeyValuePair }  from '../KeyValuePair.js' ;

/**
 * Converts a {@link system.data.KeyValuePair|KeyValuePair} to an iterator.
 * @name MapIterator
 * @class
 * @implements system.data.Iterator
 * @memberof system.data.iterators
 * @param {system.data.KeyValuePair} map - The <code>KeyValuePair</code> to iterate.
 * @throws ReferenceError If the passed-in argument is <code>null</code> or not an {@link system.data.KeyValuePair|KeyValuePair} object.
 * @example
 * var map = new ArrayMap() ;
 *
 * map.set("key1", "value1") ;
 * map.set("key2", "value2") ;
 * map.set("key3", "value3") ;
 *
 * map.set("key1", "value1") ;
 * map.set("key2", "value2") ;
 * map.set("key3", "value3") ;
 *
 * trace( '> ' + map ) ;
 *
 * var it = map.iterator() ;
 * while( it.hasNext() )
 * {
 *     trace (it.next() + " : " + it.key()) ;
 *     if( it.key() === "key2" )
 *     {
 *         it.delete() ;
 *     }
 * }
 *
 * trace( '> ' + map ) ;
 */
export function MapIterator( map )
{
    if ( map && ( map instanceof KeyValuePair) )
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
       throw new ReferenceError( this + " constructor failed, the passed-in KeyValuePair argument not must be 'null'.") ;
    }
}

MapIterator.prototype = Object.create( Iterator.prototype ,
{
    constructor : { writable : true , value : MapIterator } ,

    /**
     * Deletes from the underlying collection the last element returned by the iterator (optional operation).
     * @name delete
     * @memberof system.data.iterators.MapIterator
     * @instance
     * @function
     */
    delete : { value : function()
    {
        this._i.delete() ;
        return this._m.delete( this._k ) ;
    }},

    /**
     * Returns <code>true</code> if the iteration has more elements.
     * @return <code>true</code> if the iteration has more elements.
     * @name hasNext
     * @memberof system.data.iterators.MapIterator
     * @instance
     * @function
     */
    hasNext : { value : function()
    {
        return this._i.hasNext() ;
    }},

    /**
     * Returns the current key of the internal pointer of the iterator (optional operation).
     * @return the current key of the internal pointer of the iterator (optional operation).
     * @name key
     * @memberof system.data.iterators.MapIterator
     * @instance
     * @function
     */
    key : { value : function()
    {
        return this._k ;
    }},

    /**
     * Returns the next element in the iteration.
     * @return the next element in the iteration.
     * @name next
     * @memberof system.data.iterators.MapIterator
     * @instance
     * @function
     */
    next : { value : function()
    {
        this._k = this._i.next() ;
        return this._m.get( this._k ) ;
    }},

    /**
     * Reset the internal pointer of the iterator (optional operation).
     * @name reset
     * @memberof system.data.iterators.MapIterator
     * @instance
     * @function
     */
    reset : { value : function()
    {
        this._i.reset() ;
    }},

    /**
     * Changes the position of the internal pointer of the iterator (optional operation).
     * @name seek
     * @memberof system.data.iterators.MapIterator
     * @instance
     * @function
     */
    seek : { value : function ( position )
    {
        throw new Error( "This Iterator does not support the seek() method.") ;
    }}
}) ;