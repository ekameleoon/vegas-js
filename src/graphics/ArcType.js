"use strict" ;

/**
 * This static singleton to enumerates all types used to draw an Arc.
 * @name ArcType
 * @namespace graphics.ArcType
 * @memberof graphics
 */
export var ArcType = Object.defineProperties( {} ,
{
    /**
     * The 'chord' type.
     * @memberof graphics.ArcType
     * @static
     * @type {string}
     * @default 'chord'
     */
    CHORD : { enumerable : true , value : 'chord' } ,

    /**
     * The 'none' type.
     * @memberof graphics.ArcType
     * @static
     * @type {string}
     * @default 'none'
     */
    NONE : { enumerable : true , value : 'none' } ,

    /**
     * The 'pie' type.
     * @memberof graphics.ArcType
     * @static
     * @type {string}
     * @default 'pie'
     */
    PIE : { enumerable : true , value : 'pie' }
}) ;