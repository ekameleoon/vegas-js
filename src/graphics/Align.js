/*jshint bitwise: false*/
"use strict" ;

/**
 * The {@link graphics.Align} enumeration provides constant values to align displays or components.
 * @summary The {@link graphics.Align} enumeration provides constant values to align displays or components.
 * @name Align
 * @namespace graphics.Align
 * @memberof graphics
 */
export var Align = Object.defineProperties( {} ,
{
    /**
     * Defines the NONE value (0).
     * @memberof graphics.Align
     * @type {number}
     * @default 0
     */
    NONE : { enumerable : true , value : 0 },

    /**
     * Defines the CENTER value (1).
     * @memberof graphics.Align
     * @type {number}
     * @default 1
     */
    CENTER : { enumerable : true , value : 1 },

    /**
     * Defines the LEFT value (2).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 2
     */
    LEFT : { enumerable : true , value : 2 },

    /**
     * Defines the RIGHT value (4).
     * @type {number}
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 4
     */
    RIGHT : { enumerable : true , value : 4 },

    /**
     * Defines the TOP value (8).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 8
     */
    TOP : { enumerable : true , value : 8 },

    /**
     * Defines the BOTTOM value (16).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 16
     */
    BOTTOM : { enumerable : true , value : 16 },

    /**
     * Defines the REVERSE value (32).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 32
     */
    REVERSE : { enumerable : true , value : 32 },

    /**
     * Defines the BOTTOM_LEFT value (18).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default graphics.Align.BOTTOM | graphics.Align.LEFT
     */
    BOTTOM_LEFT : { enumerable : true , value : 16 | 2 } ,

    /**
     * Defines the BOTTOM_RIGHT value (20).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default graphics.Align.BOTTOM | graphics.Align.RIGHT
     */
    BOTTOM_RIGHT : { enumerable : true , value : 16 | 4 },

    /**
     * Defines the CENTER_LEFT value (3).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 3
     */
    CENTER_LEFT : { enumerable : true , value : 3  },

    /**
     * Defines the CENTER_RIGHT value (5).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 5
     */
    CENTER_RIGHT : { enumerable : true , value : 5  },

    /**
     * Defines the TOP_LEFT value (10).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 10
     */
    TOP_LEFT : { enumerable : true , value : 10  },

    /**
     * Defines the TOP_RIGHT value (12).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 12
     */
    TOP_RIGHT : { enumerable : true , value : 12 },

    /**
     * Defines the LEFT_BOTTOM value (50).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 50
     */
    LEFT_BOTTOM : { enumerable : true , value : 50  },

    /**
     * Defines the RIGHT_BOTTOM value (52).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 52
     */
    RIGHT_BOTTOM : { enumerable : true , value : 52  },

    /**
     * Defines the LEFT_TOP value (42).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 42
     */
    LEFT_TOP : { enumerable : true , value : 8 | 2 | 32  },

    /**
     * Defines the RIGHT_TOP value (44).
     * @memberof graphics.Align
     * @type {number}
     * @readonly
     * @default 44
     */
    RIGHT_TOP : { enumerable : true , value : 8 | 4 | 32  },

    /**
     * Converts a string value in this Align value. If the String value isn't valid the Align.CENTER value is return.
     * @memberof graphics.Align
     * @function
     * @example
     * trace( Align.toNumber("l") == Align.LEFT ) ; // true
     */
    toNumber : { value : function( str , none = 0 )
    {
        if ( str === null || !(str instanceof String || typeof(str) === 'string') )
        {
            return none ;
        }
        str = str.toLowerCase() ;
        return (str in Align.stringToNumber) ? Align.stringToNumber[str] : none ;
    }},

    /**
     * Returns the string representation of the specified Align value passed in argument.
     * @memberof graphics.Align
     * @function
     * @param {number} value - The valid numeric value to convert in a string expression.
     * @return the string representation of the specified Align value passed in argument.
     * @example
     * trace( Align.toString(Align.LEFT)) ; // "l"
     * trace( Align.toString(Align.TOP_LEFT)) ; // "tl"
     * trace( Align.toString(Align.RIGHT_BOTTOM)) ; // "rb"
     */
    toString : { value : function( value )
    {
        switch (value)
        {
            case Align.NONE         : return "none" ;
            case Align.BOTTOM       : return "b"  ;
            case Align.BOTTOM_LEFT  : return "bl" ;
            case Align.BOTTOM_RIGHT : return "br" ;
            case Align.CENTER       : return "c"  ;
            case Align.CENTER_LEFT  : return "cl" ;
            case Align.CENTER_RIGHT : return "cr" ;
            case Align.LEFT         : return "l"  ;
            case Align.LEFT_BOTTOM  : return "lb" ;
            case Align.LEFT_TOP     : return "lt" ;
            case Align.RIGHT        : return "r"  ;
            case Align.RIGHT_TOP    : return "rt" ;
            case Align.RIGHT_BOTTOM : return "rb" ;
            case Align.TOP          : return "t"  ;
            case Align.TOP_LEFT     : return "tl" ;
            case Align.TOP_RIGHT    : return "tr" ;
            default                 : return ""   ;
        }
    }},

    /**
     * Returns <code>true</code> if the specified Align value in argument is a valid Align value else returns <code>false</code>.
     * @memberof graphics.Align
     * @function
     * @example
     * trace( Align.validate(Align.LEFT)) ; // true
     * trace( Align.toString(1000)) ; // false
     * @param {number} value - The numeric value to validate.
     * @return <code>true</code> if the specified Align value in argument is a valid Align value else returns <code>false</code>.
     */
    validate : { value : function( value )
    {
        return Align.alignments.indexOf(value) > -1 ;
    }}
});

/**
 * Defines the alignments collection of all valid aligment elements.
 * @memberof graphics.Align
 * @type {Array}
 * @readonly
 */
Object.defineProperty( Align , 'alignments' , { value :
[
    Align.BOTTOM   , Align.BOTTOM_LEFT  , Align.BOTTOM_RIGHT ,
    Align.CENTER   , Align.CENTER_LEFT  , Align.CENTER_RIGHT ,
    Align.LEFT     , Align.LEFT_BOTTOM  , Align.LEFT_TOP     ,
    Align.RIGHT    , Align.RIGHT_BOTTOM , Align.RIGHT_TOP    ,
    Align.TOP      , Align.TOP_LEFT     , Align.TOP_RIGHT    ,
    Align.NONE
]});

/**
 * Defines the key/value map to register all aligments by name (string).
 * @memberof graphics.Align
 * @type {Object}
 * @readonly
 */
Object.defineProperty( Align , 'stringToNumber' , { value :
{
    "b"    : Align.BOTTOM ,
    "bl"   : Align.BOTTOM_LEFT ,
    "br"   : Align.BOTTOM_RIGHT ,
    "c"    : Align.CENTER ,
    "cl"   : Align.CENTER_LEFT ,
    "cr"   : Align.CENTER_RIGHT ,
    "l"    : Align.LEFT ,
    "lb"   : Align.LEFT_BOTTOM ,
    "lt"   : Align.LEFT_TOP ,
    "none" : Align.NONE ,
    "r"    : Align.RIGHT ,
    "rb"   : Align.RIGHT_BOTTOM ,
    "rt"   : Align.RIGHT_TOP ,
    "t"    : Align.TOP ,
    "tl"   : Align.TOP_LEFT ,
    "tr"   : Align.TOP_RIGHT
}}) ;
