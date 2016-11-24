"use strict" ;

/**
 * The Vector2 class represents a simple location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @name Vector2
 * @memberof graphics.geom
 * @constructor
 * @class
 * @param {number} x - The x value of the object.
 * @param {number} y - The y value of the object.
 */
export function Vector2( x = 0 , y = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * Determinates the x value of this object.
         * @memberof graphics.geom.Vector2
         * @default 0
         * @type {Number}
         * @instance
         */
        x : { value : isNaN(x) ? 0 : x , writable : true } ,

        /**
         * Determinates the y value of this object.
         * @memberof graphics.geom.Vector2
         * @default 0
         * @type {Number}
         * @instance
         */
        y : { value : isNaN(y) ? 0 : y , writable : true }
    });
}

Vector2.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @memberof graphics.geom.Vector2
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Vector2( this.x , this.y ) ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return {boolean} <code>true</code> if the the specified object is equal with this object.
     * @memberof graphics.geom.Vector2
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof Vector2 )
        {
            return o.x === this.x && o.y === this.y ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.geom.Vector2
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return { x:this.x , y:this.y } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} The string representation of this instance.
     * @memberof graphics.geom.Vector2
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[Vector2 x:" + this.x + " y:" + this.y + "]" ;
    }}
});