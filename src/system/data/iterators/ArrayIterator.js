"use strict" ;

import { Iterator } from '../Iterator.js' ;

/**
 * Converts a <code>Array</code> to an iterator.
 * @name ArrayIterator
 * @class
 * @implements system.data.Iterator
 * @memberof system.data.iterators
 * @param {array} array - The array to iterate.
 * @throws ReferenceError If the passed-in argument is not an array.
 * @example
 * var ArrayIterator = system.data.iterators.ArrayIterator ;
 *
 * var ar = ["item1", "item2", "item3", "item4"] ;
 *
 * var it = new ArrayIterator(ar) ;
 *
 * while (it.hasNext())
 * {
 *     trace (it.next()) ;
 * }
 *
 * trace ("--- it reset") ;
 *
 * it.reset() ;
 *
 * while (it.hasNext())
 * {
 *     trace (it.next() + " : " + it.key()) ;
 * }
 *
 * trace ("--- it seek 2") ;
 *
 * it.seek(2) ;
 * while (it.hasNext())
 * {
 *     trace (it.next()) ;
 * }
 *
 * trace ("---") ;
 */
export function ArrayIterator( array )
{
    if ( !(array instanceof Array) )
    {
        throw new ReferenceError( this + " constructor failed, the passed-in Array argument not must be 'null'.") ;
    }
    Object.defineProperties( this ,
    {
        _a : { value : array , writable : true } ,
        _k : { value : -1    , writable : true }
    }) ;
}

ArrayIterator.prototype = Object.create( Iterator.prototype ,
{
    constructor : { value : ArrayIterator } ,

    /**
     * Deletes from the underlying collection the last element returned by the iterator (optional operation).
     * @name delete
     * @memberof system.data.iterators.ArrayIterator
     * @instance
     * @function
     */
    delete : { value : function()
    {
        return this._a.splice(this._k--, 1)[0] ;
    }},

    /**
     * Returns <code>true</code> if the iteration has more elements.
     * @return <code>true</code> if the iteration has more elements.
     * @name hasNext
     * @memberof system.data.iterators.ArrayIterator
     * @instance
     * @function
     */
    hasNext : { value : function()
    {
        return (this._k < this._a.length -1) ;
    }},

    /**
     * Returns the current key of the internal pointer of the iterator (optional operation).
     * @return the current key of the internal pointer of the iterator (optional operation).
     * @name key
     * @memberof system.data.iterators.ArrayIterator
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
     * @memberof system.data.iterators.ArrayIterator
     * @instance
     * @function
     */
    next : { value : function()
    {
        return this._a[++this._k] ;
    }},

    /**
     * Reset the internal pointer of the iterator (optional operation).
     * @name reset
     * @memberof system.data.iterators.ArrayIterator
     * @instance
     * @function
     */
    reset : { value : function()
    {
        this._k = -1 ;
    }},

    /**
     * Changes the position of the internal pointer of the iterator (optional operation).
     * @name seek
     * @memberof system.data.iterators.ArrayIterator
     * @instance
     * @function
     */
    seek : { value : function ( position )
    {
        position = Math.max( Math.min( position - 1 , this._a.length ) , -1 ) ;
        this._k = isNaN(position) ? -1 : position ;
    }}
}) ;