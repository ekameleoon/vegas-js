"use strict" ;

/**
 * A pseudo random number generator (PRNG) is an algorithm for generating a sequence of numbers that approximates the properties of random numbers.
 * Implementation of the Park Miller (1988) "minimal standard" linear congruential pseudo-random number generator.
 * For a full explanation visit: http://www.firstpr.com.au/dsp/rand31/
 * The generator uses a modulus constant ((m) of 2^31 - 1) which is a Mersenne Prime number and a full-period-multiplier of 16807.
 * Output is a 31 bit unsigned integer. The range of values output is 1 to 2147483646 (2^31-1) and the seed must be in this range too.
 * @param value The optional default value of the PRNG object, if the passed-in value is >=1 a random value is generated with the Math.random() static method (default 0).
 */
export function PRNG( value = 0 )
{
    Object.defineProperties( this ,
    {
        _value : { value : 1 , writable : true } ,
    }) ;

    this.value = (value > 0) ? value : Math.random() * 0X7FFFFFFE ;
}

/**
 * @extends Object
 */
PRNG.prototype = Object.create( Object.prototype ,
{
    /**
     * Sets the current random value with a 31 bit unsigned integer between 1 and 0X7FFFFFFE inclusive (don't use 0).
     */
    value :
    {
        get : function() { return this._value ; } ,
        set : function( value )
        {
            value = value > 1 ? value : 1 ;
            value = value > 0X7FFFFFFE ? 0X7FFFFFFE : value ;
            this._value = value ;
        }
    }
}) ;
PRNG.prototype.constructor = PRNG ;

/**
 * Provides the next pseudorandom number as an unsigned integer (31 bits)
 */
PRNG.prototype.randomInt = function() /*int*/
{
    this._value = (this._value * 16807) % 2147483647 ;
    return this._value ;
}

/**
 * Provides the next pseudorandom number as an unsigned integer (31 bits) betweeen a minimum value and maximum value.
 */
PRNG.prototype.randomIntByMinMax = function( min /*Number*/ , max /*Number*/ ) /*int*/
{
    if ( isNaN( min ) )
    {
        min = 0 ;
    }
    if ( isNaN( max ) )
    {
        max = 1 ;
    }
    min -= 0.4999;
    max += 0.4999;
    this._value = (this._value * 16807) % 2147483647 ;
    return Math.round(min + ( ( max - min ) * this._value / 2147483647 ) );
}

/**
 * Provides the next pseudorandom number as an unsigned integer (31 bits) betweeen a given range.
 */
PRNG.prototype.randomIntByRange = function( r /*Range*/ ) /*int*/
{
    var min /*Number*/ = r.min - 0.4999;
    var max /*Number*/ = r.max + 0.4999;
    this._value = (this._value * 16807) % 2147483647 ;
    return Math.round(min + ( ( max - min ) * this._value / 2147483647 ) );
}

/**
 * Provides the next pseudo random number as a float between nearly 0 and nearly 1.0.
 */
PRNG.prototype.randomNumber = function() /*Number*/
{
    this._value = (this._value * 16807) % 2147483647 ;
    return this._value / 2147483647 ;
}

/**
 * Provides the next pseudo random number as a float between a minimum value and maximum value.
 */
PRNG.prototype.randomNumberByMinMax = function( min /*Number*/ , max /*Number*/ ) /*Number*/
{
    if ( isNaN( min ) )
    {
        min = 0 ;
    }
    if ( isNaN( max ) )
    {
        max = 1 ;
    }
    this._value = (this._value * 16807) % 2147483647 ;
    return min + ((max - min) * this._value / 2147483647 ) ;
}

/**
 * Provides the next pseudo random number as a float between a given range.
 */
PRNG.prototype.randomNumberByRange = function( r /*Range*/ ) /*Number*/
{
    this._value = (this._value * 16807) % 2147483647 ;
    return r.min + ((r.max - r.min) * this._value / 2147483647 ) ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
PRNG.prototype.toString = function () /*String*/
{
    return String( this._value ) ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
PRNG.prototype.valueOf = function () /*int*/
{
    return this._value ;
}
