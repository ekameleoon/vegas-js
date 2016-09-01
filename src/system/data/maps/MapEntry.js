"use strict" ;

/**
 * Represents a pair key/value entry in a Map.
 * @param key The key representation of the entry.
 * @param value The value representation of the entry.
 */
export function MapEntry( key , value )
{
    this.key   = key   ;
    this.value = value ;
}

/**
 * @extends Object
 */
MapEntry.prototype = Object.create( Object.prototype ) ;
MapEntry.prototype.constructor = MapEntry ;

/**
 * Creates and returns a shallow copy of the object.
 * @return A new object that is a shallow copy of this instance.
 */
MapEntry.prototype.clone = function()
{
    return new MapEntry( this.key , this.value ) ;
}

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
MapEntry.prototype.toString = function() /*String*/
{
    return "[MapEntry key:" + this.key + " value:" + this.value + "]" ;
}