"use strict" ;

import { dumpArray  } from './dumpArray.js' ;
import { dumpDate   } from './dumpDate.js' ;
import { dumpObject } from './dumpObject.js' ;
import { dumpString } from './dumpString.js' ;

/**
 * Dumps a string representation of any Array reference.
 * @param value an Array to dump.
 * @param prettyprint (optional) boolean option to output a pretty printed string
 * @param indent (optional) initial indentation
 * @param indentor (optional) initial string used for the indent
 * @return The dump string representation of any Array reference.
 */
export function dump( o , prettyprint /*Boolean*/ , indent /*int*/ , indentor /*String*/  ) /*String*/
{
    ///////////

    indent = isNaN(indent) ? 0 : indent ;

    prettyprint = Boolean( prettyprint ) ;

    if( !indentor )
    {
        indentor = "    " ;
    }

    ///////////

    if( o === undefined )
    {
        return "undefined";
    }
    else if( o === null )
    {
        return "null";
    }
    else if( typeof(o) === "string" || o instanceof String )
    {
        return dumpString( o );
    }
    else if ( typeof(o) === "boolean" || o instanceof Boolean  )
    {
        return o ? "true" : "false";
    }
    else if( typeof(o) === "number" || o instanceof Number )
    {
        return o.toString() ;
    }
    else if( o instanceof Date )
    {
        return dumpDate( o );
    }
    else if( o instanceof Array )
    {
        return dumpArray( o , prettyprint, indent, indentor );
    }
    else if( o.constructor && o.constructor === Object )
    {
        return dumpObject( o , prettyprint, indent, indentor );
    }
    else if( "toSource" in o )
    {
        return o.toSource( indent );
    }
    else
    {
        return "<unknown>";
    }
}