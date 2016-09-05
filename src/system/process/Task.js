"use strict" ;

import { Signal } from '../signals/Signal.js' ;

import { Action }  from './Action.js' ;
import { TaskPhase } from './TaskPhase.js' ;

/**
 * A Task object to create a set of complex commands or actions.
 */
export function Task()
{
    Action.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The signal emit when the task is changed.
         */
        changeIt : { value : new Signal() },

        /**
         * The signal emit when the task is cleared.
         */
        clearIt : { value : new Signal() },

        /**
         * The signal emit when the task emit a message.
         */
        infoIt : { value : new Signal() },

        /**
         * The flag to determinate if the task must be looped.
         */
        looping : { value : false  , enumerable : false , configurable : false , writable : true } ,

        /**
         * The signal emit when the task is looped.
         */
        loopIt : { value : new Signal() },

        /**
         * The signal emit when the task is paused.
         */
        pauseIt : { value : new Signal() },

        /**
         * The signal emit when the task is in progress.
         */
        progressIt : { value : new Signal() },

        /**
         * The signal emit when the task is resumed.
         */
        resumeIt : { value : new Signal() },

        /**
         * This signal emit when the task is stopped.
         */
        stopIt : { value : new Signal() },

        /**
         * The signal emit when the task is out of time.
         */
        timeoutIt : { value : new Signal() }
    }) ;
}

/**
 * @extends Task
 */
Task.prototype = Object.create( Action.prototype );

Task.prototype.constructor = Task;

/**
 * Creates a copy of the object.
 */
Task.prototype.clone = function()
{
    return new Task() ;
}

/**
 * Notify when the process is changed.
 */
Task.prototype.notifyChanged = function() /*void*/
{
    if ( !this.__lock__ )
    {
        this.changeIt.emit( this ) ;
    }
}

/**
 * Notify when the process is cleared.
 */
Task.prototype.notifyCleared = function() /*void*/
{
    if ( !this.__lock__ )
    {
        this.clearIt.emit( this ) ;
    }
}

/**
 * Notify a specific information when the process is changed.
 */
Task.prototype.notifyInfo = function( info ) /*void*/
{
    if ( !this.__lock__ )
    {
        this.infoIt.emit( this , info ) ;
    }
}

/**
 * Notify when the process is looped.
 */
Task.prototype.notifyLooped = function() /*void*/
{
    this._phase = TaskPhase.RUNNING ;
    if ( !this.__lock__ )
    {
        this.loopIt.emit( this ) ;
    }
}

/**
 * Notify when the process is paused.
 */
Task.prototype.notifyPaused = function() /*void*/
{
    this._running = false ;
    this._phase = TaskPhase.STOPPED ;
    if ( !this.__lock__ )
    {
        this.pauseIt.emit( this ) ;
    }
}

/**
 * Notify when the process is progress.
 */
Task.prototype.notifyProgress = function() /*void*/
{
    if ( !this.__lock__ )
    {
        this.progressIt.emit( this ) ;
    }
}

/**
 * Notify when the process is resumed.
 */
Task.prototype.notifyResumed = function() /*void*/
{
    this._phase = TaskPhase.RUNNING ;
    if ( !this.__lock__ )
    {
        this.resumeIt.emit( this ) ;
    }
}

/**
 * Notify when the process is stopped.
 */
Task.prototype.notifyStopped = function() /*void*/
{
    this._running = false ;
    this._phase = TaskPhase.STOPPED ;
    if ( !this.__lock__ )
    {
        this.stopIt.emit( this ) ;
    }
}

/**
 * Notify when the process is out of time.
 */
Task.prototype.notifyTimeout = function() /*void*/
{
    this._running = false ;
    this._phase = TaskPhase.TIMEOUT ;
    if ( !this.__lock__ )
    {
        this.timeoutIt.emit( this ) ;
    }
}

/**
 * Resumes the task.
 */
Task.prototype.resume = function() /*void*/
{
    //
}

/**
 * Resets the task.
 */
Task.prototype.reset = function() /*void*/
{
    //
}

/**
 * Starts the task.
 */
Task.prototype.start = function() /*void*/
{
    //
}

/**
 * Starts the process.
 */
Task.prototype.stop = function() /*void*/
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Task.prototype.toString = function () /*String*/
{
    return '[Task]' ;
}