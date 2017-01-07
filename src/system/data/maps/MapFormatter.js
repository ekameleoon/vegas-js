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

MapFormatter.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : MapFormatter },

    /**
     * Formats the specified value.
     * @param {system.data.KeyValuePair} value - The {@link system.data.KeyValuePair|KeyValuePair} map to format.
     * @return The string representation of the formatted value.
     * @name format
     * @memberof system.data.maps.MapFormatter
     * @instance
     * @function
     */
    format : { value : function( value )
    {
        if ( value instanceof KeyValuePair )
        {
            let r = "{";
            let keys = value.keys()   ;
            let len  = keys.length ;
            if( len > 0 )
            {
                let values = value.values() ;
                for( let i = 0 ; i < len ; i++ )
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
    }}
}) ;

/**
 * The {@link system.data.maps.MapFormatter|MapFormatter} singleton.
 * @name formatter
 * @instance
 * @const
 * @type system.data.maps.MapFormatter
 * @memberof system.data.maps
 */
export var formatter = new MapFormatter() ;