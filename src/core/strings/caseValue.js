"use strict" ;

/**
 * Returns <code>0</code> if the passed string is lower case else <code>1</code>.
 * @name caseValue
 * @memberof core.strings
 * @function
 * @return <code>0</code> if the passed string is lower case else <code>1</code>.
 * @example
 * trace( caseValue("hello") ) ; // 0
 * trace( caseValue("helLo") ) ; // 1
 * trace( caseValue("HELLO") ) ; // 1
 */
export function caseValue( str )
{
    return ( str.toLowerCase().valueOf() === str.valueOf() ) ? 0 : 1 ;
}