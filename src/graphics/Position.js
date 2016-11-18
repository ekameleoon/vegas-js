"use strict" ;

/**
 * Constants defining the position declaration lets you declare what
 * the position of an element should be.
 */
export var Position = Object.defineProperties( {} ,
{
    /**
     * Constant indicating an "absolute" position. An element with position "absolute" is taken out of the normal flow of the page
     * and positioned at the desired coordinates relative to its containing block.
     */
    ABSOLUTE : { enumerable : true , value : 'absolute' },

    /**
     * Constant indicating a "fixed" position. An element with position "fixed" is taken out of the normal flow of the page and
     * positioned at the desired coordinates relative to the browser window. It remains at that position regardless of scrolling.
     */
    FIXED : { enumerable : true , value : 'fixed' },

    /**
     * Specifies the "normal" direction order. The horizontal containers displays its children from left to right and the vertical containers displays its children from top to bottom.
     */
    NORMAL : { enumerable : true , value : 'normal' } ,

    /**
     * Constant indicating a "relative" position. An element with position: relative initially has the position the normal flow
     * of the page gives it, but it is subsequently offset by the amount the top, bottom, left, and/or right declarations give.
     */
    RELATIVE : { enumerable : true , value : 'relative' },

    /**
     * Constant indicating a "static" position. An element with position "static" always has the position the normal flow of the page gives it.
     * It cannot be moved from this position; a static element ignores any x, y, top, bottom, left, or right declarations.
     */
    STATIC : { enumerable : true , value : 'static' }
}) ;