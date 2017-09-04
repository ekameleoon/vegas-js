"use strict" ;

import { vertex } from './fragments/default-vertex.js' ;
import { fragment } from './fragments/dropshadow.js' ;

/**
 * The Drop shadow filter class.
 * @class
 * @extends PIXI.Filter
 * @memberof molecule.renders.pixi.filters
 * @param {number} [rotation=45] The angle of the shadow in degrees.
 * @param {number} [distance=5] Distance of shadow
 * @param {number} [blur=2] Blur of the shadow
 * @param {number} [color=0x000000] Color of the shadow
 * @param {number} [alpha=0.5] Alpha of the shadow
 */
export function DropShadowFilter( rotation = 45, distance = 5, blur = 2, color = 0x000000, alpha = 0.5 )
{
    PIXI.Filter.call(this);

    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        tintFilter : { writable : false , value : new PIXI.Filter( vertex , fragment ) },
        blurFilter : { writable : false , value : new PIXI.filters.BlurFilter() },
        _distance  : { writable : true  , value : 5 } ,
    });

    this.alpha    = alpha;
    this.color    = color;
    this.distance = distance ;
    this.rotation = rotation ;
    this.padding  = distance ;
}

DropShadowFilter.prototype = Object.create( PIXI.Filter.prototype ,
{
    constructor : { value : DropShadowFilter , writable : true } ,

    /**
     * The alpha of the shadow between 0 and 1.
     * @memberof molecule.renders.pixi.filters.DropShadowFilter
     * @instance
     * @type {number}
     * @default 1
     */
    alpha :
    {
        get : function() { return this.tintFilter.uniforms.alpha; } ,
        set : function(value) { this.tintFilter.uniforms.alpha = value; }
    },

    /**
     * The color of the shadow.
     * @memberof molecule.renders.pixi.filters.DropShadowFilter
     * @instance
     * @type {number}
     * @default 0x000000
     */
    color :
    {
        get : function() { return PIXI.utils.rgb2hex(this.tintFilter.uniforms.color) ; } ,
        set : function(value)
        {
            PIXI.utils.hex2rgb(value, this.tintFilter.uniforms.color);
        }
    },

    /**
     * The blur of the shadow.
     * @memberof molecule.renders.pixi.filters.DropShadowFilter
     * @instance
     * @type {number}
     * @default 2
     */
    blur :
    {
        get : function() { return this.blurFilter.blur; } ,
        set : function( value )
        {
            this.blurFilter.blur = value;
            this.updatePadding();
        }
    },

    /**
     * Distance offset of the shadow.
     * @memberof molecule.renders.pixi.filters.DropShadowFilter
     * @instance
     * @type {number}
     * @default 5
     */
    distance :
    {
        get : function() { return this._distance; } ,
        set : function(value)
        {
            this._distance = value;
            this.updatePadding();
        }
    },

    /**
     * The angle of the shadow in degrees
     * @memberof molecule.renders.pixi.filters.DropShadowFilter
     * @instance
     * @type {number}
     * @default 2
     */
    rotation :
    {
        get : function() { return this.angle / PIXI.DEG_TO_RAD; },
        set : function( value ) { this.angle = value * PIXI.DEG_TO_RAD; }
    },

    /**
     * Apply the filter.
     * @memberof molecule.renders.pixi.filters.DropShadowFilter
     * @instance
     * @function
     */
    apply : { value : function( filterManager, input, output )
    {
        const target = filterManager.getRenderTarget();

        target.transform = new PIXI.Matrix() ;

        target.transform.translate
        (
            this._distance * Math.cos(this.angle),
            this._distance * Math.sin(this.angle)
        );

        this.tintFilter.apply(filterManager, input, target, true);
        this.blurFilter.apply(filterManager, target, output);

        PIXI.Filter.prototype.apply.call( this , filterManager, input, output);

        target.transform = null ;

        filterManager.returnRenderTarget(target);
    }},

    /**
     * Updates the padding.
     * @memberof molecule.renders.pixi.filters.DropShadowFilter
     * @instance
     * @function
     */
    updatePadding : { value : function()
    {
        this.padding = this.distance + (this.blur * 2);
    }}
});