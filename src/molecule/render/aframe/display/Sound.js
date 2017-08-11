"use strict"

import { Signal } from './system/signals/Signal.js' ;

import { AEntity } from './AEntity.js' ;

/**
 * Creates a new Sound instance.
 * @name Sound
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.Sound
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 */
export function Sound( init = null )
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
         _ended       : { writable : true , value : null  } ,
         _playing     : { writable : true , value : false } ,
         _requestPlay : { writable : true , value : false } ,
         _running     : { writable : true , value : false }
    }) ;

    AEntity.call( this , init , 'a-sound' ) ;
}

Sound.prototype = Object.create( AEntity.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Sound , writable : true } ,

    /**
     * The autoplay of the element.
     * @name autoplay
     * @memberof molecule.render.aframe.display.Sound
     * @instance
     */
    autoplay :
    {
        get : function() { return this._requestPlay ; },
        set : function( value ) { this._requestPlay = (value === true) ; }
    },

    /**
     * The loop of the element.
     * @name loop
     * @memberof molecule.render.aframe.display.Sound
     * @instance
     */
    loop :
    {
        get : function() { return this.getAttribute( 'sound' ).loop ; },
        set : function( value ) { this.setAttribute( 'sound' , 'loop' , value ) ; }
    },

    /**
     * Indicates the current phase.
     * @memberof molecule.render.aframe.display.Sound
     * @type {string}
     * @see {@link system.process.TaskPhase}
     * @instance
     * @readonly
     */
    phase : { get : function() { return this._phase ; } },

    /**
     * Indicates action is running.
     * @memberof molecule.render.aframe.display.Sound
     * @type {boolean}
     * @instance
     * @readonly
     */
    running : { get : function() { return this._running ; } },

    /**
     * Notify when the process is finished.
     * @name notifyFinished
     * @memberof molecule.render.aframe.display.Sound
     * @function
     * @instance
     */
    notifyFinished : { writable : true , value : function()
    {
        this._running = false ;
        this.finishIt.emit( this ) ;
    }},

    /**
     * Notify when the process is started.
     * @name notifyStarted
     * @memberof molecule.render.aframe.display.Sound
     * @function
     * @instance
     */
    notifyStarted : { writable : true , value : function()
    {
        this._running = true ;
        this.startIt.emit( this ) ;
    }},

    /**
     * Play the sound.
     * @name play
     * @memberof molecule.render.aframe.display.Sound
     * @function
     * @instance
     */
    play : { value : function()
    {
        if( this._onStage === true && this._playing === false )
        {
            setTimeout( this.__playSound.bind( this ) , 100 );
        }
        else
        {
            this._requestPlay = true ;
        }
    }},

    /**
     * Pause the sound.
     * @name pause
     * @memberof molecule.render.aframe.display.Sound
     * @function
     * @instance
     */
    pause : { value : function()
    {
        if( this._onStage === true && this._playing === true )
        {
            this._element.components.sound.pauseSound();
            this._playing = false ;
        }
    }},

    /**
     * Stop the sound.
     * @name stop
     * @memberof molecule.render.aframe.display.Sound
     * @function
     * @instance
     */
    stop : { value : function()
    {
        if( this._onStage === true && this._playing === true )
        {
            if( this._ended )
            {
                this._element.removeEventListener( 'sound-ended' , this._ended ) ;
                this._ended = false ;
            }
            this._element.components.sound.stopSound();
            this._playing = false ;
        }
    }},

    /**
     * The src of the element.
     * @name src
     * @memberof molecule.render.aframe.display.Sound
     * @instance
     */
    src :
    {
        get : function() { return this.getAttribute( 'sound' ).src ; },
        set : function( value ) { this.setAttribute( 'sound' , 'src' , value ) ; }
    },

    /**
     * The volume of the element.
     * @name volume
     * @memberof molecule.render.aframe.display.Sound
     * @instance
     */
    volume :
    {
        get : function() { return this.getAttribute( 'sound' ).volume ; },
        set : function( value ) { this.setAttribute( 'sound' , 'volume' , value ) ; }
    },

    /**
     * @private
     * @name __addedToStage
     * @memberof molecule.render.aframe.display.Sound
     * @instance
     * @function
     */
    __addedToStage : { value : function()
    {
        this._onStage = true ;

        if( this._requestPlay === true )
        {
            this._requestPlay = false ;
            this.play() ;
        }
    }},

    /**
     * @name __playSound
     * @memberof molecule.render.aframe.display.Sound
     * @function
     * @instance
     * @private
     */
    __playSound : { value : function()
    {
        if( this._onStage === true && this._playing === false )
        {
            this._playing = true ;
            this.notifyStarted() ;
            this._ended = this.__ended.bind( this ) ;
            this._element.addEventListener( 'sound-ended' , this._ended ) ;
            this._element.components.sound.playSound();
        }
    }},

    /**
     * @private
     * @name __removedFromStage
     * @memberof molecule.render.aframe.display.Sound
     * @instance
     * @function
     */
    __removedFromStage : { value : function()
    {
        this._onStage = false ;
        if( this._ended )
        {
            this._element.removeEventListener( 'sound-ended' , this._ended ) ;
            this._ended = false ;
        }
        if( this._playing === true )
        {
            this.stop() ;
        }
    }},

    /**
     * @private
     * @name ended
     * @memberof molecule.render.aframe.display.Sound
     * @instance
     * @function
     */
    __ended : { value : function()
    {
        this._playing = false ;
        this._element.removeEventListener( 'sound-ended' , this._ended ) ;
        this._ended = null ;
        this.notifyFinished() ;
    }}
}) ;
