"use strict" ;

/**
 * Capitalize the first letter of a string, like the PHP function.
 */
export function ucFirst( str /*String*/ ) /*String*/
{
    if( !(str instanceof String || typeof(str) === 'string' ) || str === "" )
    {
        return '' ;
    }
    return str.charAt(0).toUpperCase() + str.substring(1) ;
}