"use strict"

//import { Event }  from './system/events/Event.js' ;
import { Signal } from './system/signals/Signal.js' ;

import { Material } from './Material.js' ;

/**
 * Creates a new Videosphere instance.
 * @name Videosphere
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.Material
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 *
 */
export function Videosphere( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * This signal emit when the task is finished.
         * @memberof molecule.render.aframe.display.Videosphere
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        finishIt : { value : new Signal() },

        /**
         * The signal emit when the task is looped.
         * @memberof molecule.render.aframe.display.Videosphere
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        loopIt : { value : new Signal() },

        /**
         * This signal emit when the task is started.
         * @memberof molecule.render.aframe.display.Videosphere
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        startIt : { value : new Signal() } ,

        /**
         * @private
         */
         _ended            : { writable : true , value : null } ,
         _loop             : { writable : true , value : false } ,
         _playing          : { writable : true , value : false } ,
         _requestPlay      : { writable : true , value : false } ,
         _running          : { writable : true , value : false } ,
         _video            : { writable : true , value : null }
    }) ;

    Material.call( this , init , 'a-videosphere' ) ;
}

Videosphere.prototype = Object.create( Material.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Videosphere , writable : true } ,

    /**
     * The autoplay of the element.
     * @name autoplay
     * @memberof molecule.render.aframe.display.Videosphere
     * @instance
     */
    autoplay :
    {
        get : function() { return this._requestPlay ; },
        set : function( value ) { this._requestPlay = Boolean(value) ; }
    },

    /**
     * The controls of the element.
     * @name controls
     * @memberof molecule.render.aframe.display.Videosphere
     * @instance
     */
    crossorigin :
    {
        get : function() { return this.getAttribute('crossOrigin') ; },
        set : function( value )
        {
            this.setAttribute( 'crossOrigin' , value ) ;
        }
    },

    /**
     * The loop of the element.
     * @name loop
     * @memberof molecule.render.aframe.display.Videosphere
     * @instance
     */
    loop :
    {
        get : function() { return this._loop ; },
        set : function( value ) { this._loop = Boolean(value) ; }
    },

    /**
     * The radius reference of the element.
     * @name radius
     * @memberof molecule.render.aframe.display.Videosphere
     * @instance
     */
    radius :
    {
        get : function() { return this.getAttribute( 'geometry' ).radius ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'radius' , value ) ; }
    },

    /**
     * The video reference.
     * @name video
     * @memberof molecule.render.aframe.display.Videosphere
     * @instance
     */
    video :
    {
        get : function() { return this._video ; } ,
        set : function( value )
        {
            this._video = value ;
            this.src = '#' + this._video.id ;
        }
    },

    /**
     * Indicates the current phase.
     * @memberof molecule.render.aframe.display.Videosphere
     * @type {string}
     * @see {@link system.process.TaskPhase}
     * @instance
     * @readonly
     */
    phase : { get : function() { return this._phase ; } },

    /**
     * Indicates action is running.
     * @memberof molecule.render.aframe.display.Videosphere
     * @type {boolean}
     * @instance
     * @readonly
     */
    running : { get : function() { return this._running ; } },

    /**
     * Notify when the process is finished.
     * @name notifyFinished
     * @memberof molecule.render.aframe.display.Videosphere
     * @function
     * @instance
     */
    notifyFinished : { writable : true , value : function()
    {
        this._running = false ;
        this.finishIt.emit( this ) ;
    }},

    /**
     * Notify when the process is looped.
     * @name notifyLooped
     * @memberof molecule.render.aframe.display.Videosphere
     * @function
     * @instance
     */
    notifyLooped : { writable : true , value : function()
    {
        this.loopIt.emit( this ) ;
    }},

    /**
     * Notify when the process is started.
     * @name notifyStarted
     * @memberof molecule.render.aframe.display.Videosphere
     * @function
     * @instance
     */
    notifyStarted : { writable : true , value : function()
    {
        this._running = true ;
        this.startIt.emit( this ) ;
    }},

    /**
     * Play the video.
     * @name play
     * @memberof molecule.render.aframe.display.Videosphere
     * @function
     * @instance
     */
    play : { value : function()
    {
        if( this._onStage === true && this._playing === false )
        {
            this._video._element.play();
            this._playing = true ;
            this.notifyStarted() ;
        }
        else
        {
            this._requestPlay = true ;
        }
    }},

    /**
     * Pause the video.
     * @name pause
     * @memberof molecule.render.aframe.display.Videosphere
     * @function
     * @instance
     */
    pause : { value : function()
    {
        if( this._onStage === true && this._playing === true )
        {
            this._video.element.pause();
            this._playing = false ;
        }
    }},

    /**
     * Stop the video.
     * @name pause
     * @memberof molecule.render.aframe.display.Videosphere
     * @function
     * @instance
     */
    stop : { value : function()
    {
        if( this._onStage === true && this._playing === true )
        {
            this._video._element.pause();
            this._playing = false ;
        }
    }},

    /**
     * @private
     * @name __addedToStage
     * @memberof molecule.render.aframe.display.Videosphere
     * @instance
     * @function
     */
    __addedToStage : { value : function()
    {
        this._onStage = true ;

        this._ended = this.ended.bind( this ) ;

        this._video.element.addEventListener( 'ended' , this._ended ) ;

        if( this._requestPlay === true )
        {
            this.play() ;
        }
    }},

    /**
     * @private
     * @name __removedFromStage
     * @memberof molecule.render.aframe.display.Videosphere
     * @instance
     * @function
     */
    __removedFromStage : { value : function()
    {
        if( this._playing === true )
        {
            this.stop() ;
        }
        this._onStage = false ;

        this._video.element.removeEventListener( 'ended' , this._ended ) ;
        this._ended = null ;
    }},

    /**
     * @private
     * @name ended
     * @memberof molecule.render.aframe.display.Videosphere
     * @instance
     * @function
     */
    ended : { value : function()
    {
        this._playing = false ;

        if( this._loop === true )
        {
            this.notifyLooped() ;
            this.play() ;
        }
        else
        {
            this.notifyFinished() ;
        }
    }}
}) ;
