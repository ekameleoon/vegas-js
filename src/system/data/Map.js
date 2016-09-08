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
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value :  Map , writable : true , configurable : true },

    /**
     * Returns the number of key-value mappings in this map.
     */
    length : { get : () => 0 } ,

    /**
     * Removes all mappings from this map (optional operation).
     */
    clear : { value : function () {} , writable : true } ,

    /**
     * Returns a shallow copy of the map.
     * @return a shallow copy of the map.
     */
    clone : { value : function () { return new Map() } , writable : true } ,

    /**
     * Removes the mapping for this key from this map if it is present (optional operation).
     */
    delete : { value : function( key ) {} , writable : true } ,

    /**
     * The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.
     * @param callback Function to execute for each element.
     * @param thisArg Value to use as this when executing callback.
     */
    forEach : { value : function( callback , thisArg = null ) {} , writable : true } ,

    /**
     * Returns the value to which this map maps the specified key.
     */
    get : { value : function( key ) { return null ; } , writable : true } ,

    /**
     * Returns {@code true} if this map contains a mapping for the specified key.
     * @return {@code true} if this map contains a mapping for the specified key.
     */
    has : { value : function( key ) /*Boolean*/ { return false ; } , writable : true } ,

    /**
     * Returns {@code true} if this map maps one or more keys to the specified value.
     * @return {@code true} if this map maps one or more keys to the specified value.
     */
    hasValue : { value : function( value ) /*Boolean*/ { return false ; } , writable : true } ,

    /**
     * Returns {@code true} if this map contains no key-value mappings.
     * @return {@code true} if this map contains no key-value mappings.
     */
    isEmpty : { value : function() /*Boolean*/ { return false ; } , writable : true } ,

    /**
     * Returns the values iterator of this map.
     * @return the values iterator of this map.
     */
    iterator : { value : function() /*Iterator*/ { return null ; } , writable : true } ,

    /**
     * Returns the keys iterator of this map.
     * @return the keys iterator of this map.
     */
    keyIterator : { value : function() /*Iterator*/ { return null } , writable : true } ,

    /**
     * Returns an array of all the keys in the map.
     */
    keys : { value : function() /*Array*/ { return null ; } , writable : true } ,

    /**
     * Associates the specified value with the specified key in this map (optional operation).
     */
    set : { value : function( key , value ) {} , writable : true } ,

    /**
     * Copies all of the mappings from the specified map to this map (optional operation).
     */
    setAll : { value : function( map /*Map*/ ) {} , writable : true } ,

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance
     */
    toString : { value : function () { return '[Map]' ; } , writable : true } ,

    /**
     * Returns an array of all the values in the map.
     */
    values : { value : function () /*Array*/ {} , writable : true }
}) ;