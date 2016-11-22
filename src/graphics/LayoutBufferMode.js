"use strict" ;

/**
 * The layout buffering modes.
 */
export var LayoutBufferMode = Object.defineProperties( {} ,
{
    /**
     * The "auto" buffering mode is used when the layout initialize
     * this internal buffer with all childs registered in the container of the layout.
     */
    AUTO : { enumerable : true , value : 'auto' } ,

    /**
     * The "normal" buffering mode use the natural internal buffer of the layout,
     * the user must fill the layout manually.
     */
    NORMAL : { enumerable : true , value : 'normal' }
}) ;
