"use strict" ;

import { performance } from '../../polyfill/performance.js' ;

import { MotionNextFrame as NextFrame }  from './MotionNextFrame.js' ;
import { Transition }  from './Transition.js' ;

import { FrameTimer } from '../../system/process/FrameTimer.js' ;
import { Task }       from '../../system/process/Task.js' ;
import { Timer }      from '../../system/process/Timer.js' ;

/**
 * The Motion class.
 */
export function Motion( id = null )
{
    Transition.call( this , id ) ;

    Object.defineProperties( this ,
    {
        /**
         * Defined if the Motion used seconds or not.
         */
        useSeconds : { writable : true , value : false },

        /**
         * @private
         */
        _duration : { writable : true , value : 0 },

        /**
         * @private
         */
        _fps : { writable : true , value : 24 } ,

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

    this.setTimer( new Timer( 1000 / this._fps ) ) ;
}

/**
 * @extends Transition
 */
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
     */
    clone : { writable : true , value : function()
    {
        return new Motion( this.id ) ;
    }},

    /**
     * Forwards the tweened animation to the next frame.
     */
    nextFrame : { value : function()
    {
        this.setTime( (this.useSeconds) ? ( ( performance.now() - this._startTime ) / 1000 ) : ( this._time + 1 ) ) ;
    }},

    /**
     * Directs the tweened animation to the frame previous to the current frame.
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
     */
    rewind : { value : function( t = 0 )
    {
        this._time = t > 0 ? t : 0 ;
        this.fixTime() ;
        this.update() ;
    }} ,

    /**
     * Runs the object.
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
     */
    setTime : { value : function( t )
    {
        this._prevTime = this._time ;
        if (t > this._duration)
        {
            t = this._duration ;
            if ( this.looping )
            {
                this.rewind (t - this._duration);
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
        else if ( t < 0 )
        {
            this.rewind() ;
        }
        else
        {
            this._time = t ;
            this.update() ;
        }
    }},

    /**
     * Starts the internal interval of the tweened animation.
     */
    startInterval : { value : function()
    {
        this._timer.start() ;
        this._running = true ;
    }},

    /**
     * Stops the tweened animation at its current position.
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
     */
    stopInterval : { value : function()
    {
        this._timer.stop() ;
        this._running = false ;
    }},

    /**
      * Update the current object.
      */
    update : { writable : true , value : function()
    {
        //
    }} ,

    // ------------- private

    /**
     * @private
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

