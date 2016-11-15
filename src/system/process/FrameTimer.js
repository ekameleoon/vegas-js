"use strict" ;

import { Task } from './Task.js' ;

import { cancelAnimationFrame }  from '../../core/cancelAnimationFrame.js' ;
import { requestAnimationFrame } from '../../core/requestAnimationFrame.js' ;

/**
 * The FrameTimer class is the interface to timers, which let you run code on a specified time sequence and use the requestAnimationFrame method.
 * @example
 * <pre>
 * var finish = function( action )
 * {
 *     trace( action + " finish" ) ;
 * }
 *
 * var resume = function( action )
 * {
 *     trace( action + " resume" ) ;
 * }
 *
 * var start = function( action )
 * {
 *     trace( action + " start" ) ;
 * }
 *
 * var stop = function( action )
 * {
 *     trace( action + " stop" ) ;
 * }
 *
 * var progress = function( action )
 * {
 *     trace( action + " progress" ) ;
 *     if( count++ === 100 )
 *     {
 *         action.stop() ;
 *     }
 * }
 *
 * var count  = 0 ;
 * var action = new system.process.FrameTimer() ;
 *
 * action.finishIt.connect( finish ) ;
 * action.progressIt.connect( progress ) ;
 * action.resumeIt.connect( resume ) ;
 * action.startIt.connect( start ) ;
 * action.stopIt.connect( stop ) ;
 *
 * action.run() ;
 * </pre>
 */
export function FrameTimer()
{
    Task.call(this) ;

    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _requestID : { value : null , writable : true },

        /**
         * @private
         */
        _stopped : { value : false , writable : true }
    }) ;
}

/**
 * @extends Task
 */
FrameTimer.prototype = Object.create( Task.prototype ,
{
    /**
     * Indicates the reference to the Object function that created the instance's prototype.
     */
    constructor : { value : FrameTimer , writable : true } ,

    /**
     * Indicates true if the timer is stopped.
     */
    stopped : { get : function () { return this._stopped ; } },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     */
    clone : { value : function()
    {
        return new FrameTimer() ;
    }} ,

    /**
     * Restarts the timer. The timer is stopped, and then started.
     */
    resume : { value : function()
    {
        if ( this._stopped )
        {
            this._running = true ;
            this._stopped = false ;
            this.notifyResumed() ;
            this._requestID = requestAnimationFrame( this._next.bind(this) ) ;
        }
    }},

    /**
     * Reset the timer and stop it before if it's running.
     */
    reset : { value : function()
    {
        this.stop() ;
        this._stopped = false ;
    }},

    /**
     * Run the timer.
     */
    run : { value : function ()
    {
        if( !this._running )
        {
            this._stopped = false ;
            this.notifyStarted() ;
            this._requestID = requestAnimationFrame( this._next.bind(this) ) ;
        }
    }},

    /**
     * Stops the timer.
     */
    stop : { value : function()
    {
        if ( this._running && !this._stopped )
        {
            this._running = false ;
            this._stopped = true ;
            cancelAnimationFrame( this._requestID ) ;
            this._requestID = null ;
            this.notifyStopped() ;
        }
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function ()
    {
        return '[FrameTimer]' ;
    }},

    /**
     * @private
     */
    _next : { value : function()
    {
        if( this._stopped || !this._running )
        {
            cancelAnimationFrame( this._requestID ) ;
            this._requestID = null ;
            return ;
        }
        this.notifyProgress() ;
        this._requestID = requestAnimationFrame( this._next.bind(this) ) ;
    }}
});