/*jshint bitwise:false*/
"use strict" ;

import { hex } from '../../core/colors/toHex.js' ;
import { clamp } from '../../core/maths/clamp.js' ;
import { normalize } from '../../core/maths/normalize.js' ;

/**
 * The <code>RGB</code> class encapsulates an rgb color.
 * @summary Encapsulates an rgb color.
 * @name RGB
 * @class
 * @memberof graphics.colors
 * @param {number} [r=0] - The red component, between <code>0</code> and <code>255</code>.
 * @param {number} [g=0] - The green component, between <code>0</code> and <code>255</code>.
 * @param {number} [b=0] - The blue component, between <code>0</code> and <code>255</code>.
 */
export function RGB( r = 0 , g = 0 , b = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _blue : { writable : true , enumerable : true , value : b } ,

        /**
         * @private
         */
        _green : { writable : true , enumerable : true , value : g } ,

        /**
         * @private
         */
        _red : { writable : true , enumerable : true , value : r } ,
    }) ;
}

Object.defineProperties( RGB ,
{
    /**
     * The maximum value specified with a color component.
     * @memberof graphics.colors.RGB
     * @const
     * @type number
     * @default 0xFF
     */
    maximum : { value : 0xFF }
}) ;

RGB.prototype = Object.create( Object.prototype ,
{
    /**
     * The blue component, between 0 and 255.
     * @name b
     * @memberof graphics.colors.RGB
     * @instance
     * @type number
     */
    b :
    {
        get : function() { return this._blue ; } ,
        set : function( value )
        {
            this._blue = Math.max( Math.min( isNaN(value) ? 0 : value , 0xFF ) , 0 ) ;
        }
    },

    /**
     * The green component, between 0 and 255.
     * @name g
     * @memberof graphics.colors.RGB
     * @instance
     * @type number
     */
    g :
    {
        get : function() { return this._green ; } ,
        set : function( value )
        {
            this._green = Math.max( Math.min( isNaN(value) ? 0 : value , 0xFF ) , 0 ) ;
        }
    },

    /**
     * Indicates the luminance of the color.
     * <p>The value is normed and lies in the range between <code>0</code> (black) and <code>255</code> (white).</p>
     * @name luminance
     * @memberof graphics.colors.RGB
     * @instance
     * @type number
     */
    luminance :
    {
        get : function() { return 0.299 * this._red + 0.587 * this._green + 0.114 * this._blue ; } ,
        set : function( value )
        {
            value = normalize(value, 0, 0xFF) ;
            let l = 0.299 * this._red + 0.587 * this._green + 0.114 * this._blue ;
            this._red   = l + ( this._red   - l ) * ( 1 - value ) ;
            this._green = l + ( this._green - l ) * ( 1 - value ) ;
            this._blue  = l + ( this._blue  - l ) * ( 1 - value ) ;
        }
    },

    /**
     * The red component, between 0 and 255.
     * @name r
     * @memberof graphics.colors.RGB
     * @instance
     * @type number
     */
    r :
    {
        get : function() { return this._red ; } ,
        set : function( value )
        {
            this._red = Math.max( Math.min( isNaN(value) ? 0 : value , 0xFF ) , 0 ) ;
        }
    },

    /**
     * Creates and returns a shallow copy of the object.
     * @return A new object that is a shallow copy of this instance.
     * @name clone
     * @memberof graphics.colors.RGB
     * @instance
     * @function
     */
    clone : { value : function()
    {
        return new RGB( this._red , this._green , this._blue ) ;
    }},

    /**
     * Transforms the red, green and blue components of the color in this difference color representation.
     * @name difference
     * @memberof graphics.colors.RGB
     * @instance
     * @function
     */
    difference : { value : function()
    {
        this._red   = RGB.maximum - this._red   ;
        this._green = RGB.maximum - this._green ;
        this._blue  = RGB.maximum - this._blue  ;
    }},

    /**
     * Calculates the distance between two rgb color values.
     * @name distance
     * @memberof graphics.colors.RGB
     * @instance
     * @function
     * @param {graphics.colors.RGB} rgb - The rgb target.
     * @example
     * var rgb = RGB.fromNumber( 0xFFFFFF ) ;
     *
     * trace( rgb.distance( RGB.fromNumber( 0x000000 ) ) ) ; // 195075
     * trace( rgb.distance( RGB.fromNumber( 0xFFEEFF ) ) ) ; // 289
     * trace( rgb.distance( RGB.fromNumber( 0xFFFFFF ) ) ) ; // 0
     *
     * rgb = RGB.fromNumber( 0xFF0000 ) ;
     *
     * trace( rgb.distance( RGB.fromNumber( 0xFF0000 ) ) ) ; // 0
     */
    distance : { value : function( rgb )
    {
        if( !(rgb instanceof RGB) )
        {
            return 0 ;
        }
        return  Math.pow( this._red   - rgb._red   , 2 ) +
                Math.pow( this._green - rgb._green , 2 ) +
                Math.pow( this._blue  - rgb._blue  , 2 ) ;
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
        else if ( o instanceof RGB )
        {
            return this._red === o._red && o._green === this._green && o._blue === this._blue ;
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
        let gb ;
        this._red = value >> 16 ;
        gb = value ^ this._red << 16 ;
        this._green  = gb >> 8 ;
        this._blue  = gb^this._green << 8 ;
        return this ;
    }},

    /**
     * Interpolate the color and returns a new RGB object.
     * @name interpolate
     * @memberof graphics.colors.RGB
     * @instance
     * @function
     * @param {graphics.colors.RGB} to - The RGB reference used to interpolate the current RGB object.
     * @param {number} [level=1] - The level of the interpolation as a decimal, where <code>0</code> is the start and <code>1</code> is the end.
     * @return The interpolate RGB reference of the current color.
     */
    interpolate : { value : function( to , level = 1 )
    {
        let p = clamp( isNaN(level) ? 1 : level , 0 , 1 ) ;
        let q = 1 - p ;
        return new RGB
        (
            this._red   * q + to._red   * p ,
            this._green * q + to._green * p ,
            this._blue  * q + to._blue  * p
        ) ;
    }},

    /**
     * Interpolates the color and returns a number rgb value.
     * @name interpolate
     * @memberof graphics.colors.RGB
     * @instance
     * @function
     * @param {graphics.colors.RGB} to - The RGB reference used to interpolate the current RGB object.
     * @param {number} [level=1] - The level of the interpolation as a decimal, where <code>0</code> is the start and <code>1</code> is the end.
     * @return The interpolate RGB number value of the current color.
     */
    interpolateToNumber : { value : function( to , level = 1 )
    {
        let p = clamp( isNaN(level) ? 1 : level , 0 , 1 ) ;
        let q = 1 - p ;
        let r = this._red   * q + to._red   * p ;
        let g = this._green * q + to._green * p ;
        let b = this._blue  * q + to._blue  * p ;
        return (r << 16) | (g << 8) | b ;
    }},

    /**
     * Sets all tree components of a rgb color.
     * @name setTo
     * @memberof graphics.colors.RGB
     * @instance
     * @function
     * @param {number} [r=0] - The red component, between <code>0</code> and <code>255</code>.
     * @param {number} [g=0] - The green component, between <code>0</code> and <code>255</code>.
     * @param {number} [b=0] - The blue component, between <code>0</code> and <code>255</code>.
     * @return The current RGB reference.
     */
    setTo : { value : function( r = 0 , g = 0 , b = 0 )
    {
        this._red   = r ;
        this._green = g ;
        this._blue  = b ;
        return this ;
    }},

    /**
     * Returns the full String representation of the color.
     * @name toHexString
     * @memberof graphics.colors.RGB
     * @instance
     * @function
     * @param {string} [prefix=#] - The string prefix of the final expression (default #).
     * @param {boolean} [upper=true] - Indicates if the string result is uppercase.
     * @return the full String representation of the color.
     */
    toHexString : { value : function( prefix = "#" , upper = true  )
    {
        return prefix + hex( this._red , upper ) + hex( this._green , upper ) + hex( this._blue , upper);
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
        return "[RGB r:" + this._red + " g:" + this._green + " b:" + this._blue + " hex:" + this.toHexString() + "]";
    }},

    /**
     * Returns the real value of the object.
     * @return the real value of the object.
     */
    valueOf : { writable : true , value : function()
    {
        return (this._red << 16) | (this._green << 8) | this._blue;
    }}
})
