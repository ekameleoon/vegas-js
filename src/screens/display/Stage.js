"use strict" ;

import { Event } from '../../system/events/Event.js' ;
import { Signal } from '../../system/signals/Signal.js' ;
import { StageDisplayState } from './StageDisplayState.js' ;

/**
 * Get the stage informations
 * @summary Get the stage informations
 * @name Stage
 * @class
 * @memberof screens
 */
export function Stage()
{
    Object.defineProperties( this ,
    {
        /**
         * This signal emit when fullscreen.
         * @memberof screens.Stage
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        fullScreen : { value : new Signal() },

        /**
         * This signal emit when resize.
         * @memberof screens.Stage
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        resize : { value : new Signal() },

        /**
         * @private
         */
        __displayState__ : { writable : true  , value : StageDisplayState.NORMAL } ,

        /**
         * @private
         */
        __allowFullScreen__ : { writable : true  , value : false } ,

        /**
         * @private
         */
        __fullScreenExit__ : { writable : true  , value : null } ,

        /**
         * @private
         */
        __fullScreenHeight__ : { writable : true  , value : null } ,

        /**
         * @private
         */
        __fullScreenInteractive__ : { writable : true  , value : false } ,

        /**
         * @private
         */
        __fullScreenRequest__ : { writable : true  , value : null } ,

        /**
         * @private
         */
        __fullScreenWidth__ : { writable : true  , value : null } ,

        /**
         * @private
         */
        __height__ : { writable : true  , value : null } ,

        /**
         * @private
         */
        __orientation__ : { writable : true  , value : null } ,

        /**
         * @private
         */
        __pixelRatio__ : { writable : true  , value : 1 } ,

        /**
         * @private
         */
        __resizeTimeout__ : { writable : true  , value : null } ,

        /**
         * @private
         */
        __width__ : { writable : true  , value : null }
    });

    this.getStageInfos();
}

Stage.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Stage } ,

    /**
     * Get if the stage allow fullScreen
     * @memberof screens
     * @type {boolean}
     * @instance
     * @readonly
     */
    allowFullScreen : { get : function() { return this.__allowFullScreen__ ; } } ,

    /**
     * Get if the stage allow fullScreen with text input
     * @memberof screens
     * @type {boolean}
     * @instance
     * @readonly
     */
    allowFullScreenInteractive : { get : function() { return this.__fullScreenInteractive__ ; } } ,

    /**
     * Get if the stage allow fullScreen with text input
     * @return screens
     * @name displayState
     * @memberof screens
     * @readonly
     */
    displayState :
    {
        get : function()
        {
            return this.__displayState__ ;
        },
        set : function( ds )
        {
            if( this.__displayState__ !== ds )
            {
                this.__displayState__ = ds;
                if( this.__displayState__ === StageDisplayState.FULL_SCREEN )
                {
                    document.documentElement[ this.__fullScreenRequest__ ]();
                }
                else if( this.__displayState__ === StageDisplayState.FULL_SCREEN_INTERACTIVE )
                {
                    document.documentElement[ this.__fullScreenRequest__ ]( Element.ALLOW_KEYBOARD_INPUT );
                }
                else if( this.__displayState__ === StageDisplayState.NORMAL )
                {
                    document[ this.__fullScreenExit__ ]();
                }
                this.notifyFullScreen( this.__displayState__ );
            }
        }
    } ,

    /**
     * Get the fullScreen height of the stage
     * @return The fullScreen height of the stage
     * @name fullScreenHeight
     * @memberof screens
     * @readonly
     */
    fullScreenHeight : { get : function() { return this.__fullScreenHeight__ ; } } ,

    /**
     * Get the fullScreen width of the stage
     * @return The fullscreen width of the stage
     * @name fullScreenWidth
     * @memberof screens
     * @readonly
     */
    fullScreenWidth : { get : function() { return this.__fullScreenWidth__ ; } } ,

    /**
     * Get the height of the stage
     * @return The height of the stage
     * @name height
     * @memberof screens
     * @readonly
     */
    height : { get : function() { return this.__height__ ; } } ,

    /**
     * Notify when the stage is resized.
     * @name notifyResized
     * @memberof screens.Stage
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
     * @memberof screens.Stage
     * @function
     * @instance
     */
    notifyFullScreen : { writable : true , value : function()
    {
        this.fullScreen.emit( this.__displayState__ ) ;
    }},

    /**
     * Get the orientation of the stage
     * @return The orientation of the stage
     * @name orientation
     * @memberof screens
     */
    orientation : { get : function() { return this.__orientation__ ; } } ,

    /**
     * Get the pixelRatio of the stage
     * @return The pixelRatio of the stage
     * @name pixelRatio
     * @memberof screens
     */
    pixelRatio : { get : function() { return this.__pixelRatio__ ; } } ,

    /**
     * Get the width of the stage
     * @return The width of the stage
     * @name width
     * @memberof screens
     */
    width : { get : function() { return this.__width__ ; } } ,

    // ------- protected

    /**
     * Get the stage infos
     * @name getStageInfos
     * @memberof screens
     */
    getStageInfos : { writable : true , value : function()
    {
        // device pixel ratio detection
        this.__pixelRatio__ = document.devicePixelRatio || 1;

        this.getViewportSize();

        // fullscreen dimensions
        this.__fullScreenWidth__ = window.screen.width;
        this.__fullScreenHeight__ = window.screen.height;

        //this.__fullScreenWidth__ = window.screen.availWidth;
        //this.__fullScreenHeight__ = window.screen.availHeight;

        // fullScreen detection
        let fullScreenValues =
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

        let cancelFullScreenValues =
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

        for( let i=0 ; i < fullScreenValues.length ; i++ )
        {
            if( document.documentElement[fullScreenValues[i]] && document[cancelFullScreenValues[i]] )
            {
                this.__allowFullScreen__ = true;
                this.__fullScreenRequest__ = fullScreenValues[i];
                this.__fullScreenExit__  = cancelFullScreenValues[i];
                break;
            }
        }

        //  Keyboard Input?
        if( window.Element && Element.ALLOW_KEYBOARD_INPUT )
        {
            this.__fullScreenInteractive__ = true;
        }

        ///// Listeners
        window.addEventListener( "fullscreenchange" , this.notifyFullScreen.bind( this ) , false );
        window.addEventListener( Event.RESIZE , this.notifyResized.bind( this ) , false );
    }},

    /**
     * Get the viewport size
     * @name getViewportSize
     * @memberof screens
     */
    getViewportSize : { writable : true , value : function()
    {
        // viewport dimensions
        this.__width__ = document.documentElement.clientWidth;
        this.__height__ = document.documentElement.clientHeight;
    }}
});
