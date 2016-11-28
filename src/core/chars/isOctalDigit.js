"use strict" ;

/**
 * Indicates if the specified character is an octal digit. The octal numeral system, or oct for short, is the <strong>base-8</strong> number system, and uses the digits <code>0</code> to <code>7</code>.
 * @name isOctalDigit
 * @memberof core.chars
 * @function
 * @instance
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the specified character is an octal digit.
 * @example
 * var chars =
 * [
 *     "0" , "1" , "2" , "3" , "4" ,
 *     "5" , "6" , "7" , "8" , "A" , "a" , "$"
 * ] ;
 * for( var i = 0 ; i<chars.length ; i++ )
 * {
 *     trace( chars[i] + " isOctalDigit " + isOctalDigit( chars[i] ) ) ;
 * }
 */
export function isOctalDigit( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return ("0" <= c) && (c <= "7") ;
}
