"use strict" ;

import { dump } from './dump.js' ;

/**
 * Dumps a string representation of any Array reference.
 * @param value an Array to dump.
 * @param prettyprint (optional) boolean option to output a pretty printed string
 * @param indent (optional) initial indentation
 * @param indentor (optional) initial string used for the indent
 * @return The dump string representation of any Array reference.
 */
export function dumpArray( value /*Array*/ , prettyprint /*Boolean*/ , indent /*int*/ , indentor /*String*/  ) /*String*/
{
    indent = isNaN(indent) ? 0 : indent ;
    prettyprint = Boolean( prettyprint ) ;

    if( !indentor )
    {
        indentor = "    " ;
    }

    var source /*Array*/ = [];

    var i /*int*/ ;
    var l /*int*/ = value.length ;

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
        var spaces /*Array*/ = [] ;
        for( i=0 ; i < indent ; i++ )
        {
            spaces.push( indentor );
        }
        var decal /*String*/ = "\n" + spaces.join( "" ) ;
        return decal + "[" + decal + indentor + source.join( "," + decal + indentor ) + decal + "]" ;
    }
    else
    {
        return "[" + source.join( "," ) + "]" ;
    }
}