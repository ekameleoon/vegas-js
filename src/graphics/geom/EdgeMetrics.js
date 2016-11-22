"use strict" ;

/**
 * The EdgeMetrics class specifies the thickness, in pixels, of the four edge regions around a visual component.
 * @constructor
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
         */
        bottom : { value : isNaN(bottom) ? 0 : bottom , writable : true } ,

        /**
         * The width, in pixels, of the left edge region.
         */
        left : { value : isNaN(left) ? 0 : left , writable : true } ,

        /**
         * The width, in pixels, of the right edge region.
         */
        right : { value : isNaN(right) ? 0 : right , writable : true } ,

        /**
         * The height, in pixels, of the top edge region.
         */
        top : { value : isNaN(top) ? 0 : top , writable : true }
    });
}

/**
 * @extends Object
 */
EdgeMetrics.prototype = Object.create( Object.prototype ,
{
    /**
     * The horizontal, in pixels, of the sum of left and right region.
     * @readonly
     */
    horizontal : { get : function()
    {
        return this.left + this.right;
    }},

    /**
     * The vertical, in pixels, of the sum of top and vertical region.
     * @readonly
     */
    vertical : { get : function()
    {
        return this.top + this.bottom;
    }},

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     */
    clone : { writable : true , value : function()
    {
        return new EdgeMetrics( this.left , this.top , this.right , this.bottom ) ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
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
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     */
    toObject : { writable : true , value : function()
    {
        return { bottom:this.bottom , left:this.left , right:this.right , top:this.top } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { writable : true , value : function()
    {
        return "[EdgeMetrics left:" + this.left + " top:" + this.top + " right:" + this.right + " bottom:" + this.bottom + "]" ;
    }}
});