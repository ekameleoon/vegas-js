/* jshint -W086 */
"use strict" ;

import { Signal } from '../../system/signals/Signal.js' ;
import { StageDisplayState } from './StageDisplayState.js' ;

/**
 * Get the stage informations
 * @summary Get the stage informations
 * @name Stage
 * @class
 * @memberof graphics.display
 */
export function Stage()
{
    Object.defineProperties( this ,
    {
        /**
         * This signal emit when fullscreen.
         * @memberof graphics.display.Stage
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        fullScreen : { value : new Signal() },

        /**
         * This signal emit when resize.
         * @memberof graphics.display.Stage
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
        _displayState : { writable : true  , value : StageDisplayState.NORMAL } ,

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
        _orientation : { writable : true  , value : null } ,

        /**
         * @private
         */
        _pixelRatio : { writable : true  , value : 1 } ,

        /**
         * @private
         */
        __resizeTimeout__ : { writable : true  , value : null } , // TODO : ??

        /**
         * @private
         */
        _width : { writable : true  , value : null }
    });

    this.__initialize__() ;
}

Stage.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Stage } ,

    /**
     * Get if the stage allow fullScreen
     * @memberof graphics.display.Stage
     * @type {boolean}
     * @instance
     * @readonly
     */
    allowFullScreen : { get : function() { return this._allowFullScreen ; } } ,

    /**
     * Get if the stage allow fullScreen with text input
     * @memberof graphics.display.Stage
     * @type {boolean}
     * @instance
     * @readonly
     */
    allowFullScreenInteractive : { get : function() { return this._fullScreenInteractive ; } } ,

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
     * @memberof graphics.display.Stage
     * @instance
     * @readonly
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

                this.notifyFullScreen( this._displayState );
            }
        }
    } ,

    /**
     * Indicates the fullScreen height of the stage.
     * @name fullScreenHeight
     * @memberof graphics.display.Stage
     * @readonly
     * @instance
     */
    fullScreenHeight : { get : function() { return this._fullScreenHeight ; } } ,

    /**
     * Indicates the fullScreen width of the stage.
     * @name fullScreenWidth
     * @memberof graphics.display.Stage
     * @readonly
     * @instance
     */
    fullScreenWidth : { get : function() { return this._fullScreenWidth ; } } ,

    /**
     * Indicates the height value of the stage.
     * @return The height of the stage
     * @name height
     * @memberof graphics.display.Stage
     * @readonly
     * @instance
     */
    height : { get : function() { return this._height ; } } ,

    /**
     * Indicates the orientation of the stage.
     * @name orientation
     * @memberof graphics.display.Stage
     * @instance
     */
    orientation : { get : function() { return this._orientation ; } } ,

    /**
     * Indicates the pixelRatio of the stage.
     * @name pixelRatio
     * @memberof graphics.display.Stage
     */
    pixelRatio : { get : function() { return this._pixelRatio ; } } ,

    /**
     * Indicates the width value of the stage.
     * @name width
     * @memberof graphics.display.Stage
     */
    width : { get : function() { return this._width ; } } ,

    /**
     * Get viewport size of the current browser window. This command only works on desktop browser or in a mobile environment with a webview enabled.
     * @name getViewportSize
     * @memberof screens
     */
    getViewportSize : { writable : true , value : function()
    {
        this._width  = Math.max( document.documentElement.clientWidth  , window.innerWidth  || 0 );
        this._height = Math.max( document.documentElement.clientHeight , window.innerHeight || 0 );
        return { width : this._width , height : this._height } ;
    }},

    /**
     * Notify when the stage is resized.
     * @name notifyResized
     * @memberof graphics.display.Stage
     * @function
     * @instance
     */
    notifyResized : { writable : true , value : function()
    {
        this.getViewportSize();
        this.resize.emit( this ) ;
    }},

    /**
     * Notify when the stage is resized.
     * @name notifyResized
     * @memberof graphics.display.Stage
     * @function
     * @instance
     */
    notifyFullScreen : { writable : true , value : function()
    {
        this.fullScreen.emit( this._displayState , this ) ;
    }},

    /**
     * Initialize the internal Stage informations.
     * @private
     */
    __initialize__ : { writable : true , value : function()
    {
        // FIXME : throw a spcific Error if the window/document/dom elements don't exist !

        // --------

        this._pixelRatio = document.devicePixelRatio || 1;

        // --------

        this.getViewportSize();

        this._fullScreenWidth  = window.screen.width;
        this._fullScreenHeight = window.screen.height;

        //this._fullScreenWidth = window.screen.availWidth;
        //this._fullScreenHeight = window.screen.availHeight;

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

        let len = fullscreen.length  ;
        for( let i = 0 ; i < len ; i++ )
        {
            if( document.documentElement[fullscreen[i]] && document[cancel[i]] )
            {
                this._allowFullScreen   = true ;
                this._fullScreenRequest = fullscreen[i];
                this._fullScreenExit    = cancel[i];
                break;
            }
        }

        // -------- Keyboard Input ?

        if( window.Element && Element.ALLOW_KEYBOARD_INPUT )
        {
            this._fullScreenInteractive = true;
        }

        // -------- Behaviors

        window.addEventListener( "fullscreenchange" , this.notifyFullScreen.bind( this ) , false );
        window.addEventListener( "resize"           , this.notifyResized.bind( this )    , false );
    }}
});
