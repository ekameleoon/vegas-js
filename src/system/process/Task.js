"use strict" ;

import { Signal } from '../signals/Signal.js' ;

import { Action }  from './Action.js' ;
import { TaskPhase } from './TaskPhase.js' ;

/**
 * A Task object to create a set of complex commands or actions.
 * @summary An abstract class to create a set of complex commands or actions.
 * @name Task
 * @class
 * @extends system.process.Action
 * @memberof system.process
 * @implements system.process.Lockable
 * @implements system.process.Resetable
 * @implements system.process.Startable
 * @implements system.process.Stoppable
 */
export function Task()
{
    Action.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * The signal emit when the task is changed.
         * @memberof system.process.Task
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        changeIt : { value : new Signal() },

        /**
         * The signal emit when the task is cleared.
         * @memberof system.process.Task
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        clearIt : { value : new Signal() },

        /**
         * The signal emit when the task emit a message.
         * @memberof system.process.Task
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        infoIt : { value : new Signal() },

        /**
         * The flag to determinate if the task must be looped.
         * @memberof system.process.Task
         * @type {boolean}
         * @instance
         * @default false
         */
        looping : { value : false  , writable : true } ,

        /**
         * The signal emit when the task is looped.
         * @memberof system.process.Task
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        loopIt : { value : new Signal() },

        /**
         * The signal emit when the task is paused.
         * @memberof system.process.Task
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        pauseIt : { value : new Signal() },

        /**
         * The signal emit when the task is in progress.
         * @memberof system.process.Task
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        progressIt : { value : new Signal() },

        /**
         * The signal emit when the task is resumed.
         * @memberof system.process.Task
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        resumeIt : { value : new Signal() },

        /**
         * This signal emit when the task is stopped.
         * @memberof system.process.Task
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        stopIt : { value : new Signal() },

        /**
         * The signal emit when the task is out of time.
         * @memberof system.process.Task
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        timeoutIt : { value : new Signal() }
    }) ;
}

Task.prototype = Object.create( Action.prototype ,
{
    constructor : { writable : true , value : Task },

    /**
     * Creates a copy of the object.
     * @name clone
     * @memberof system.process.Task
     * @function
     * @instance
     * @override
     */
    clone : { writable : true , value : function()
    {
        return new Task() ;
    }},

    /**
     * Notify when the process is changed.
     * @name notifyChanged
     * @memberof system.process.Task
     * @function
     * @instance
     */
    notifyChanged : { writable : true , value : function()
    {
        if ( !this.__lock__ )
        {
            this.changeIt.emit( this ) ;
        }
    }},

    /**
     * Notify when the process is cleared.
     * @name notifyCleared
     * @memberof system.process.Task
     * @function
     * @instance
     */
    notifyCleared : { writable : true , value : function()
    {
        if ( !this.__lock__ )
        {
            this.clearIt.emit( this ) ;
        }
    }},

    /**
     * Notify a specific information when the process is changed.
     * @name notifyInfo
     * @memberof system.process.Task
     * @function
     * @instance
     */
    notifyInfo : { writable : true , value : function( info )
    {
        if ( !this.__lock__ )
        {
            this.infoIt.emit( this , info ) ;
        }
    }},

    /**
     * Notify when the process is looped.
     * @name notifyLooped
     * @memberof system.process.Task
     * @function
     * @instance
     */
    notifyLooped : { writable : true , value : function()
    {
        this._phase = TaskPhase.RUNNING ;
        if ( !this.__lock__ )
        {
            this.loopIt.emit( this ) ;
        }
    }},

    /**
     * Notify when the process is paused.
     * @name notifyPaused
     * @memberof system.process.Task
     * @function
     * @instance
     */
    notifyPaused : { writable : true , value : function()
    {
        this._running = false ;
        this._phase = TaskPhase.STOPPED ;
        if ( !this.__lock__ )
        {
            this.pauseIt.emit( this ) ;
        }
    }},

    /**
     * Notify when the process is progress.
     * @name notifyProgress
     * @memberof system.process.Task
     * @function
     * @instance
     */
    notifyProgress : { writable : true , value : function()
    {
        if ( !this.__lock__ )
        {
            this.progressIt.emit( this ) ;
        }
    }},

    /**
     * Notify when the process is resumed.
     * @name notifyResumed
     * @memberof system.process.Task
     * @function
     * @instance
     */
    notifyResumed : { writable : true , value : function()
    {
        this._phase = TaskPhase.RUNNING ;
        if ( !this.__lock__ )
        {
            this.resumeIt.emit( this ) ;
        }
    }},

    /**
     * Notify when the process is stopped.
     * @name notifyStopped
     * @memberof system.process.Task
     * @function
     * @instance
     */
    notifyStopped : { writable : true , value : function()
    {
        this._running = false ;
        this._phase = TaskPhase.STOPPED ;
        if ( !this.__lock__ )
        {
            this.stopIt.emit( this ) ;
        }
    }},

    /**
     * Notify when the process is out of time.
     * @name notifyTimeout
     * @memberof system.process.Task
     * @function
     * @instance
     */
    notifyTimeout : { writable : true , value : function()
    {
        this._running = false ;
        this._phase = TaskPhase.TIMEOUT ;
        if ( !this.__lock__ )
        {
            this.timeoutIt.emit( this ) ;
        }
    }},

    /**
     * Resumes the task.
     * @name resume
     * @memberof system.process.Task
     * @function
     * @instance
     */
    resume : { writable : true , value : function() {} },

    /**
     * Resets the task.
     * @name reset
     * @memberof system.process.Task
     * @function
     * @instance
     */
    reset : { writable : true , value : function() {} },

    /**
     * Starts the task.
     * @name start
     * @memberof system.process.Task
     * @function
     * @instance
     */
    start : { writable : true , value : function()
    {
        this.run() ;
    }},

    /**
     * Starts the process.
     * @name stop
     * @memberof system.process.Task
     * @function
     * @instance
     */
    stop : { writable : true , value : function() {} }
});