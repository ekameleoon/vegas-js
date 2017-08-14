"use strict"

import { Material } from './Material.js' ;

/**
 * Creates a new Image instance.
 * @name Image
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.Material
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 * @example
 * let scene = new Scene() ;
 * let image = new Image
 * ({
 *     color     : '#7BC8A4' ,
 *     height    : 4 ,
 *     width     : 4 ,
 *     rotationX : -90 ,
 *     rotationY : 0 ,
 *     rotationZ : 0,
 *     x         : 0 ,
 *     y         : 0 ,
 *     z         : 0
 * });
 * scene.addChild( image ) ;
 */
export function Image( init = null )
{
    Material.call( this , init , 'a-image' ) ;
}

Image.prototype = Object.create( Material.prototype ,
{
    constructor : { value : Image , writable : true } ,

    /**
     * The height of the image.
     * @name height
     * @memberof molecule.render.aframe.display.Image
     * @instance
     */
    height :
    {
        get : function() { return this.getAttribute( 'geometry' ).height ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'height' , value ) ; }
    },

    /**
     * The width of the image.
     * @name width
     * @memberof molecule.render.aframe.display.Image
     * @instance
     */
    width :
    {
        get : function() { return this.getAttribute( 'geometry' ).width ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'width' , value ) ; }
    }
}) ;
