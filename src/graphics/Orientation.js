"use strict" ;

/**
 * Constants defining layout orientation options.
 */
export var Orientation = Object.defineProperties( {} ,
{
    /**
     * Constant indicating a bottom-to-top layout orientation (4).
     */
    BOTTOM_TO_TOP: { enumerable : true , value : 4 } ,

    /**
     * Constant indicating a none layout orientation, use the default orientation (0).
     */
    NONE: { enumerable : true , value : 0 },

    /**
     * Constant indicating a left-to-right layout orientation (1).
     */
    LEFT_TO_RIGHT: { enumerable : true , value : 1 },

    /**
     * Constant indicating a right-to-left layout orientation (2).
     */
    RIGHT_TO_LEFT: { enumerable : true , value : 2 },

    /**
     * Constant indicating a bottom-to-top layout orientation (8).
     */
    TOP_TO_BOTTOM: { enumerable : true , value : 8 },

    /**
     * Constant indicating a left-to-right layout orientation (5).
     */
    LEFT_TO_RIGHT_BOTTOM_TO_TOP: { enumerable : true , value : 5 },

    /**
     * Constant indicating a left-to-right and top-to-bottom layout orientation (9).
     */
    LEFT_TO_RIGHT_TOP_TO_BOTTOM: { enumerable : true , value : 9 },

    /**
     * Constant indicating a right-to-left layout orientation (6).
     */
    RIGHT_TO_LEFT_BOTTOM_TO_TOP: { enumerable : true , value : 6 },

    /**
     * Constant indicating a right-to-left and top-to-bottom layout orientation (10).
     */
    RIGHT_TO_LEFT_TOP_TO_BOTTOM: { enumerable : true , value : 10 }
}) ;

Object.defineProperties( Orientation ,
{
    /**
     * All the orientations defines in the Orientation singleton.
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
     * Returns the string representation of the specified Align value passed in argument.
     * <p><b>Example :</b></p>
     * <pre class="prettyprint">
     * import graphics.Align ;
     * trace( Align.toString(Align.LEFT)) ; // "l"
     * trace( Align.toString(Align.TOP_LEFT)) ; // "tl"
     * trace( Align.toString(Align.RIGHT_BOTTOM)) ; // "rb"
     * </pre>
     * @return the string representation of the specified Align value passed in argument.
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
     * Returns <code class="prettyprint">true</code> if the passed-in uint argument is a valid Orientation value else returns <code class="prettyprint">false</code>.
     * @return <code class="prettyprint">true</code> if the passed-in uint argument is a valid Orientation value else returns <code class="prettyprint">false</code>.
     */
    validate : { value : function( value )
    {
        return Orientation.ALL.indexOf(value) > -1 ;
    }}
}) ;