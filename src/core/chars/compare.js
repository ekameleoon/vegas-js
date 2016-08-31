"use strict" ;

import { caseValue } from '../strings/caseValue.js' ;

/**
 * Compares the two caracteres passed in argument for order.
 * @return <p>
 * <li>-1 if charA is "lower" than (less than, before, etc.) charB ;</li>
 * <li> 1 if charA is "higher" than (greater than, after, etc.) charB ;</li>
 * <li> 0 if charA and charB are equal.</li>
 * </p>
 */
export function compare( charA /*String*/ , charB /*String*/ ) /*uint*/
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