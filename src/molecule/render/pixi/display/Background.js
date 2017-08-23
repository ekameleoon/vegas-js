"use strict" ;

import { Element } from './molecule/render/pixi/display/Element.js' ;

/**
 * This display is used to create a background in your application or in an other display of the application.
 * @name Background
 * @class
 * @memberof molecule.render.pixi.display
 * @extends molecule.render.pixi.display.Element
 * @constructor
 */
export function Background( init = null , locked = false , texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
         _alpha     : { writable : true , value : 1 } ,
        _autoSize   : { writable : true , value : false } ,
        _background : { value : new PIXI.Graphics() } ,
        _color      : { writable : true , value : 0xFFFFFF }
    });

    Element.call( this , texture , init , locked ) ;

    this.addChild( this._background ) ;
}

Background.prototype = Object.create( Element.prototype ,
{
    constructor : { value : Background } ,

    /**
     * The alpha of the background.
     * @memberof molecule.render.pixi.display.Background
     * @instance
     * @type {number}
     * @default 1
     */
    alpha :
    {
        get : function() { return this._alpha ; },
        set : function( value )
        {
            this._alpha = value ;
            this.update() ;
        }
    },

    /**
     * The color of the background.
     * @memberof molecule.render.pixi.display.Background
     * @instance
     * @type {number}
     * @default 0xFFFFFF
     */
    color :
    {
        get : function() { return this._color ; },
        set : function( value )
        {
            this._color = value ;
            this.update() ;
        }
    },

    /**
     * Draw the display.
     * @name draw
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
     * @instance
     * @function
     */
    draw : { writable : true , value : function()
    {
        this._background.clear() ;
        this._background.beginFill(this._color,this._alpha);
        this._background.drawRect(0,0,this.w,this.h) ;
    }},
}) ;
