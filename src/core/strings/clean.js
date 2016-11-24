"use strict" ;

import { trim } from './trim.js' ;

/**
 * Removes all extraneous whitespace from a string and trims it.
 * @name clean
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to clean.
 * @return The cleaned string.
 * @example
 * trace( clean("   hello world \n\n" ) ) ; // hello world
 */
export function clean( source )
{
    if ( source === null || !(source instanceof String || typeof(source) === 'string' ) )
    {
        return "" ;
    }
    return trim( source.replace( /\s+/g , ' ' ) );
}