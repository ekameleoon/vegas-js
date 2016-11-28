"use strict" ;

/**
 * Returns the center string representation of the specified string value.
 * @name center
 * @memberof core.strings
 * @function
 * @instance
 * @param {string} source - The string reference to center.
 * @param {number} [size=0] The number of character to center the String expression.
 * @param {string} [separator= ] The optional separator character use before and after the String to center.
 * @return The center expression of the specified string.
 * @example
 * trace( '<' + center("hello world", 0)  + '>' ) ; // <hello world>
 * trace( '<' + center("hello world", 20) + '>' ) ; // <    hello world     >
 * trace( '<' + center("hello world", 20, "_" ) + '>'  )  ; // <____hello world_____>
 */
export function center( source , size = 0  , separator = " " )
{
    if ( source === null || !(source instanceof String || typeof(source) === 'string' ) )
    {
        return "" ;
    }

    if ( separator === null || !(separator instanceof String || typeof(separator) === 'string' ) )
    {
        separator = " " ;
    }

    var len = source.length;

    if ( len <= size )
    {
        len = size - len ;
        var remain = ( len % 2 === 0 ) ? "" : separator;
        var pad    = "";
        var count  = Math.floor( len / 2 );
        if ( count > 0 )
        {
            for( var i = 0 ; i < count ; i++ )
            {
                pad = pad.concat( separator );
            }
        }
        else
        {
            pad = separator;
        }
        return pad + source + pad + remain ;
    }
    else
    {
        return source ;
    }
}