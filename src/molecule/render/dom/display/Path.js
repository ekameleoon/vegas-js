"use strict" ;

import { Svg } from './Svg.js' ;

/**
 * Creates a new Path instance.
 * @name Path
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 */
export function Path ()
{
    Svg.call( this , null , "path" ) ;
}

Path.prototype = Object.create( Svg.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Path , writable : true } ,

    /**
     * The d of the element.
     * @name d
     * @memberof molecule.render.aframe.display.Path
     * @instance
     */
    d :
    {
        get : function() { return this.getAttribute( "d" ) ; },
        set : function( value )
        {
            this.setAttribute( "d" , value );
        }
    }
}) ;
