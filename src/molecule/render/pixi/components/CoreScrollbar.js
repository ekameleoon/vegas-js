/*jshint unused: false*/
"use strict" ;

import { Direction } from './graphics/Direction.js' ;
import { isMeasurable } from './graphics/isMeasurable.js' ;

import { CoreProgress } from './CoreProgress.js' ;

/**
 * This class provides a skeletal implementation of all the Scrollbar display components, to minimize the effort required to implement this interface.
 * @name CoreScrollbar
 * @memberof molecule.render.pixi.components
 * @extends molecule.render.pixi.components.CoreProgress
 * @class
 * @constructor
 * @param {PIXI.Texture} [texture=null] - The texture for this sprite.
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 * @param {Boolean} [locked=false] - The flag to lock the new current object when is created.
 * @version 1.0.8
 * @since 1.0.8
 */
export function CoreScrollbar( texture = null , init = null , locked = false )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _background     : { writable : true , value : null } ,
        _invert         : { writable : true , value : false } ,
        _lockPosition   : { writable : true , value : false } ,
        _lineScrollSize : { writable : true , value : 1 } ,
        _pageSize       : { writable : true , value : 0 } ,
        _thumb          : { writable : true , value : null } ,
        _thumbSize      : { writable : true , value : null }
    }) ;

    CoreProgress.call( this , texture , init , locked ) ;
}

CoreScrollbar.prototype = Object.create( CoreProgress.prototype ,
{
    constructor : { writable : true , value : CoreScrollbar } ,

    /**
     * The internal background reference of the component.
     * @memberof molecule.render.pixi.components.CoreScrollbar
     * @instance
     * @type {PIXI.DisplayObject}
     */
    background : { get : function() { return this._background ; } },

    /**
     * Indicates if the layout direction of the thumb is inverted.
     * @memberof molecule.render.pixi.components.CoreScrollbar
     * @instance
     * @type {boolean}
     */
    invert :
    {
        get : function() { return this._invert ; },
        set : function( value )
        {
            this._invert = value === true ;
            this.update() ;
        }
    },

    /**
     * Determines how much the scrollbar's value will change when one of the arrow buttons is clicked.
     * If the scrollbar is being used to control something like a text area, this should probably be set to one, to cause the text to scroll one line.
     * If it is scrolling a picture or movie clip, it should probably be set to a larger amount.
     * @memberof molecule.render.pixi.components.CoreScrollbar
     * @instance
     * @type {number}
     */
    lineScrollSize :
    {
        get : function() { return this._lineScrollSize ; },
        set : function( value ) { this._lineScrollSize = value > 1 ? value : 1 ; }
    },

    /**
     * Determines the amount the value will change if the user clicks above or below the thumb.
     * If this amount is 0 the thumb will move with the lineScrollSize value.
     * @memberof molecule.render.pixi.components.CoreScrollbar
     * @instance
     * @type {number}
     */
    pageSize :
    {
        get : function() { return (this._pageSize > 0) ? this._pageSize : this._lineScrollSize ; },
        set : function( value ) { this._pageSize = value > 0 ? value : 0 ; }
    },

    /**
     * The internal thumb reference of the component.
     * @memberof molecule.render.pixi.components.CoreScrollbar
     * @instance
     * @type {PIXI.DisplayObject}
     */
    thumb : { get : function() { return this._thumb ; } },

    /**
     * Determinates the size of the thumb.
     * @memberof molecule.render.pixi.components.CoreScrollbar
     * @type {number}
     * @instance
     */
    thumbSize :
    {
        get : function()
        {
            if( this._thumbSize === null || isNaN( this._thumbSize ) )
            {
                return this._direction === Direction.HORIZONTAL ? ( this.h - this._padding.vertical )
                                                                : ( this.w - this._padding.horizontal ) ;
            }
            else
            {
                return this._direction === Direction.HORIZONTAL ? Math.min( this._thumbSize , this.w )
                                                                : Math.min( this._thumbSize , this.h ) ;
            }
        } ,
        set : function( value )
        {
            this._thumbSize = ((value === null) || isNaN(value)) ? null : value ;
        }
    },

    /**
     * Invoked when the position of the bar is changed.
     * @param {boolean} [flag=false] - An optional boolean. By default this flag is passed-in the setPosition method.
     * @memberof molecule.render.pixi.components.CoreScrollbar
     */
    viewPositionChanged : { writable : true , value : function( /* flag = false */ )
    {
        this._fixPosition() ;
        if( this._thumb && !this._lockPosition )
        {
            let $hor = this._padding.horizontal ;
            let $ver = this._padding.vertical ;

            let $l = this._padding.left ;
            let $t = this._padding.top ;
            let $w = this.w ;
            let $h = this.h ;

            let range ;
            if( this._direction !== Direction.HORIZONTAL )
            {
                range = $h - this.thumbSize - $ver ;
                this._thumb.x = $l + this._real.x ;
                this._thumb.y = $t + this._real.y + (this._position - this._min) / (this._max - this._min) * range ;
                if ( this._invert )
                {
                    this._thumb.y = $h - $ver + this._real.y + range - this._thumb.y ;
                }
            }
            else
            {
                range = $w - this.thumbSize - $hor;
                this._thumb.x = $l + this._real.x + (this._position - this._min) / (this._max - this._min) * range ;
                this._thumb.y = $t + this._real.y ;
                if ( this._invert )
                {
                    this._thumb.x = $hor + this._real.x + range - this._thumb.x - $w*0.5 ;
                }
            }
        }
    }},

    /**
     * Fix the position of the bar to be within minimum and maximum.
     * @private
     */
    _fixPosition : { value : function()
    {
        if( this._max > this._min )
        {
            this._position = Math.min(this._position, this._max) ;
            this._position = Math.max(this._position, this._min) ;
        }
        else
        {
            this._position = Math.max(this._position, this._max) ;
            this._position = Math.min(this._position, this._min) ;
        }
    }}
});