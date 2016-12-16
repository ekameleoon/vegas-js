"use strict" ;

/**
 * The {@link graphics.display.StageOrientation} enumeration defines constants enumerating the possible orientations of the stage and the device.
 * @summary The {@link graphics.display.StageOrientation} enumeration defines constants enumerating the possible orientations of the stage and the device.
 * @name StageOrientation
 * @namespace graphics.display.StageOrientation
 * @memberof graphics.display
 */
export var StageOrientation = Object.defineProperties( {} ,
{
    /**
     * Specifies that the stage is currently in the default orientation of the device (right-side up).
     * @name DEFAULT
     * @memberof graphics.display.StageOrientation
     * @type string
     * @default default
     * @const
     */
    DEFAULT : { enumerable : true , value : 'default' } ,

    /**
     * Specifies that the stage is currently rotated left relative to the default orientation.
     * @name ROTATED_LEFT
     * @memberof graphics.display.StageOrientation
     * @type string
     * @default rotatedLeft
     * @const
     */
    ROTATED_LEFT : { enumerable : true , value : 'rotatedLeft' } ,

    /**
     * Specifies that the stage is currently rotated right relative to the default orientation.
     * @name ROTATED_RIGHT
     * @memberof graphics.display.StageOrientation
     * @type string
     * @default rotatedRight
     * @const
     */
    ROTATED_RIGHT : { enumerable : true , value : 'rotatedRight' } ,

    /**
     * Specifies that the device has not determined an orientation. This state can occur when the device is lying flat on a table and also while the application is initializing.
     * @name UNKNOWN
     * @memberof graphics.display.StageOrientation
     * @type string
     * @default unknown
     * @const
     */
    UNKNOWN : { enumerable : true , value : 'unknown' } ,

    /**
     * Specifies that the stage is currently upside down relative to the default orientation.
     * @name UPSIDE_DOWN
     * @memberof graphics.display.StageOrientation
     * @type string
     * @default upsideDown
     * @const
     */
    UPSIDE_DOWN : { enumerable : true , value : 'upsideDown' }
}) ;
