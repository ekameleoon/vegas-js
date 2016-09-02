"use strict" ;

/**
 * Roman numerals are a numeral system originating in ancient Rome, adapted from Etruscan numerals.
 * <p>Roman numerals are commonly used in numbered lists (in outline format), clock faces, pages preceding the main body of a book, chord triads in music analysis, the numbering of movie publication dates, successive political leaders or children with identical names, and the numbering of some annual sport events.</p>
 * <p><b>Links :</b>
 * <li><a href="http://en.wikipedia.org/wiki/Roman_numerals">http://en.wikipedia.org/wiki/Roman_numerals</a></li>
 * <li><a href="http://netzreport.googlepages.com/online_converter_for_dec_roman.html">http://netzreport.googlepages.com/online_converter_for_dec_roman.html</a></li>
 * </p>
 * @param value The decimal uint value of the RomanNumber or a String representation of the roman numerals object.
 * @example
 * var RomanNumber = system.numeric.RomanNumber ;
 * trace( RomanNumber.parse(12) ) ; // XII
 * trace( RomanNumber.parseRomanString('II') ) ; // 2
 */
export function RomanNumber( value = 0 )
{
    Object.defineProperties( this ,
    {
        _num : { value : 0 , writable : true } ,
    }) ;

    if( typeof(value) === "string" || value instanceof String )
    {
        this._num = RomanNumber.parseRomanString( value ) ;
    }
    else if( typeof(value) === "number" || value instanceof Number )
    {
        if( value > RomanNumber.MAX )
        {
            throw new RangeError( "Max value for a RomanNumber is " + RomanNumber.MAX );
        }
        if( value < RomanNumber.MIN )
        {
            throw new RangeError( "Min value for a RomanNumber is " + RomanNumber.MIN );
        }
        this._num = value;
    }
}

Object.defineProperties( RomanNumber ,
{
    /**
     * The maximum parsing value.
     */
    MAX : { value : 3999 , enumerable : true } ,

    /**
     * The minimum parsing value.
     */
    MIN : { value : 0 , enumerable : true } ,

    /**
     * The array representation of all numeric values.
     */
    NUMERIC : { value : [ 1000, 500, 100,  50, 10, 5, 1 ] , enumerable : true } ,

    /**
     * The array representation of all roman expressions.
     */
    ROMAN : { value : [ "M", "D", "C", "L", "X", "V", "I" ] , enumerable : true } ,

    /**
     * Parse the specified value and return this roman numerals String representation.
     */
    parse :
    {
        value : function( num ) /*String*/
        {
            var MAX     = RomanNumber.MAX ;
            var MIN     = RomanNumber.MIN ;

            var NUMERIC = RomanNumber.NUMERIC ;
            var ROMAN   = RomanNumber.ROMAN   ;

            var n /*uint*/   = 0 ;
            var r /*String*/ = "";

            if( (typeof(num) === "number" || num instanceof Number) )
            {
                if( num > RomanNumber.MAX )
                {
                    throw new RangeError( "Max value for a RomanNumber is " + MAX );
                }
                else if( num < RomanNumber.MIN )
                {
                    throw new RangeError( "Min value for a RomanNumber is " + MIN );
                }
                n = num ;
            }

            var i /*int*/;
            var rank /*uint*/;
            var bellow /*uint*/;
            var roman /*String*/;
            var romansub /*String*/;

            var size /*int*/ = NUMERIC.length ;

            for( i=0 ; i<size ; i++ )
            {
                if( n === 0 )
                {
                    break;
                }

                rank  = NUMERIC[i];
                roman = ROMAN[i];

                if( String(rank).charAt(0) === "5" )
                {
                    bellow = (rank - NUMERIC[i+1]);
                    romansub = ROMAN[i+1];
                }
                else
                {
                    bellow = (rank - NUMERIC[i+2]);
                    romansub = ROMAN[i+2];
                }

                if( (n >= rank) || (n >= bellow) )
                {
                    while( n >= rank )
                    {
                        r += roman;
                        n -= rank;
                    }
                }

                if( n > 0 && n >= bellow )
                {
                    r += romansub + roman;
                    n -= bellow;
                }
            }

            return r ;
        }
    },

    /**
     * Parses a roman String representation in this uint decimal representation.
     */
    parseRomanString :
    {
        value : function( roman /*String*/ ) /*uint*/
        {
            var NUMERIC = RomanNumber.NUMERIC ;
            var ROMAN   = RomanNumber.ROMAN   ;

            if( roman === null || roman === "" )
            {
                return 0 ;
            }

            roman = roman.toUpperCase();

            var n /*uint*/ = 0;

            var pos /*int*/     = 0  ;
            var ch /*String*/   = "" ;
            var next /*String*/ = "" ;

            var ich /*uint*/ ;
            var inext /*uint*/ ;

            while( pos >= 0 )
            {
                ch   = roman.charAt( pos );
                next = roman.charAt( pos+1 );

                if( ch === "" )
                {
                    break;
                }

                ich   = ROMAN.indexOf(ch);
                inext = ROMAN.indexOf(next);

                if ( ich < 0 )
                {
                    return 0 ;
                }
                else if( ich <= inext || inext === -1 )
                {
                    n += NUMERIC[ich];
                }
                else
                {
                    n += NUMERIC[inext] - NUMERIC[ich];
                    pos++;
                }

                pos++;
            }

            return n;
        }
    }
}) ;

/**
 * @extends Object
 */
RomanNumber.prototype = Object.create( Object.prototype ) ;
RomanNumber.prototype.constructor = RomanNumber ;

/**
 * Parse the specified value.
 */
RomanNumber.prototype.parse = function ( value ) /*String*/
{
    value = ( (typeof(value) === "number" || value instanceof Number) ) ? value : this._num  ;
    return RomanNumber.parse( value );
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
RomanNumber.prototype.toString = function () /*String*/
{
    return this.parse( this._num ) ;
}

/**
 * Returns the primitive value of this object.
 * @return the primitive value of this object.
 */
RomanNumber.prototype.valueOf = function () /*uint*/
{
    return this._num ;
}