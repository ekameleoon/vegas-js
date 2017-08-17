/* jshint -W086 */
"use strict" ;

import { Signal }            from './system/signals/Signal.js' ;
import { StageAspectRatio }  from './graphics/display/StageAspectRatio.js' ;
import { StageDisplayState } from './graphics/display/StageDisplayState.js' ;
import { StageOrientation }  from './graphics/display/StageOrientation.js' ;

import { Node } from './Node.js' ;

/**
 * Creates a new Stage instance.
 * @name Stage
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 * @class
 * @param {Object} [init] - The optional generic object to populates and initialize the current Stage.
 * @param {String|HTMLElement} [tag=null] - The name of the tag to create when the new entity is created or an HTMLElement reference.
 */
export function Stage( init = null , tag = null )
{
    Node.call( this , init , tag ) ;
    Object.defineProperties( this ,
    {
        /**
         * This signal emit when stage is activated.
         * @name activated
         * @memberof molecule.render.dom.display.Stage
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        activated : { value : new Signal() },

        /**
         * This signal emit when is desactivated.
         * @name desactivated
         * @memberof molecule.render.dom.display.Stage
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        desactivated : { value : new Signal() },

        /**
         * This signal emit when fullscreen state is changed.
         * @name fullScreen
         * @memberof molecule.render.dom.display.Stage
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        fullScreen : { value : new Signal() },

        /**
         * This signal emit when the orientation is changed.
         * @name orientationChange
         * @memberof molecule.render.dom.display.Stage
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        orientationChange : { value : new Signal() },

        /**
         * This signal emit when the stage is resized.
         * @name resize
         * @memberof molecule.render.dom.display.Stage
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        resize : { value : new Signal() },

        /**
         * @private
         */
        _allowFullScreen : { writable : true  , value : false } ,

        /**
         * @private
         */
        _aspectRatio : { writable : true  , value : StageAspectRatio.ANY } ,

        /**
         * @private
         */
        _displayState : { writable : true  , value : StageDisplayState.NORMAL } ,

        /**
         * @private
         */
        _fullScreenChange : { writable : true  , value : null } ,

        /**
         * @private
         */
        _fullScreenElement : { writable : true  , value : null } ,

        /**
         * @private
         */
        _fullScreenExit : { writable : true  , value : null } ,

        /**
         * @private
         */
        _fullScreenHeight : { writable : true  , value : null } ,

        /**
         * @private
         */
        _fullScreenInteractive : { writable : true  , value : false } ,

        /**
         * @private
         */
        _fullScreenRequest : { writable : true  , value : null } ,

        /**
         * @private
         */
        _fullScreenWidth : { writable : true  , value : null } ,

        /**
         * @private
         */
        _height : { writable : true  , value : null } ,

        /**
         * @private
         */
        __isStage : { value : true } , // special flag

        /**
         * @private
         */
        _launchedFromHomeScreen : { writable : true  , value : false } ,

        /**
         * @private
         */
        _orientation : { writable : true  , value : StageOrientation.UNKNOWN } ,

        /**
         * @private
         */
        _pixelRatio : { writable : true  , value : 1 } ,

        /**
         * @private
         */
        _supportedOrientations : { writable : true  , value : null } ,

        /**
         * @private
         */
        _supportsOrientationChange : { writable : true  , value : false } ,

        /**
         * @private
         */
        _width : { writable : true  , value : null }
    }) ;

    this.__initialize__() ;
}

