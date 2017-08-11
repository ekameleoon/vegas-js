"use strict"

import { Material } from './Material.js' ;

/**
 * Creates a new Plane instance.
 * @name Plane
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.Material
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 * @example
 * let scene = new Scene() ;
 * let plane = new Plane
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
 * scene.addChild( plane ) ;
 */
export function Plane( init = null )
{
    Material.call( this , init , 'a-plane' ) ;
}

Plane.prototype = Object.create( Material.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Plane , writable : true } ,

    /**
     * The height of the plane.
     * @name height
     * @memberof molecule.render.aframe.display.Plane
     * @instance
     */
    height :
    {
        get : function() { return this.getAttribute( 'geometry' ).height ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'height' , value ) ; }
    },

    /**
     * The width of the plane.
     * @name width
     * @memberof molecule.render.aframe.display.Plane
     * @instance
     */
    width :
    {
        get : function() { return this.getAttribute( 'geometry' ).width ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'width' , value ) ; }
    }
}) ;
