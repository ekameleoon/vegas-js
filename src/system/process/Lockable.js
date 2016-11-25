"use strict" ;

/**
 * Indicates if the specific objet is Lockable.
 * @name isLockable
 * @memberof system.process
 * @function
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Lockable</code>.
 */
export function isLockable( target )
{
    if( target )
    {
        if( target instanceof Lockable )
        {
            return true ;
        }
        else
        {
            let isLocked = ( 'isLocked' in target ) && ( target.isLocked instanceof Function )  ;
            let lock     = ( 'lock'     in target ) && ( target.lock     instanceof Function )  ;
            let unlock   = ( 'unlock'   in target ) && ( target.unlock   instanceof Function )  ;
            return isLocked && lock && unlock ;
        }
    }

    return false ;
}

/**
 * This interface is implemented by all objects lockable.
 * @name Lockable
 * @memberof system.process
 * @interface
 */
export function Lockable()
{
    Object.defineProperties( this ,
    {
        /**
         * @protected
         */
        __lock__ : { value : false , writable : true }
    }) ;
}

Lockable.prototype = Object.create( Object.prototype );
Lockable.prototype.constructor = Lockable;

/**
 * Returns <code>true</code> if the object is locked.
 * @return <code>true</code> if the object is locked.
 * @name isLocked
 * @memberof system.process.Lockable
 * @function
 * @instance
 */
Lockable.prototype.isLocked = function() /*void*/
{
    return this.__lock__ ;
}

/**
 * Locks the object.
 * @name lock
 * @memberof system.process.Lockable
 * @function
 * @instance
 */
Lockable.prototype.lock = function() /*void*/
{
    this.__lock__ = true ;
}

/**
 * Unlocks the object.
 * @name unlock
 * @memberof system.process.Lockable
 * @function
 * @instance
 */
Lockable.prototype.unlock = function() /*void*/
{
    this.__lock__ = false ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @name toString
 * @memberof system.process.Lockable
 * @function
 * @instance
 */
Lockable.prototype.toString = function () /*String*/
{
    return '[' + this.constructor.name + ']' ;
}