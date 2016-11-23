"use strict" ;

import { operators } from './operators.js' ;

/**
 * Indicates if the passed-in string value is a operator digit.
 * @name isOperator
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the passed-in string value is a operator digit.
 * @example
 * trace( isOperator( "a" ) ) ; // false
 * trace( isOperator( "+" ) ) ; // true
 */
export function isOperator( c , index = 0 )
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return operators.indexOf(c) > -1 ;
}
