"use strict"

import { Material } from './Material.js' ;

/**
 * Creates a new Assets instance.
 * @name Sphere
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.Material
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 * @example
 * let scene = new Scene() ;
 * let sphere = new Sphere
 * ({
 *     color     : '#EF2D5E' ,
 *     radius    : 1.25 ,
 *     x         : 0 ,
 *     y         : 1.25 ,
 *     z         : -1
 * }) ;
 * scene.addChild( sphere ) ;
 */
export function Sphere( init = null )
{
    Material.call( this , init , 'a-sphere' ) ;
}

Sphere.prototype = Object.create( Material.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Sphere , writable : true } ,

    /**
     * The radius reference of the element.
     * @name radius
     * @memberof molecule.render.aframe.display.Sphere
     * @instance
     */
    radius :
    {
        get : function() { return this.getAttribute( 'geometry' ).radius ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'radius' , value ) ; }
    }
}) ;
