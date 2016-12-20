/*jshint bitwise:false*/
"use strict" ;

import { RGB } from './RGB.js' ;

import { hex } from '../../core/colors/toHex.js' ;
//import { littleEndian } from '../../core/maths/littleEndian.js' ;

/**
 * The <code>RGB</code> class encapsulates an rgba color.
 * @summary Encapsulates an rgba color.
 * @name RGBA
 * @class
 * @extends graphics.colors.RGB
 * @memberof graphics.colors
 * @param {number} [r=0] - The red component, between <code>0</code> and <code>255</code>.
 * @param {number} [g=0] - The green component, between <code>0</code> and <code>255</code>.
 * @param {number} [b=0] - The blue component, between <code>0</code> and <code>255</code>.
 * @param {number} [a=0] - The alpha component, between <code>0</code> and <code>1</code>.
 */
export function RGBA( r = 0 , g = 0 , b = 0 , a = 0 )
{
    RGB.call( this , r , g , b ) ;
    Object.defineProperties( this ,
    {
        _alpha : { writable : true , enumerable : true , value : Math.max( Math.min( a , 1 ) , 0 ) }
    }) ;
}

Object.defineProperties( RGBA ,
{
    /**
     * Returns the RGBA representation of the color number passed in argument.
     * @name fromNumber
     * @memberof graphics.colors.RGBA
     * @function
     * @example
     * var rgb = RGBA.fromNumber( 0xFFEA6F51 ) ;
     * trace(rgb) ; // [RGB r:234 g:111 b:81 a:1 hex:0xFFEA6F51]
     * @param {number} value - The numeric value to create a new RGB instance.
     * @return the RGB representation of the color number passed in argument.
     */
    fromNumber : { value : function( value )
    {
        return (new RGBA()).fromNumber( value ) ;
    }}
}) ;

