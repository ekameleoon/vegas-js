"use strict" ;

import { performance } from '../../polyfill/performance.js' ;

import { MotionNextFrame as NextFrame }  from './MotionNextFrame.js' ;
import { Transition }                    from './Transition.js' ;

import { FrameTimer } from '../process/FrameTimer.js' ;
import { Task }       from '../process/Task.js' ;
import { Timer }      from '../process/Timer.js' ;

/**
 * The abstract motion class.
 * @name Motion
 * @memberof system.transitions
 * @implements {system.transitions.Transition}
 * @class
 * @param {number} [id=null] The identfier of the object.
 */
export function Motion( id = null )
{
    Transition.call( this , id ) ;

    Object.defineProperties( this ,
    {
        /**
         * Defined if the Motion used seconds or not.
         * @memberof system.transitions.Motion
         * @default false
         * @type {boolean}
         * @instance
         */
        useSeconds : { writable : true , value : false },

        /**
         * @private
         */
        _duration : { writable : true , value : 0 },

        /**
         * @private
         */
        _fps : { writable : true , value : NaN } ,

        /**
         * @private
         */
        _nextFrame : { value : new NextFrame(this) },

        /**
         * @private
         */
        _prevTime : { writable : true , value : NaN },

        /**
         * @private
         */
        _startTime : { writable : true , value : NaN },

        /**
         * @private
         */
        _stopped : { writable : true , value : false },

        /**
         * @private
         */
        _target : { writable : true , value : null },

        /**
         * @private
         */
        _time : { writable : true , value : NaN },

        /**
         * @private
         */
        _timer : { writable : true , value : null }
    });

    this.setTimer( new FrameTimer() ) ;
}

Motion.prototype = Object.create( Transition.prototype ,
{
    // ------------- public properties

    /**
     * The constructor reference of the instance.
     */
    constructor : { value : Motion , writable : true } ,

    // ------------- get/set

    /**
     * Indicates the duration of the tweened animation in frames or seconds (default 0).
     * @memberof system.transitions.Motion
     * @default false
     * @type {number}
     * @instance
     */
    duration :
    {
        get : function()
        {
            return this._duration ;
        },
        set : function( value )
        {
            this._duration = (isNaN(value) || value <= 0 ) ? 0 : value ;
        }
    },

    /**
     * Indicates the number of frames per second of the tweened animation.
     * @memberof system.transitions.Motion
     * @default NaN
     * @type {number}
     * @instance
     */
    fps :
    {
        get : function()
        {
            return this._fps ;
        },
        set : function( value )
        {
            if ( this._timer && this._timer._running )
            {
                this._timer.stop() ;
            }
            this._fps = value > 0 ? value : NaN ;
            if ( isNaN(this._fps) )
            {
                this.setTimer( new FrameTimer() ) ;
            }
            else
            {
                this.setTimer( new Timer( 1000 / this._fps ) ) ;
            }
        }
    },

    /**
     * Indicates the internal previous time value.
     * @memberof system.transitions.Motion
     * @type {number}
     * @instance
     */
    prevTime :
    {
        get : function()
        {
            return this._prevTime ;
        }
    },

    /**
     * Indicates if the motion is stopped.
     * @memberof system.transitions.Motion
     * @default false
     * @type {boolean}
     * @instance
     */
    stopped :
    {
        get : function()
        {
            return this._stopped ;
        }
    },

    /**
     * Indicates the target reference of the object contrains by the Motion effect.
     * @memberof system.transitions.Motion
     * @type {Object}
     * @instance
     */
    target :
    {
        get : function()
        {
            return this._target ;
        },
        set : function( value )
        {
            this._target = value ;
        }
    },

    // ------------- public methods

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Motion( this.id ) ;
    }},

    /**
     * Forwards the tweened animation to the next frame.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    nextFrame : { value : function()
    {
        this.setTime( (this.useSeconds) ? ( ( performance.now() - this._startTime ) / 1000 ) : ( this._time + 1 ) ) ;
    }},

    /**
     * Directs the tweened animation to the frame previous to the current frame.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    prevFrame : { value : function()
    {
        if (!this.useSeconds)
        {
            this.setTime( this._time - 1 )  ;
        }
    }},

    /**
     * Resumes a tweened animation from its stopped point in the animation.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    resume : { writable : true , value : function()
    {
        if ( this._stopped && this._time !== this._duration )
        {
            this._stopped = false ;
            this.fixTime() ;
            this.startInterval() ;
            this.notifyResumed() ;
        }
        else
        {
            this.run() ;
        }
    }},

    /**
     * Rewinds a tweened animation to the beginning of the tweened animation.
     * @param {number} time - The time value to rewind the motion.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    rewind : { value : function( time = 0 )
    {
        this._time = time > 0 ? time : 0 ;
        this.fixTime() ;
        this.update() ;
    }} ,

    /**
     * Runs the object.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    run : { writable : true , value : function()
    {
        this._stopped = false ;
        this.notifyStarted() ;
        this.rewind() ;
        this.startInterval() ;
    }},

    /**
     * Sets the current time within the duration of the animation.
     * @param {number} time - The time value to rewind the motion.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    setTime : { value : function( time )
    {
        this._prevTime = this._time ;
        if (time > this._duration)
        {
            time = this._duration ;
            if ( this.looping )
            {
                this.rewind( time - this._duration );
                this.notifyLooped() ;
            }
            else
            {
                if ( this.useSeconds )
                {
                    this._time = this._duration ;
                    this.update() ;
                }
                this.stop() ;
                this.notifyFinished() ;
            }
        }
        else if ( time < 0 )
        {
            this.rewind() ;
        }
        else
        {
            this._time = time ;
            this.update() ;
        }
    }},

    /**
     * Starts the internal interval of the tweened animation.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    startInterval : { value : function()
    {
        this._timer.start() ;
        this._running = true ;
    }},

    /**
     * Stops the tweened animation at its current position.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    stop : { value : function()
    {
        if( this._running )
        {
            this.stopInterval() ;
            this._stopped = true ;
            this.notifyStopped() ;
        }
    }},

    /**
     * Stops the intenral interval of the tweened animation.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     */
    stopInterval : { value : function()
    {
        this._timer.stop() ;
        this._running = false ;
    }},

    /**
     * Update the current object.
     * @memberof system.transitions.Motion
     * @instance
     * @function
     * @abstract
     */
    update : { writable : true , value : function()
    {
        //
    }} ,

    // ------------- private

    /**
     * @protected
     */
    fixTime : { value : function()
    {
        if ( this.useSeconds )
        {
            this._startTime = performance.now() - ( this._time * 1000 ) ;
        }
    }},

    /**
     * Sets the internal timer of the tweened animation.
     * @protected
     */
    setTimer : { value : function( value )
    {
        if ( this._timer )
        {
            if( this._timer instanceof Task )
            {
                if( this._timer._running )
                {
                    this._timer.stop();
                }
                this._timer.progressIt.disconnect( this._nextFrame ) ;
            }
            this._timer = null ;
        }

        this._timer = (value instanceof Task) ? value : new Timer() ;

        if( this._timer )
        {
            this._timer.progressIt.connect( this._nextFrame ) ;
        }
    }}
});

