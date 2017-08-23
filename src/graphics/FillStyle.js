"use strict" ;

import { clamp } from '../core/maths/clamp.js' ;

/**
 * Defines the fill style of the vector shapes.
 * @summary The fill style of the vector shapes.
 * @name FillStyle
 * @memberof graphics
 * @class
 * @param {number} [color=0] - An hexadecimal color value of the fill.
 * @param {number} [alpha=1] - A number that indicates the alpha value of the color of the fill; valid values are 0 to 1.
 */
export function FillStyle( color = 0 , alpha = 1 )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _alpha : { writable : true , value : clamp(isNaN(alpha)?0:alpha,0,1) } ,
        _color : { writable : true , value : clamp(isNaN(color)?0:color,0,0xFFFFFF) }
    });
}

FillStyle.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : FillStyle } ,

    /**
     * A number that indicates the alpha value of the color of the fill; valid values are 0 to 1.
     * If a value is not indicated, the default is 1 (solid). If the value is less than 0, the default is 0. If the value is greater than 1, the default is 1.
     * @name alpha
     * @memberof graphics.FillStyle
     * @default 1
     * @type {number}
     * @instance
     */
    alpha :
    {
        get : function() { return this._alpha ; },
        set : function( value ) { this._alpha = clamp(isNaN(value)?0:value,0,1) ; }
    },

    /**
     * An hexadecimal color value of the fill; for example, red is 0xFF0000, blue is 0x0000FF, and so on.
     * If a value is not indicated, the default is 0x000000 (black).
     * @name alpha
     * @memberof graphics.FillStyle
     * @default 0x000000
     * @type {number}
     * @instance
     */
    color :
    {
        get : function() { return this._color ; },
        set : function( value ) { this._color = clamp(isNaN(value)?0:value,0,0xFFFFFF) ; }
    },

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof graphics.FillStyle
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new FillStyle( this._color, this._alpha ) ;
    }},

    /**
     * Copies all of vector data from the source Vector2D object into the calling Vector2D object.
     * @param {graphics.geom.Vector2D} source - The Vector2D object from which to copy the data.
     * @return The current {@link graphics.geom.Vector2D} reference.
     * @name copyFrom
     * @memberof graphics.geom.Vector2D
     * @instance
     * @function
     */
    copyFrom : { writable : true , value : function( source )
    {
        if( !(source instanceof FillStyle) )
        {
            throw TypeError( this + ' copyFrom failed, the passed-in source argument must be an FillStyle object.' ) ;
        }
        this._color = source._color ;
        this._alpha = source._alpha ;
        return this ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return {boolean} <code>true</code> if the the specified object is equal with this object.
     * @name equals
     * @memberof graphics.FillStyle
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof FillStyle )
        {
            return o._color === this._color && o._alpha === this._alpha ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Sets the horizontal and vertical coordinates of this object. If the <code>x</code> and the <code>y</code> parameters are <code>NaN</code> or <code>null</code> the <b>x</b> and <b>y</b> value are <code>0</code>.
     * @name setTo
     * @instance
     * @function
     * @memberof graphics.FillStyle
     * @param {number} [color=0] - An hexadecimal color value of the line
     * @param {number} [alpha=1] - A number that indicates the alpha value of the color of the line; valid values are 0 to 1.
     */
    setTo : { writable : true , value : function( color = 0 , alpha = 1 )
    {
        this.alpha = alpha ;
        this.color = color ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @name toObject
     * @memberof graphics.FillStyle
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return { alpha:this._alpha , color:this._color } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} The string representation of this instance.
     * @memberof graphics.FillStyle
     * @name toString
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[FillStyle color:" + this._color + " alpha:" + this._alpha + "]" ;
    }}
});

Object.defineProperties( FillStyle ,
{
    /**
     * The empty FillStyle singleton.
     * @name EMPTY
     * @memberof graphics.FillStyle
     * @static
     * @type {graphics.FillStyle}
     */
    EMPTY : { value : new FillStyle(0,0) }
});