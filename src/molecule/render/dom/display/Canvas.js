"use strict" ;

import { isString }  from './core/isString.js' ;
import { Node } from './Node.js' ;

/**
 * Creates a new Canvas instance.
 * @name Canvas
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 * @param {String|HTMLCanvasElement} [tag=null] - The name of the tag to create when the new entity is created or a CanvasHTMLElement reference.
 */
export function Canvas( init = null , tag = null )
{
    Node.call( this , init , (tag instanceof HTMLCanvasElement || isString(tag)) ? tag : null ) ;
}

Canvas.prototype = Object.create( Node.prototype ,
{
    constructor : { value : Canvas , writable : true } ,

    /**
     * The string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof molecule.render.dom.display.Canvas
     * @function
     * @instance
     */
    toString : { writable : true , value : function ()
    {
        return '[Canvas]' ;
    }}
}) ;
