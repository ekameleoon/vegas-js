/*jshint unused: false*/
"use strict" ;

/**
 * An object that maps keys to values. A map cannot contain duplicate keys. Each key can map to at most one value.
 */
export function Map()
{
    //
}

/**
 * @extends Object
 */
Map.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns the number of key-value mappings in this map.
     */
    length : { get : () => 0 }
}) ;

Map.prototype.constructor = Map ;

/**
 * Removes all mappings from this map (optional operation).
 */
Map.prototype.clear = function ()
{
    //
}

/**
 * Returns a shallow copy of the map.
 * @return a shallow copy of the map.
 */
Map.prototype.clone = function ()
{
    return new Map() ;
}

/**
 * Removes the mapping for this key from this map if it is present (optional operation).
 */
Map.prototype.delete = function( key )
{
    //
}

/**
 * Returns the value to which this map maps the specified key.
 */
Map.prototype.get = function( key )
{
    //
}

/**
 * Returns {@code true} if this map contains a mapping for the specified key.
 * @return {@code true} if this map contains a mapping for the specified key.
 */
Map.prototype.has = function ( key ) /*Boolean*/
{
    //
}

/**
 * Returns {@code true} if this map maps one or more keys to the specified value.
 * @return {@code true} if this map maps one or more keys to the specified value.
 */
Map.prototype.hasValue = function ( value ) /*Boolean*/
{
    //
}

/**
 * Returns {@code true} if this map contains no key-value mappings.
 * @return {@code true} if this map contains no key-value mappings.
 */
Map.prototype.isEmpty = function () /*Boolean*/
{
    //
}

/**
 * Returns the values iterator of this map.
 * @return the values iterator of this map.
 */
Map.prototype.iterator = function () /*Iterator*/
{
    //
}

/**
 * Returns the keys iterator of this map.
 * @return the keys iterator of this map.
 */
Map.prototype.keyIterator = function () /*Iterator*/
{
    //
}

/**
 * Returns an array of all the keys in the map.
 */
Map.prototype.keys = function () /*Array*/
{
    //
}

/**
 * Associates the specified value with the specified key in this map (optional operation).
 */
Map.prototype.set = function ( key , value )
{
    //
}

/**
 * Copies all of the mappings from the specified map to this map (optional operation).
 */
Map.prototype.setAll = function( map /*Map*/ )
{
    //
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance
 */
Map.prototype.toString = function ()
{
    return '[Map]' ;
}

/**
 * Returns an array of all the values in the map.
 */
Map.prototype.values = function () /*Array*/
{
    //
}