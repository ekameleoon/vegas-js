"use strict" ;

import { Node } from './Node.js' ;

/**
 * Creates a new Button instance.
 * @name Button
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 */
export function Button ()
{
    Node.call( this , null , 'button' ) ;
}

Button.prototype = Object.create( Node.prototype ,
{
    constructor : { value : Button , writable : true } ,

    /**
     * The text of the button.
     * @name text
     * @memberof molecule.render.dom.display.Button
     * @instance
     */
    text :
    {
        get : function() { return this._element.innerHTML ; } ,
        set : function( value ) { this._element.innerHTML = value ; }
    },

    /**
     * The type of the button.
     * @name type
     * @memberof molecule.render.dom.display.Button
     * @instance
     */
    type :
    {
        get : function() { return this.getAttribute( 'type' ) ; } ,
        set : function( value ) { this.setAttribute( 'type' , value ) ; }
    },

    /**
     * The value of the button.
     * @name value
     * @memberof molecule.render.dom.display.Button
     * @instance
     */
    value :
    {
        get : function() { return this.getAttribute( 'value' ) ; } ,
        set : function( value ) { this.setAttribute( 'value' , value ) ; }
    }
}) ;
