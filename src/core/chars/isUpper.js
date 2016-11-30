"use strict" ;

/**
 * Indicates if the character is an uppercase letter.
 * @name isUpper
 * @memberof core.chars
 * @function
 * @instance
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the specified character is lowercase.
 * trace( isUpper( "A" ) ) ; // true
 * trace( isUpper( "B" ) ) ; // true
 * trace( isUpper( "Z" ) ) ; // true
 * trace( isUpper( "a" ) ) ; // false
 * trace( isUpper( "b" ) ) ; // false
 * trace( isUpper( "-" ) ) ; // false
 * trace( isUpper( "#" ) ) ; // false
 * trace( isUpper( "1" ) ) ; // false
 */
export function isUpper( c  , index /*uint*/ = 0 ) 
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return ( "A" <= c ) && ( c <= "Z" ) ;
}
