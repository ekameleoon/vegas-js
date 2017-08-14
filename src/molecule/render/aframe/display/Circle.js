"use strict"

import { Material } from './Material.js' ;

/**
 * Creates a new Circle instance.
 * @name Circle
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.Material
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 */
export function Circle( init = null )
{
    Material.call( this , init , 'a-circle' ) ;
}

Circle.prototype = Object.create( Material.prototype ,
{
    constructor : { value : Circle , writable : true } ,

    /**
     * The radiusInner of the circle.
     * @name radiusInner
     * @memberof molecule.render.aframe.display.Circle
     * @instance
     */
    radius :
    {
        get : function() { return this.getAttribute( 'geometry' ).radius ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'radius' , value ) ; }
    },

    /**
     * The thetaLength of the circle.
     * @name thetaLength
     * @memberof molecule.render.aframe.display.Circle
     * @instance
     */
    thetaLength :
    {
        get : function() { return this.getAttribute( 'geometry' ).thetaLength ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'thetaLength' , value ) ; }
    },

    /**
     * The thetaStart of the circle.
     * @name thetaStart
     * @memberof molecule.render.aframe.display.Circle
     * @instance
     */
    thetaStart :
    {
        get : function() { return this.getAttribute( 'geometry' ).thetaStart ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'thetaStart' , value ) ; }
    }
}) ;
