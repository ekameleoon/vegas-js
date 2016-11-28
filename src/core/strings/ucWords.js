"use strict" ;

/**
 * Capitalize each word in a string.
 * @name ucWords
 * @memberof core.strings
 * @function
 * @instance
 * @param {string} source - The string reference to transform.
 * @param {string} [separator=' '] - The optional separator expression.
 * @return The new string expression with each word capitalized.
 * @example
 * trace( ucWords("hello world")) ; // Hello World
 * trace( ucWords("hello-world","-")) ; // Hello-World
 */
export function ucWords( str , separator = " " )
{
    if( !(str instanceof String || typeof(str) === 'string' ) || str === "" )
    {
        return '' ;
    }
    var ar = str.split( separator ) ;
    var l  = ar.length ;
    while(--l > -1)
    {
        ar[l] = ar[l].charAt(0).toUpperCase() + ar[l].substring(1) ;
    }
    return ar.join( separator ) ;
}
