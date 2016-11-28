"use strict" ;

/**
 * Apply character padding to a string.
 * <p>The padding amount is relative to the string length, if you try to pad the string <code>"hello"</code> (5 chars) with an amount of 10,
 * you will not add 10 spacing chars to the original string, but you will obtain <code>".....hello"</code>, exactly 10 chars after the padding.</p>
 * <p>A positive <code>amount</code> value will pad the string on the left (right align), and a negative <code>amount</code> value will pad the string on the right (left align).</p>
 * @name pad
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to pad.
 * @param {number} amount the amount of padding (number sign is the padding direction)
 * @param char the character to pad with (default is space)
 * @example <caption>Basic usage</caption>
 * trace( "left  : [" + pad( "hello" , 8 )  + "]" ); //left  : [   hello]
 * trace( "right : [" + pad( "hello" , -8 ) + "]" ); //right : [hello   ]
 * @example <caption>Padding a list of names
 * <ul>
 * <li>//.....jerry</li>
 * <li>//....george</li>
 * <li>//....kramer</li>
 * <li>//.....helen</li>
 * </ul>
 * </caption>
 * var seinfeld = [ "jerry", "george", "kramer", "helen" ];
 *
 * var len = seinfeld.length ;
 * for( var i = 0 ; i<len ; i++ )
 * {
 *     trace( pad( seinfeld[i] , 10 , "." ) ) ;
 * }
 */
export function pad( source , amount = 0 , ch = " " )
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return '' ;
    }

    var left  = amount >= 0 ;
    var width = amount > 0 ? amount : -amount ;

    if( ( width < source.length ) || ( width === 0 ) )
    {
        return source ;
    }

    if ( ch === null )
    {
        ch = " " ;
    }
    else if ( ch.length > 1 )
    {
        ch = ch.charAt(0) ;
    }

    while( source.length !== width )
    {
        if( left )
        {
            source = ch + source ;
        }
        else
        {
            source += ch ;
        }
    }

    return source;
}