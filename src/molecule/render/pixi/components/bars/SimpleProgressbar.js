"use strict" ;

import { map } from 'core/maths/map.js' ;
import { replaceNaN } from 'core/maths/replaceNaN.js' ;

import { Align } from 'graphics/Align.js' ;
import { Direction } from 'graphics/Direction.js' ;
import { FillStyle } from 'graphics/FillStyle.js' ;
import { LineStyle } from 'graphics/LineStyle.js' ;

import { CoreProgress } from '../CoreProgress.js' ;

/**
 * The simple progress bar component.
 * @name SimpleProgressbar
 * @class
 * @memberof molecule.render.pixi.components.bars
 * @extends molecule.render.pixi.components.CoreProgress
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
 *     var global   = vegas.global ;
 *     var trace    = vegas.trace  ;
 *     var core     = vegas.core   ;
 *     var graphics = vegas.graphics ;
 *     var system   = vegas.system ;
 *     var molecule = vegas.molecule ;
 *
 *     var Application = PIXI.Application ;
 *     var Body        = molecule.render.dom.display.Body ;
 *     var Canvas      = molecule.render.dom.display.Canvas ;
 *
 *     var Align     = graphics.Align ;
 *     var FillStyle = graphics.FillStyle ;
 *     var Direction = graphics.Direction ;
 *     var EdgeMetrics = graphics.geom.EdgeMetrics ;
 *     var SimpleProgressbar = molecule.render.pixi.components.bars.SimpleProgressbar ;
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
 *     var change = function( bar )
 *     {
 *         trace( "change position: " + bar.position ) ;
 *     }
 *
 *     var bar = new SimpleProgressbar
 *     ({
 *         w         : 200 ,
 *         h         : 10  ,
 *         align     : Align.CENTER , // or Align.LEFT / Align.RIGHT
 *         direction : Direction.HORIZONTAL , // or Direction.VERTICAL
 *         padding   :  new EdgeMetrics(2,2,2,2) ,
 *         fill      : new FillStyle( 0xFFFFFF ),
 *         barAlpha  : 1,
 *         barColor  : 0xFF0000
 *     });
 *
 *     bar.changed.connect( change ) ;
 *
 *     bar.x = (app.renderer.width - bar.w) * 0.5 ;
 *     bar.y = (app.renderer.height - bar.h) * 0.5 ;
 *
 *     bar.position = 50 ;
 *
 *     stage.addChild( bar )
 * }
 * @version 1.0.8
 * @since 1.0.8
 */
export function SimpleProgressbar( init = null , locked = false , texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _background : { value : new PIXI.Graphics() } ,
        _bar        : { value : new PIXI.Graphics() } ,
        _barAlign   : { writable :  true , value : null } ,
        _barFill    : { writable : true  , value : new FillStyle(0xFF0000) } ,
        _barLine    : { writable : true  , value : null  } ,
        _fill       : { writable : true  , value : new FillStyle(0x333333) } ,
        _line       : { writable : true  , value : null  }
    });

    if( init === null )
    {
        init = { w : 200 , h : 10 } ;
    }

    CoreProgress.call( this , texture , init , true ) ;

    this.addChild( this._background ) ;
    this.addChild( this._bar ) ;

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

