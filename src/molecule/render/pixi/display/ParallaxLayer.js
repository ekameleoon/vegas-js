"use strict" ;

/**
 * This class defines a parallax layer.
 * @name ParallaxLayer
 * @class
 * @memberof molecule.render.pixi.display
 * @extends PIXI.Sprite
 * @constructor
 * @param {Number} [depth=0] - The default z depth value of the layer.
 */
export function ParallaxLayer( depth = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * The px value of the layer.
         * @name px
         * @memberof molecule.render.pixi.display.ParallaxLayer
         * @instance
         * @type number
         * @default 0
         */
        px : { writable : true , value : 0 } ,

        /**
         * The py value of the layer.
         * @name py
         * @memberof molecule.render.pixi.display.ParallaxLayer
         * @instance
         * @type number
         * @default 0
         */
        py : { writable : true , value : 0 } ,

        /**
         * The pz value of the layer.
         * @name pz
         * @memberof molecule.render.pixi.display.ParallaxLayer
         * @instance
         * @type number
         * @default 0
         */
        pz : { writable : true , value : depth }
    });

    PIXI.Sprite.call( this ) ;
}

ParallaxLayer.prototype = Object.create( PIXI.Sprite.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : ParallaxLayer }
}) ;