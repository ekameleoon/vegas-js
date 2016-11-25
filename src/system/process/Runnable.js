"use strict" ;

/**
 * Indicates if the specific objet is Runnable.
 * @name isRunnable
 * @function
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Runnable</code>.
 */
export function isRunnable( target )
{
    if( target )
    {
        if( target instanceof Runnable )
        {
            return true ;
        }
        return ( 'run' in target ) && ( target.run instanceof Function )  ;
    }

    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be executed.
 * @name Runnable
 * @memberof system.process
 * @interface
 */
export function Runnable()
{

}

Runnable.prototype = Object.create( Object.prototype );
Runnable.prototype.constructor = Runnable;

/**
 * Run the process.
 * @name run
 * @memberof system.process.Runnable
 * @function
 * @instance
 */
Runnable.prototype.run = function() /*void*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @name toString
 * @memberof system.process.Runnable
 * @function
 * @instance
 * @return the string representation of this instance.
 */
Runnable.prototype.toString = function ()
{
    return '[' + this.constructor.name + ']' ;
}