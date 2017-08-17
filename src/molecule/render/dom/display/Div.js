"use strict" ;

import { Node } from './Node.js' ;

/**
 * Creates a new Div instance.
 * @name Div
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 */
export function Div ()
{
    Node.call( this , null , 'div' ) ;
}

Div.prototype = Object.create( Node.prototype ,
{
    constructor : { value : Div , writable : true }
}) ;
