"use strict" ;

/**
 * Indicates if the character is lowercase.
 * @name isLower
 * @memberof core.chars
 * @function
 * @instance
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the specified character is lowercase.
 * @example
 * trace( isLower( "a" ) ) ; // true
 * trace( isLower( "A" ) ) ; // false
 * trace( isLower( "-" ) ) ; // false
 * trace( isLower( "#" ) ) ; // false
 * trace( isLower( "1" ) ) ; // false
 */
export function isLower( c , index = 0 ) 
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return ( "a" <= c ) && ( c <= "z" ) ;
}
