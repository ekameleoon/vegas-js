"use strict" ;

/**
 * Indicates if the specific objet is {@link system.process.Resumable|Resumable} and contains a <code>resume()</code> method.
 * @name isResumable
 * @function
 * @instance
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.process.Resumable|Resumable}.
 */
export function isResumable( target )
{
    if( target )
    {
        if( target instanceof Resumable )
        {
            return true ;
        }
        return ( 'resume' in target ) && ( target.resume instanceof Function )  ;
    }
    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be resumed.
 * @name Resumable
 * @memberof system.process
 * @interface
 */
export function Resumable() {}

Resumable.prototype = Object.create( Object.prototype );
Resumable.prototype.constructor = Resumable;

/**
 * Resumes the process.
 * @name resume
 * @memberof system.process.Resumable
 * @function
 * @instance
 */
Resumable.prototype.resume = function() {}