"use strict" ;

/**
 * The four cardinal directions or cardinal points are the directions of north, south, east, and west, commonly denoted by their initials: N, S, E, W.
 * They are mostly used for geographic orientation on Earth but may be calculated anywhere on a rotating astronomical body.
 * @summary The enumeration of the four cardinal directions or cardinal points are the directions of north, south, east, and west, commonly denoted by their initials: N, S, E, W.
 * @name CardinalDirection
 * @memberof graphics
 * @extends Object
 * @class
 * @param {number} [value=0] - The numeric value who define the direction.
 * @param {string} [name] - The name of the direction.
 * @param {number} [azimut=0] - The azimut angle.
 */
export function CardinalDirection( value = 0 , name = "" , azimut = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _value  : { value : value  , writable : true } ,

        /**
         * @private
         */
        _name   : { value : name   , writable : true } ,

        /**
         * @private
         */
        _azimut : { value : azimut , writable : true }
    }) ;
}

CardinalDirection.prototype = Object.create( Object.prototype ,
{
    /**
     * Indicates the angular measurement in a spherical coordinate system (in degrees).
     * @memberof graphics.CardinalDirection
     * @type {number}
     * @instance
     */
    azimut : { value : function()
    {
        return this._azimut ;
    }},

    /**
     * Returns the String representation of the object.
     * @memberof graphics.CardinalDirection
     * @return {string} The String representation of the object.
     * @instance
     */
    toString : { value : function()
    {
        return this._name ;
    }},

    /**
     * Returns the value of the object.
     * @return the value of the object.
     * @instance
     * @memberof graphics.CardinalDirection
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
     * @memberof graphics.CardinalDirection
     */
    E : { enumerable : true , value : new CardinalDirection( Math.PI / 2 , "E" , 90 ) },

    /**
     * The East-North-East cardinal point "ENE" : Azimut:67.5° Radians:3π/8
     * @memberof graphics.CardinalDirection
     */
    ENE : { enumerable : true , value : new CardinalDirection( 3 * Math.PI / 8 , "ENE" , 67.5 ) },

    /**
     * The East-South-East cardinal point "ESE" : Azimut:112,5° Radians:5π/8
     * @memberof graphics.CardinalDirection
     */
    ESE : { enumerable : true , value : new CardinalDirection( 5 * Math.PI / 8 , "ESE" , 112.5 ) },

    /**
     * The North cardinal point "N" : Azimut:0° Radians:0
     * @memberof graphics.CardinalDirection
     */
    N : { enumerable : true , value : new CardinalDirection( 0 , "N" , 0) },

    /**
     * The North-East cardinal point "NE" : Azimut:45° Radians:π/4
     * @memberof graphics.CardinalDirection
     */
    NE : { enumerable : true , value : new CardinalDirection( Math.PI / 4 , "NE" , 45 ) },

    /**
     * The North-North-East cardinal point "NNE" : Azimut:22.5° Radians:π/8
     * @memberof graphics.CardinalDirection
     */
    NNE : { enumerable : true , value : new CardinalDirection( Math.PI / 8 , "NNE" , 22.5 ) },

    /**
     * The North-North-West cardinal point "NNW" : Azimut:337.5° Radians:15π/8
     * @memberof graphics.CardinalDirection
     */
    NNW : { enumerable : true , value : new CardinalDirection( 15 * Math.PI / 8 , "NNW" , 337.5 ) },

    /**
     * The North-West cardinal point "NW" : Azimut:315° Radians:7π/4
     * @memberof graphics.CardinalDirection
     */
    NW : { enumerable : true , value : new CardinalDirection( 7 * Math.PI / 4 , "NW" , 315 ) },

    /**
     * The South cardinal point "S" : Azimut:180° Radians:π
     * @memberof graphics.CardinalDirection
     */
    S : { enumerable : true , value : new CardinalDirection( Math.PI , "S" , 180 ) },

    /**
     * The South-East cardinal point "SE" : Azimut:135° Radians:3π/4
     * @memberof graphics.CardinalDirection
     */
    SE : { enumerable : true , value : new CardinalDirection( 3 * Math.PI / 4 , "SE" , 135 ) },

    /**
     * The South-South-East cardinal point "SSE" : Azimut:157.5° Radians:7π/8
     * @memberof graphics.CardinalDirection
     */
    SSE : { enumerable : true , value : new CardinalDirection( 7 * Math.PI / 8 , "SSE" , 157.5 ) },

    /**
     * The South-South-West cardinal point "SSW" : Azimut:202.5° Radians:9π/8
     * @memberof graphics.CardinalDirection
     */
    SSW : { enumerable : true , value : new CardinalDirection( 9 * Math.PI / 8 , "SSW" , 202.5 ) },

    /**
     * The South-West cardinal point "SW" : Azimut:225° Radians:5π/4
     * @memberof graphics.CardinalDirection
     */
    SW : { enumerable : true , value : new CardinalDirection( 5 * Math.PI / 4 , "SW" , 225 ) },

    /**
     * The West cardinal point "W" : Azimut:270° Radians:3π/2
     * @memberof graphics.CardinalDirection
     */
    W : { enumerable : true , value : new CardinalDirection( 3 * Math.PI / 2 , "W" , 270 ) },

    /**
     * The West-North-West cardinal point "WNW" : Azimut:292.5° Radians:13π/8
     * @memberof graphics.CardinalDirection
     */
    WNW : { enumerable : true , value : new CardinalDirection( 13 * Math.PI / 8 , "WNW" , 292.5 ) },

    /**
     * The West-South-West cardinal point "WSW" : Azimut:247.5° Radians:11π/8
     * @memberof graphics.CardinalDirection
     */
    WSW : { enumerable : true , value : new CardinalDirection( 11 * Math.PI / 8 , "WSW" , 247.5 ) }
}) ;


Object.defineProperties( CardinalDirection ,
{
    /**
     * The set of all diagonal directions (northeast, southeast, southwest, northwest).
     * @memberof graphics.CardinalDirection
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
     * @memberof graphics.CardinalDirection
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
     * @memberof graphics.CardinalDirection
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
     * @param {graphics.CardinalDirection} direction - The direction to check.
     * @return true if this is a diagonal direction.
     * @function
     * @memberof graphics.CardinalDirection
     */
    isDiagonal : { value : function( direction )
    {
        return CardinalDirection.DIAGONALS.indexOf( direction ) > -1 ;
    }},

    /**
     * Returns true if this is an orthogonal direction (north, east, south, west).
     * @param {graphics.CardinalDirection} direction - The direction to check.
     * @return true if this is an orthogonal direction.
     * @function
     * @memberof graphics.CardinalDirection
     */
    isOrthogonal : { value : function( direction )
    {
        return CardinalDirection.ORTHOGONALS.indexOf( direction ) > -1 ;
    }}
});
