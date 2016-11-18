"use strict" ;

/**
 * This static singleton to enumerates all types used to draw an Arc.
 */
export var ArcType = Object.defineProperties( {} ,
{
    /**
     * The 'chord' type.
     */
    CHORD : { enumerable : true , value : 'chord' } ,

    /**
     * The 'none' type.
     */
    NONE : { enumerable : true , value : 'none' } ,

    /**
     * The 'pie' type.
     */
    PIE : { enumerable : true , value : 'pie' }
}) ;
