"use strict" ;

/**
 * Capitalize each word in a string, like the PHP function.
 */
export function ucWords( str /*String*/ , separator = " ") /*String*/
{
    if( !(str instanceof String || typeof(str) === 'string' ) || str === "" )
    {
        return '' ;
    }
    var ar = str.split(separator) ;
    var l  = ar.length ;
    while(--l > -1)
    {
        ar[l] = ar[l].charAt(0).toUpperCase() + ar[l].substring(1) ;
    }
    return ar.join(separator) ;
}
