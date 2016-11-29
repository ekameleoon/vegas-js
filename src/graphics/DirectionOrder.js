"use strict" ;

/**
 * Defines the order to display all children in a specific horizontal or vertical container.
 * Children within a horizontally oriented box are, by default, displayed from left to right in the same order as they appear in the source document.
 * Children within a vertically oriented box are displayed top to bottom in the same order.
 * @summary Defines the order to display all children in a specific horizontal or vertical container.
 * @name DirectionOrder
 * @namespace graphics.DirectionOrder
 * @memberof graphics
 */
export var DirectionOrder = Object.defineProperties( {} ,
{
    /**
     * Specifies the <code>"normal"</code> direction order.
     * <p>The horizontal containers displays its children from left to right and the vertical containers displays its children from top to bottom.</p>
     * @memberof graphics.DirectionOrder
     * @type {string}
     * @default normal
     */
    NORMAL : { enumerable : true , value : 'normal' } ,

    /**
     * Specifies the <code>"reverse"</code> direction order.
     * <p>The horizontal containers displays its children from right to left and the vertical containers displays its children from bottom to top.</p>
     * @memberof graphics.DirectionOrder
     * @type {string}
     * @default reverse
     */
    REVERSE : { enumerable : true , value : 'reverse' }
}) ;
