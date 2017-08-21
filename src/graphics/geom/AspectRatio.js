"use strict" ;

import { floor } from '../../core/maths/floor.js' ;
import { gcd } from '../../core/maths/gcd.js' ;
import { isInt } from '../../core/isInt.js' ;

import { Dimension } from './Dimension.js' ;

/**
 * The AspectRatio object encapsulates the width and height components of an object.
 * @summary The AspectRatio object encapsulates the width and height components of an object.
 * @name AspectRatio
 * @memberof graphics.geom
 * @extends graphics.geom.Dimension
 * @class
 * @constructs
 * @param {number} [width=0] - The width value.
 * @param {number} [height=0] - The height value.
 * @param {boolean} [lock=false] - This flag indicates if the aspect ratio must be keeped when the width or height values changes.
 * @param {boolean} [verbose=false] - This flag indicates if the <code>toString</code> method is verbose or not.
 */
export function AspectRatio( width = 0 , height = 0 , lock = false , verbose = false )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _aspW : { value : 0 , writable : true } ,

        /**
         * @private
         */
        _aspH : { value : 0 , writable : true } ,

        /**
         * @private
         */
        _gcd : { value : 0 , writable : true } ,

        /**
         * @private
         */
        _h : { value : isInt(height) ? height : 0 , writable : true } ,

        /**
         * @private
         */
        __lock__ : { value : lock === true , writable : true } ,

        /**
         * The verbose mode of the class used in the <code>toString()</code> method.
         * @name verbose
         * @memberof graphics.geom.AspectRatio
         * @instance
         * @type Boolean
         * @default false
         */
        verbose : { value : verbose === true , writable : true } ,

        /**
         * @private
         */
        _w : { value : isInt(width) ? width : 0 , writable : true }
    });
    this._GCD() ;
}

AspectRatio.prototype = Object.create( Dimension.prototype ,
{
    constructor : { writable : true , value : AspectRatio },

    /**
     * Determinates the greatest common divisor if the current object.
     * <p>This property cast the width and the height Number in two int objects to calculate the value.</p>
     * @name gcd
     * @memberof graphics.geom.AspectRatio
     * @type {Number}
     * @instance
     */
    gcd : { get : function() { return this._gcd ; } },

    /**
     * The height value, in pixels.
     * @name height
     * @memberof graphics.geom.AspectRatio
     * @default 0
     * @type {Number}
     * @instance
     */
    height :
    {
        get : function() { return this._h } ,
        set : function( value )
        {
            this._h = isInt(value) ? value : 0 ;
            if ( this.__lock__ )
            {
                this._w = floor(this._h * this._aspW / this._aspH,0) ;
            }
            else
            {
                this._GCD() ;
            }
        }
    },

    /**
     * The width  value, in pixels.
     * @name width
     * @memberof graphics.geom.AspectRatio
     * @default 0
     * @type {Number}
     * @instance
     */
    width :
    {
        get : function() { return this._w } ,
        set : function( value )
        {
            this._w = isInt(value) ? value : 0 ;
            if ( this.__lock__ )
            {
                this._h = floor(this._w * this._aspH / this._aspW,0) ;
            }
            else
            {
                this._GCD() ;
            }
        }
    } ,

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof graphics.geom.AspectRatio
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new AspectRatio( this.width , this.height , this.__lock__ ) ;
    }},

    /**
     * Copies all of data from the source AspectRatio object into the calling AspectRatio object.
     * @name copyFrom
     * @memberof graphics.geom.AspectRatio
     * @instance
     * @function
     */
    copyFrom : { value : function( source )
    {
        this.width  = source.width ;
        this.height = source.height ;
        return this ;
    }},

    /**
     * Returns <code>true</code> if the object is locked.
     * @return <code>true</code> if the object is locked.
     * @name isLocked
     * @memberof graphics.geom.AspectRatio
     * @function
     * @instance
     */
    isLocked : { writable : true , value : function()
    {
        return this.__lock__ ;
    }},

    /**
     * Locks the object.
     * @name lock
     * @memberof graphics.geom.AspectRatio
     * @function
     * @instance
     */
    lock : { writable : true , value : function()
    {
        this.__lock__ = true ;
    }},

    /**
     * Returns the string representation of this object.
     * @return the string representation of this object.
     * @memberof graphics.geom.AspectRatio
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        if( this.verbose === true )
        {
            return "[AspectRatio width:" + this._w + " height:" + this._h + " ratio:[" + this._aspW + ":" + this._aspH + "]]" ;
        }
        else
        {
            this.verbose = false ;
            return this._aspW + ":" + this._aspH ;
        }
    }},

    /**
     * Unlocks the object.
     * @name unlock
     * @memberof graphics.geom.AspectRatio
     * @function
     * @instance
     */
    unlock : { writable : true , value : function()
    {
        this.__lock__ = false ;
    }},

    /**
     * @private
     */
    _GCD : { value : function()
    {
        this._gcd = gcd( this._w , this._h ) ;

        this._aspW = floor( this._w / this._gcd , 0 ) ;
        this._aspH = floor( this._h / this._gcd , 0 ) ;

        if( isNaN(this._aspW) )
        {
            this._aspW = 0 ;
        }

        if( isNaN(this._aspH) )
        {
            this._aspH = 0 ;
        }
    }}
});