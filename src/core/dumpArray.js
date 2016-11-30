"use strict" ;

import { dump } from './dump.js' ;

/**
 * Dumps a string representation of any Array reference.
 * @name dumpArray
 * @memberof core
 * @function
 * @instance
 * @param {Array} value - The Array to dump.
 * @param {boolean} [prettyprint=false] boolean option to output a pretty printed string
 * @param {number} [indent=0] initial indentation
 * @param {string} [indentor=    ] initial string used for the indent.
 * @return The dump string representation of any Array reference.
 */
export function dumpArray( value  , prettyprint = false , indent = 0 , indentor = "    " )
{
    indent = isNaN(indent) ? 0 : indent ;
    prettyprint = Boolean( prettyprint ) ;

    if( !indentor )
    {
        indentor = "    " ;
    }

    var source  = [];

    var i  ;
    var l  = value.length ;

    for( i = 0 ; i < l ; i++ )
    {
        if( value[i] === undefined )
        {
            source.push( "undefined" );
            continue;
        }
        if( value[i] === null )
        {
            source.push( "null" );
            continue;
        }
        if( prettyprint )
        {
            indent++ ;
        }
        source.push( dump( value[i], prettyprint, indent, indentor ) ) ;
        if( prettyprint )
        {
            indent-- ;
        }
    }
    if( prettyprint )
    {
        var spaces  = [] ;
        for( i=0 ; i < indent ; i++ )
        {
            spaces.push( indentor );
        }
        var decal  = "\n" + spaces.join( "" ) ;
        return decal + "[" + decal + indentor + source.join( "," + decal + indentor ) + decal + "]" ;
    }
    else
    {
        return "[" + source.join( "," ) + "]" ;
    }
}