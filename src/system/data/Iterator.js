/*jshint unused: false*/
"use strict" ;

/**
 * This interface defines the iterator pattern over a collection.
 */
export function Iterator()
{
    //
}

/**
 * @extends Object
 */
Iterator.prototype = Object.create( Object.prototype ) ;
Iterator.prototype.constructor = Iterator ;

/**
 * Returns <code>true</code> if the iteration has more elements.
 * @return <code>true</code> if the iteration has more elements.
 */
Iterator.prototype.hasNext = function() {}

/**
 * Returns the current key of the internal pointer of the iterator (optional operation).
 * @return the current key of the internal pointer of the iterator (optional operation).
 */
Iterator.prototype.key = function() {}

/**
 * Returns the next element in the iteration.
 * @return the next element in the iteration.
 */
Iterator.prototype.next = function() {}

/**
 * Removes from the underlying collection the last element returned by the iterator (optional operation).
 */
Iterator.prototype.remove = function() {}

/**
 * Reset the internal pointer of the iterator (optional operation).
 */
Iterator.prototype.reset = function() {}

/**
 * Changes the position of the internal pointer of the iterator (optional operation).
 */
Iterator.prototype.seek = function ( position ) {}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance
 */
Iterator.prototype.toString = function ()
{
    return '[Iterator]' ;
}