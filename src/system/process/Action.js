"use strict" ;

import { Signal } from '../signals/Signal.js' ;

import { Runnable }  from './Runnable.js' ;
import { TaskPhase } from './TaskPhase.js' ;

/**
 * Creates a new Action instance.
 */
export function Action()
{
    Object.defineProperties( this ,
    {
        /**
         * This signal emit when the action is finished.
         */
        finishIt : { value : new Signal() },

        /**
         * Indicates the current phase.
         */
        phase : { get : function() { return this._phase ; } },

        /**
         * Indicates action is running.
         */
        running : { get : function() { return this._running ; } },

        /**
         * This signal emit when the action is started.
         */
        startIt : { value : new Signal() } ,

        __lock__ :
        {
            value        : false ,
            enumerable   : false ,
            writable    : true ,
            configurable : true
        },
        _phase :
        {
            value        : TaskPhase.INACTIVE ,
            enumerable   : false ,
            writable     : true ,
            configurable : true
        },
        _running :
        {
            value        : false ,
            enumerable   : false ,
            writable     : true ,
            configurable : true
        }
    }) ;
}

/**
 * @extends Runnable
 */
Action.prototype = Object.create( Runnable.prototype );
Action.prototype.constructor = Action;

/**
 * Creates a copy of the object.
 */
Action.prototype.clone = function()
{
    return new Action() ;
}

/**
 * Returns <code class="prettyprint">true</code> if the object is locked.
 * @return <code class="prettyprint">true</code> if the object is locked.
 */
Action.prototype.isLocked = function() /*Boolean*/
{
    return this.__lock__ ;
}

/**
 * Locks the object.
 */
Action.prototype.lock = function() /*void*/
{
    this.__lock__ = true ;
}

/**
 * Notify when the process is finished.
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
 */
Action.prototype.notifyStarted = function() /*void*/
{
    this._running = true ;
    this._phase  = TaskPhase.RUNNING ;
    this.startIt.emit( this ) ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Action.prototype.toString = function () /*String*/
{
    return '[Action]' ;
}

/**
 * Unlocks the object.
 */
Action.prototype.unlock = function() /*void*/
{
    this.__lock__ = false ;
}