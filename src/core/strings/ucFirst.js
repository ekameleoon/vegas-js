"use strict" ;

/**
 * Capitalize the first letter of a string, like the PHP function.
 */
export function ucFirst( str /*String*/ ) /*String*/
{
    return str.charAt(0).toUpperCase() + str.substring(1) ;
}