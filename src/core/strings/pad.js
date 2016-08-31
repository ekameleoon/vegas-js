"use strict" ;

/**
 * Apply character padding to a string.
 * <p>
 * The padding amount is relative to the string length,
 * if you try to pad the string <code>"hello"</code> (5 chars) with an amount of 10,
 * you will not add 10 spacing chars to the original string,
 * but you will obtain <code>"     hello"</code>, exactly 10 chars after the padding.
 * </p>
 *
 * <p>
 * A positive <code>amount</code> value will pad the string on the left (right align),
 * and a negative <code>amount</code> value will pad the string on the right (left align),
 * </p>
 *
 * @example basic usage
 * <listing version="3.0">
 * <code class="prettyprint">
 * var word = "hello";
 *
 * trace( "[" + pad( word, 8 ) + "]" ); //align to the right
 * trace( "[" + pad( word, -8 ) + "]" ); //align to the left
 *
 * //output
 * //[   hello]
 * //[hello   ]
 * </code>
 * </listing>
 *
 * @example padding a list of names
 * <listing version="3.0">
 * <code class="prettyprint">
 * var seinfeld = [ "jerry", "george", "kramer", "helen" ];
 * var len      = seinfeld.length ;
 * for( var i = 0 ; i<len ; i++ )
 * {
 *     trace( pad( seinfeld[i] , 10 , "." ) ) ;
 * }
 *
 * //output
 * //.....jerry
 * //....george
 * //....kramer
 * //.....helen
 * </code>
 * </listing>
 *
 * @param source the string to pad
 * @param amount the amount of padding (number sign is the padding direction)
 * @param char the character to pad with (default is space)
 */
export function pad( source /*String*/ , amount /*int*/ , ch /*String*/ ) /*String*/
{
    if ( source === null )
    {
        return "" ;
    }

    var left /*Boolean*/ = amount >= 0 ;
    var width /*int*/    = amount > 0 ? amount : -amount ;

    if( ( width < source.length ) || ( width === 0 ) )
    {
        return source;
    }

    if ( ch === null )
    {
        ch = " " ; // default
    }
    else if ( ch.length > 1 )
    {
        ch = ch.charAt(0) ; //we want only 1 char
    }

    while( source.length !== width )
    {
        if( left )
        {
            source = ch + source;
        }
        else
        {
            source += ch;
        }
    }

    return source;
}