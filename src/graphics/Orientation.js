"use strict" ;

/**
 * The {@link graphics.Orientation} enumeration defines layout orientation options.
 * @summary The {@link graphics.Orientation} enumeration defines layout orientation options.
 * @name Orientation
 * @namespace graphics.Orientation
 * @memberof graphics
 */
export var Orientation = Object.defineProperties( {} ,
{
    /**
     * Constant indicating a bottom-to-top layout orientation (4).
     * @memberof graphics.Orientation
     * @type {number}
     * @default 4
     */
    BOTTOM_TO_TOP: { enumerable : true , value : 4 } ,

    /**
     * Constant indicating a none layout orientation, use the default orientation (0).
     * @memberof graphics.Orientation
     * @type {number}
     * @default 0
     */
    NONE: { enumerable : true , value : 0 },

    /**
     * Constant indicating a left-to-right layout orientation (1).
     * @memberof graphics.Orientation
     * @type {number}
     * @default 1
     */
    LEFT_TO_RIGHT: { enumerable : true , value : 1 },

    /**
     * Constant indicating a right-to-left layout orientation (2).
     * @memberof graphics.Orientation
     * @type {number}
     * @default 2
     */
    RIGHT_TO_LEFT: { enumerable : true , value : 2 },

    /**
     * Constant indicating a bottom-to-top layout orientation (8).
     * @memberof graphics.Orientation
     * @type {number}
     * @default 8
     */
    TOP_TO_BOTTOM: { enumerable : true , value : 8 },

    /**
     * Constant indicating a left-to-right layout orientation (5).
     * @memberof graphics.Orientation
     * @type {number}
     * @default 5
     */
    LEFT_TO_RIGHT_BOTTOM_TO_TOP: { enumerable : true , value : 5 },

    /**
     * Constant indicating a left-to-right and top-to-bottom layout orientation (9).
     * @memberof graphics.Orientation
     * @type {number}
     * @default 9
     */
    LEFT_TO_RIGHT_TOP_TO_BOTTOM: { enumerable : true , value : 9 },

    /**
     * Constant indicating a right-to-left layout orientation (6).
     * @memberof graphics.Orientation
     * @type {number}
     * @default 6
     */
    RIGHT_TO_LEFT_BOTTOM_TO_TOP: { enumerable : true , value : 6 },

    /**
     * Constant indicating a right-to-left and top-to-bottom layout orientation (10).
     * @memberof graphics.Orientation
     * @type {number}
     * @default 10
     */
    RIGHT_TO_LEFT_TOP_TO_BOTTOM: { enumerable : true , value : 10 }
}) ;

Object.defineProperties( Orientation ,
{
    /**
     * All the orientations defines in the {@link graphics.Orientation} enumeration.
     * @name ALL
     * @memberof graphics.Orientation
     * @type {array}
     * @example
     * Orientation.ALL =
     * [
     *     Orientation.NONE ,
     *     Orientation.BOTTOM_TO_TOP ,
     *     Orientation.LEFT_TO_RIGHT ,
     *     Orientation.RIGHT_TO_LEFT ,
     *     Orientation.TOP_TO_BOTTOM ,
     *     Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP ,
     *     Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM ,
     *     Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP ,
     *     Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM
     * ];
     */
    ALL : { value :
    [
        Orientation.NONE ,
        Orientation.BOTTOM_TO_TOP ,
        Orientation.LEFT_TO_RIGHT ,
        Orientation.RIGHT_TO_LEFT ,
        Orientation.TOP_TO_BOTTOM ,
        Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP ,
        Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM ,
        Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP ,
        Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM
    ]},

    /**
     * Stringify the specific <code>Orientation</code> numeric value passed in argument.
     * @name toString
     * @function
     * @memberof graphics.Orientation
     * @param {number} value - The value of the specific <code>Orientation</code> to stringify.
     * @param {string} byDefault - The default string representation if the <code>value</code> is not valid.
     * @return the string representation of the specific <code>Orientation</code> numeric value passed in argument.
     * @example
     * trace( Orientation.toString(Orientation.BOTTOM_TO_TOP)) ; // "btt"
     * trace( Orientation.toString(Orientation.LEFT_TO_RIGHT)) ; // "ltr"
     * trace( Orientation.toString(Orientation.RIGHT_TO_LEFT)) ; // "rtl"
     */
    toString : { value : function( value , byDefault = "none" )
    {
        switch ( value )
        {
            case Orientation.BOTTOM_TO_TOP               : return "btt"    ;
            case Orientation.LEFT_TO_RIGHT               : return "ltr"    ;
            case Orientation.RIGHT_TO_LEFT               : return "rtl"    ;
            case Orientation.TOP_TO_BOTTOM               : return "ttb"    ;
            case Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP : return "ltrbtt" ;
            case Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM : return "ltrttb" ;
            case Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP : return "rtlbtt" ;
            case Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM : return "rtlttb" ;
            case Orientation.NONE                        : return "none"   ;
            default                                      : return byDefault ;
        }
    }},

    /**
     * Returns <code>true</code> if the passed-in uint argument is a valid <code>Orientation</code> value else returns <code>false</code>.
     * @name validate
     * @function
     * @memberof graphics.Orientation
     * @param {number} value - The numeric value to evaluate.
     * @return <code>true</code> if the passed-in uint argument is a valid <code>Orientation</code> value else returns <code>false</code>.
     */
    validate : { value : function( value )
    {
        return Orientation.ALL.indexOf(value) > -1 ;
    }}
}) ;