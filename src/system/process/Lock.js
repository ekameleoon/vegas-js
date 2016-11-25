"use strict" ;

import { isLockable } from './Lockable.js' ;
import { Action } from './Action.js' ;

/**
 * Invoked to lock a specific {@link system.process.Lockable} object.
 * @summary Invoked to lock a specific {@link system.process.Lockable} object.
 * @name Lock
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @augments system.process.Action
 * @example
 * var chain = new system.process.Chain() ;
 * var lock  = new system.process.Lock( chain ) ;
 *
 * lock.run() ;
 *
 * trace( chain.isLocked() ) ;
 */
export function Lock( target )
{
    Action.call( this ) ;
    this.target = target ;
}

Lock.prototype = Object.create( Action.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { writable : true , value : Lock },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Lock
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Lock( this.target ) ;
    }},

    /**
     * Run the process.
     * @memberof system.process.Lock
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        if( isLockable( this.target ) && !this.target.isLocked() )
        {
            this.target.lock() ;
        }
        this.notifyFinished() ;
    }}
});