"use strict" ;

/**
 * This interface should be implemented by any class whose instances are intended to be started.
 */
export function Startable()
{

}

///////////////////

Startable.prototype = Object.create( Object.prototype );
Startable.prototype.constructor = Startable;

///////////////////

/**
 * Starts the process.
 */
Startable.prototype.start = function() /*void*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Startable.prototype.toString = function () /*String*/
{
    return "[Startable]" ;
}