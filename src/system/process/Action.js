"use strict" ;

import { Signal } from '../signals/Signal.js' ;

import { Runnable }  from './Runnable.js' ;
import { TaskPhase } from './TaskPhase.js' ;

/**
 * Creates a new Action instance.
 * @name Action
 * @memberof system.process
 * @augments system.process.Runnable
 * @class
 * @implements system.process.Runnable
 * @implements system.process.Lockable
 * @constructor
 */
export function Action()
{
    Object.defineProperties( this ,
    {
        /**
         * This signal emit when the action is finished.
         * @memberof system.process.Action
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        finishIt : { value : new Signal() },

        /**
         * Indicates the current phase.
         * @memberof system.process.Action
         * @type {string}
         * @see {@link system.process.TaskPhase}
         * @instance
         * @readonly
         */
        phase : { get : function() { return this._phase ; } },

        /**
         * Indicates action is running.
         * @memberof system.process.Action
         * @type {boolean}
         * @instance
         * @readonly
         */
        running : { get : function() { return this._running ; } },

        /**
         * This signal emit when the action is started.
         * @memberof system.process.Action
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        startIt : { value : new Signal() } ,

        /**
         * @private
         */
        __lock__ : { writable : true  , value : false },

        /**
         * @protected
         */
        _phase : { writable : true , value : TaskPhase.INACTIVE },

        /**
         * @protected
         */
        _running : { writable : true , value : false }
    }) ;
}

Action.prototype = Object.create( Runnable.prototype );
Action.prototype.constructor = Action;

/**
 * Creates a copy of the object.
 * @name clone
 * @memberof system.process.Action
 * @function
 * @instance
 */
Action.prototype.clone = function()
{
    return new Action() ;
}

/**
 * Returns <code class="prettyprint">true</code> if the object is locked.
 * @return <code class="prettyprint">true</code> if the object is locked.
 * @name isLocked
 * @memberof system.process.Action
 * @function
 * @instance
 */
Action.prototype.isLocked = function() /*Boolean*/
{
    return this.__lock__ ;
}

/**
 * Locks the object.
 * @name lock
 * @memberof system.process.Action
 * @function
 * @instance
 */
Action.prototype.lock = function() /*void*/
{
    this.__lock__ = true ;
}

/**
 * Notify when the process is finished.
 * @name notifyFinished
 * @memberof system.process.Action
 * @function
 * @instance
 */
Action.prototype.notifyFinished = function() /*Boolean*/
{
    this._running = false ;
    this._phase = TaskPhase.FINISHED ;
    this.finishIt.emit( this ) ;
    this._phase = TaskPhase.INACTIVE ;
}

/**
 * Notify when the process is started.
 * @name notifyStarted
 * @memberof system.process.Action
 * @function
 * @instance
 */
Action.prototype.notifyStarted = function() /*void*/
{
    this._running = true ;
    this._phase  = TaskPhase.RUNNING ;
    this.startIt.emit( this ) ;
}

/**
 * Unlocks the object.
 * @name unlock
 * @memberof system.process.Action
 * @function
 * @instance
 */
Action.prototype.unlock = function() /*void*/
{
    this.__lock__ = false ;
}