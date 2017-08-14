"use strict" ;

import { isString }  from './core/isString.js' ;
import { isSVGElement } from './core/dom/isSVGElement.js' ;

import { Node } from './Node.js' ;

import { DisplayObjectContainer } from '../../../display/DisplayObjectContainer.js' ;

/**
 * Creates a new Svg instance.
 * @name Svg
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 */
export function Svg ( init = null , tag = 'svg' )
{
    let xmlns = "http://www.w3.org/2000/svg" ;
    let el = null ;

    if( isSVGElement(tag) )
    {
        el = tag ;
    }
    else if( isString(tag) )
    {
        el = document.createElementNS( xmlns , tag ) ;
    }

    Object.defineProperties( this ,
    {
        _element : { value : el , writable : true }
    }) ;

    DisplayObjectContainer.call( this , init ) ;
}

Svg.prototype = Object.create( Node.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Svg , writable : true } ,

    /**
     * The enableBackground of the Svg.
     * @name enableBackground
     * @memberof molecule.render.dom.display.Svg
     * @instance
     */
    enableBackground :
    {
        get : function() { return this.getAttribute( 'enable-background' ) ; } ,
        set : function( value ) { this.setAttribute( 'enable-background' , value ) ; }
    },

    /**
     * The height of the Svg.
     * @name height
     * @memberof molecule.render.dom.display.Svg
     * @instance
     */
    height :
    {
        get : function() { return this.getAttribute( 'height' ) ; } ,
        set : function( value ) { this.setAttribute( 'height' , value ) ; }
    },

    /**
     * The viewBox of the Svg.
     * @name viewBox
     * @memberof molecule.render.dom.display.Svg
     * @instance
     */
    viewBox :
    {
        get : function() { return this._element.getAttribute( 'viewBox' ) ; } ,
        set : function( value ) { this._element.setAttribute( 'viewBox' , value ) ; }
    },

    /**
     * The width of the Svg.
     * @name width
     * @memberof molecule.render.dom.display.Svg
     * @instance
     */
    width :
    {
        get : function() { return this.getAttribute( 'width' ) ; } ,
        set : function( value ) { this.setAttribute( 'width' , value ) ; }
    },

    /**
     * The x of the entity.
     * @name x
     * @memberof molecule.render.dom.display.Svg
     * @instance
     */
    x :
    {
        get : function() { return this.getAttribute( 'x' ) ; },
        set : function(value)
        {
            this.setAttribute( 'x' , value ) ;
        }
    },

    /**
     * The y of the entity.
     * @name y
     * @memberof molecule.render.dom.display.Svg
     * @instance
     */
    y :
    {
        get : function() { return this.getAttribute( 'y' ) ; },
        set : function( value )
        {
            this.setAttribute( 'y' , value ) ;
        }
    },

}) ;
