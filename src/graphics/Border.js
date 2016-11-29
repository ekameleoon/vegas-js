/*jshint bitwise: false*/
"use strict" ;

/**
 * Enables and disables the border on the specified sides. The border is specified as an integer bitwise combination of the constants: {@link graphics.Border.LEFT}, {@link graphics.Border.RIGHT}, {@link graphics.Border.TOP}, {@link graphics.Border.BOTTOM}.
 * @summary Enables and disables the border on the specified sides.
 * @name Border
 * @class
 * @memberof graphics
 * @param {number} [side=30] - The side setting value to define the border configuration. By default is {@link graphics.Border.ALL} (30).
 * @example
 * var Border = graphics.Border ;
 *
 * var border = new Border( Border.NO_BORDER ) ;
 *
 * trace( border ) ;
 * trace( border.hasBorders() ) ;
 *
 * border.enableBorderSide( Border.TOP ) ;
 * trace( border ) ;
 *
 * border.enableBorderSide( Border.BOTTOM ) ;
 * trace( border ) ;
 *
 * border.enableBorderSide( Border.LEFT ) ;
 * trace( border ) ;
 *
 * border.enableBorderSide( Border.RIGHT ) ;
 * trace( border ) ;
 */
export function Border( side = 30 )
{
    Object.defineProperties( this ,
    {
        /**
         * The side value, an integer bitwise combination.
         * @name value
         * @memberof graphics.Border
         * @instance
         * @type number
         */
        value : { value : side , writable : true }
    }) ;
}

Object.defineProperties( Border ,
{
    /**
     * This represents the value to set all the sides of the Rectangle (<code>30</code>).
     * @name ALL
     * @memberof graphics.Border
     */
    ALL : { enumerable : true , value : 30 },

    /**
     * Defines the NONE value (<code>0</code>).
     * @name NONE
     * @memberof graphics.Border
     */
    NONE : { enumerable : true , value : 0 },

    /**
     * This represents the bottom side of the border of the Rectangle (<code>16</code>).
     * @name BOTTOM
     * @memberof graphics.Border
     */
    BOTTOM : { enumerable : true , value : 16 },

    /**
     * This represents the left side of the border of the Rectangle (<code>2</code>).
     * @name LEFT
     * @memberof graphics.Border
     */
    LEFT : { enumerable : true , value : 2 },

    /**
     * This represents a rectangle without borders (<code>0</code>).
     * @name NO_BORDER
     * @alias NONE
     * @memberof graphics.Border
     */
    NO_BORDER : { enumerable : true , value : 0 },

    /**
     * This represents the right side of the border of the Rectangle (<code>4</code>).
     * @name RIGHT
     * @memberof graphics.Border
     */
    RIGHT : { enumerable : true , value : 4 },

    /**
     * This represents the top side of the border of the Rectangle (<code>8</code>).
     * @name TOP
     * @memberof graphics.Border
     */
    TOP : { enumerable : true , value : 8 }
}) ;

Border.prototype = Object.create( Object.prototype ,
{
    /**
     * Enables the border on the specified side.
     * @param {number} side - The side to enable. One of {@link graphics.Border.LEFT}, {@link graphics.Border.RIGHT}, {@link graphics.Border.TOP}, {@link graphics.Border.BOTTOM}.
     * @name enableBorderSide
     * @memberof graphics.Border
     * @instance
     * @function
     */
    enableBorderSide : { value : function( side )
    {
        this.toggleBorder( side , true );
    }},

    /**
     * Disables the border on the specified side.
     * @param {number} side - The side to enable. One of {@link graphics.Border.LEFT}, {@link graphics.Border.RIGHT}, {@link graphics.Border.TOP}, {@link graphics.Border.BOTTOM}.
     * @name disableBorderSide
     * @memberof graphics.Border
     * @instance
     * @function
     */
    disableBorderSide : { value : function( side )
    {
        this.toggleBorder( side , false );
    }},

    /**
     * Indicates whether the specified type of border is set.
     * @name hasBorder
     * @memberof graphics.Border
     * @instance
     * @function
     * @param {number} type - The side to verify. One of {@link graphics.Border.LEFT}, {@link graphics.Border.RIGHT}, {@link graphics.Border.TOP}, {@link graphics.Border.BOTTOM}.
     * @return <code>true</code> if the specified type of border is set.
     */
    hasBorder : { value : function( type )
    {
        return Boolean( type & this.value ) ;
    }},

    /**
     * Indicates whether some type of border is set. One of {@link graphics.Border.LEFT}, {@link graphics.Border.RIGHT}, {@link graphics.Border.TOP}, {@link graphics.Border.BOTTOM}.
     * @return <code>true</code> if some type of border is set.
     * @name hasBorders
     * @memberof graphics.Border
     * @instance
     * @function
     */
    hasBorders : { value : function()
    {
        return this.hasBorder(Border.TOP)    ||
               this.hasBorder(Border.BOTTOM) ||
               this.hasBorder(Border.LEFT)   ||
               this.hasBorder(Border.RIGHT)  ;
    }},

    /**
     * Toggle a side in this border object.
     * @name toggleBorder
     * @memberof graphics.Border
     * @instance
     * @function
     * @param {number} side - The side to enable. One of {@link graphics.Border.LEFT}, {@link graphics.Border.RIGHT}, {@link graphics.Border.TOP}, {@link graphics.Border.BOTTOM}.
     * @param {boolean} [side=false] - Indicates if the side element must be enabled or disabled.
     * @return <code>true</code> if the function succeeded.
     */
    toggleBorder : { value : function( side , flag = false )
    {
        var old = this.value ;
        this.value = flag ? ( this.value | side ) : ( this.value & ~side ) ;
        return old !== this.value ;
    }},

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @name toString
     * @memberof graphics.Border
     * @instance
     * @function
     */
    toString : { value : function()
    {
        return "[Border " + this.value + "]" ;
    }},

    /**
     * Returns the value of the object.
     * @name valueOf
     * @memberof graphics.Border
     * @instance
     * @function
     * @return the value of the object.
     */
    valueOf : { value : function()
    {
        return this.value ;
    }}
})
