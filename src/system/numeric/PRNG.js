"use strict" ;

/**
 * A pseudo random number generator (PRNG) is an algorithm for generating a sequence of numbers that approximates the properties of random numbers.
 * <p>Implementation of the <b>Park Miller</b> (1988) "<i>minimal standard</i>" linear congruential pseudo-random number generator.
 * For a full explanation visit: {@link http://www.firstpr.com.au/dsp/rand31/}</p>
 * <p>The generator uses a modulus constant <code>((m) of 2^31 - 1)</code> which is a <b>Mersenne Prime number</b> and a full-period-multiplier of <code>16807</code>.
 * Output is a 31 bit unsigned integer. The range of values output is <code>1</code> to <code>2147483646</code> (2^31-1) and the seed must be in this range too.</p>
 * @name PRNG
 * @memberof system.numeric
 * @class
 * @constructor
 * @param {number} [value=0] - The optional default value of the <code>PRNG</code> object, if the passed-in value is <code>>=1</code> a random value is generated with the <code>Math.random()</code> static method.
 */
export function PRNG( value = 1 )
{
    Object.defineProperties( this ,
    {
        _value : { value : 1 , writable : true }
    }) ;

    this.value = (value > 0) ? value : Math.random() * 0X7FFFFFFE ;
}

PRNG.prototype = Object.create( Object.prototype ,
{
    /**
     * Defines the current random value with a 31 bit unsigned integer between <code>1</code> and <code>0X7FFFFFFE</code> inclusive (don't use 0).
     * @memberof system.numeric.PRNG
     * @instance
     * @type number
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
 * Provides the next pseudo random number as an unsigned integer (31 bits).
 * @return The next pseudo random number as an unsigned integer (31 bits).
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomInt = function()
{
    this._value = (this._value * 16807) % 2147483647 ;
    return this._value ;
}

/**
 * Provides the next pseudo random number as an unsigned integer (31 bits) between a minimum value and maximum value.
 * @param {number} [min=0] - The minimum range value to evaluates the pseudo random number.
 * @param {number} [max=1] - The maximum range value to evaluates the pseudo random number.
 * @return The next pseudo random number as an unsigned integer (31 bits) between a minimum value and maximum value.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomIntByMinMax = function( min = 0 , max = 1 )
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
 * Provides the next pseudo random number as an unsigned integer (31 bits) between a given range.
 * @param {system.numeric.Range} range - The range object to evaluate the pseudo random number.
 * @return The next pseudo random number as an unsigned integer (31 bits) between a minimum value and maximum value.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomIntByRange = function( r ) /*int*/
{
    var min = r.min - 0.4999;
    var max = r.max + 0.4999;
    this._value = (this._value * 16807) % 2147483647 ;
    return Math.round(min + ( ( max - min ) * this._value / 2147483647 ) );
}

/**
 * Provides the next pseudo random number as a float between nearly 0 and nearly 1.0.
 * @return The next pseudo random number as a float between nearly 0 and nearly 1.0.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomNumber = function() /*Number*/
{
    this._value = (this._value * 16807) % 2147483647 ;
    return this._value / 2147483647 ;
}

/**
 * Provides the next pseudo random number as a float between a minimum value and maximum value.
 * @return The next pseudo random number as a float between a minimum value and maximum value.
 * @param {number} [min=0] - The minimum range value to evaluates the pseudo random number.
 * @param {number} [max=1] - The maximum range value to evaluates the pseudo random number.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomNumberByMinMax = function( min , max )
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
 * @return The next pseudo random number as a float in a specific range.
 * @param {system.numeric.Range} range - The range to born the number.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.randomNumberByRange = function( r /*Range*/ ) /*Number*/
{
    this._value = (this._value * 16807) % 2147483647 ;
    return r.min + ((r.max - r.min) * this._value / 2147483647 ) ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.toString = function ()
{
    return String( this._value ) ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.numeric.PRNG
 * @instance
 * @function
 */
PRNG.prototype.valueOf = function () /*int*/
{
    return this._value ;
}
