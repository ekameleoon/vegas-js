"use strict" ;

import { Signal } from '../signals/Signal.js' ;

import { Runnable }  from './Runnable.js' ;
import { TaskPhase } from './TaskPhase.js' ;

/**
 * This abstract class represents the basic definition implemented in the Action objects.
 * @summary This abstract class represents the basic definition implemented in the Action objects.
 * @name Action
 * @class
 * @memberof system.process
 * @augments system.process.Runnable
 * @implements system.process.Runnable
 * @implements system.process.Lockable
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
         * @private
         */
        _phase : { writable : true , value : TaskPhase.INACTIVE },

        /**
         * @private
         */
        _running : { writable : true , value : false }
    }) ;
}

Action.prototype = Object.create( Runnable.prototype ,
{
    constructor : { writable : true , value : Action } ,

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
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Action
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Action() ;
    }},

    /**
     * Returns <code>true</code> if the object is locked.
     * @return <code>true</code> if the object is locked.
     * @name isLocked
     * @memberof system.process.Action
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
     * @memberof system.process.Action
     * @function
     * @instance
     */
    lock : { writable : true , value : function()
    {
        this.__lock__ = true ;
    }},

    /**
     * Notify when the process is finished.
     * @name notifyFinished
     * @memberof system.process.Action
     * @function
     * @instance
     */
    notifyFinished : { writable : true , value : function()
    {
        this._running = false ;
        this._phase = TaskPhase.FINISHED ;
        this.finishIt.emit( this ) ;
        this._phase = TaskPhase.INACTIVE ;
    }},

    /**
     * Notify when the process is started.
     * @name notifyStarted
     * @memberof system.process.Action
     * @function
     * @instance
     */
    notifyStarted : { writable : true , value : function()
    {
        this._running = true ;
        this._phase  = TaskPhase.RUNNING ;
        this.startIt.emit( this ) ;
    }},

    /**
     * Unlocks the object.
     * @name unlock
     * @memberof system.process.Action
     * @function
     * @instance
     */
    unlock : { writable : true , value : function()
    {
        this.__lock__ = false ;
    }}
});
