"use strict" ;

import { Task } from './Task.js' ;
import { Signal } from '../signals/Signal.js' ;

/**
 * The Timer class is the interface to timers, which let you run code on a specified time sequence.
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
 * action.timerIt.connect( time ) ;
 * action.resumeIt.connect( resume ) ;
 * action.startIt.connect( start ) ;
 * action.stopIt.connect( stop ) ;
 *
 * action.run() ;
 * </pre>
 */
export function Timer( delay /*uint*/ , repeatCount /*uint*/ = 1 , useSeconds /*Boolean*/ = false )
{
    Task.call(this) ;

    Object.defineProperties( this ,
    {
        /**
         * This signal emit when the timer emit a new interval.
         */
        timerIt : { value : new Signal() },

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
        _useSeconds : { value : Boolean(useSeconds) , writable : true },
    }) ;
}

/**
 * @extends Task
 */
Timer.prototype = Object.create( Task.prototype ,
{
    /**
     * The total number of times the timer has fired since it started at zero.
     */
    currentCount : { get : function() { return this._count ; } } ,

    /**
     * Indicates the delay between timer events, in milliseconds.
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
     * Indicates the number of repetitions.
     * If zero, the timer repeats infinitely.
     * If nonzero, the timer runs the specified number of times and then stops.
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
     */
    stopped : { get : function () { return this._stopped ; } },

    /**
     * Indicates if the timer delaty is in seconds or in milliseconds (default milliseconds).
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
    }
});
Timer.prototype.constructor = Timer;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
Timer.prototype.clone = function() /*Timer*/
{
    return new Timer( this._delay , this._repeatCount ) ;
}

/**
 * Restarts the timer. The timer is stopped, and then started.
 */
Timer.prototype.resume = function() /*void*/
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
}

/**
 * Reset the timer and stop it before if it's running.
 */
Timer.prototype.reset = function() /*Void*/
{
    if( this.running )
    {
        this.stop() ;
    }
    this._count = 0 ;
}

/**
 * Run the timer.
 */
Timer.prototype.run = function ()
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
}

/**
 * Starts the timer.
 */
Timer.prototype.start = function()
{
    this.run() ;
}

/**
 * Stops the timer.
 */
Timer.prototype.stop = function()
{
    if ( this._running && !this._stopped )
    {
        this._running = false ;
        this._stopped = true ;
        clearInterval( this._itv ) ;
        this.notifyStopped() ;
    }
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Timer.prototype.toString = function () /*String*/
{
    return '[Timer]' ;
}

/**
 * @private
 */
Timer.prototype._next = function() /*void*/
{
    this._count ++ ;
    this.timerIt.emit( this ) ;
    if ( (this._repeatCount > 0) && (this._repeatCount === this._count) )
    {
        clearInterval( this._itv ) ;
        this.notifyFinished() ;
    }
}