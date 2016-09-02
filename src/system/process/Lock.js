"use strict" ;

import { isLockable } from './Lockable.js' ;
import { Action } from './Action.js' ;

/**
 * Invoked to lock a specific Lockable object.
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

/**
 * @extends Task
 */
Lock.prototype = Object.create( Action.prototype );
Lock.prototype.constructor = Lock ;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
Lock.prototype.clone = function()
{
    return new Lock( this.target ) ;
}

/**
 * Indicates if the specific objet is Lockable.
 */
Lock.prototype.isLockable = function( target )
{
    target = target || this.target ;

    if( target )
    {
        let isLocked = ( 'isLocked' in target ) && ( target.isLocked instanceof Function )  ;
        let lock     = ( 'lock'     in target ) && ( target.lock     instanceof Function )  ;
        let unlock   = ( 'unlock'   in target ) && ( target.unlock   instanceof Function )  ;
        return isLocked && lock && unlock ;
    }

    return false ;
}

/**
 * Run the process.
 */
Lock.prototype.run = function() /*void*/
{
    this.notifyStarted() ;
    if( isLockable( this.target ) && !this.target.isLocked() )
    {
        this.target.lock() ;
    }
    this.notifyFinished() ;
}

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
Lock.prototype.toString = function() /*String*/
{
    return '[Lock]' ;
}