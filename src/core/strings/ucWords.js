"use strict" ;

import { ucFirst } from './ucFirst.js' ;

/**
 * Capitalize each word in a string, like the PHP function.
 */
export function ucWords( str /*String*/ ) /*String*/
{
    var ar = str.split(" ") ;
    var l  = ar.length ;
    while(--l > -1)
    {
        ar[l] = ucFirst(ar[l]) ;
    }
    return ar.join(" ") ;
}