RGBA.prototype = Object.create( RGB.prototype ,
{
    /**
     * The alpha component, between 0 and 1.
     * @name a
     * @memberof graphics.colors.RGBA
     * @instance
     * @type number
     */
    a :
    {
        get : function() { return this._alpha ; } ,
        set : function( value )
        {
            this._alpha = Math.max( Math.min( isNaN(value) ? 0 : value , 1 ) , 0 ) ;
        }
    },

    /**
     * Creates and returns a shallow copy of the object.
     * @return A new object that is a shallow copy of this instance.
     * @name clone
     * @memberof graphics.colors.RGBA
     * @instance
     * @function
     */
    clone : { value : function()
    {
        return new RGBA( this._red , this._green , this._blue , this._alpha ) ;
    }},

    /**
     * Transforms the alpha, red, green and blue components of the color in this difference color representation.
     * @name difference
     * @memberof graphics.colors.RGBA
     * @instance
     * @function
     */
    difference : { value : function()
    {
        this._red   = 0xFF - this._red   ;
        this._green = 0xFF - this._green ;
        this._blue  = 0xFF - this._blue  ;
        this._alpha = 1    - this._alpha ;
    }},

    /**
     * Compares the specified object with this object for equality.
     * @param {object} o - The object to evaluates.
     * @return <code>true</code> if the the specified object is equal with this object.
     * @name equals
     * @memberof graphics.colors.RGB
     * @instance
     * @function
     */
    equals : { value : function( o )
    {
        if ( o === this )
        {
            return true ;
        }
        else if ( o instanceof RGBA )
        {
            return this._red === o._red && o._green === this._green && o._blue === this._blue && this._alpha === o._alpha ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Sets the red, green and blue components with the specified number value.
     * @name fromNumber
     * @memberof graphics.colors.RGB
     * @instance
     * @function
     * @param {number} value - The hexadecimal value of the color.
     * @param The current RGB reference.
     */
    fromNumber : { value : function( value )
    {
        this._red   = ((value & 0xff000000) >>> 24);
        this._green = ((value & 0x00ff0000) >>> 16);
        this._blue  = ((value & 0x0000ff00) >>> 8);
        this._alpha = ((value & 0x000000ff)) / 0xFF ;
        return this ;
    }},

    /**
     * Interpolate the color and returns a new RGBA object.
     * @name interpolate
     * @memberof graphics.colors.RGBA
     * @instance
     * @function
     * @param {graphics.colors.RGBA} to - The RGBA reference used to interpolate the current RGBA object.
     * @param {number} [level=1] - The level of the interpolation as a decimal, where <code>0</code> is the start and <code>1</code> is the end.
     * @return The interpolate RGBA reference of the current color.
     */
    interpolate : { value : function( to , level = 1 )
    {
        let p = Math.max( Math.min( isNaN(level) ? 0 : level , 1 ) , 0 ) ;
        let q = 1 - p ;
        return new RGBA
        (
            this._red   * q + to._red   * p ,
            this._green * q + to._green * p ,
            this._blue  * q + to._blue  * p ,
            this._alpha * q + to._alpha * p
        ) ;
    }},

    /**
     * Interpolates the color and returns a number rgba value.
     * @name interpolate
     * @memberof graphics.colors.RGBA
     * @instance
     * @function
     * @param {graphics.colors.RGBA} to - The RGB reference used to interpolate the current RGB object.
     * @param {number} [level=1] - The level of the interpolation as a decimal, where <code>0</code> is the start and <code>1</code> is the end.
     * @return The interpolate RGBA number value of the current color.
     */
    interpolateToNumber : { value : function( to , level = 1 )
    {
        let p = Math.max( Math.min( isNaN(level) ? 0 : level , 1 ) , 0 ) ;
        let q = 1 - p ;
        let r = this._red   * q + to._red   * p ;
        let g = this._green * q + to._green * p ;
        let b = this._blue  * q + to._blue  * p ;
        let a = this._alpha * q + to._alpha * p ;
        return (r << 24) | (g << 16) | (b << 8) | a ;
    }},

    /**
     * Sets all tree components of a rgba color.
     * @name setTo
     * @memberof graphics.colors.RGBA
     * @instance
     * @function
     * @param {number} [r=0] - The red component, between <code>0</code> and <code>255</code>.
     * @param {number} [g=0] - The green component, between <code>0</code> and <code>255</code>.
     * @param {number} [b=0] - The blue component, between <code>0</code> and <code>255</code>.
     * @param {number} [a=0] - The alpha component, between <code>0</code> and <code>1</code>.
     * @return The current RGBA reference.
     */
    setTo : { value : function( r = 0 , g = 0 , b = 0 , a = 0)
    {
        this._red   = Math.max( Math.min( r , 0XFF ) , 0 ) ;
        this._green = Math.max( Math.min( g , 0XFF ) , 0 ) ;
        this._blue  = Math.max( Math.min( b , 0XFF ) , 0 ) ;
        this._alpha = Math.max( Math.min( a , 1    ) , 0 ) ;
        return this ;
    }},

    /**
     * Returns the full String representation of the color.
     * @name toHexString
     * @memberof graphics.colors.RGBA
     * @instance
     * @function
     * @param {string} [prefix=#] - The string prefix of the final expression (default #).
     * @param {boolean} [upper=true] - Indicates if the string result is uppercase.
     * @return the full String representation of the color.
     */
    toHexString : { value : function( prefix = "#" , upper = true  )
    {
        return prefix + hex( this._red , upper ) + hex( this._green , upper ) + hex( this._blue , upper) + hex( this._alpha * 0xFF , upper);
    }},

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @name toString
     * @memberof graphics.colors.RGB
     * @instance
     * @function
     */
    toString : { value : function()
    {
        return "[RGBA r:" + this._red + " g:" + this._green + " b:" + this._blue + " a:" + this._alpha + "]";
    }},

    /**
     * Returns the real value of the object.
     * @return the real value of the object.
     */
    valueOf : { writable : true , value : function()
    {
        // let r = this._red  ;
        // let g = this._green ;
        // let b = this._blue  ;
        // let a = this._alpha * 0xFF ;
        // // //return ( (r << 24) | (g << 16) | (b <<  8) | a ) >>> 0 ;
        // // return littleEndian ? ( (a << 24) + (b << 16) + (g <<  8) + r )
        // //                     : ( (r << 24) + (g << 16) + (b <<  8) + a ) ;
        // return (r << 24 | g << 16 | b << 8 | a);
        return parseInt( '0x' + hex( this._red ) + hex( this._green ) + hex( this._blue ) + hex( this._alpha * 0xFF ) ) ; // FIXME
    }}
})
