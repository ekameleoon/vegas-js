/*jshint unused: false*/
"use strict" ;

/**
 * An object that maps keys to values. A map cannot contain duplicate keys. Each key can map to at most one value.
 * <p><b>Note:</b> This class replace the old <code>system.data.Map</code> interface in the VEGAS framework. Today in Javascript the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map|Map} class is a standard global <b>ECMAScript</b> definition.</p>
 * @name KeyValuePair
 * @summary An object that maps keys to values.
 * @class
 * @memberof system.data
 */
export function KeyValuePair() {}

KeyValuePair.prototype = Object.create( Object.prototype ,
{
    /**
     * The constructor reference of this instance.
     */
    constructor : { value :  KeyValuePair , writable : true },

    /**
     * Returns the number of key-value mappings in this map.
     * @name length
     * @memberof system.process.KeyValuePair
     * @instance
     * @type {number}
     * @readonly
     */
    length : { get : () => 0 } ,

    /**
     * Removes all mappings from this map (optional operation).
     * @name clear
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    clear : { value : function () {} , writable : true } ,

    /**
     * Returns a shallow copy of the map.
     * @return a shallow copy of the map.
     * @name clone
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    clone : { value : function () { return new KeyValuePair() } , writable : true } ,

    /**
     * Removes the mapping for this key from this map if it is present (optional operation).
     * @param {*} key - The key of the entry to remove.
     * @name delete
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    delete : { value : function( key ) {} , writable : true } ,

    /**
     * The forEach() method executes a provided function once per each key/value pair in the KeyValuePair object, in insertion order.
     * @param callback Function to execute for each element.
     * @param thisArg Value to use as this when executing callback.
     * @name forEach
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    forEach : { value : function( callback , thisArg = null ) {} , writable : true } ,

    /**
     * Returns the value to which this map maps the specified key.
     * @param {*} key - The key of the entry to retrieve in the collection.
     * @name get
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    get : { value : function( key ) { return null ; } , writable : true } ,

    /**
     * Returns {@code true} if this map contains a mapping for the specified key.
     * @param {*} key - The key of the entry to retrieve in the collection.
     * @return {@code true} if this map contains a mapping for the specified key.
     * @name has
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    has : { value : function( key ) /*Boolean*/ { return false ; } , writable : true } ,

    /**
     * Returns {@code true} if this map maps one or more keys to the specified value.
     * @return {@code true} if this map maps one or more keys to the specified value.
     * @name hasValue
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    hasValue : { value : function( value ) /*Boolean*/ { return false ; } , writable : true } ,

    /**
     * Returns {@code true} if this map contains no key-value mappings.
     * @return {@code true} if this map contains no key-value mappings.
     * @name isEmpty
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    isEmpty : { value : function() /*Boolean*/ { return false ; } , writable : true } ,

    /**
     * Returns the values iterator of this map.
     * @return the values iterator of this map.
     * @name iterator
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    iterator : { value : function() /*Iterator*/ { return null ; } , writable : true } ,

    /**
     * Returns the keys iterator of this map.
     * @return the keys iterator of this map.
     * @name keyIterator
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    keyIterator : { value : function() /*Iterator*/ { return null } , writable : true } ,

    /**
     * Returns an <code>Array</code> of all the keys in the map.
     * @return an <code>Array</code> representation of all the keys register in this collection.
     * @name keys
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    keys : { value : function() { return null ; } , writable : true } ,

    /**
     * Associates the specified value with the specified key in this map (optional operation).
     * @param {*} key - The key of the element to add to the Map object.
     * @param {*} value - The value of the element to add to the Map object.
     * @name set
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    set : { value : function( key , value ) {} , writable : true } ,

    /**
     * Copies all of the mappings from the specified map to this map (optional operation).
     * @param {system.data.KeyValuePair} map - The map to fill the current map.
     * @name setAll
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    setAll : { value : function( map /*KeyValuePair*/ ) {} , writable : true } ,

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    toString : { value : function () { return '[' + this.constructor.name + ']' ; } , writable : true } ,

    /**
     * Returns an array of all the values in the map.
     * @return an <code>Array</code> representation of all the values register in this collection.
     * @name values
     * @memberof system.process.KeyValuePair
     * @instance
     * @function
     */
    values : { value : function () /*Array*/ {} , writable : true }
}) ;