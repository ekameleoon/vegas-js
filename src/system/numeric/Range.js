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
 * @param {boolean} [writable=true] - Indicates if the min and max values must be freezed. Prevents existing <code>min</code> and <code>max</code> properties from being removed or their enumerability, configurability, or writability, from being changed.
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
export function Range( min = NaN , max = NaN , writable = true )
{
    if ( max < min )
    {
        throw new RangeError( "The Range constructor failed, the 'max' argument is < of 'min' argument" ) ;
    }

    Object.defineProperties( this ,
    {
        /**
         * The maximum range value.
         * @memberof system.numeric.Range
         * @type number
         * @instance
         */
        max : { writable : writable , value : isNaN(max) ? NaN : max } ,

        /**
         * The minimum range value.
         * @memberof system.numeric.Range
         * @type number
         * @instance
         */
        min : { writable : writable , value : isNaN(min) ? NaN : min }
    });
}

Range.prototype = Object.create( Object.prototype ,
{
    /**
     * The constructor reference.
     */
    constructor : { writable : true , value : Range } ,

    /**
     * Clamps a specific value in the current range.
     * @name clamp
     * @memberof system.numeric.Range
     * @function
     * @instance
     * @param {number} value - The number to clamp between the minimum and maximum value of the current range.
     * @return {number} The clamped value.
     * @example
     * var range = new Range(2,8) ;
     * trace( range.clamp(1) ) ; // 2
     * trace( range.clamp(2) ) ; // 2
     * trace( range.clamp(5) ) ; // 5
     * trace( range.clamp(8) ) ; // 8
     * trace( range.clamp(9) ) ; // 8
     */
    clamp : { value : function( value )
    {
        if (isNaN( value ))
        {
            return NaN ;
        }
        let mi = this.min ;
        let ma = this.max ;
        if (isNaN( mi ))
        {
            mi = value ;
        }
        if (isNaN( ma ))
        {
            ma = value ;
        }
        return Math.max( Math.min( value, ma ), mi ) ;
    }},

    /**
     * Returns a shallow copy of the object.
     * @name clone
     * @memberof system.numeric.Range
     * @function
     * @instance
     * @return a shallow copy of the object.
     */
    clone : { writable : true , value : function()
    {
        return new Range( this.min , this.max ) ;
    }},

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
    combine : { value : function( range = null )
    {
        if ( !(range instanceof Range) )
        {
            return this.clone() ;
        }
        else
        {
            return new Range( Math.min( this.min , range.min ) , Math.max( this.max , range.max ) ) ;
        }
    }},

    /**
     * Returns <code>true</code> if the {@link system.numeric.Range|Range} instance contains the value passed in argument.
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
    contains : { value : function( value )
    {
        return !( (value > this.max ) || (value < this.min) ) ;
    }},

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
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof Range )
        {
            return  ( o.min === this.min ) && ( o.max === this.max ) ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Creates a new range by adding margins to an existing range.
     * @name expand
     * @memberof system.numeric.Range
     * @function
     * @instance
     * @param {number} [lowerMargin=0] - The lower margin expressed as a normalized value of the range length (between <code>0</code> and <code>1</code>).
     * @param {number} [upperMargin=0] - The upper margin expressed as a normalized value of the range length (between <code>0</code> and <code>1</code>).
     * @return {system.numeric.Range} The new expanded range.
     * @example
     * var range = new Range(4,8) ;
     * trace( range.expand( 0.5 , 0.5 ) ) ; // [Range min:2 max:12]
     */
    expand : { value : function( lowerMargin = 0 , upperMargin = 0 )
    {
        if ( isNaN(lowerMargin) )
        {
            lowerMargin = 1 ;
        }
        if ( isNaN(upperMargin) )
        {
            upperMargin = 1 ;
        }

        let delta = this.max - this.min ;

        return new Range
        (
            this.min - (delta * lowerMargin) ,
            this.max + (delta * upperMargin)
        ) ;
    }},

    /**
     * Indicates the central value for the range.
     * @name getCentralValue
     * @memberof system.numeric.Range
     * @function
     * @instance
     * @return {number} The central value of the current range.
     * @example
     * var range = new Range(4,8) ;
     * trace( range.getCentralValue() ) ; //  6
     */
    getCentralValue : { value : function()
    {
        return (this.min + this.max) / 2 ;
    }},

    /**
     * Returns a random floating-point number between two numbers.
     * @name getRandomFloat
     * @memberof system.numeric.Range
     * @function
     * @instance
     * @return {number} A random floating-point number between two numbers.
     * @example
     * var range = new Range(2,8) ;
     * trace( range.getRandomFloat() ) ; // a float between 2 and 8
     */
    getRandomFloat : { value : function()
    {
        return Math.random() * ( this.max - this.min ) + this.min ;
    }},

    /**
     * Returns a random integer integet between two numbers.
     * @name getRandomInteger
     * @memberof system.numeric.Range
     * @function
     * @instance
     * @return {number} A random integer number between two numbers.
     * @example
     * var range = new Range(2,8) ;
     * trace( range.getRandomInteger() ) ; // an integer between 2 and 8
     */
    getRandomInteger : { value : function()
    {
        return Math.floor( Math.random() * ( this.max - this.min ) + this.min ) ;
    }},

    /**
     * Indicates <code>true</code> if the specified value is out of the range.
     * @name isOutOfRange
     * @memberof system.numeric.Range
     * @function
     * @instance
     * @param {number} value - The numeric value to evaluates.
     * @return {boolean} <code>true</code> if the value is out of the range.
     * @example
     * var range = new Range(2,8) ;
     * trace( range.isOutOfRange(1) ) ; // true
     * trace( range.isOutOfRange(9) ) ; // true
     * trace( range.isOutOfRange(2) ) ; // false
     * trace( range.isOutOfRange(5) ) ; // false
     * trace( range.isOutOfRange(8) ) ; // false
     */
    isOutOfRange : { value : function( value )
    {
        return (value > this.max ) || (value < this.min) ;
    }},

    /**
     * Returns <code>true</code> if the range in argument overlap the current range.
     * @name overlap
     * @memberof system.numeric.Range
     * @function
     * @instance
     * @param {system.numeric.Range} range - The range to evaluates.
     * @return {boolean} <code>true</code> if the range in argument overlap the current range.
     * @example
     * var range = new Range(2,8) ;
     * trace( range.overlap(new Range(1,2)) ) ; // true
     * trace( range.overlap(new Range(3,5)) ) ; // true
     * trace( range.overlap(new Range(5,9)) ) ; // true
     * trace( range.overlap(new Range(8,9)) ) ; // true
     * trace( range.overlap(new Range(0,1)) ) ; // false
     * trace( range.overlap(new Range(9,10)) ) ; // false
     */
    overlap : { value : function( range )
    {
        return ( (this.max >= range.min) && (range.max >= this.min) ) ;
    }},

    /**
     * Returns the length of the range.
     * @name size
     * @memberof system.numeric.Range
     * @function
     * @instance
     * @return {number} the length of the range.
     * @example
     * var range = new Range(2,8) ;
     * trace( range.size() ) ; // 6
     */
    size : { value : function()
    {
        return this.max - this.min ;
    }},

    /**
     * Returns the string representation of this instance.
     * @name toString
     * @memberof system.numeric.Range
     * @function
     * @instance
     * @return {string} the string representation of this instance.
     * @example
     * var range = new Range(4,8) ;
     * trace( range ) ; [Range min:4 max:8]
     */
    toString : { writable : true , value : function()
    {
        return "[Range min:" + this.min + " max:" + this.max + "]";
    }}
}) ;

Object.defineProperties( Range ,
{
    /**
     * Range between <code>-255</code> and <code>255</code>.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    COLOR : { value : new Range( -255, 255, false ) , enumerable : true } ,

    /**
     * Range between <code>0</code> and <code>360</code>.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    DEGREE : { value : new Range( 0, 360, false ) , enumerable : true } ,

    /**
     * Range between <code>0</code> and <code>100</code>.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    PERCENT : { value : new Range( 0, 100, false ) , enumerable : true }  ,

    /**
     * Range between <code>0</code> and <code>Math.PI*2</code>.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    RADIAN : { value : new Range( 0, Math.PI*2, false ) , enumerable : true } ,

    /**
     * Range between <code>0</code> and <code>1</code>.
     * @memberof system.numeric.Range
     * @type system.numeric.Range
     */
    UNITY : { value : new Range( 0, 1, false ) , enumerable : true }
}) ;