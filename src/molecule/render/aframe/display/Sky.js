"use strict"

import { Material } from './Material.js' ;

/**
 * Creates a new Assets instance.
 * @name Sky
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.Material
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 */
export function Sky( init = null )
{
    Material.call( this , init , 'a-sky' ) ;
}

Sky.prototype = Object.create( Material.prototype ,
{
    constructor : { value : Sky , writable : true } ,

    /**
     * The radius reference of the element.
     * @name radius
     * @memberof molecule.render.aframe.display.Sky
     * @instance
     */
    radius :
    {
        get : function() { return this.getAttribute( 'geometry' , 'radius' ) ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'radius' , value ) ; }
    }
}) ;
