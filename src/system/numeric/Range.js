"use strict" ;

/**
 * Represents an immutable range of values.
 * @name Range
 * @memberof system.numeric
 * @class
 * @constructor
 * @implements system.Equatable
 * @param {number} [min=NaN] - The minimum range value.
 * @param {number} [max=NaN] - The maximum range value.
 * @param {boolean} [freeze=false] - Indicates if the object must be freezed. That is, prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed. In essence the object is made effectively immutable.
 * @example
 * var Range = system.numeric.Range ;
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
export function Range( min = NaN , max = NaN , freeze = false )
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
    this.max = isNaN(max) ? NaN : max ;

    /**
     * The minimum range value.
     * @memberof system.numeric.Range
     * @type number
     * @instance
     */
    this.min = isNaN(min) ? NaN : min ;

    if( freeze )
    {
        Object.freeze(this) ;
    }
}

Object.defineProperties( Range ,
{
    /**
     * Range between <code>-255</code> and <code>255</code>.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    COLOR : { value : new Range( -255, 255, true ) , enumerable : true } ,

    /**
     * Range between <code>0</code> and <code>360</code>.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    DEGREE : { value : new Range( 0, 360, true ) , enumerable : true } ,

    /**
     * Range between <code>0</code> and <code>100</code>.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    PERCENT : { value : new Range( 0, 100, true ) , enumerable : true }  ,

    /**
     * Range between <code>0</code> and <code>1</code>.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    UNITY : { value : new Range( 0, 1, true ) , enumerable : true } ,

    /**
     * Filters the passed-in Number value, if the value is NaN the return value is the default value in second argument.
     * @memberof system.numeric.Range
     * @function
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
 * @name clamp
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @param {number} value - The number to clamp between the minimum and maximum value of the current range.
 * @return {number} The clamped value.
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
 * @name clone
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @return a shallow copy of the object.
 */
Range.prototype.clone = function ()
{
    return new Range( this.min , this.max ) ;
}

/**
 * Creates a new range by combining two existing ranges.
 * @name combine
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @param {system.numeric.Range} [range=null] - The range to combine, <code>null</code> permitted to create a clone of the current range.
 * @return {system.numeric.Range} The new range combined between the curred and passed-in range.
 * @example
 * var range1 = new Range(2,8) ;
 * var range2 = new Range(1,8) ;
 * var range3 = new Range(5,10) ;
 *
 * trace( range1.combine( range2 ) ) ; // [Range min:1 max:8]
 * trace( range1.combine( range3 ) ) ; // [Range min:2 max:10]
 */
Range.prototype.combine = function ( range = null )
{
    if ( !range )
    {
        return this.clone() ;
    }
    else
    {
        return new Range( Math.min( this.min , range.min ) , Math.max( this.max , range.max ) ) ;
    }
}

/**
 * Returns <code>true/<code> if the {@link system.numeric.Range} instance contains the value passed in argument.
 * @name contains
 * @param {number} value - The value to check.
 * @return {boolean} <code>true</code> if the Range instance contains the value passed in argument.
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @example
 * var range = new Range(2,8) ;
 * trace( range.contains(2) ) ; // true
 * trace( range.contains(5) ) ; // true
 * trace( range.contains(8) ) ; // true
 * trace( range.contains(0) ) ; // false
 * trace( range.contains(9) ) ; // false
 */
Range.prototype.contains = function ( value )
{
    return !this.isOutOfRange(value) ;
}

/**
 * Indicates whether some other object is <b>equal to</b> this one.
 * @name equals
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @param {*} object - The object to evaluates.
 * @return {boolean} true if the the specified object is <b>equal to</b> this one.
 * @example
 * var range1 = new Range(2,8) ;
 * var range2 = new Range(2,8) ;
 * var range3 = new Range(5,10) ;
 *
 * trace( range1.equals(range2) ) ; // true
 * trace( range1.equals(range3) ) ; // false
 */
Range.prototype.equals = function ( o )
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
 * @name expand
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @param {number} lowerMargin - The lower margin expressed as a normalized value of the range length (between <code>0</code> and <code>1</code>).
 * @param {number} upperMargin - The upper margin expressed as a normalized value of the range length (between <code>0</code> and <code>1</code>).
 * @return {system.numeric.Range} The new expanded range.
 * @example
 * var range = new Range(4,8) ;
 * trace( range.expand( 0.5 , 0.5 ) ) ; // [Range min:2 max:12]
 */
Range.prototype.expand = function ( lowerMargin, upperMargin )
{
    if ( isNaN(lowerMargin) )
    {
        lowerMargin = 1 ;
    }
    if ( isNaN(upperMargin) )
    {
        upperMargin = 1 ;
    }

    lowerMargin = Math.max( Math.min( lowerMargin, 1 ), 0 ) ;
    upperMargin = Math.max( Math.min( upperMargin, 1 ), 0 ) ;

    let delta = this.max - this.min ;

    return new Range
    (
        this.min - (delta * lowerMargin) ,
        this.max + (delta * upperMargin)
    ) ;
}

/**
 * Indicates the central value for the range.
 * @name getCentralValue
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @return {number} The central value of the current range.
 */
Range.prototype.getCentralValue = function()
{
    return (this.min + this.max) / 2 ;
}

/**
 * Returns a random floating-point number between two numbers.
 * @name getRandomFloat
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @return {number} A random floating-point number between two numbers.
 */
Range.prototype.getRandomFloat = function()
{
    return Math.random() * ( this.max - this.min ) + this.min ;
}

/**
 * Returns a random integer integet between two numbers.
 * @name getRandomInteger
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @return {number} A random integer number between two numbers.
 */
Range.prototype.getRandomInteger = function()
{
    return Math.floor( this.getRandomFloat() ) ;
}

/**
 * Indicates <code>true/<code> if the specified value is out of the range.
 * @name isOutOfRange
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @param {number} value - The numeric value to evaluates.
 * @return {boolean} <code>true/<code> if the value is out of the range.
 */
Range.prototype.isOutOfRange = function ( value )
{
    return (value > this.max ) || (value < this.min) ;
}

/**
 * Returns <code>true/<code> if the range in argument overlap the current range.
 * @name overlap
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @param {system.numeric.Range} range - The range to evaluates.
 * @return {boolean} <code>true/<code> if the range in argument overlap the current range.
 */
Range.prototype.overlap = function ( range )
{
    return ( (this.max >= range.min) && (range.max >= this.min) ) ;
}

/**
 * Returns the length of the range.
 * @name size
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @return {number} the length of the range.
 */
Range.prototype.size = function()
{
    return this.max - this.min ;
}

/**
 * Returns the string representation of this instance.
 * @name toString
 * @memberof system.numeric.Range
 * @function
 * @instance
 * @return {string} the string representation of this instance.
 */
Range.prototype.toString = function ()
{
    return "[Range min:" + this.min + " max:" + this.max + "]";
}