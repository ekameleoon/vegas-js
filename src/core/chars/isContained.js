"use strict" ;

/**
 * Indicates if the specified character is a digit.
 * @name isContained
 * @memberof core.chars
 * @function
 * @instance
 * @param {string} c - The expression to evaluate.
 * @param {number} index - The optional index to evaluate a specific character in the passed-in expression.
 * @param {string} charset - The list of characters to evaluate.
 * @return True if the specified character is a digit.
 * @example
 * trace( isContained( "a" , "bubble" ) ) ; // false
 * trace( isContained( "u" , "bubble" ) ) ; // true
 */
export function isContained( c , charset , index = 0)
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }

    var l = charset.length ;
    for( var i = 0 ; i<l ; i++ )
    {
        if( c === charset.charAt( i ) )
        {
            return true ;
        }
    }

    return false;
}
