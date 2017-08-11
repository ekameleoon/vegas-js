"use strict" ;

import { Node } from './Node.js' ;

/**
 * Creates a new Div instance.
 * @name Div
 * @class
 * @memberof molecule.render.node.display
 * @extends molecule.render.dom.display.Node
 */
export function Div ()
{
    Node.call( this , null , 'div' ) ;
}

Div.prototype = Object.create( Node.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Div , writable : true } 
}) ;
