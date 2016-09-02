"use strict" ;

/**
 * Indicates if the specific objet is Resetable.
 */
export function isResetable( target )
{
    if( target )
    {
        return ( 'reset' in target ) && ( target.reset instanceof Function )  ;
    }

    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be reseted.
 */
export function Resetable()
{

}
///////////////////

Resetable.prototype = Object.create( Object.prototype );
Resetable.prototype.constructor = Resetable;

///////////////////

/**
 * Resets the process.
 */
Resetable.prototype.reset = function() /*void*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Resetable.prototype.toString = function () /*String*/
{
    return "[Resetable]" ;
}