"use strict" ;

/**
 * Constants defining the position declaration lets you declare what the position of an element should be.
 * @summary Constants defining the position declaration lets you declare what the position of an element should be.
 * @name Position
 * @namespace graphics.Position
 * @memberof graphics
 */
export var Position = Object.defineProperties( {} ,
{
    /**
     * Constant indicating an <code>"absolute"</code> position.
     * <p>An element with position "absolute" is taken out of the normal flow of the page and positioned at the desired coordinates relative to its containing block.</p>
     * @memberof graphics.Position
     * @type {string}
     * @default absolute
     */
    ABSOLUTE : { enumerable : true , value : 'absolute' },

    /**
     * Constant indicating a <code>"fixed"</code> position.
     * <p>An element with position "fixed" is taken out of the normal flow of the page and positioned at the desired coordinates relative to the browser window. It remains at that position regardless of scrolling.</p>
     * @memberof graphics.Position
     * @type {string}
     * @default fixed
     */
    FIXED : { enumerable : true , value : 'fixed' },

    /**
     * Specifies the <code>"normal"</code> direction order.
     * <p>The horizontal containers displays its children from left to right and the vertical containers displays its children from top to bottom.</p>
     * @memberof graphics.Position
     * @type {string}
     * @default normal
     */
    NORMAL : { enumerable : true , value : 'normal' } ,

    /**
     * Constant indicating a <code>"relative"</code> position.
     * <p>An element with position: relative initially has the position the normal flow of the page gives it, but it is subsequently offset by the amount the top, bottom, left, and/or right declarations give.</p>
     * @memberof graphics.Position
     * @type {string}
     * @default relative
     */
    RELATIVE : { enumerable : true , value : 'relative' },

    /**
     * Constant indicating a <code>"static"</code> position.
     * <p>An element with position "static" always has the position the normal flow of the page gives it. It cannot be moved from this position; a static element ignores any x, y, top, bottom, left, or right declarations.</p>
     * @memberof graphics.Position
     * @type {string}
     * @default static
     */
    STATIC : { enumerable : true , value : 'static' }
}) ;