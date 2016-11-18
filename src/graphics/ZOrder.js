"use strict" ;

/**
 * Represents the ZOrder of a display added to the document.
 */
export var ZOrder = Object.defineProperties( {} ,
{
    /**
     * Back means the display will be behind an other object and has a value of 0.
     */
    BACK : { enumerable : true , value : 0 } ,

    /**
     * Front means the display will be in front of an other object and has a value of 1.
     */
    FRONT : { enumerable : true , value : 1 }
}) ;
