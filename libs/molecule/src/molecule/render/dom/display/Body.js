"use strict" ;

import { Stage } from './Stage.js' ;

/**
 * Creates a new Body instance.
 * @name Body
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Stage
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 */
export function Body( init = null )
{
    Stage.call( this , init , document.body || document.createElement('body') ) ;
}

Body.prototype = Object.create( Stage.prototype ,
{
    constructor : { value : Body , writable : true } ,

    /**
     * The string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof molecule.render.dom.display.Body
     * @function
     * @instance
     */
    toString : { writable : true , value : function ()
    {
        return '[Body]' ;
    }}
}) ;
