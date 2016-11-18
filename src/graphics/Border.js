/*jshint bitwise: false*/
"use strict" ;

/**
 * Enables/Disables the border on the specified sides. The border is specified as an integer bitwise combination of the constants: LEFT, RIGHT, TOP, BOTTOM.
 * @example
 * <pre>
 * var Border = graphics.Border ;
 *
 * var border:Border = new Border( Border.NO_BORDER ) ;
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
 * </pre>
 */
export function Border( side = 30 )
{
    Object.defineProperties( this ,
    {
        /**
         * The side value, an integer bitwise combination.
         */
        value : { value : side , writable : true }
    }) ;
}

Object.defineProperties( Border ,
{
    /**
     * This represents the value to set all the sides of the Rectangle (30).
     */
    ALL : { enumerable : true , value : 30 },

    /**
     * Defines the NONE value (0).
     */
    NONE : { enumerable : true , value : 0 },

    /**
     * This represents the bottom side of the border of the Rectangle (16).
     */
    BOTTOM : { enumerable : true , value : 16 },

    /**
     * This represents the left side of the border of the Rectangle (2).
     */
    LEFT : { enumerable : true , value : 2 },

    /**
     * This represents a rectangle without borders (0).
     */
    NO_BORDER : { enumerable : true , value : 0 },

    /**
     * This represents the right side of the border of the Rectangle (4).
     */
    RIGHT : { enumerable : true , value : 4 },

    /**
     * This represents the top side of the border of the Rectangle (8).
     */
    TOP : { enumerable : true , value : 8 }
}) ;

/**
 * @extends Object
 */
Border.prototype = Object.create( Object ,
{
    /**
     * Enables the border on the specified side.
     * @param side  the side to enable. One of LEFT, RIGHT, TOP, BOTTOM.
     */
    enableBorderSide : { value : function( side )
    {
        this.toggleBorder( side , true );
    }},

    /**
     * Disables the border on the specified side.
     * @param side the side to disable. One of LEFT, RIGHT, TOP, BOTTOM.
     */
    disableBorderSide : { value : function( side )
    {
        this.toggleBorder( side , false );
    }},

    /**
     * Indicates whether the specified type of border is set. One of LEFT, RIGHT, TOP, BOTTOM.
     */
    hasBorder : { value : function( type )
    {
        return Boolean( type & this.value ) ;
    }},

    /**
     * Indicates whether some type of border is set. One of LEFT, RIGHT, TOP, BOTTOM.
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
     */
    toString : { value : function()
    {
        return "[Border " + this.value + "]" ;
    }},

    /**
     * Returns the value of the object.
     * @return the value of the object.
     */
    valueOf : { value : function()
    {
        return this.value ;
    }}
})
