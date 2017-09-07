"use strict" ;

import { Node } from './Node.js' ;

/**
 * Creates a new Head instance.
 * @name Head
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Stage
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 */
export function Head( init = null )
{
    Node.call( this , init , document.head || document.createElement('head') ) ;
}

Head.prototype = Object.create( Node.prototype ,
{
    constructor : { value : Head , writable : true } ,

    /**
     * The string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof molecule.render.dom.display.Head
     * @function
     * @instance
     */
    toString : { writable : true , value : function ()
    {
        return '[Head]' ;
    }}
}) ;
