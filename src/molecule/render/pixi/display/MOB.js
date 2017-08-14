"use strict" ;

import { Signal } from './system/signals/Signal.js' ;

import { clamp } from './core/maths/clamp.js' ;

/**
 * The Movable Object Block (MOB) defines an advanced Sprite object.
 * @name MOB
 * @class
 * @memberof molecule.render.pixi.display
 * @extends PIXI.Sprite
 * @constructor
 */
export function MOB( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _changed   : { value : new Signal() } ,
        _h         : { writable : true , value : 0 } ,
        _maxHeight : { writable : true , value : null } ,
        _maxWidth  : { writable : true , value : null } ,
        _minHeight : { writable : true , value : 0 } ,
        _minWidth  : { writable : true , value : 0 } ,
        _renderer  : { value : new Signal() } ,
        _resized   : { value : new Signal() } ,
        _updater   : { value : new Signal() } ,
        _w         : { writable : true , value : 0 }
    });

    PIXI.Sprite.call( this , texture ) ;
}

MOB.prototype = Object.create( PIXI.Sprite.prototype ,
{
    constructor : { value : MOB } ,

    /**
     * This signal emit when the sprite is changed.
     * @name changed
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    changed : { get : function(){ return this._changed ; } } ,

    /**
     * Determinates the virtual height value of this component.
     * @name h
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    h : {
        get : function() { return clamp( this._h , this._minHeight , this._maxHeight ) ; } ,
        set : function(value)
        {
            this._h = clamp( value , this._minHeight , this._maxHeight ) ;
            this.notifyResized() ;
        }
    },

    /**
     * This property defined the maximum height of this display.
     * @name maxHeight
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    maxHeight : {
        get : function() { return this._maxHeight ; } ,
        set : function(value)
        {
            this._maxHeight = value ;
            if( this._maxHeight < this._minHeight )
            {
                this._maxHeight = this._minHeight ;
            }
        }
    },

    /**
     * This property defined the maximum width of this display.
     * @name maxWidth
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    maxWidth :
    {
        get : function() { return this._maxWidth ; } ,
        set : function(value)
        {
            this._maxWidth = value ;
            if( this._maxWidth < this._minWidth )
            {
                this._maxWidth = this._minWidth ;
            }
        }
    },

    /**
     * This property defined the minimum height of this display.
     * @name minHeight
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    minHeight :
    {
        get : function() { return this._minHeight ; } ,
        set : function(value)
        {
            this._minHeight = value > 0 ? value : 0 ;
            if( this._minHeight > this._maxHeight )
            {
                this._minHeight = this._maxHeight ;
            }
        }
    },

    /**
     * This property defined the minimum width of this display.
     * @name minWidth
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    minWidth :
    {
        get : function() { return this._minWidth ; } ,
        set : function(value)
        {
            this._minWidth = value > 0 ? value : 0 ;
            if( this._minWidth > this._maxWidth )
            {
                this._minWidth = this._maxWidth ;
            }
        }
    },

    /**
     * Notify an event when you resize the component.
     * @name notifyResized
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    notifyResized : { writable : true , value : function()
    {
        this.viewResize() ;
        this._resized.emit( this ) ;
    }},

    /**
     * This signal emit before the rendering is started.
     * @name renderer
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    renderer : { get : function(){ return this._renderer ; } } ,

    /**
     * This signal emit when the sprite is resized.
     * @name resized
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    resized : { get : function(){ return this._resized ; } } ,

    /**
     * This signal emit after the rendering is finished.
     * @name updater
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    updater : { get : function(){ return this._updater ; } } ,

    /**
     * Invoked when the component is resized.
     * @name viewResize
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    viewResize : { value : function()
    {
        // override
    }},

    /**
     * Determinates the virtual width value of this component.
     * @name w
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    w :
    {
        get : function() { return clamp( this._w , this._minWidth , this._maxWidth ) ; } ,
        set : function(value)
        {
            this._w = clamp( value , this._minWidth , this._maxWidth ) ;
            this.notifyResized() ;
        }
    },

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     * @function
     */
    toString : { value : function () { return '[MOB]' ; }}
}) ;
