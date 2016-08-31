"use strict" ;

/**
 * Indicates if the passed-in string value is a operator digit.
 */
export function isOperator( c /*String*/ ) /*Boolean*/
{
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
