"use strict" ;

/**
 * Indicates if the specific objet is {@link system.process.Startable|Startable} and contains a <code>start()</code> method.
 * @name isStartable
 * @function
 * @instance
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.process.Startable|Startable}.
 */
export function isStartable( target )
{
    if( target )
    {
        if( target instanceof Startable )
        {
            return true ;
        }
        return ( 'start' in target ) && ( target.start instanceof Function )  ;
    }
    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be started.
 * @name Startable
 * @memberof system.process
 * @interface
 */
export function Startable() {}

Startable.prototype = Object.create( Object.prototype );
Startable.prototype.constructor = Startable;

/**
 * Starts the process.
 * @name start
 * @memberof system.process.Startable
 * @function
 * @instance
 */
Startable.prototype.start = function() {}