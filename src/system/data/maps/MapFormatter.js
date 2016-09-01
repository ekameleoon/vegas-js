"use strict" ;

import { Map } from '../Map.js' ;

/**
 * Converts a Map to a custom string representation.
 */
export function MapFormatter()
{
}

/**
 * @extends Object
 */
MapFormatter.prototype = Object.create( Object.prototype ) ;
MapFormatter.prototype.constructor = MapFormatter ;

/**
 * Formats the specified value.
 * @param value The object to format.
 * @return the string representation of the formatted value.
 */
MapFormatter.prototype.format = function( value ) /*String*/
{
    if ( value && value instanceof Map )
    {
        var r = "{";
        var keys   = value.keys()   ;
        var len    = keys.length ;
        if( len > 0 )
        {
            var values = value.values() ;
            for( var i = 0 ; i<len ; i++ )
            {
                r += keys[i] + ':' + values[i] ;
                if( i < len - 1 )
                {
                    r += "," ;
                }
            }
        }
        r += "}" ;
        return r ;
    }
    else
    {
        return "{}" ;
    }
}

export var formatter = new MapFormatter() ;