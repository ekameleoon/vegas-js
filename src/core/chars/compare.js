"use strict" ;

/**
 * Compares the two caracteres passed in argument for order.
 * @name compare
 * @memberof core.chars
 * @function
 * @param {string} charA - The first char to compare.
 * @param {string} charB - The second char to compare.
 * @return {number} <p>
 * <li>-1 if charA is "lower" than (less than, before, etc.) charB ;</li>
 * <li> 1 if charA is "higher" than (greater than, after, etc.) charB ;</li>
 * <li> 0 if charA and charB are equal.</li>
 * </p>
 */
export function compare( charA , charB )
{
    var a = charA.charAt(0) ;
    var b = charB.charAt(0) ;
    if ( caseValue(a) < caseValue(b) )
    {
        return -1;
    }
    if ( caseValue(a) > caseValue(b) )
    {
        return 1 ;
    }
    if ( a < b )
    {
        return -1;
    }
    if ( a > b )
    {
        return 1;
    }
    return 0 ;
}

function caseValue( str )
{
    return ( str.toLowerCase().valueOf() === str.valueOf() ) ? 0 : 1 ;
}