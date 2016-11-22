"use strict" ;

/**
 * This static singleton to enumerates all types used to draw an Arc.
 * @name ArcType
 * @memberof graphics
 * @enum {string}
 * @readonly
 */
export var ArcType = Object.defineProperties( {} ,
{
    /**
     * The 'chord' type.
     * @type {number}
     */
    CHORD : { enumerable : true , value : 'chord' } ,

    /**
     * The 'none' type.
     * @type {number}
     */
    NONE : { enumerable : true , value : 'none' } ,

    /**
     * The 'pie' type.
     * @type {number}
     */
    PIE : { enumerable : true , value : 'pie' }
}) ;
