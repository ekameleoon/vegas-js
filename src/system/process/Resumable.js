"use strict" ;

/**
 * This interface should be implemented by any class whose instances are intended to be resumed.
 */
export function Resumable()
{

}
///////////////////

Resumable.prototype = Object.create( Object.prototype );
Resumable.prototype.constructor = Resumable;

///////////////////

/**
 * Resumes the process.
 */
Resumable.prototype.resume = function() /*void*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Resumable.prototype.toString = function () /*String*/
{
    return "[Resumable]" ;
}