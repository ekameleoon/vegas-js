/*jshint bitwise: false*/
"use strict" ;

/**
 * The four cardinal directions or cardinal points are the directions of north, south, east, and west, commonly denoted by their initials: N, S, E, W.
 * They are mostly used for geographic orientation on Earth but may be calculated anywhere on a rotating astronomical body.
 */
export function CardinalDirection( value = 0 , name = "" , azimut = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _value  : { value : value  , writable : true } ,
        _name   : { value : name   , writable : true } ,
        _azimut : { value : azimut , writable : true }
    }) ;
}

/**
 * @extends Object
 */
CardinalDirection.prototype = Object.create( Object ,
{
    /**
     * Indicates the angular measurement in a spherical coordinate system (in degrees).
     */
    azimut : { value : function()
    {
        return this._azimut ;
    }},

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function()
    {
        return this._name ;
    }},

    /**
     * Returns the value of the object.
     * @return the value of the object.
     */
    valueOf : { value : function()
    {
        return this._value ;
    }}
});

Object.defineProperties( CardinalDirection ,
{
    /**
     * This represents the value to set all the sides of the Rectangle (30).
     */
    E : { enumerable : true , value : new CardinalDirection( Math.PI / 2 , "E" , 90 ) },

    /**
     * The East-North-East cardinal point "ENE" : Azimut:67.5° Radians:3π/8
     */
    ENE : { enumerable : true , value : new CardinalDirection( 3 * Math.PI / 8 , "ENE" , 67.5 ) },

    /**
     * The East-South-East cardinal point "ESE" : Azimut:112,5° Radians:5π/8
     */
    ESE : { enumerable : true , value : new CardinalDirection( 5 * Math.PI / 8 , "ESE" , 112.5 ) },

    /**
     * The North cardinal point "N" : Azimut:0° Radians:0
     */
    N : { enumerable : true , value : new CardinalDirection( 0 , "N" , 0) },

    /**
     * The North-East cardinal point "NE" : Azimut:45° Radians:π/4
     */
    NE : { enumerable : true , value : new CardinalDirection( Math.PI / 4 , "NE" , 45 ) },

    /**
     * The North-North-East cardinal point "NNE" : Azimut:22.5° Radians:π/8
     */
    NNE : { enumerable : true , value : new CardinalDirection( Math.PI / 8 , "NNE" , 22.5 ) },

    /**
     * The North-North-West cardinal point "NNW" : Azimut:337.5° Radians:15π/8
     */
    NNW : { enumerable : true , value : new CardinalDirection( 15 * Math.PI / 8 , "NNW" , 337.5 ) },

    /**
     * The North-West cardinal point "NW" : Azimut:315° Radians:7π/4
     */
    NW : { enumerable : true , value : new CardinalDirection( 7 * Math.PI / 4 , "NW" , 315 ) },

    /**
     * The South cardinal point "S" : Azimut:180° Radians:π
     */
    S : { enumerable : true , value : new CardinalDirection( Math.PI , "S" , 180 ) },

    /**
     * The South-East cardinal point "SE" : Azimut:135° Radians:3π/4
     */
    SE : { enumerable : true , value : new CardinalDirection( 3 * Math.PI / 4 , "SE" , 135 ) },

    /**
     * The South-South-East cardinal point "SSE" : Azimut:157.5° Radians:7π/8
     */
    SSE : { enumerable : true , value : new CardinalDirection( 7 * Math.PI / 8 , "SSE" , 157.5 ) },

    /**
     * The South-South-West cardinal point "SSW" : Azimut:202.5° Radians:9π/8
     */
    SSW : { enumerable : true , value : new CardinalDirection( 9 * Math.PI / 8 , "SSW" , 202.5 ) },

    /**
     * The South-West cardinal point "SW" : Azimut:225° Radians:5π/4
     */
    SW : { enumerable : true , value : new CardinalDirection( 5 * Math.PI / 4 , "SW" , 225 ) },

    /**
     * The West cardinal point "W" : Azimut:270° Radians:3π/2
     */
    W : { enumerable : true , value : new CardinalDirection( 3 * Math.PI / 2 , "W" , 270 ) },

    /**
     * The West-North-West cardinal point "WNW" : Azimut:292.5° Radians:13π/8
     */
    WNW : { enumerable : true , value : new CardinalDirection( 13 * Math.PI / 8 , "WNW" , 292.5 ) },

    /**
     * The West-South-West cardinal point "WSW" : Azimut:247.5° Radians:11π/8
     */
    WSW : { enumerable : true , value : new CardinalDirection( 11 * Math.PI / 8 , "WSW" , 247.5 ) }
}) ;


Object.defineProperties( CardinalDirection ,
{
    /**
     * The set of all diagonal directions (northeast, southeast, southwest, northwest).
     */
    ALL : { enumerable : true , value :
    [
        CardinalDirection.N,
        CardinalDirection.E,
        CardinalDirection.S,
        CardinalDirection.W,
        CardinalDirection.NE,
        CardinalDirection.SE,
        CardinalDirection.NW,
        CardinalDirection.SW,
        CardinalDirection.NNE,
        CardinalDirection.NNW,
        CardinalDirection.SSE,
        CardinalDirection.SSW,
        CardinalDirection.ENE,
        CardinalDirection.ESE,
        CardinalDirection.WNW,
        CardinalDirection.WSW
    ]},

    /**
     * The set of all diagonal directions (northeast, southeast, southwest, northwest).
     */
    DIAGONALS : { value :
    [
        CardinalDirection.NE,
        CardinalDirection.SE,
        CardinalDirection.NW,
        CardinalDirection.SW
    ]} ,

    /**
     * The set of all orthogonals directions (north, south, south, north).
     */
    ORTHOGONALS : { value :
    [
        CardinalDirection.N,
        CardinalDirection.E,
        CardinalDirection.S,
        CardinalDirection.W
    ]},

    /**
     * Returns true if this is a diagonal direction (northeast, southeast, southwest, northwest).
     * @return true if this is a diagonal direction.
     */
    isDiagonal : { value : function( direction )
    {
        return CardinalDirection.DIAGONALS.indexOf( direction ) > -1 ;
    }},

    /**
     * Returns true if this is an orthogonal direction (north, east, south, west).
     * @return true if this is an orthogonal direction.
     */
    isOrthogonal : { value : function( direction )
    {
        return CardinalDirection.ORTHOGONALS.indexOf( direction ) > -1 ;
    }}
});
