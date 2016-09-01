"use strict" ;

/**
 * This interface should be implemented by any class whose instances are intended to be stopped.
 */
export function Stoppable()
{

}

///////////////////

Stoppable.prototype = Object.create( Object.prototype );
Stoppable.prototype.constructor = Stoppable;

///////////////////

/**
 * Stop the process.
 */
Stoppable.prototype.stop = function() /*void*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Stoppable.prototype.toString = function () /*String*/
{
    return "[Stoppable]" ;
}