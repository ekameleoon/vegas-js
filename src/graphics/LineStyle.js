"use strict" ;

import { clamp } from '../core/maths/clamp.js' ;

/**
 * Defines the line style of the vector shapes.
 * @summary The line style of the vector shapes.
 * @name LineStyle
 * @memberof graphics
 * @class
 * @param {number} [thickness=1] - An integer that indicates the thickness of the line in points ; valid values are 0 to 255.
 * @param {number} [color=0] - An hexadecimal color value of the line
 * @param {number} [alpha=1] - A number that indicates the alpha value of the color of the line; valid values are 0 to 1.
 */
export function LineStyle( thickness = 1 , color = 0 , alpha = 1 )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _alpha : { writable : true , value : clamp(alpha,0,1) } ,
        _color : { writable : true , value : clamp(color,0,0xFFFFFF) } ,
        _thickness : { value : clamp(thickness,0,0xFF) , writable : true }
    });
}

Object.defineProperties( LineStyle ,
{
    /**
     * The empty LineStyle singleton.
     * @name EMPTY
     * @memberof graphics.LineStyle
     * @static
     * @type {graphics.LineStyle}
     */
    EMPTY : { value : new LineStyle(0,0,0) }
});

LineStyle.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : LineStyle } ,

    /**
     * A number that indicates the alpha value of the color of the line; valid values are 0 to 1.
     * If a value is not indicated, the default is 1 (solid). If the value is less than 0, the default is 0. If the value is greater than 1, the default is 1.
     * @name alpha
     * @memberof graphics.LineStyle
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
     * An hexadecimal color value of the line; for example, red is 0xFF0000, blue is 0x0000FF, and so on.
     * If a value is not indicated, the default is 0x000000 (black).
     * @name alpha
     * @memberof graphics.LineStyle
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
     * An integer that indicates the thickness of the line in points ; valid values are 0 to 255.
     * If a number is not specified, or if the parameter is undefined, a line is not drawn.
     * If a value of less than 0 is passed, the default is 0.
     * The value 0 indicates hairline thickness ; the maximum thickness is 255.
     * If a value greater than 255 is passed, the default is 255.
     * @name thickness
     * @memberof graphics.LineStyle
     * @default 0
     * @type {number}
     * @instance
     */
    thickness :
    {
        get : function() { return this._thickness ; },
        set : function( value ) { this._thickness = clamp(isNaN(value)?0:value,0,0xFF) ; }
    },

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof graphics.LineStyle
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new LineStyle( this._thickness , this._color, this._alpha ) ;
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
        if( !(source instanceof LineStyle) )
        {
            throw TypeError( this + ' copyFrom failed, the passed-in source argument must be an LineStyle object.' ) ;
        }
        this._thickness = source._thickness ;
        this._color = source._color ;
        this._alpha = source._alpha ;
        return this ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return {boolean} <code>true</code> if the the specified object is equal with this object.
     * @name equals
     * @memberof graphics.LineStyle
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof LineStyle )
        {
            return o._color === this._color && o._alpha === this._alpha && o._thickness === this._thickness ;
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
     * @memberof graphics.LineStyle
     * @param {number} [thickness=1] - An integer that indicates the thickness of the line in points ; valid values are 0 to 255.
     * @param {number} [color=0] - An hexadecimal color value of the line
     * @param {number} [alpha=1] - A number that indicates the alpha value of the color of the line; valid values are 0 to 1.
     */
    setTo : { writable : true , value : function( thickness = 1 , color = 0 , alpha = 1 )
    {
        this.thickness = thickness ;
        this.color     = color ;
        this.alpha     = alpha ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @name toObject
     * @memberof graphics.LineStyle
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return { alpha:this._alpha , color:this._color , thickness:this._thickness } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} The string representation of this instance.
     * @memberof graphics.LineStyle
     * @name toString
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[LineStyle thickness:" + this._thickness + " color:" + this._color + " alpha:" + this._alpha + "]" ;
    }}
});