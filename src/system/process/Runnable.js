"use strict" ;

/**
 * Indicates if the specific objet is Runnable.
 */
export function isRunnable( target )
{
    if( target )
    {
        return ( 'run' in target ) && ( target.run instanceof Function )  ;
    }

    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be executed.
 */
export function Runnable()
{

}
///////////////////

Runnable.prototype = Object.create( Object.prototype );
Runnable.prototype.constructor = Runnable;

///////////////////

/**
 * Run the process.
 */
Runnable.prototype.run = function() /*void*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Runnable.prototype.toString = function () /*String*/
{
    return "[Runnable]" ;
}