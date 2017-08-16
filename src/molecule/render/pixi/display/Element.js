"use strict" ;

import { EdgeMetrics } from '../../../../graphics/geom/EdgeMetrics.js' ;

import { MOB } from '../../../../molecule/render/pixi/display/MOB' ;

/**
 * This class provides a skeletal implementation of all the components, to minimize the effort required to implement this interface.
 * @name Element
 * @class
 * @memberof molecule.render.pixi.display
 * @extends molecule.render.pixi.display.MOB
 * @constructor
 */
export function Element( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _border : { value : new EdgeMetrics() }
    });

    MOB.call( this , texture ) ;
}

Element.prototype = Object.create( MOB.prototype ,
{
    constructor : { value : Element } ,

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @function
     */
    toString : { value : function () { return '[Element]' ; }}
}) ;
