"use strict" ;

/**
 * The enumeration of the {@link graphics.Layout} buffering modes.
 * @summary The enumeration of the {@link graphics.Layout} buffering modes.
 * @name LayoutBufferMode
 * @namespace graphics.LayoutBufferMode
 * @memberof graphics
 */
export var LayoutBufferMode = Object.defineProperties( {} ,
{
    /**
     * The <code>"auto"</code> buffering mode is used when the layout initialize this internal buffer with all childs registered in the container of the layout.
     * @memberof graphics.LayoutBufferMode
     * @type {string}
     * @default auto
     */
    AUTO : { enumerable : true , value : 'auto' } ,

    /**
     * The <code>"normal"</code> buffering mode use the natural internal buffer of the layout, the user must fill the layout manually.
     * @memberof graphics.LayoutBufferMode
     * @type {string}
     * @default normal
     */
    NORMAL : { enumerable : true , value : 'normal' }
}) ;
