"use strict"

import { AEntity } from './AEntity.js' ;

/**
 * Creates a new Text instance.
 * @name Text
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.AEntity
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 * @example
 * let scene = new Scene() ;
 * let text = new Text
 * ({
 *     color : '#EF2D5E' ,
 *     value : 'Hello world' ,
 *     width : 10 ,
 *     x     : -0.5 ,
 *     y     : 1 ,
 *     z     : 2
 * }) ;
 *
 * scene.addChild( text ) ;
 */
export function Text( init = null )
{
    AEntity.call( this , init , 'a-text' ) ;
}

Text.prototype = Object.create( AEntity.prototype ,
{
    constructor : { value : Text , writable : true } ,

    /**
     * The align of the text element (left, right or center).
     * @name align
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @default left
     */
    align :
    {
        get : function() { return this.getAttribute( 'align' ) ; },
        set : function( value ) { this.setAttribute( 'align' , value ) ; }
    },

    /**
     * Discard text pixels if alpha is less than this value.
     * @name alphaTest
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @default 0.5
     */
    alphaTest :
    {
        get : function() { return this.getAttribute( 'alphaTest' ) ; },
        set : function( value ) { this.setAttribute( 'alphaTest' , value ) ; }
    },

    /**
     * Horizontal positioning (left, center, right, align).
     * @name anchor
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @default center
     */
    anchor :
    {
        get : function() { return this.getAttribute( 'anchor' ) ; },
        set : function( value ) { this.setAttribute( 'anchor' , value ) ; }
    },

    /**
     * Vertical positioning (top, center, bottom).
     * @name baseline
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @default center
     */
    baseline :
    {
        get : function() { return this.getAttribute( 'baseline' ) ; },
        set : function( value ) { this.setAttribute( 'baseline' , value ) ; }
    },

    /**
     * The color component of the text element.
     * @name color
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @default white
     */
    color :
    {
        get : function() { return this.getAttribute( 'color' ) ; },
        set : function( value ) { this.setAttribute( 'color' , value ) ; }
    },

    /**
     * Font to render text, either the name of one of A-Frame’s stock fonts or a URL to a font file
     * @name font
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @see https://aframe.io/docs/0.5.0/components/text.html#stock-fonts
     */
    font :
    {
        get : function() { return this.getAttribute( 'font' ) ; },
        set : function( value ) { this.setAttribute( 'font' , value ) ; }
    },

    /**
     * 	Font image texture path to render text. Defaults to the font‘s name with extension replaced to .png. Don’t need to specify if using a stock font.
     * @name fontImage
     * @memberof molecule.render.aframe.display.Text
     * @instance
     */
    fontImage :
    {
        get : function() { return this.getAttribute( 'fontImage' ) ; },
        set : function( value ) { this.setAttribute( 'fontImage' , value ) ; }
    },

    /**
     * Height in meters.
     * @name width
     * @memberof molecule.render.aframe.display.Text
     * @instance
     */
    height :
    {
        get : function() { return this.getAttribute( 'height' ) ; } ,
        set : function( value ) { this.setAttribute( 'height' , value ) ; }
    },

    /**
     * Letter spacing in pixels.
     * @name width
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @default 0
     */
    letterSpacing :
    {
        get : function() { return this.getAttribute( 'letterSpacing' ) ; } ,
        set : function( value ) { this.setAttribute( 'letterSpacing' , value ) ; }
    },

    /**
     * Letter height in pixels.
     * @name letterHeight
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @default 0
     */
    letterHeight :
    {
        get : function() { return this.getAttribute( 'letterHeight' ) ; } ,
        set : function( value ) { this.setAttribute( 'letterHeight' , value ) ; }
    },

    /**
     * Shader used to render text.
     * @name shader
     * @memberof molecule.render.aframe.display.Text
     * @instance
     */
    shader :
    {
        get : function() { return this.getAttribute( 'shader' ) ; } ,
        set : function( value ) { this.setAttribute( 'shader' , value ) ; }
    },

    /**
     * The side to render. (front, back, double)
     * @name side
     * @memberof molecule.render.aframe.display.Text
     * @instance
     */
    side :
    {
        get : function() { return this.getAttribute( 'side' ) ; } ,
        set : function( value ) { this.setAttribute( 'side' , value ) ; }
    },

    /**
     * Tab size in spaces.
     * @name side
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @default 4
     */
    tabSize :
    {
        get : function() { return this.getAttribute( 'tabSize' ) ; } ,
        set : function( value ) { this.setAttribute( 'tabSize' , value ) ; }
    },

    /**
     * The value component reference of the text element.
     * @name value
     * @memberof molecule.render.aframe.display.Text
     * @instance
     */
    value :
    {
        get : function() { return this.getAttribute( 'value' ) ; } ,
        set : function( value ) { this.setAttribute( 'value' , value ) ; }
    },

    /**
     * How whitespace should be handled (i.e., normal, pre, nowrap).
     * @name wrapPixels
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @default normal
     */
    whitespace :
    {
        get : function() { return this.getAttribute( 'whitespace' ) ; } ,
        set : function( value ) { this.setAttribute( 'whitespace' , value ) ; }
    },

    /**
     * Width in meters.
     * @name width
     * @memberof molecule.render.aframe.display.Text
     * @instance
     */
    width :
    {
        get : function() { return this.getAttribute( 'width' ) ; } ,
        set : function( value ) { this.setAttribute( 'width' , value ) ; }
    },

    /**
     * The wrapCount component reference of the text element.
     * @name wrapCount
     * @memberof molecule.render.aframe.display.Text
     * @instance
     * @default 40
     */
    wrapCount :
    {
        get : function() { return this.getAttribute( 'wrapCount' ) ; } ,
        set : function( value ) { this.setAttribute( 'wrapCount' , value ) ; }
    },

    /**
     * The wrapPixels component reference of the text element.
     * @name wrapPixels
     * @memberof molecule.render.aframe.display.Text
     * @instance
     */
    wrapPixels :
    {
        get : function() { return this.getAttribute( 'wrapPixels' ) ; } ,
        set : function( value ) { this.setAttribute( 'wrapPixels' , value ) ; }
    },

    /**
     * The zOffset component of the text element.
     * @name zOffset
     * @memberof molecule.render.aframe.display.Text
     * @instance
     */
    zOffset :
    {
        get : function() { return this.getAttribute( 'zOffset' ) ; },
        set : function( value ) { this.setAttribute( 'zOffset' , value ) ; }
    }
}) ;
