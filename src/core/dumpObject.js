"use strict" ;

import { dump } from './dump.js' ;

/**
 * Dumps a string representation of an object.
 * @name dumpObject
 * @memberof core
 * @function
 * @instance
 * @param {Object} value - An object to dump.
 * @param {boolean} [prettyprint=false] - The option to output a pretty printed string.
 * @param {number} [indent=0] - The initial indentation value.
 * @param {string} [indentor=    ] - The initial string used for the indent.
 * @return The string expression of the dump.
 */
export function dumpObject( value , prettyprint = false , indent = 0 , indentor = "    ")
{
    indent = isNaN(indent) ? 0 : indent ;

    prettyprint = Boolean( prettyprint ) ;

    if( !indentor )
    {
        indentor = "    " ;
    }

    var source /*Array*/ = [];

    for( var member /*String*/ in value )
    {
        if( value.hasOwnProperty( member ) )
        {
            if( value[member] === undefined )
            {
                source.push( member + ":" + "undefined" );
                continue;
            }

            if( value[member] === null )
            {
                source.push( member + ":" + "null" );
                continue;
            }

            if( prettyprint )
            {
                indent++ ;
            }

            source.push( member + ":" + dump( value[ member ], prettyprint, indent, indentor ) );

            if( prettyprint )
            {
                indent-- ;
            }
        }
    }
    source = source.sort();
    if( prettyprint )
    {
        let spaces = [];
        for( var i = 0 ; i < indent ; i++ )
        {
            spaces.push( indentor );
        }

        let decal = '\n' + spaces.join( '' );
        return decal + '{' + decal + indentor + source.join( ',' + decal + indentor ) + decal + '}' ;
    }
    else
    {
        return( '{' + source.join( ',' ) + '}' ) ;
    }
}