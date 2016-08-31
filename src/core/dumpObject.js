"use strict" ;

import { dump } from './dump.js' ;

/**
 * Dumps a string representation of an object.
 * @param value an object
 * @param prettyprint (optional) boolean option to output a pretty printed string
 * @param indent (optional) initial indentation
 * @param indentor (optional) initial string used for the indent
 */
export function dumpObject( value /*Object*/ , prettyprint /*Boolean*/ , indent /*int*/ , indentor /*String*/  ) /*String*/
{
    ///////////

    indent = isNaN(indent) ? 0 : indent ;

    prettyprint = Boolean( prettyprint ) ;

    if( !indentor )
    {
        indentor = "    " ;
    }

    ///////////

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
        var spaces /*Array*/ = [];
        for( var i /*int*/ ; i < indent ; i++ )
        {
            spaces.push( indentor );
        }

        var decal /*String*/ = "\n" + spaces.join( "" );
        return decal + "{" + decal + indentor + source.join( "," + decal + indentor ) + decal + "}";
    }
    else
    {
        return( "{" + source.join( "," ) + "}" ) ;
    }
}