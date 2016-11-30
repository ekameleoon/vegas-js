"use strict" ;

/**
 * Indicates if the specific objet is {@link system.process.Lockable|Lockable} or contains the <code>lock()</code> / <code>unlock()</code> / <code>isLocked()</code> methods.
 * @name isLockable
 * @memberof system.process
 * @function
 * @instance
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.process.Lockable|Lockable}.
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
            /*jshint -W069 */
            return Boolean( target['isLocked'] ) && ( target.isLocked instanceof Function ) &&
                   Boolean( target['lock'] )     && ( target.lock     instanceof Function ) &&
                   Boolean( target['unlock'] )   && ( target.unlock   instanceof Function ) ;
            /*jshint +W069 */
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
        __lock__ : { writable : true  , value : false }
    }) ;
}

Lockable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Lockable } ,

    /**
     * Returns <code>true</code> if the object is locked.
     * @return <code>true</code> if the object is locked.
     * @name isLocked
     * @memberof system.process.Lockable
     * @function
     * @instance
     */
    isLocked : { writable : true , value : function()
    {
        return this.__lock__ ;
    }},

    /**
     * Locks the object.
     * @name lock
     * @memberof system.process.Lockable
     * @function
     * @instance
     */
    lock : { writable : true , value : function()
    {
        this.__lock__ = true ;
    }},

    /**
     * Unlocks the object.
     * @name unlock
     * @memberof system.process.Lockable
     * @function
     * @instance
     */
    unlock : { writable : true , value : function()
    {
        this.__lock__ = false ;
    }},

    /**
     * The <code>toString()</code> method returns a string representing the object
     * @return A string representing the object.
     * @memberof system.transitions.Transition
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});