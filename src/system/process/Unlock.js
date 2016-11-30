"use strict" ;

import { isLockable } from './Lockable.js' ;
import { Action } from './Action.js' ;

/**
 * Invoked this action to unlock a specific {@link system.process.Lockable|Lockable} object.
 * @summary Invoked to unlock a specific {@link system.process.Lockable|Lockable} object.
 * @name Unlock
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @augments system.process.Action
 * @example
 * var chain  = new system.process.Chain() ;
 * var unlock = new system.process.Unlock( chain ) ;
 *
 * chain.lock() ;
 *
 * unlock.run() ;
 *
 * trace( chain.isLocked() ) ;
 */
export function Unlock( target )
{
    Action.call( this ) ;
    this.target = target ;
}

Unlock.prototype = Object.create( Action.prototype ,
{
    constructor : { writable : true , value : Unlock },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Unlock
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Unlock( this.target ) ;
    }},

    /**
     * Run the process.
     * @name run
     * @memberof system.process.Unlock
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        if( isLockable( this.target ) && this.target.isLocked() )
        {
            this.target.unlock() ;
        }
        this.notifyFinished() ;
    }}
});
