"use strict" ;

import { trim } from './trim.js' ;

/**
 * Removes all extraneous whitespace from a string and trims it.
 * @param source The string to clean.
 * @return The cleaned string.
 * @example
 * <code>
 * trace( clean("   hello world \n\n" ) ) ; // hello world
 * </code>
 */
export function clean( source /*String*/ ) /*String*/
{
    if ( source === null || !(source instanceof String || typeof(source) === 'string' ) )
    {
        return "" ;
    }
    return trim( source.replace( /\s+/g , ' ' ) );
}