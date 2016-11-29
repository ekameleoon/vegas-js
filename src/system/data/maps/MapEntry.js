"use strict" ;

/**
 * Represents a basic pair <code>key/value</code> entry in a {@link system.data.KeyValuePair|KeyValuePair}.
 * @summary Represents a basic pair <code>key/value</code> entry in a {@link system.data.KeyValuePair|KeyValuePair}.
 * @name MapEntry
 * @class
 * @memberof system.data.maps
 * @param {*} key - The key representation of the entry.
 * @param {*} value - The value representation of the entry.
 */
export function MapEntry( key , value )
{
    /**
     * The key representation of the entry.
     */
    this.key = key   ;

    /**
     * The value representation of the entry.
     */
    this.value = value ;
}

MapEntry.prototype = Object.create( Object.prototype ) ;
MapEntry.prototype.constructor = MapEntry ;

/**
 * Creates and returns a shallow copy of the object.
 * @return A new object that is a shallow copy of this instance.
 * @name clone
 * @memberof system.data.maps.MapEntry
 * @instance
 * @function
 */
MapEntry.prototype.clone = function()
{
    return new MapEntry( this.key , this.value ) ;
}

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 * @name toString
 * @memberof system.data.maps.MapEntry
 * @instance
 * @function
 */
MapEntry.prototype.toString = function()
{
    return "[MapEntry key:" + this.key + " value:" + this.value + "]" ;
}