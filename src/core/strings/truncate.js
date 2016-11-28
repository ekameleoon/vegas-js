"use strict" ;

import { trimEnd } from './trimEnd.js' ;

/**
 * Truncates a string expression, accounting for word placement and character count.
 * @name truncate
 * @memberof core.strings
 * @function
 * @instance
 * @param {string} source - The string reference to transform.
 * @param {number} length - The number of character to keep.
 * @param {string} prune - The string suffix to finalize the truncated expression.
 * @return The new truncated string.
 * @example
 * trace( truncate("this is some long text")) ; // ...
 * trace( truncate("this is some long text",3) ) ; // ...
 * trace( truncate("this is some long text",7) ) ; // this is...
 * trace( truncate("this is some long text",12) ) ; // this is some...
 * trace( truncate("this is some long text",12," etc.") ) ; // this is some, etc.
 */
export function truncate( source , length = 0 , prune = "..." )
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return '' ;
    }

    length = length > 0 ? length : 0 ;

    if( !(prune instanceof String || typeof(prune) === 'string' ) )
    {
        prune = '...' ;
    }

    if (source.length <= length)
    {
        return source ;
    }

    let template = source.slice( 0 , length+1 )
                         .replace
                         (
                            /.(?=\W*\w*$)/g ,
                            (c) => c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '
                         ) ;

    if ( template.slice(template.length-2).match(/\w\w/))
    {
        template = template.replace( /\s*\S+$/ , '' );
    }
    else
    {
        template = trimEnd( template.slice( 0 , template.length-1 ) ) ;
    }

    return (template+prune).length > source.length ? source : source.slice(0, template.length) + prune ;
}