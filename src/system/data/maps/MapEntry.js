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
    Object.defineProperties( this ,
    {
        /**
         * The key representation of the entry.
         * @name key
         * @memberof system.data.maps.MapEntry
         * @instance
         */
        key : { value : key , writable : true },

        /**
         * The value representation of the entry.
         * @name value
         * @memberof system.data.maps.MapEntry
         * @instance
         */
        value : { value : value , writable : true }
    }) ;
}

MapEntry.prototype = Object.create( Object.prototype ,
{
    constructor : { value : MapEntry } ,

    /**
     * Creates and returns a shallow copy of the object.
     * @return A new object that is a shallow copy of this instance.
     * @name clone
     * @memberof system.data.maps.MapEntry
     * @instance
     * @function
     */
    clone : { value : function()
    {
        return new MapEntry( this.key , this.value ) ;
    }},

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @name toString
     * @memberof system.data.maps.MapEntry
     * @instance
     * @function
     */
    toString : { value : function()
    {
        return "[MapEntry key:" + this.key + " value:" + this.value + "]" ;
    }}
}) ;