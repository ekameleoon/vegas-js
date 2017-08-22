"use strict" ;

import { map } from './core/maths/map.js' ;
import { replaceNaN } from './core/maths/replaceNaN.js' ;

import { Align } from './graphics/Align.js' ;
import { Direction } from './graphics/Direction.js' ;

import { CoreProgress } from '../CoreProgress.js' ;

/**
 * The simple progress bar component.
 * @name SimpleProgressbar
 * @class
 * @memberof molecule.render.pixi.components.bars
 * @extends molecule.render.pixi.components.CoreProgress
 * @constructor
 */
export function SimpleProgressbar( init = null , locked = false , texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The color of the background.
         * @name backgroundAlpha
         * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
         * @instance
         */
        backgroundAlpha : { writable : true , value : 1 } ,
        backgroundColor : { writable : true , value : 0x333333 } ,

        barAlpha : { writable : true , value : 1 } ,
        barColor : { writable : true , value : 0xFFFFFF } ,

        /**
         * @private
         */
        _alignments : { value : [ Align.BOTTOM , Align.LEFT  , Align.CENTER , Align.RIGHT , Align.TOP ] } ,
        _background : { value : new PIXI.Graphics() } ,
        _bar        : { value : new PIXI.Graphics() }
    });

    CoreProgress.call( this , texture , init , locked ) ;

    this.addChild( this._background ) ;
    this.addChild( this._bar ) ;
}

SimpleProgressbar.prototype = Object.create( CoreProgress.prototype ,
{
    constructor : { writable : true , value : SimpleProgressbar } ,

    /**
     * Draw the display.
     * @name draw
     * @memberof molecule.render.pixi.components.bars.SimpleProgressbar
     * @instance
     * @function
     */
    draw : { writable : true , value : function()
    {
        this._background.beginFill(this.backgroundColor,this.backgroundAlpha);
        this._background.drawRect(0,0,this.w,this.h) ;
    }},

    /**
     * Invoked when the position of the bar is changed.
     * @param flag (optional) An optional boolean. By default this flag is passed-in the setPosition method.
     * @private
     */
    viewPositionChanged : { writable : true , value : function()
    {
        var isVertical = this.direction === Direction.VERTICAL ;

        var horizontal = replaceNaN( this._padding.horizontal ) ;
        var vertical   = replaceNaN( this._padding.vertical   ) ;
        var margin     = isVertical ? vertical : horizontal ;
        var max        = isVertical ? this.h : this.w ;
        var size       = map( this.position , this.minimum, this.maximum , 0 , (max - margin) ) ;

        var $b = replaceNaN( this._padding.bottom ) ;
        var $l = replaceNaN( this._padding.left ) ;
        var $r = replaceNaN( this._padding.right ) ;
        var $t = replaceNaN( this._padding.top ) ;

        var $w = isVertical ? ( this._w - horizontal ) : size  ;
        var $h = isVertical ? size : ( this._h - vertical ) ;

        this._bar.clear() ;
        this._bar.beginFill(this.barColor,this.barAlpha);
        this._bar.drawRect(0,0,$w,$h) ;
        this._bar.visible = this.position > 0 ;

        if ( this._align === Align.RIGHT || this._align === Align.BOTTOM )
        {
            this._bar.x = isVertical ? $l : this.w - this._bar.width - $r ;
            this._bar.y = isVertical ? this.h - this._bar.height - $b : $t ;
        }
        else if ( this._align === Align.CENTER )
        {
            this._bar.x = isVertical ? $l : ( this.w - this._bar.width) * 0.5 ;
            this._bar.y = isVertical ? ( this.h - this._bar.height ) * 0.5 : $t ;
        }
        else // Align.LEFT (default)
        {
            this._bar.x = $l ;
            this._bar.y = $t ;
        }
    }}
});