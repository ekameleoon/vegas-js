"use strict" ;

/**
 * Indicates if the specific objet is Stoppable and contains a <code>stop()</code> method.
 * @name isStoppable
 * @function
 * @instance
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Stoppable</code>.
 */
export function isStoppable( target )
{
    if( target )
    {
        if( target instanceof Stoppable )
        {
            return true ;
        }
        return ( 'stop' in target ) && ( target.stop instanceof Function )  ;
    }
    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be stopped.
 * @name Stoppable
 * @memberof system.process
 * @interface
 */
export function Stoppable() {}

Stoppable.prototype = Object.create( Object.prototype );
Stoppable.prototype.constructor = Stoppable;

/**
 * Stop the process.
 * @name stop
 * @memberof system.process.Stoppable
 * @function
 * @instance
 */
Stoppable.prototype.stop = function() {}