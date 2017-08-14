"use strict" ;

import { Node } from './Node.js' ;

/**
 * Creates a new Anchor instance.
 * @name Anchor
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 */
export function Anchor ()
{
    Node.call( this , null , 'a' ) ;
}

Anchor.prototype = Object.create( Node.prototype ,
{
    constructor : { value : Anchor , writable : true } ,

    /**
     * The id of the element.
     * @name id
     * @memberof molecule.render.aframe.display.Anchor
     * @instance
     */
    id :
    {
        get : function() { return this.element.id ; },
        set : function( value )
        {
            this.element.id = value;
        }
    },

    /**
     * The class of the element.
     * @name class
     * @memberof molecule.render.aframe.display.Anchor
     * @instance
     */
    class :
    {
        get : function() { return this.element.classList ; },
        set : function( value )
        {
            if( !this.element.classList.contains( value ) )
            {
                this.element.classList.add( value ) ;
            }
        }
    },

    /**
     * The href of the element.
     * @name href
     * @memberof molecule.render.aframe.display.Anchor
     * @instance
     */
    href :
    {
        get : function() { return this.element.href ; },
        set : function( value )
        {
            this.element.href = value;
        }
    }
}) ;
