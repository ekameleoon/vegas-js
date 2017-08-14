"use strict" ;

import { Svg } from './Svg.js' ;

/**
 * Creates a new G instance.
 * @name G
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 */
export function G ()
{
    Svg.call( this , null , "g" ) ;
}

G.prototype = Object.create( Svg.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : G , writable : true }
}) ;
