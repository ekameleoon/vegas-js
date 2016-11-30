"use strict" ;

import { Task } from './Task.js' ;

import { cancelAnimationFrame }  from '../../core/cancelAnimationFrame.js' ;
import { requestAnimationFrame } from '../../core/requestAnimationFrame.js' ;

/**
 * A FrameTimer let you run code on a specified time sequence and use the <code>requestAnimationFrame</code> method.
 * @summary A FrameTimer let you run code on a specified time sequence and use the <code>requestAnimationFrame</code> method.
 * @name FrameTimer
 * @memberof system.process
 * @class
 * @extends system.process.Task
 * @see {@link https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame|requestAnimationFrame} for further information.
 * @example
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
 */
export function FrameTimer()
{
    Task.call(this) ;

    Object.defineProperties( this ,
    {
        /**
         * Scalar time value from last frame to this frame.
         * This value is capped by setting minFPS and is scaled with "speed".
         * @type {number}
         * @default 1
         * @name deltaTime
         * @memberof system.process.FrameTimer
         * @instance
         */
        deltaTime : { value : 1 , writable : true },

        /**
         * Time elapsed in milliseconds from last frame to this frame.
         * Opposed to what the scalar {@link FrameTimer#deltaTime}
         * is based, this value is neither capped nor scaled.
         * If the platform supports DOMHighResTimeStamp,
         * this value will have a precision of 1 µs.
         * @member {number}
         * @default 1 / FPMS
         * @name elapsedMS
         * @memberof system.process.FrameTimer
         * @instance
         */
        elapsedMS : { value : 1 / FPMS , writable : true } ,

        /**
         * The frames per second at which this timer is running.
         * The default is approximately 60 in most modern browsers.
         * **Note:** This does not factor in the value of {@link FrameTimer#speed}, which is specific to scaling {@link FrameTimer#deltaTime}.
         * @readonly
         * @name fps
         * @memberof system.process.FrameTimer
         * @instance
         */
        fps : { get : function()
        {
            return 1000 / this.elapsedMS;
        }},

        /**
         * Manages the maximum amount of milliseconds allowed to elapse between invoking {@link FrameTimer#next}.
         * This value is used to cap {@link FrameTimer#deltaTime}, but does not effect the measured value of {@link FrameTimer#fps}.
         * When setting this property it is clamped to a value between `0` and `FPMS * 1000`.
         * @type {number}
         * @name minFPS
         * @memberof system.process.FrameTimer
         * @instance
         */
        minFPS :
        {
            get : function()
            {
                return 1000 / this._maxElapsedMS ;
            },
            set : function(fps)
            {
                this._maxElapsedMS = 1 / Math.min(Math.max(0, fps) / 1000, FPMS);
            }
        },

        /**
         * The last time the next method was invoked.
         * This value is also reset internally outside of invoking update, but only when a new animation frame is requested.
         * If the platform supports DOMHighResTimeStamp, this value will have a precision of 1 µs.
         * @type {number}
         * @default 0
         * @name lastTime
         * @memberof system.process.FrameTimer
         * @instance
         */
        lastTime : { value : 0 , writable : true } ,

        /**
         * Factor of current deltaTime.
         * @type {number}
         * @default 1
         * @name speed
         * @memberof system.process.FrameTimer
         * @instance
         * @example <caption>Scales <code>deltaTime</code> to what would be the equivalent of approximately <strong>120 FPS</strong></caption>
         * var timer = new FrameTimer() ;
         * timer.speed = 2;
         */
        speed : { value : 1 , writable : true } ,

        /**
         * @private
         */
        _requestID : { value : null , writable : true },

        /**
         * Internal value managed by minFPS property setter and getter.
         * This is the maximum allowed milliseconds between updates.
         * @private
         */
        _maxElapsedMS : { value : 100 , writable : true } ,

        /**
         * @private
         */
        _stopped : { value : false , writable : true }
    }) ;
}

FrameTimer.prototype = Object.create( Task.prototype ,
{
    constructor : { value : FrameTimer , writable : true } ,

    /**
     * Indicates true if the timer is stopped.
     * @name stopped
     * @memberof system.process.FrameTimer
     * @instance
     * @readonly
     */
    stopped : { get : function () { return this._stopped ; } },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.FrameTimer
     * @instance
     * @function
     */
    clone : { value : function()
    {
        return new FrameTimer() ;
    }} ,

    /**
     * Restarts the timer. The timer is <code>stopped</code>, and then started.
     * @name resume
     * @memberof system.process.FrameTimer
     * @instance
     * @function
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
     * @name reset
     * @memberof system.process.FrameTimer
     * @instance
     * @function
     */
    reset : { value : function()
    {
        this.stop() ;
        this._stopped = false ;
    }},

    /**
     * Run the timer.
     * @name run
     * @memberof system.process.FrameTimer
     * @instance
     * @function
     */
    run : { value : function ()
    {
        if( !this._running )
        {
            this._stopped = false ;
            this.lastTime = performance.now();
            this.notifyStarted() ;
            this._requestID = requestAnimationFrame( this._next.bind(this) ) ;
        }
    }},

    /**
     * Stops the timer.
     * @name stop
     * @memberof system.process.FrameTimer
     * @instance
     * @function
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
     * @name toString
     * @memberof system.process.FrameTimer
     * @instance
     * @function
     * @return the string representation of this instance.
     */
    toString : { value : function ()
    {
        return '[FrameTimer]' ;
    }},

    /**
     * @private
     */
    _next : { value : function( time = performance.now() )
    {
        if( this._requestID !== null && (this._stopped || !this._running) )
        {
            cancelAnimationFrame( this._requestID ) ;
            this._requestID = null ;
            return ;
        }
        let elapsedMS;

        if ( time > this.lastTime )
        {
            elapsedMS = this.elapsedMS = time - this.lastTime ;

            if ( elapsedMS > this._maxElapsedMS )
            {
                elapsedMS = this._maxElapsedMS;
            }

            this.deltaTime = elapsedMS * FPMS * this.speed ;

            this.notifyProgress() ;
        }
        else
        {
            this.deltaTime = this.elapsedMS = 0;
        }

        this.lastTime = time ;

        this._requestID = requestAnimationFrame( this._next.bind(this) ) ;
    }}
});

/**
 * The target frames per millisecond used in the {@link system.process.FrameTimer} instances.
 * @name FPMS
 * @memberof system.process
 */
export var FPMS = 0.06 ;