"use strict" ;

/**
 * The {@link graphics.ZOrder} enumeration provides constants to defines the z order depth of a display object added to the document.
 * @summary The {@link graphics.ZOrder} enumeration provides constants to defines the z order depth of a display object added to stage of your application..
 * @name ZOrder
 * @namespace graphics.ZOrder
 * @memberof graphics
 */
export var ZOrder = Object.defineProperties( {} ,
{
    /**
     * Back means the display will be behind an other object and has a value of <code>0</code>.
     * @memberof graphics.ZOrder
     * @type {number}
     * @default 0
     */
    BACK : { enumerable : true , value : 0 } ,

    /**
     * Front means the display will be in front of an other object and has a value of <code>1</code>.
     * @memberof graphics.ZOrder
     * @type {number}
     * @default 1
     */
    FRONT : { enumerable : true , value : 1 }
}) ;
