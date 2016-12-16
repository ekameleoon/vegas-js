"use strict" ;

/**
 * The {@link graphics.display.StageDisplayState} enumeration defines the different display state of the stage.
 * @summary The {@link graphics.display.StageDisplayState} enumeration defines the different display state of the stage.
 * @name StageDisplayState
 * @namespace graphics.display.StageDisplayState
 * @memberof graphics.display
 */
export var StageDisplayState = Object.defineProperties( {} ,
{
    /**
     * Specifies the "fullScreen" value to change the display state of the stage.
     * @memberof graphics.display.StageDisplayState
     * @type string
     * @default fullScreen
     */
    FULL_SCREEN : { enumerable : true , value : 'fullScreen' } ,

    /**
     * Specifies the "fullScreenInteractive" value to change the display state of the stage.
     * @memberof graphics.display.StageDisplayState
     * @type string
     * @default fullScreenInteractive
     */
    FULL_SCREEN_INTERACTIVE : { enumerable : true , value : 'fullScreenInteractive' } ,

    /**
     * Specifies the "normal" value to change the display state of the stage.
     * @memberof graphics.display.StageDisplayState
     * @type string
     * @default normal
     */
    NORMAL : { enumerable : true , value : 'normal' }
}) ;
