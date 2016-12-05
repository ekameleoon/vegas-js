"use strict" ;

/**
 * The Vector2D class represents a simple location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @summary A simple location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
 * @name Vector2D
 * @memberof graphics.geom
 * @class
 * @param {number} x - The x value of the object.
 * @param {number} y - The y value of the object.
 * @see graphics.geom.Point
 */
export function Vector2D( x = 0 , y = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * The horizontal coordinate of the point.
         * @name x
         * @memberof graphics.geom.Vector2D
         * @default 0
         * @type {Number}
         * @instance
         */
        x : { value : isNaN(x) ? 0 : x , writable : true } ,

        /**
         * The vertical coordinate of the point.
         * @name y
         * @memberof graphics.geom.Vector2D
         * @default 0
         * @type {Number}
         * @instance
         */
        y : { value : isNaN(y) ? 0 : y , writable : true }
    });
}

Vector2D.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof graphics.geom.Vector2D
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Vector2D( this.x , this.y ) ;
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
        if( !(source instanceof Vector2D) )
        {
            throw TypeError( this + ' copyFrom failed, the passed-in source argument must be an Vector2D object.' ) ;
        }
        this.x = source.x ;
        this.y = source.y ;
        return this ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return {boolean} <code>true</code> if the the specified object is equal with this object.
     * @name equals
     * @memberof graphics.geom.Vector2D
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof Vector2D )
        {
            return o.x === this.x && o.y === this.y ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Sets the horizontal and vertical coordinates of this object. If the <code>x</code> and the <code>y</code> parameters are <code>NaN</code> or <code>null</code> the <b>x</b> and <b>y</b> value are <code>0</code>.
     * @param {number} [x=0] - The horizontal coordinate of the point.
     * @param {number} [y=0] - The vertical coordinate of the point.
     * @name setTo
     * @instance
     * @function
     * @memberof graphics.geom.Vector2D
     */
    setTo : { writable : true , value : function( x = 0 , y = 0 )
    {
        this.x = isNaN(x) ? 0 : x ;
        this.y = isNaN(y) ? 0 : y ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @name toObject
     * @memberof graphics.geom.Vector2D
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
     * @memberof graphics.geom.Vector2D
     * @name toString
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[Vector2D x:" + this.x + " y:" + this.y + "]" ;
    }}
});