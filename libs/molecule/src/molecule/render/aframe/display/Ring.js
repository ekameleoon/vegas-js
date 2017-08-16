"use strict"

import { Material } from './Material.js' ;

/**
 * Creates a new Ring instance.
 * @name Ring
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.Material
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 */
export function Ring( init = null )
{
    Material.call( this , init , 'a-ring' ) ;
}

Ring.prototype = Object.create( Material.prototype ,
{
    constructor : { value : Ring , writable : true } ,

    /**
     * The radiusInner of the ring.
     * @name radiusInner
     * @memberof molecule.render.aframe.display.Ring
     * @instance
     */
    radiusInner :
    {
        get : function() { return this.getAttribute( 'geometry' ).radiusInner ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'radiusInner' , value ) ; }
    },

    /**
     * The radiusOuter of the ring.
     * @name radiusOuter
     * @memberof molecule.render.aframe.display.Ring
     * @instance
     */
    radiusOuter :
    {
        get : function() { return this.getAttribute( 'geometry' ).radiusOuter ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'radiusOuter' , value ) ; }
    },

    /**
     * The thetaLength of the ring.
     * @name thetaLength
     * @memberof molecule.render.aframe.display.Ring
     * @instance
     */
    thetaLength :
    {
        get : function() { return this.getAttribute( 'geometry' ).thetaLength ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'thetaLength' , value ) ; }
    },

    /**
     * The thetaStart of the ring.
     * @name thetaStart
     * @memberof molecule.render.aframe.display.Ring
     * @instance
     */
    thetaStart :
    {
        get : function() { return this.getAttribute( 'geometry' ).thetaStart ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'thetaStart' , value ) ; }
    }
}) ;
