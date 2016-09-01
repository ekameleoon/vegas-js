"use strict" ;

/**
 * This interface is implemented by all objects lockable.
 */
export function Lockable()
{

}

///////////////////

Lockable.prototype = Object.create( Object.prototype );
Lockable.prototype.constructor = Lockable;

///////////////////

/**
 * Returns <code>true</code> if the object is locked.
 * @return <code>true</code> if the object is locked.
 */
Lockable.prototype.isLocked = function() /*void*/
{
    return this.__lock__ ;
}

/**
 * Locks the object.
 */
Lockable.prototype.lock = function() /*void*/
{
    this.__lock__ = true ;
}

/**
 * Unlocks the object.
 */
Lockable.prototype.unlock = function() /*void*/
{
    this.__lock__ = false ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Lockable.prototype.toString = function () /*String*/
{
    return "[Lockable]" ;
}

/**
 * @private
 */
Lockable.prototype.__lock__ = false ;