/*jshint unused: false*/
"use strict" ;

/**
 * Indicates if the specific objet is an {@link system.data.Iterator|Iterator}.
 * @name isIterator
 * @memberof system.data
 * @function
 * @param {object} target - The target object to evaluate.
 * @return <code>true</code> if the object is an {@link system.data.Iterator|Iterator}.
 */
export function isIterator( target )
{
    var bool = false ;
    if( target )
    {
        bool =
        (
            (target instanceof Iterator) ||
            (
                (('hasNext' in target) && (target.hasNext instanceof Function)) &&
                (('key'     in target) && (target.key     instanceof Function)) &&
                (('next'    in target) && (target.next    instanceof Function)) &&
                (('remove'  in target) && (target.remove  instanceof Function)) &&
                (('reset'   in target) && (target.reset   instanceof Function)) &&
                (('seek'    in target) && (target.seek    instanceof Function))
            )
        );
    }
    return bool ;
}

/**
 * This interface defines the iterator pattern over a collection.
 * <p><b>Implementors:</b>
 * <ul>
 * <li>{@link system.data.iterators.ArrayIterator|ArrayIterator}</li>
 * <li>{@link system.data.iterators.MapIterator|MapIterator}</li>
 * </ul>
 * </p>
 * @name Iterator
 * @interface
 * @memberof system.data
 */
export function Iterator() {}

Iterator.prototype = Object.create( Object.prototype ) ;
Iterator.prototype.constructor = Iterator ;

/**
 * Returns <code>true</code> if the iteration has more elements.
 * @return <code>true</code> if the iteration has more elements.
 * @name hasNext
 * @memberof system.data.Iterator
 * @instance
 * @function
 */
Iterator.prototype.hasNext = function() {}

/**
 * Returns the current key of the internal pointer of the iterator (optional operation).
 * @return the current key of the internal pointer of the iterator (optional operation).
 * @memberof system.data.Iterator
 * @name key
 * @memberof system.data.Iterator
 * @instance
 * @function
 */
Iterator.prototype.key = function() {}

/**
 * Returns the next element in the iteration.
 * @return the next element in the iteration.
 * @name next
 * @memberof system.data.Iterator
 * @instance
 * @function
 */
Iterator.prototype.next = function() {}

/**
 * Removes from the underlying collection the last element returned by the iterator (optional operation).
 * @name remove
 * @memberof system.data.Iterator
 * @instance
 * @function
 */
Iterator.prototype.remove = function() {}

/**
 * Reset the internal pointer of the iterator (optional operation).
 * @memberof system.data.Iterator
 * @name reset
 * @instance
 * @function
 */
Iterator.prototype.reset = function() {}

/**
 * Changes the position of the internal pointer of the iterator (optional operation).
 * @name seek
 * @memberof system.data.Iterator
 * @instance
 * @function
 */
Iterator.prototype.seek = function ( position ) {}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @name toString
 * @memberof system.data.Iterator
 * @instance
 * @function
 */
Iterator.prototype.toString = function () { return '[' + this.constructor.name + ']' ; }