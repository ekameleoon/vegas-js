"use strict" ;

import { Node } from './Node.js' ;

/**
 * Creates a new Paragraph instance.
 * @name Paragraph
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 */
export function Paragraph ()
{
    Node.call( this , null , 'p' ) ;
}

Paragraph.prototype = Object.create( Node.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Paragraph , writable : true } ,

    /**
     * The text of the button.
     * @name text
     * @memberof molecule.render.dom.display.Paragraph
     * @instance
     */
    text :
    {
        get : function() { return this._element.innerHTML ; } ,
        set : function( value ) { this._element.innerHTML = value ; }
    }
}) ;
