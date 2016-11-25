"use strict" ;

import { Task } from './Task.js' ;

/**
 * The <code>Timer</code> class is the interface to timers, which let you run code on a specified time sequence.
 * This timer object use an internal <code>setInterval</code> function to calls or evaluates an expression at specified intervals
 * @name Timer
 * @memberof system.process
 * @extends system.process.Task
 * @class
 * @constructor
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
 * var time = function( action )
 * {
 *     trace( action + " count: " + action.currentCount + " / " + action.repeatCount ) ;
 *     if ( action.currentCount === 5 )
 *     {
 *         action.stop() ;
 *         trace( "timer stopped:" + action.stopped ) ;
 *         action.resume() ;
 *     }
 * }
 *
 * var action = new system.process.Timer( 1000 , 10 ) ;
 * //var action = new system.process.Timer( 1 , 10 , true ) ; // use the useSeconds flag
 *
 * action.finishIt.connect( finish ) ;
 * action.progressIt.connect( time ) ;
 * action.resumeIt.connect( resume ) ;
 * action.startIt.connect( start ) ;
 * action.stopIt.connect( stop ) ;
 *
 * action.run() ;
 * @param {number} [delay=0] The delay in <strong>ms</strong> or in seconds if the <code>useSeconds</code> property is <code>true</code>. If this value is 0, the timer emit with the minimum delay possible.
 * @param {number} [repeatCount=0] Indicates the number or repeat of the timer, if the <code>repeatCount</code> value is > <code>0/<code>.
 * @param {boolean} [useSeconds=false] Specifies if the timer use a delay in seconds or not.
 */
export function Timer( delay =  0 , repeatCount = 0, useSeconds = false )
{
    Task.call(this) ;

    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _count : { value : 0 , writable : true },

        /**
         * @private
         */
        _delay : { value : delay > 0 ? delay : 0 , writable : true },

        /**
         * @private
         */
        _itv : { value : 0 , writable : true },

        /**
         * @private
         */
        _repeatCount : { value : repeatCount > 0 ? repeatCount : 0 , writable : true },

        /**
         * @private
         */
        _stopped : { value : false , writable : true },

        /**
         * @private
         */
        _useSeconds : { value : Boolean(useSeconds) , writable : true }
    }) ;
}

Timer.prototype = Object.create( Task.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Timer , writable : true } ,

    /**
     * The current count value if the timer use the <code>repeatCount</code> option.
     * @type {number}
     * @name currentCount
     * @memberof system.process.Timer
     * @instance
     * @readonly
     */
    currentCount : { get : function() { return this._count ; } } ,

    /**
     * Indicates the delay between timer events, in milliseconds (or seconds it the <code>useSeconds</code> is <code>true</code>).
     * @type {number}
     * @name delay
     * @memberof system.process.Timer
     * @instance
     */
    delay :
    {
        get : function () { return this._delay ; } ,
        set : function( value )
        {
            if ( this._running )
            {
                throw new Error( this + " the 'delay' property can't be changed during the running phase.") ;
            }
            this._delay = ( value > 0 ) ? value : 0 ;
        }
    },

    /**
     * Indicates the number of repetitions. If zero, the timer repeats infinitely.
     * If nonzero, the timer runs the specified number of times and then stops.
     * @type {boolean}
     * @name repeatCount
     * @memberof system.process.Timer
     * @instance
     */
    repeatCount :
    {
        get :function ()
        {
            return this._repeatCount ;
        },
        set : function( value )
        {
            this._repeatCount = (value > 0) ? value : 0 ;
        }
    },

    /**
     * Indicates true if the timer is stopped.
     * @type {boolean}
     * @name stopped
     * @memberof system.process.Timer
     * @instance
     * @readonly
     */
    stopped : { get : function () { return this._stopped ; } },

    /**
     * Indicates if the timer delaty is in seconds or in milliseconds (default milliseconds).
     * @type {boolean}
     * @name useSeconds
     * @memberof system.process.Timer
     * @instance
     */
    useSeconds :
    {
        get : function() { return this._useSeconds ; } ,
        set : function( flag /*Boolean*/ )
        {
            if ( this._running )
            {
                throw new Error( this + " the 'useSeconds' property can't be changed during the running phase.") ;
            }
            this._useSeconds = Boolean(flag) ;
        }
    },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Timer
     * @instance
     * @function
     */
    clone : { value : function()
    {
        return new Timer( this._delay , this._repeatCount ) ;
    }} ,

    /**
     * Restarts the timer. The timer is stopped, and then started.
     * @name resume
     * @memberof system.process.Timer
     * @instance
     * @function
     */
    resume : { value : function()
    {
        if ( this._stopped )
        {
            this._running = true ;
            this._stopped = false ;
            this._itv = setInterval
            (
                this._next.bind(this) ,
                this._useSeconds ? (this._delay*1000) : this._delay
            ) ;
            this.notifyResumed() ;
        }
    }},

    /**
     * Reset the timer and stop it before if it's running.
     * @name reset
     * @memberof system.process.Timer
     * @instance
     * @function
     */
    reset : { value : function()
    {
        if( this.running )
        {
            this.stop() ;
        }
        this._count = 0 ;
    }},

    /**
     * Run the timer.
     * @name run
     * @memberof system.process.Timer
     * @instance
     * @function
     */
    run : { value : function ()
    {
        if( !this._running )
        {
            this._count   = 0 ;
            this._stopped = false ;
            this.notifyStarted() ;
            this._itv = setInterval
            (
                this._next.bind(this) ,
                this._useSeconds ? (this._delay*1000) : this._delay
            ) ;
        }
    }},

    /**
     * Stops the timer.
     * @name stop
     * @memberof system.process.Timer
     * @instance
     * @function
     */
    stop : { value : function()
    {
        if ( this._running && !this._stopped )
        {
            this._running = false ;
            this._stopped = true ;
            clearInterval( this._itv ) ;
            this.notifyStopped() ;
        }
    }},

    /**
     * @private
     */
    _next : { value : function()
    {
        this._count ++ ;
        this.notifyProgress() ;
        if ( (this._repeatCount > 0) && (this._repeatCount === this._count) )
        {
            clearInterval( this._itv ) ;
            this.notifyFinished() ;
        }
    }}
});