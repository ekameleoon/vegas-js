"use strict" ;

/**
 * The Dimension object encapsulates the width and height components of an object.
 * @summary The Dimension object encapsulates the width and height components of an object.
 * @name Dimension
 * @memberof graphics.geom
 * @class
 * @constructs
 * @extends Object
 * @param {number} [width=0] the width value.
 * @param {number} [height=0] The height value.
 */
export function Dimension( width = 0 , height = 0)
{
    Object.defineProperties( this ,
    {
        /**
         * The height of the rectangle, in pixels.
         * @memberof graphics.geom.Dimension
         * @default 0
         * @type {Number}
         * @instance
         */
        height : { value : isNaN(height) ? 0 : height , writable : true } ,

        /**
         * The width of the rectangle, in pixels.
         * @memberof graphics.geom.Dimension
         * @default 0
         * @type {Number}
         * @instance
         */
        width : { value : isNaN(width) ? 0 : width  , writable : true }
    });
}

Dimension.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Dimension( this.width , this.height ) ;
    }},

    /**
     * Copies all of data from the source Dimension object into the calling Dimension object.
     * @memberof graphics.geom.Dimension
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
     * Decreases the size by a specific width/height values and return its self(this).
     * @param {number} [dWidth=0] - A number value to descrease the width component of the object (default 0).
     * @param {number} [dHeight=0] - A number value to descrease the height component of the object (default 0).
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    decrease : { value : function( dWidth = 0 , dHeight = 0 )
    {
        this.width  -= isNaN(dWidth) ? 0 : dWidth ;
        this.height -= isNaN(dHeight) ? 0 : dHeight ;
        return this ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof Dimension )
        {
            return o.width === this.width && o.height=== this.height ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Increases the size by a specific width/height values and return its self(this).
     * @param {number} [dWidth=0] - A number value to increase the width component of the object (default 0).
     * @param {number} [dHeight=0] - A number value to inscrease the height component of the object (default 0).
     * @return the current reference of this object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    increase : { value : function( dWidth = 0 , dHeight = 0 )
    {
        this.width  += isNaN(dWidth) ? 0 : dWidth ;
        this.height += isNaN(dHeight) ? 0 : dHeight ;
        return this ;
    }},

    /**
     * Determines whether or not this Rectangle object is empty.
     * @return {boolean} A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    isEmpty : { writable : true , value : function()
    {
        return this.width <= 0 || this.height <= 0;
    }},

    /**
     * Sets the members of Dimension to the specified values.
     * @param {number} width - The width component value to change (default 0).
     * @param {number} height - The height component value to change (default 0).
     * @return {graphics.geom.Dimension} The object reference.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    setTo : { writable : true , value : function( width = 0 , height = 0 )
    {
        this.width  = width ;
        this.height = height ;
        return this ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        return { width:this.width , height:this.height } ;
    }},

    /**
     * Returns the string representation of this object.
     * @return the string representation of this object.
     * @memberof graphics.geom.Dimension
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[Dimension width:" + this.width + " height:" + this.height + "]" ;
    }}
});