SimpleProgressbar.prototype = Object.create( CoreProgress.prototype ,
{
    constructor : { writable : true , value : SimpleProgressbar } ,

    /**
     * The internal background {PIXI.Graphics} reference of the component.
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
     * @instance
     * @type {PIXI.Graphics}
     */
    background : { get : function() { return this._background ; } },

    /**
     * The internal bar {PIXI.Graphics} reference of the component.
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
     * @instance
     * @type {PIXI.Graphics}
     */
    bar : { get : function() { return this._bar ; } } ,

    /**
     * The alignment of the bar element in the component. Use the Align.CENTER to center the bar, the Align.LEFT or Align.TOP or Align.BOTTOM or Align.RIGHT
     * @name barAlign
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
     * @instance
     */
    barAlign :
    {
        get : function() { return this._barAlign } ,
        set : function( value )
        {
            this._barAlign = value ;
            if ( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * Determinates the {graphics.LineStyle|LineStyle} of the of this component.
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
     * @instance
     * @type {graphics.LineStyle}
     */
    barLine :
    {
        get : function() { return this._barLine ; },
        set : function( value )
        {
            this._barLine = value instanceof LineStyle ? value : null ;
            this.update() ;
        }
    },

    /**
     * Determinates the {graphics.FillStyle|FillStyle} of the bar of this component.
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
     * @instance
     * @type {graphics.FillStyle}
     */
    barFill :
    {
        get : function() { return this._barFill ; },
        set : function( value )
        {
            this._barFill = value instanceof FillStyle ? value : null ;
            this.update() ;
        }
    },

    /**
     * Determinates the {graphics.LineStyle|LineStyle} of the background of this component.
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
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
     * Determinates the {graphics.FillStyle|FillStyle} of background of this component.
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
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
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
     * @instance
     * @function
     */
    draw : { writable : true , value : function()
    {
        this.fixArea() ;

        // ----- background

        this._background.clear() ;

        if( this._fill instanceof FillStyle )
        {
            this._background.beginFill
            (
                this._fill._color, this._fill._alpha
            );
        }

        if( this._line instanceof LineStyle )
        {
            this._background.lineStyle
            (
                this._line._thickness, this._line._color, this._line._alpha
            ) ;
        }

        this._background.drawRect
        (
            this._real.x, this._real.y, this._real.width, this._real.height
        ) ;
    }},

    /**
     * Invoked when the position of the bar is changed.
     * @param {boolean} [flag=false] - An optional boolean. By default this flag is passed-in the setPosition method.
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
     */
    viewPositionChanged : { writable : true , value : function()
    {
        let isVertical = this.direction === Direction.VERTICAL ;

        let horizontal = replaceNaN( this._padding.horizontal ) ;
        let vertical   = replaceNaN( this._padding.vertical   ) ;
        let margin     = isVertical ? vertical : horizontal ;
        let max        = isVertical ? this.h : this.w ;
        let size       = map( this.position , this.minimum, this.maximum , 0 , (max - margin) ) ;

        let $b = replaceNaN( this._padding.bottom ) ;
        let $l = replaceNaN( this._padding.left ) ;
        let $r = replaceNaN( this._padding.right ) ;
        let $t = replaceNaN( this._padding.top ) ;

        let $x = this._real.x ;
        let $y = this._real.y ;

        let $w = isVertical ? ( this._w - horizontal ) : size  ;
        let $h = isVertical ? size : ( this._h - vertical ) ;

        if( isVertical )
        {
            $x += $l ;
            if( this._barAlign === Align.BOTTOM )
            {
                $y += this.h - $h - $b ;
            }
            else if( this._barAlign === Align.CENTER )
            {
                $y += ( this.h - $h ) * 0.5 ;
            }
            else
            {
                $y += $t ;
            }
        }
        else
        {
            $y += $t ;
            if( this._barAlign === Align.RIGHT )
            {
                $x += this.w - $w - $r ;
            }
            else if( this._barAlign === Align.CENTER )
            {
                $x += ( this.w - $w) * 0.5 ;
            }
            else
            {
                $x += $l ;
            }
        }

        this._bar.clear() ;

        if( this._barFill instanceof FillStyle )
        {
            this._bar.beginFill(this._barFill._color,this._barFill._alpha);
        }

        if( this._barLine instanceof LineStyle )
        {
            this._bar.lineStyle(this._barLine._thickness,this._barLine._color,this._barLine._alpha) ;
        }

        this._bar.drawRect( $x , $y , $w , $h ) ;

        this._bar.visible = this.position > 0 ;
    }}
});