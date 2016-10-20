"use strict" ;

/**
 * Indicates if the passed-in string value is a operator digit.
 * @param c The expression to evaluate.
 * @param index The optional index to evaluate a specific character in the passed-in expression.
 * @return True if the passed-in string value is a operator digit.
 */
export function isOperator( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    switch( c )
    {
        case "*" :
        case "/" :
        case "%" :
        case "+" :
        case "-" :
        case "«" :
        case "»" :
        case ">" :
        case "<" :
        case "›" :
        case "&" :
        case "^" :
        case "|" :
        {
            return true;
        }
        default:
        {
            return false;
        }
    }
}
