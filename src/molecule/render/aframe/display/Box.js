"use strict"

import { Material } from './Material.js' ;

/**
 * Creates a new Box instance.
 * @name Box
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.Material
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 * @example
 * let scene = new Scene() ;
 * let box = new Box
 * ({
 *     color     : '#4CC3D9' ,
 *     depth     : 1 ,
 *     height    : 1 ,
 *     width     : 1 ,
 *     rotationX : 0 ,
 *     rotationY : 45 ,
 *     rotationZ : 0,
 *     x         : -1 ,
 *     y         : 0.5 ,
 *     z         : 1
 * }) ;
 * addChild( box ) ;
 */
export function Box( init = null )
{
    Material.call( this , init , 'a-box' ) ;
}

Box.prototype = Object.create( Material.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Box , writable : true } ,

    /**
     * The depth of the box.
     * @name depth
     * @memberof molecule.render.aframe.display.Box
     * @instance
     */
    depth :
    {
        get : function() { return this.getAttribute( 'geometry' ).depth ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'depth' , value ) ; }
    },

    /**
     * The height of the box.
     * @name height
     * @memberof molecule.render.aframe.display.Box
     * @instance
     */
    height :
    {
        get : function() { return this.getAttribute( 'geometry' ).height ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'height' , value ) ; }
    },

    /**
     * The width of the box.
     * @name width
     * @memberof molecule.render.aframe.display.Box
     * @instance
     */
    width :
    {
        get : function() { return this.getAttribute( 'geometry' ).width ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'width' , value ) ; }
    }
}) ;
