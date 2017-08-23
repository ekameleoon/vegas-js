"use strict" ;

import { Element } from './molecule/render/pixi/display/Element.js' ;
import { FillStyle } from './graphics/FillStyle.js' ;
import { LineStyle } from './graphics/LineStyle.js' ;

/**
 * This display is used to create a background in your application or in an other display of the application.
 * @name Background
 * @class
 * @memberof molecule.render.pixi.display
 * @extends molecule.render.pixi.display.Element
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 * @param {Boolean} [locked=false] - The flag to lock the new current object when is created.
 * @constructor
 * @example
 * "use strict" ;
 *
 * if( !vegas )
 * {
 *     throw new Error("The VEGAS library is not found.") ;
 * }
 *
 * window.onload = function()
 * {
 *     // ---------------- Dependencies
 *
 *     var global   = vegas.global ; // jshint ignore:line
 *     var trace    = vegas.trace  ; // jshint ignore:line
 *     var core     = vegas.core   ; // jshint ignore:line
 *     var graphics = vegas.graphics   ; // jshint ignore:line
 *     var system   = vegas.system ; // jshint ignore:line
 *     var molecule = vegas.molecule ; // jshint ignore:line
 *
 *     var Application = PIXI.Application ;
 *     var Body        = molecule.render.dom.display.Body ;
 *     var Canvas      = molecule.render.dom.display.Canvas ;
 *
 *     var Align      = graphics.Align ;
 *     var Background = molecule.render.pixi.display.Background ;
 *     var FillStyle  = graphics.FillStyle ;
 *     var LineStyle  = graphics.LineStyle ;
 *
 *     // ----------------
 *
 *     var app    = new Application();
 *     var body   = new Body() ;
 *     var canvas = new Canvas( null , app.view ) ;
 *     var stage  = app.stage ;
 *
 *     body.addChild( canvas );
 *
 *     var background = new Background
 *     ({
 *         w : 200 ,
 *         h : 200 ,
 *         fill : new FillStyle( 0xFF0000 ) ,
 *         line : new LineStyle( 1 , 0xFFFFFF)
 *     });
 *
 *     background.x = app.renderer.width  * 0.5 ;
 *     background.y = app.renderer.height * 0.5 ;
 *
 *     background.align = Align.CENTER ; // see graphics.Align
 *
 *     stage.addChild( background ) ;
 * }
 */
export function Background( init = null , locked = false )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _background : { value : new PIXI.Graphics()     } ,
        _fill       : { writable : true , value : null  } ,
        _line       : { writable : true , value : null  }
    });

    Element.call( this , PIXI.Texture.EMPTY , init , true ) ;

    this.registerViews() ;

    if( locked )
    {
        this.lock() ;
    }

    this.update() ;

    if( locked )
    {
        this.unlock() ;
    }
}

Background.prototype = Object.create( Element.prototype ,
{
    constructor : { value : Background } ,

    /**
     * The internal {PIXI.Graphics} reference of the background.
     * @memberof molecule.render.pixi.display.Background
     * @instance
     * @type {graphics.LineStyle}
     */
    background : { get : function() { return this._background ; } },

    /**
     * Determinates the {graphics.LineStyle|LineStyle} of the background.
     * @memberof molecule.render.pixi.display.Background
     * @instance
     * @type {graphics.LineStyle}
     */
    line :
    {
        get : function() { return this._line ; },
        set : function( value )
        {
            this._line = value instanceof LineStyle ? value : null ;
            this.update() ;
        }
    },

    /**
     * Determinates the {graphics.FillStyle|FillStyle} of the background.
     * @memberof molecule.render.pixi.display.Background
     * @instance
     * @type {graphics.FillStyle}
     */
    fill :
    {
        get : function() { return this._fill ; },
        set : function( value )
        {
            this._fill = value instanceof FillStyle ? value : null ;
            this.update() ;
        }
    },

    /**
     * Draw the display.
     * @name draw
     * @memberof molecule.render.pixi.display.Background
     * @instance
     * @function
     */
    draw : { writable : true , value : function()
    {
        this.fixArea() ;

        this._background.clear() ;

        if( this._fill instanceof FillStyle )
        {
            this._background.beginFill(this._fill._color,this._fill._alpha);
        }
        if( this._line instanceof LineStyle )
        {
            this._background.lineStyle(this._line._thickness,this._line._color,this._line._alpha) ;
        }

        this._background.drawRect
        (
            this._real.x,
            this._real.y,
            this._real.width,
            this._real.height
        ) ;
    }},

    /**
     * @private
     */
    registerViews : { writable : true , value : function()
    {
        if( this.children.length > 0 )
        {
            this.removeChildren() ;
        }
        this.addChild( this._background ) ;
    }}
}) ;
