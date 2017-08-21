"use strict" ;

/**
 * The <code>EdgeMetrics</code> class specifies the thickness, in pixels, of the four edge regions around a visual component.
 * @summary The <code>EdgeMetrics</code> class specifies the thickness, in pixels, of the four edge regions around a visual component.
 * @name EdgeMetrics
 * @memberof graphics.geom
 * @class
 * @param {number} [left=0] The width, in pixels, of the left edge region.
 * @param {number} [top=0] The height, in pixels, of the top edge region.
 * @param {number} [right=0] The width, in pixels, of the right edge region.
 * @param {number} [bottom=0] The height, in pixels, of the bottom edge region.
 */
export function EdgeMetrics( left = 0, top = 0, right = 0, bottom = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * The height, in pixels, of the bottom edge region.
         * @memberof graphics.geom.EdgeMetrics
         * @default 0
         * @type {Number}
         * @instance
         */
        bottom : { value : isNaN(bottom) ? 0 : bottom , writable : true } ,

        /**
         * The width, in pixels, of the left edge region.
         * @memberof graphics.geom.EdgeMetrics
         * @default 0
         * @type {Number}
         * @instance
         */
        left : { value : isNaN(left) ? 0 : left , writable : true } ,

        /**
         * The width, in pixels, of the right edge region.
         * @memberof graphics.geom.EdgeMetrics
         * @default 0
         * @type {Number}
         * @instance
         */
        right : { value : isNaN(right) ? 0 : right , writable : true } ,

        /**
         * The height, in pixels, of the top edge region.
         * @memberof graphics.geom.EdgeMetrics
         * @default 0
         * @type {Number}
         * @instance
         */
        top : { value : isNaN(top) ? 0 : top , writable : true }
    });
}

EdgeMetrics.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : EdgeMetrics },

    /**
     * The horizontal, in pixels, of the sum of left and right region.
     * @readonly
     * @memberof graphics.geom.EdgeMetrics
     * @instance
     */
    horizontal : { get : function()
    {
        return this.left + this.right;
    }},

    /**
     * The vertical, in pixels, of the sum of top and vertical region.
     * @readonly
     * @memberof graphics.geom.EdgeMetrics
     * @instance
     */
    vertical : { get : function()
    {
        return this.top + this.bottom;
    }},

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @memberof graphics.geom.EdgeMetrics
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new EdgeMetrics( this.left , this.top , this.right , this.bottom ) ;
    }},

    /**
     * Copies all of vector data from the source EdgeMetrics object into the calling EdgeMetrics object.
     * @param {graphics.geom.EdgeMetrics} source - The EdgeMetrics object from which to copy the data.
     * @return The current {@link graphics.geom.EdgeMetrics} reference.
     * @name copyFrom
     * @memberof graphics.geom.EdgeMetrics
     * @instance
     * @function
     */
    copyFrom : { writable : true , value : function( source )
    {
        if( !(source instanceof EdgeMetrics) )
        {
            throw TypeError( this + ' copyFrom failed, the passed-in source argument must be an EdgeMetrics object.' ) ;
        }
        this.bottom = source.bottom ;
        this.left   = source.left ;
        this.right  = source.right ;
        this.top    = source.top ;
        return this ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
     * @memberof graphics.geom.EdgeMetrics
     * @param {graphics.geom.EdgeMetrics} o - The object to evaluate.
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof EdgeMetrics )
        {
            return o.bottom === this.bottom &&
                   o.left   === this.left &&
                   o.right  === this.right &&
                   o.top    === this.top ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Sets the members of EdgeMetrics to the specified values.
     * @param {number} [left=0] The width, in pixels, of the left edge region.
     * @param {number} [top=0] The height, in pixels, of the top edge region.
     * @param {number} [right=0] The width, in pixels, of the right edge region.
     * @param {number} [bottom=0] The height, in pixels, of the bottom edge region.
     * @return {Rectangle} The current object reference.
     * @memberof graphics.geom.EdgeMetrics
     * @function
     * @instance
     */
    setTo : { writable : true , value : function( left = 0 , top = 0 , right = 0 , bottom = 0 )
    {
        this.left    = isNaN(left)   ? 0 : left ;
        this.top     = isNaN(top)    ? 0 : top ;
        this.bottom  = isNaN(bottom) ? 0 : bottom ;
        this.right   = isNaN(right)  ? 0 : right ;
        return this ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.geom.EdgeMetrics
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return { bottom:this.bottom , left:this.left , right:this.right , top:this.top } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @name toString
     * @memberof graphics.geom.EdgeMetrics
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[EdgeMetrics left:" + this.left + " top:" + this.top + " right:" + this.right + " bottom:" + this.bottom + "]" ;
    }}
});