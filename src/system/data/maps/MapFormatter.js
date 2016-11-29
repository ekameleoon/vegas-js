"use strict" ;

import { KeyValuePair } from '../KeyValuePair.js' ;

/**
 * Converts a {@link system.data.KeyValuePair|KeyValuePair} to a custom string representation.
 * @summary Converts a {@link system.data.KeyValuePair|KeyValuePair} to a custom string representation.
 * @name MapFormatter
 * @class
 * @memberof system.data.maps
 */
export function MapFormatter() {}

MapFormatter.prototype = Object.create( Object.prototype ) ;
MapFormatter.prototype.constructor = MapFormatter ;

/**
 * Formats the specified value.
 * @param {system.data.KeyValuePair} value - The {@link system.data.KeyValuePair|KeyValuePair} map to format.
 * @return The string representation of the formatted value.
 */
MapFormatter.prototype.format = function( value )
{
    if ( value && value instanceof KeyValuePair )
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

/**
 * The {@link system.data.maps.MapFormatter|MapFormatter} singleton.
 * @name MapFormatter
 * @instance
 * @const
 * @type system.data.maps.MapFormatte
 * @memberof system.data.maps
 */
export var formatter = new MapFormatter() ;