"use strict" ;

/**
 * Indicates if the specific objet is Resetable  and contains a <code>reset()</code> method.
 * @name isResetable
 * @function
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Resetable</code>.
 */
export function isResetable( target )
{
    if( target )
    {
        if( target instanceof Resetable )
        {
            return true ;
        }
        return ( 'reset' in target ) && ( target.reset instanceof Function )  ;
    }
    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be reseted.
 * @name Resetable
 * @memberof system.process
 * @interface
 */
export function Resetable(){}

Resetable.prototype = Object.create( Object.prototype );
Resetable.prototype.constructor = Resetable;

/**
 * Resets the process.
 * @name reset
 * @memberof system.process.Resetable
 * @function
 * @instance
 */
Resetable.prototype.reset = function() {}