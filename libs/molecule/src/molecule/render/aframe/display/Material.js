"use strict"

import { AEntity } from './AEntity.js' ;

/**
 * Creates a new Material instance.
 * @name Material
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.AEntity
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 */
export function Material( init = null , tag = 'a-entity' )
{
    AEntity.call( this , init , tag ) ;
}

Material.prototype = Object.create( AEntity.prototype ,
{
    constructor : { value : Material , writable : true } ,

    /**
     * The color of the element.
     * @name color
     * @memberof molecule.render.aframe.display.Material
     * @instance
     */
    color :
    {
        get : function() { return this.getAttribute( 'color' ) ; },
        set : function( value ) { this.setAttribute( 'color' , value ) ; }
    },

    /**
     * The shader reference of the element.
     * @name shader
     * @memberof molecule.render.aframe.display.Material
     * @instance
     */
    shader :
    {
        get : function() { return this.getAttribute( 'shader' ) ; } ,
        set : function( value ) { this.setAttribute( 'shader' , value ) ; }
    },

    /**
     * The side reference of the element.
     * @name shader
     * @memberof molecule.render.aframe.display.Material
     * @instance
     */
    side :
    {
        get : function() { return this.getAttribute( 'side' ) ; } ,
        set : function( value ) { this.setAttribute( 'side' , value ) ; }
    },

    /**
     * The src reference of the element.
     * @name src
     * @memberof molecule.render.aframe.display.Material
     * @instance
     */
    src :
    {
        get : function() { return this.getAttribute( 'src' ) ; } ,
        set : function( value ) { this.setAttribute( 'src' , value ) ; }
    }
}) ;
