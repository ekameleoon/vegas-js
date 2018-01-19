"use strict" ;

import { Direction } from 'graphics/Direction.js' ;
import { FillStyle } from 'graphics/FillStyle.js' ;
import { LineStyle } from 'graphics/LineStyle.js' ;

import { CoreScrollbar } from '../CoreScrollbar.js' ;

/**
 * The simple progress bar component.
 * @name ScrollIndicator
 * @class
 * @memberof molecule.render.pixi.components.bars
 * @extends molecule.render.pixi.components.CoreScrollbar
 * @constructor
 * @version 1.0.8
 * @since 1.0.8
 */
export function ScrollIndicator( init = null , locked = false , texture = null )
{
    /**
     * @private
     */
    Object.defineProperties( this ,
    {
        _fill       : { writable : true , value : new FillStyle(0x333333) } ,
        _line       : { writable : true , value : null  } ,
        _thumbFill  : { writable : true , value : new FillStyle(0xFF0000) } ,
        _thumbLine  : { writable : true , value : null  }
    });

    if( init === null )
    {
        init = { w : 200 , h : 10 } ;
    }

    CoreScrollbar.call( this , texture , init , true ) ;

    /**
     * @private
     */
    Object.defineProperties( this ,
    {
        _background : { writable : true , value : new PIXI.Graphics() } ,
        _thumb      : { writable : true , value : new PIXI.Graphics() } ,
    });

    this.addChild( this._background ) ;
    this.addChild( this._thumb ) ;

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

ScrollIndicator.prototype = Object.create( CoreScrollbar.prototype ,
{
    constructor : { writable : true , value : ScrollIndicator } ,

    /**
     * Determinates the {graphics.LineStyle|LineStyle} of the background of this component.
     * @memberof molecule.render.pixi.components.bars.ScrollIndicator
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
     * @memberof molecule.render.pixi.components.bars.ScrollIndicator
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
     * Determinates the {graphics.LineStyle|LineStyle} of the of this component.
     * @memberof molecule.render.pixi.components.bars.ScrollIndicator
     * @instance
     * @type {graphics.LineStyle}
     */
    thumbLine :
    {
        get : function() { return this._thumbLine ; },
        set : function( value )
        {
            this._thumbLine = value instanceof LineStyle ? value : null ;
            this.update() ;
        }
    },

    /**
     * Determinates the {graphics.FillStyle|FillStyle} of the bar of this component.
     * @memberof molecule.render.pixi.components.bars.ScrollIndicator
     * @instance
     * @type {graphics.FillStyle}
     */
    thumbFill :
    {
        get : function() { return this._thumbFill ; },
        set : function( value )
        {
            this._thumbFill = value instanceof FillStyle ? value : null ;
            this.update() ;
        }
    },

    /**
     * Draw the display.
     * @name draw
     * @memberof molecule.render.pixi.components.bars.ScrollIndicator
     * @instance
     * @function
     */
    draw : { writable : true , value : function()
    {
        this.fixArea() ;

        // ---- background

        if( this._background )
        {
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
        }

        // ---- thumb

        if( this._thumb )
        {
            this._thumb.clear() ;

            if( this._thumbFill instanceof FillStyle )
            {
                this._thumb.beginFill
                (
                    this._thumbFill._color, this._thumbFill._alpha
                );
            }

            if( this._thumbLine instanceof LineStyle )
            {
                this._thumb.lineStyle
                (
                    this._thumbLine._thickness, this._thumbLine._color, this._thumbLine._alpha
                ) ;
            }

            let isHor = this._direction === Direction.HORIZONTAL ;

            this._thumb.drawRect
            (
                0 , 0 ,
                isHor ? this.thumbSize : this._real.width - this._padding.horizontal ,
                isHor ? this._real.height - this._padding.vertical : this.thumbSize
            ) ;

            this._thumb.x = this._real.x + this._padding.left ;
            this._thumb.y = this._real.y + this._padding.top ;
        }
    }}
});