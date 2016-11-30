"use strict" ;

import { dumpArray  } from './dumpArray.js' ;
import { dumpDate   } from './dumpDate.js' ;
import { dumpObject } from './dumpObject.js' ;
import { dumpString } from './dumpString.js' ;

/**
 * Dumps a string representation of any object reference.
 * @name dump
 * @memberof core
 * @function
 * @instance
 * @param {*} value - Any object to dump.
 * @param {boolean} [prettyprint=false] boolean option to output a pretty printed string
 * @param {number} [indent=0] initial indentation
 * @param {string} [indentor=    ] initial string used for the indent.
 * @return The string expression of the dump.
 * @example
 * var object =
 * {
 *     name   : "vegas" ,
 *     count  : 10 ,
 *     time   : new Date() ,
 *     flag   : true ,
 *     values : [1,2,3]
 * } ;
 * trace( dump( object ) ) ;
 */
export function dump( o , prettyprint  , indent  , indentor   ) 
{
    indent = isNaN(indent) ? 0 : indent ;

    prettyprint = Boolean( prettyprint ) ;

    if( !indentor )
    {
        indentor = "    " ;
    }

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