Stage.prototype = Object.create( Node.prototype ,
{
    constructor : { value : Stage , writable : true },

    /**
     * Get if the stage allow fullScreen
     * @name allowFullScreen
     * @memberof molecule.render.dom.display.Stage
     * @type {boolean}
     * @instance
     * @readonly
     */
    allowFullScreen : { get : function() { return this._allowFullScreen ; } } ,

    /**
     * Get if the stage allow fullScreen with text input
     * @name allowFullScreenInteractive
     * @memberof molecule.render.dom.display.Stage
     * @type {boolean}
     * @instance
     * @readonly
     */
    allowFullScreenInteractive : { get : function() { return this._fullScreenInteractive ; } } ,

    /**
     * Get the stage aspect ratio
     * @name aspectRatio
     * @memberof molecule.render.dom.display.Stage
     * @instance
     * @readonly
     */
    aspectRatio : { get : function() { return this._aspectRatio ; } } ,

    /**
     * A value from the {@link graphics.display.StageDisplayState|StageDisplayState} enumeration that specifies which display state to use.
     * <p>The following are valid values:
     * <ul>
     * <li><code>StageDisplayState.FULL_SCREEN</code> Sets application or content to expand the stage over the user's entire screen. Keyboard input is disabled, with the exception of a limited set of non-printing keys.</li>
     * <li><code>StageDisplayState.FULL_SCREEN_INTERACTIVE</code> Sets the application to expand the stage over the user's entire screen, with keyboard input allowed.</li>
     * <li><code>StageDisplayState.NORMAL</code> Sets the stage back to the standard stage display mode.</li>
     * </ul>
     * </p>
     * @name displayState
     * @memberof molecule.render.dom.display.Stage
     * @instance
     */
    displayState :
    {
        get : function()
        {
            return this._displayState ;
        },
        set : function( state )
        {
            if( this._displayState !== state )
            {
                this._displayState = state ;
                switch( this._displayState )
                {
                    case StageDisplayState.FULL_SCREEN :
                    {
                        document.documentElement[ this._fullScreenRequest ]();
                        break ;
                    }
                    case StageDisplayState.FULL_SCREEN_INTERACTIVE :
                    {
                        document.documentElement[ this._fullScreenRequest ]( Element.ALLOW_KEYBOARD_INPUT );
                        break ;
                    }
                    case StageDisplayState.NORMAL :
                    default :
                    {
                        document[ this._fullScreenExit ]();
                        break ;
                    }
                }
            }
        }
    } ,

    /**
     * Indicates the fullScreen height of the stage.
     * @name fullScreenHeight
     * @memberof molecule.render.dom.display.Stage
     * @readonly
     * @instance
     */
    fullScreenHeight : { get : function() { return this._fullScreenHeight ; } } ,

    /**
     * Indicates the fullScreen width of the stage.
     * @name fullScreenWidth
     * @memberof molecule.render.dom.display.Stage
     * @readonly
     * @instance
     */
    fullScreenWidth : { get : function() { return this._fullScreenWidth ; } } ,

    /**
     * Indicates the height value of the stage.
     * @return The height of the stage
     * @name height
     * @memberof molecule.render.dom.display.Stage
     * @readonly
     * @instance
     */
    height : { get : function() { return this._height ; } } ,

    /**
     * Indicates if app is launched from the Home Screen.
     * @name launchedFromHomeScreen
     * @type {boolean}
     * @memberof molecule.render.dom.display.Stage
     * @readonly
     * @instance
     */
    launchedFromHomeScreen : { get : function() { return this._launchedFromHomeScreen ; } } ,

    /**
     * Indicates the orientation of the stage.
     * @name orientation
     * @memberof molecule.render.dom.display.Stage
     * @readonly
     * @instance
     */
    orientation : { get : function() { return this._orientation ; } } ,

    /**
     * Indicates the pixelRatio of the stage.
     * @name pixelRatio
     * @memberof molecule.render.dom.display.Stage
     * @readonly
     * @instance
     */
    pixelRatio : { get : function() { return this._pixelRatio ; } } ,

    /**
     * Indicates the width value of the stage.
     * @name width
     * @memberof molecule.render.dom.display.Stage
     * @instance
     */
    width : { get : function() { return this._width ; } } ,

    /**
     * Disposes all resources of the display object (event listeners are removed).
     * @name dispose
     * @memberof molecule.render.dom.display.Stage
     * @instance
     * @function
     */
    dispose : { value : function()
    {
        if( this._notifyFullScreen instanceof Function )
        {
            window.removeEventListener( this._fullScreenChange , this._notifyFullScreen , false );
            this._notifyFullScreen = null ;
        }
        if( this._notifyOrientationChange instanceof Function )
        {
            window.removeEventListener( "orientationchange" , this._notifyOrientationChange , false );
            this._notifyOrientationChange = null ;
        }
    }},

    /**
     * Get orientation of the current screen window.
     * @name getDeviceOrientation
     * @memberof molecule.render.dom.display.Stage
     * @function
     * @instance
     */
    getDeviceOrientation : { writable : true , value : function()
    {
        if( window.screen.orientation && window.screen.orientation.type )
        {
            switch ( window.screen.orientation.type )
            {
                case 'portrait-secondary' :
                {
                    this._orientation = StageOrientation.UPSIDE_DOWN;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                    break;
                }
                case 'landscape-primary' :
                {
                    this._orientation = StageOrientation.ROTATED_LEFT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break;
                }
                case 'landscape-secondary' :
                {
                    this._orientation = StageOrientation.ROTATED_RIGHT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break;
                }
                case 'portrait-primary' :
                default :
                {
                    this._orientation = StageOrientation.DEFAULT;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                    break;
                }
            }
        }
        else if( window.orientation !== undefined )
        {
            switch ( window.orientation )
            {
                case 180 :
                {
                    this._orientation = StageOrientation.UPSIDE_DOWN;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                    break ;
                }
                case 90:
                {
                    this._orientation = StageOrientation.ROTATED_LEFT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break ;
                }
                case -90:
                {
                    this._orientation = StageOrientation.ROTATED_RIGHT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break ;
                }
                case 0  :
                default :
                {
                    this._orientation = StageOrientation.DEFAULT;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                }
            }
        }
    }},

    /**
     * Get viewport size of the current browser window. This command only works on desktop browser or in a mobile environment with a webview enabled.
     * @name getViewportSize
     * @memberof molecule.render.dom.display.Stage
     * @function
     * @instance
     */
    getViewportSize : { writable : true , value : function()
    {
        this._width  = Math.min( document.documentElement.clientWidth  , window.innerWidth  || 0 );
        this._height = Math.min( document.documentElement.clientHeight , window.innerHeight || 0 );
        return { width : this._width , height : this._height } ;
    }},

    /**
     * Notify when the stage is activated.
     * @name notifyActivated
     * @memberof molecule.render.dom.display.Stage
     * @function
     * @instance
     */
    notifyActivated : { writable : true , value : function()
    {
        this.activated.emit( this ) ;
    }},

    /**
     * Notify when the stage is desactivated.
     * @name notifyDesactivated
     * @memberof molecule.render.dom.display.Stage
     * @function
     * @instance
     */
    notifyDesactivated : { writable : true , value : function()
    {
        this.desactivated.emit( this ) ;
    }},

    /**
     * Notify when the stage change state to fullscreen or normal.
     * @name notifyFullScreen
     * @memberof molecule.render.dom.display.Stage
     * @function
     * @instance
     */
    notifyFullScreen : { writable : true , value : function()
    {
        if( document[ this._fullScreenElement ] === null  )
        {
            this.displayState = StageDisplayState.NORMAL ;
        }
        this.fullScreen.emit( this._displayState , this ) ;
    }},

    /**
     * Notify when the orientation is changed.
     * @name notifyOrientationChange
     * @memberof molecule.render.dom.display.Stage
     * @function
     * @instance
     */
    notifyOrientationChange : { writable : true , value : function()
    {
        this.getDeviceOrientation();
        this.orientationChange.emit( this._orientation , this ) ;
    }},

    /**
     * Notify when the stage is resized.
     * @name notifyResized
     * @memberof molecule.render.dom.display.Stage
     * @function
     * @instance
     */
    notifyResized : { writable : true , value : function()
    {
        this.getViewportSize();
        this.resize.emit( this ) ;
    }},

    /**
     * The string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof molecule.render.dom.display.Stage
     * @function
     * @instance
     */
    toString : { writable : true , value : function ()
    {
        return '[Stage]' ;
    }},

    /**
     * Initialize the internal Stage informations.
     * @memberof molecule.render.dom.display.Stage
     * @private
     */
    __initialize__ : { writable : true , value : function()
    {

        // -------- Check if application is launched from the Home Screen

        if( navigator.standalone === true || window.matchMedia('(display-mode: fullscreen)').matches || window.matchMedia('(display-mode: standalone)').matches )
        {
            this._launchedFromHomeScreen = true;
        }

        // --------

        this._pixelRatio = window.devicePixelRatio || 1;

        // --------

        this.getViewportSize();

        this._fullScreenWidth  = window.screen.width;
        this._fullScreenHeight = window.screen.height;

        //this._fullScreenWidth = window.screen.availWidth;
        //this._fullScreenHeight = window.screen.availHeight;

        // --------

        if( window.orientation !== undefined || window.screen.orientation !== undefined )
        {
            this._supportsOrientationChange = true;
            this.getDeviceOrientation();
        }
        else
        {
            this._supportsOrientationChange = false;
        }

        // --------

        let fullscreen =
        [
            'requestFullscreen',
            'requestFullScreen',
            'webkitRequestFullscreen',
            'webkitRequestFullScreen',
            'msRequestFullscreen',
            'msRequestFullScreen',
            'mozRequestFullScreen',
            'mozRequestFullscreen'
        ];

        let cancel =
        [
            'cancelFullScreen',
            'exitFullscreen',
            'webkitCancelFullScreen',
            'webkitExitFullscreen',
            'msCancelFullScreen',
            'msExitFullscreen',
            'mozCancelFullScreen',
            'mozExitFullscreen'
        ];

        let change =
        [
            'fullscreenchange',
            'fullscreenchange',
            'webkitfullscreenchange',
            'webkitfullscreenchange',
            'msfullscreenchange',
            'msfullscreenchange',
            'mozfullscreenchange',
            'mozfullscreenchange',
        ];

        let element =
        [
            'fullscreenElement',
            'fullscreenElement',
            'webkitFullscreenElement',
            'webkitFullscreenElement',
            'msFullScreenElement',
            'msFullscreenElement',
            'mozFullScreenElement',
            'mozFullscreenElement',
        ];

        let len = fullscreen.length  ;
        for( let i = 0 ; i < len ; i++ )
        {
            if( document.documentElement[fullscreen[i]] && document[cancel[i]] )
            {
                this._allowFullScreen   = true ;
                this._fullScreenRequest = fullscreen[i];
                this._fullScreenExit    = cancel[i];
                this._fullScreenChange  = change[i];
                this._fullScreenElement = element[i];
                break;
            }
        }

        // -------- Keyboard Input ?

        if( window.Element && Element.ALLOW_KEYBOARD_INPUT )
        {
            this._fullScreenInteractive = true;
        }

        // -------- Behaviors

        if( this._allowFullScreen === true )
        {
            this._notifyFullScreen = this.notifyFullScreen.bind( this ) ;
            window.addEventListener( this._fullScreenChange , this._notifyFullScreen , false );
        }

        if( this._supportsOrientationChange === true )
        {
            this._notifyOrientationChange = this.notifyOrientationChange.bind( this ) ;
            window.addEventListener( "orientationchange" , this._notifyOrientationChange , false ) ;
        }

        window.addEventListener( "resize" , this.notifyResized.bind( this ) , false );

        window.addEventListener( "focus" , this.notifyActivated.bind( this )    , false );
        window.addEventListener( "blur"  , this.notifyDesactivated.bind( this ) , false );
    }}
}) ;
