"use strict"

import { Material } from './Material.js' ;

/**
 * Creates a new Cylinder instance.
 * @name Cylinder
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.Material
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 * @example
 * let scene = new Scene() ;
 * let cylinder = new Cylinder
 * ({
 *     color     : '#FFC65D' ,
 *     height    : 1.5 ,
 *     radius    : 0.5 ,
 *     x         : 1 ,
 *     y         : 0.75 ,
 *     z         : 1
 * }) ;
 * addChild( cylinder ) ;
 */
export function Cylinder( init = null )
{
    Material.call( this , init , 'a-cylinder' ) ;
}

Cylinder.prototype = Object.create( Material.prototype ,
{
    constructor : { value : Cylinder , writable : true } ,

    /**
     * The height of the cylinder.
     * @name height
     * @memberof molecule.render.aframe.display.Cylinder
     * @instance
     */
    height :
    {
        get : function() { return this.getAttribute( 'geometry' ).height ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'height' , value ) ; }
    },

    /**
     * The radius reference of the element.
     * @name radius
     * @memberof molecule.render.aframe.display.Cylinder
     * @instance
     */
    radius :
    {
        get : function() { return this.getAttribute( 'geometry' ).radius ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'radius' , value ) ; }
    }
}) ;
