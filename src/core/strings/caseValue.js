"use strict" ;

/**
 * Returns 0 if the passed string is lower case else 1.
 * @return 0 if the passed string is lower case else 1.
 */
export function caseValue( str ) /*uint*/
{
    return ( str.toLowerCase().valueOf() === str.valueOf() ) ? 0 : 1 ;
}