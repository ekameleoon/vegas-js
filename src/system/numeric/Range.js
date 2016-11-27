"use strict" ;

/**
 * Represents an immutable range of values.
 * @name Range
 * @memberof system.numeric
 * @class
 * @constructor
 * @param {number} [min=NaN] - The minimum range value.
 * @param {number} [max=NaN] - The maximum range value.
 * @example
 * Range = system.numeric.Range ;
 *
 * var r1 = new Range(10, 120) ;
 * var r2 = new Range(100, 150) ;
 *
 * trace ("r1 : " + r1) ; // r1 : [Range min:10 max:120]
 * trace ("r2 : " + r2) ; // r2 : [Range min:100 max:150]
 *
 * trace ("r1 contains 50    : " + r1.contains(50)) ; // r1 contains 50 : true
 * trace ("r1 isOutOfRange 5 : " + r1.isOutOfRange(5)) ; // r1 isOutOfRange 5 : true
 * trace ("r1 overlap r2     : " + r1.overlap(r2)) ; // r1 overlap r2 : true
 * trace ("r1 clamp 5        : " + r1.clamp(5)) ; // r1 clamp 5 : 10
 * trace ("r1 clamp 121      : " + r1.clamp(121)) ; // r1 clamp 121 : 120
 */
export function Range( min = NaN , max = NaN )
{
    if ( max < min )
    {
        throw new RangeError( "The Range constructor failed, the 'max' argument is < of 'min' argument" ) ;
    }
    /**
     * The maximum range value.
     * @memberof system.numeric.Range
     * @type number
     * @instance
     */
    this.max = max ;

    /**
     * The minimum range value.
     * @memberof system.numeric.Range
     * @type number
     * @instance
     */
    this.min = min ;
}

Object.defineProperties( Range ,
{
    /**
     * Range between <code>-255</code> and <code>255</code>.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    COLOR : { value : new Range( -255 , 255 ) , enumerable : true } ,

    /**
     * Range between 0 and 360.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    DEGREE : { value : new Range( 0 , 360 ) , enumerable : true } ,

    /**
     * Range between 0 and 100.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    PERCENT : { value : new Range( 0 , 100 ) , enumerable : true }  ,

    /**
     * Range between 0 and 1.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    UNITY : { value : new Range( 0 , 1 ) , enumerable : true } ,

    /**
     * Filters the passed-in Number value, if the value is NaN the return value is the default value in second argument.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     * @param {number} value - The Number value to filter, if this value is <code>NaN</code> the value is changed.
     * @param {number} [defaultValue=0] - The default value to apply over the specified value if this value is <code>NaN</code>.
     * @return The filtered number value.
     */
    filterNaNValue :
    {
        value : function ( value , defaultValue = 0 )
        {
            return isNaN( value ) ? defaultValue : value ;
        }
    }
}) ;

Range.prototype = Object.create( Object.prototype ,
{
    /**
     * The constructor reference.
     */
    constructor : { writable : true , value : Range }
}) ;

/**
 * Clamps a specific value in the current range.
 */
Range.prototype.clamp = function ( value )
{
    if (isNaN( value ))
    {
        return NaN ;
    }
    var mi = this.min ;
    var ma = this.max ;
    if (isNaN( mi ))
    {
        mi = value ;
    }
    if (isNaN( ma ))
    {
        ma = value ;
    }
    return Math.max( Math.min( value, ma ), mi ) ;
}

/**
 * Returns a shallow copy of the object.
 * @return a shallow copy of the object.
 */
Range.prototype.clone = function ()
{
    return new Range( this.min , this.max ) ;
}

/**
 * Creates a new range by combining two existing ranges.
 * @param range the range to combine, <code class="prettyprint">null</code> permitted.
 */
Range.prototype.combine = function ( range ) /*Range*/
{
    if ( !range )
    {
        return this.clone() ;
    }
    else
    {
        var lower = Math.min( this.min , range.min ) ;
        var upper = Math.max( this.max , range.max ) ;
        return new Range( lower , upper ) ;
    }
}

/**
 * Returns {@code true} if the Range instance contains the value passed in argument.
 * @return {@code true} if the Range instance contains the value passed in argument.
 */
Range.prototype.contains = function ( value )
{
    return !this.isOutOfRange(value) ;
}

/**
 * Indicates whether some other object is "equal to" this one.
 */
Range.prototype.equals = function (o) /*Boolean*/
{
    if ( o instanceof Range )
    {
        return  ( o.min === this.min ) && ( o.max === this.max ) ;
    }
    else
    {
        return false ;
    }
}

/**
 * Creates a new range by adding margins to an existing range.
 * @param range the range {@code null} not permitted.
 * @param lowerMargin the lower margin (expressed as a percentage of the range length).
 * @param upperMargin the upper margin (expressed as a percentage of the range length).
 * @return The expanded range.
 * @throws IllegalArgumentError if the range argument is {@code null}
 */
Range.prototype.expand = function ( lowerMargin /*Number*/, upperMargin/*Number*/ ) /*Range*/
{
    if ( isNaN(lowerMargin) )
    {
        lowerMargin = 1 ;
    }
    if ( isNaN(upperMargin) )
    {
        upperMargin = 1 ;
    }
    var delta = this.max - this.min ;
    var lower = delta * lowerMargin ;
    var upper = delta * upperMargin ;
    return new Range( this.min - lower , this.max + upper ) ;
}

/**
 * Returns the central value for the range.
 * @return The central value.
 */
Range.prototype.getCentralValue = function() /*Number*/
{
    return (this.min + this.max) / 2 ;
}

/**
 * Returns a random floating-point number between two numbers.
 * @return a random floating-point number between two numbers.
 */
Range.prototype.getRandomFloat = function() /*Number*/
{
    return Math.random() * ( this.max - this.min ) + this.min ;
}

/**
 * Returns a random floating-point number between two numbers.
 * @return a random floating-point number between two numbers.
 */
Range.prototype.getRandomInteger = function() /*Number*/
{
    return Math.floor( this.getRandomFloat() ) ;
}

/**
 * Returns {@code true} if the value is out of the range.
 * @return {@code true} if the value is out of the range.
 */
Range.prototype.isOutOfRange = function (value /*Number*/)
{
    return (value > this.max ) || (value < this.min) ;
}

/**
 * Returns {@code true} if the range in argument overlap the current range.
 * @return {@code true} if the range in argument overlap the current range.
 */
Range.prototype.overlap = function ( r /*Range*/ ) /*Boolean*/
{
    return ( (this.max >= r.min) && (r.max >= this.min) ) ;
}

/**
 * Returns the length of the range.
 * @return the length of the range.
 */
Range.prototype.size = function() /*Number*/
{
    return this.max - this.min ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Range.prototype.toString = function () /*String*/
{
    return "[Range min:" + this.min + " max:" + this.max + "]";
}