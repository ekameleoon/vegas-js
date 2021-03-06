"use strict" ;

import { Node } from './Node.js' ;

/**
 * Creates a new Img instance.
 * @name Img
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 */
export function Img ()
{
    Node.call( this , null , 'img' ) ;
}

Img.prototype = Object.create( Node.prototype ,
{
    constructor : { value : Img , writable : true } ,

    /**
     * The height of the image.
     * @name height
     * @memberof molecule.render.aframe.display.Img
     * @instance
     */
    height :
    {
        get : function() { return this.getAttribute( 'height' ) ; } ,
        set : function( value ) { this.setAttribute( 'height' , value ) ; }
    },

    /**
     * The src of the element.
     * @name src
     * @memberof molecule.render.aframe.display.Img
     * @instance
     */
    src :
    {
        get : function() { return this.getAttribute('src') ; },
        set : function( value )
        {
            this.setAttribute( 'src' , value ) ;
        }
    },

    /**
     * The width of the image.
     * @name width
     * @memberof molecule.render.aframe.display.Img
     * @instance
     */
    width :
    {
        get : function() { return this.getAttribute( 'width' ) ; } ,
        set : function( value ) { this.setAttribute( 'width' , value ) ; }
    }
}) ;
