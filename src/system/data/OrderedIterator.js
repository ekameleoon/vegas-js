/*jshint unused: false*/
"use strict" ;

import { Iterator } from './Iterator.js' ;

/**
 * Indicates if the specific objet is an {@link system.data.OrderedIterator|OrderedIterator}.
 * @name isOrderedIterator
 * @memberof system.data
 * @function
 * @param {object} target - The target object to evaluate.
 * @return <code>true</code> if the object is an {@link system.data.OrderedIterator|OrderedIterator}.
 */
export function isOrderedIterator( target )
{
    var bool = false ;
    if( target )
    {
        bool =
        (
            (target instanceof OrderedIterator) ||
            (
                (('hasNext'     in target) && (target.hasNext     instanceof Function)) &&
                (('hasPrevious' in target) && (target.hasPrevious instanceof Function)) &&
                (('key'         in target) && (target.key         instanceof Function)) &&
                (('next'        in target) && (target.next        instanceof Function)) &&
                (('previous'    in target) && (target.previous    instanceof Function)) &&
                (('remove'      in target) && (target.remove      instanceof Function)) &&
                (('reset'       in target) && (target.reset       instanceof Function)) &&
                (('seek'        in target) && (target.seek        instanceof Function))
            )
        );
    }
    return bool ;
}

/**
 * Defines an iterator that operates over an ordered collection. This iterator allows both forward and reverse iteration through the collection.
 * @name OrderedIterator
 * @extends Iterator
 * @interface
 * @memberof system.data
 */
export function OrderedIterator() {}

OrderedIterator.prototype = Object.create( Iterator.prototype ) ;
OrderedIterator.prototype.constructor = OrderedIterator ;

/**
 * Checks to see if there is a previous element that can be iterated to.
 * @memberof system.data.OrderedIterator
 * @function
 */
OrderedIterator.prototype.hasPrevious = function() {}

/**
 * Returns the previous element in the collection.
 * @return the previous element in the collection.
 * @memberof system.data.OrderedIterator
 * @function
 */
OrderedIterator.prototype.previous = function() {}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.data.OrderedIterator
 * @function
 */
OrderedIterator.prototype.toString = function () { return '[OrderedIterator]' ; }