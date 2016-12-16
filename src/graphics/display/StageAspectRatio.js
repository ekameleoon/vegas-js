"use strict" ;

/**
 * The {@link graphics.display.StageAspectRatio} enumeration provides values for the Stage.setAspectRatio() method.
 * @summary The {@link graphics.display.StageAspectRatio} enumeration provides values for the Stage.setAspectRatio() method.
 * @name StageAspectRatio
 * @namespace graphics.display.StageAspectRatio
 * @memberof graphics.display
 */
export var StageAspectRatio = Object.defineProperties( {} ,
{
    /**
     * Specifies a device orientation that supports both portrait and landscape UI.
     * @memberof graphics.display.StageDisplayState
     * @type string
     * @default any
     */
    ANY : { enumerable : true , value : 'any' } ,

    /**
     * Specifies a device orientation that presents a landscape UI
     * @memberof graphics.display.StageDisplayState
     * @type string
     * @default landscape
     */
    LANDSCAPE : { enumerable : true , value : 'landscape' } ,

    /**
     * Specifies a device orientation that presents a portrait UI
     * @memberof graphics.display.StageDisplayState
     * @type string
     * @default portrait
     */
    PORTRAIT : { enumerable : true , value : 'portrait' }
}) ;
