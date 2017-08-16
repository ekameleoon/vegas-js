"use strict" ;

import { Point } from '../../graphics/geom/Point.js' ;
import { Rectangle } from '../../graphics/geom/Rectangle.js' ;

/**
 * This class defines a layer in the Parallaxe container.
 * @name ParallaxLayer
 * @class
 * @memberof molecule.display
 * @constructor
 * @param {*} target - The DisplayObject reference of the layer.
 * @param {graphics.geom.Direction} dimension - An optional Rectangle, Dimension or object with the numeric properties "width" and "height" to defines a custom area size of the layer. By default the target parameter is used to defines this property.
 * @param {graphics.geom.Point} offset - The optional offset position of the layer (default [0,0]).
 * @param {boolean} [scaling=false] - Indicates if the layer can be scalled.
 */
export function ParallaxLayer( target , dimension = null , offset = null , scaling = false )
{
    Object.defineProperties( this ,
    {
        /**
         * The dimension of the layer.
         * @memberof molecule.display.ParallaxLayer
         * @instance
         * @type graphics.geom.Dimension
         */
        dimension : { writable : true , value : (dimension instanceof Rectangle) ? dimension : null } ,

        /**
         * The offset of the layer.
         * @memberof molecule.display.ParallaxLayer
         * @instance
         * @type graphics.geom.Point
         */
        offset : { writable : true , value : (offset instanceof Point) ? offset : null } ,

        /**
         * Indicates if the layer can be zoomed.
         * @memberof molecule.display.ParallaxLayer
         * @instance
         * @type boolean
         */
        scaling : { writable : true , value : scaling === true } ,

        /**
         * The DisplayObject target reference of the layer.
         * @memberof molecule.display.ParallaxLayer
         * @instance
         */
        target : { writable : true , value : target } ,

        /**
         * The x current delta position of the layer.
         * @memberof molecule.display.ParallaxLayer
         * @instance
         * @type number
         */
        tx : { writable : true , value : 0 } ,

        /**
         * The y current delta position of the layer.
         * @memberof molecule.display.ParallaxLayer
         * @instance
         * @type number
         */
        ty : { writable : true , value : 0 }
    });

    if( !(this.dimension) && this.target !== null )
    {
        this.dimension = new Rectangle(0,0,target.width, target.height) ;
    }
}

ParallaxLayer.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ParallaxLayer } ,

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @memberof molecule.display.ParallaxLayer
     * @instance
     * @function
     */
    toString : { value : function () { return '[ParallaxLayer]' ; }}
});