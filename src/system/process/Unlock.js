"use strict" ;

import { isLockable } from './Lockable.js' ;
import { Action } from './Action.js' ;

/**
 * Invoked to Unlock a specific Unlockable object.
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

/**
 * @extends Task
 */
Unlock.prototype = Object.create( Action.prototype );
Unlock.prototype.constructor = Unlock ;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
Unlock.prototype.clone = function()
{
    return new Unlock( this.target ) ;
}


/**
 * Run the process.
 */
Unlock.prototype.run = function() /*void*/
{
    this.notifyStarted() ;
    if( isLockable( this.target ) && this.target.isLocked() )
    {
        this.target.unlock() ;
    }
    this.notifyFinished() ;
}

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
Unlock.prototype.toString = function() /*String*/
{
    return '[Unlock]' ;
}