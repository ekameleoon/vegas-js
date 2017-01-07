"use strict" ;

import { KeyValuePair } from '../KeyValuePair.js' ;
import { MapEntry }     from './MapEntry.js' ;
import { formatter }    from './MapFormatter.js' ;

import { ArrayIterator } from '../iterators/ArrayIterator.js' ;
import { MapIterator }   from '../iterators/MapIterator.js' ;

/**
 * Hash table based implementation of the Map interface.
 * <p><b>Note:</b> this class is the ArrayMap class in the AS3 version of VEGAS.</p>
 * @summary Hash table based implementation of the Map interface.
 * @name ArrayMap
 * @class
 * @memberof system.data.maps
 * @extends system.data.KeyValuePair
 * @example
 * var map = new ArrayMap() ;
 *
 * map.set("key1", "value1") ;
 * map.set("key2", "value2") ;
 * map.set("key3", "value3") ;
 *
 * trace ("map : " + map) ;
 *
 * trace ("------ iterator") ;
 *
 * var it = map.iterator() ;
 * while (it.hasNext())
 * {
 *     trace (it.next() + " : " + it.key()) ;
 * }
 *
 * trace( 'values : ' + map.values()) ;
 * trace( map.has('key2')) ;
 * trace( map.get('key2') ) ;
 * trace( map.indexOfKey('key2')) ;
 *
 * map.delete( 'key2' ) ;
 *
 * trace ("map : " + map) ;
 * @param {array} keys - An optional <code>Array</code> of all <b>keys</b> to fill in this <b>Map</b>.
 * @param {array} values - An optional <code>Array</code> of all <b>values</b> to fill in this <b>Map</b>. This <code>Array</code> must have the same size like the 'keys' argument.
 */
export function ArrayMap( keys = null , values = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _keys :
        {
            value : [] ,
            writable : true
        },
        /**
         * @private
         */
        _values :
        {
            value : [] ,
            writable : true
        }
    }) ;

    if ( keys === null || values === null )
    {
        this._keys   = [] ;
        this._values = [] ;
    }
    else
    {
        let b = ( keys instanceof Array && values instanceof Array && keys.length > 0 && keys.length === values.length ) ;
        this._keys   = b ? [].concat(keys)   : [] ;
        this._values = b ? [].concat(values) : [] ;
    }
}

ArrayMap.prototype = Object.create( KeyValuePair.prototype ,
{
    constructor : { writable : true , value : ArrayMap } ,

    /**
     * The number of key-value mappings in this map.
     * @name length
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @type {number}
     * @readonly
     */
    length : { get : function() { return this._keys.length ; } } ,

    /**
     * Removes all mappings from this map (optional operation).
     * @name clear
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    clear : { value : function ()
    {
        this._keys   = [] ;
        this._values = [] ;
    }},

    /**
     * Returns a shallow copy of this ArrayMap instance: the keys and values themselves are not cloned.
     * @return a shallow copy of this ArrayMap instance: the keys and values themselves are not cloned.
     * @name clone
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    clone : { value : function ()
    {
        return new ArrayMap( this._keys , this._values ) ;
    }},

    /**
     * Copies all of the mappings from the specified map to this one.
     * @param {system.data.KeyValuePair} map - The map to fill the current map.
     * @name setAll
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    copyFrom : { value : function ( map )
    {
        if ( !map || !(map instanceof KeyValuePair) )
        {
            return ;
        }
        let keys = map.keys() ;
        let values = map.values() ;
        let l = keys.length ;
        for ( let i = 0 ; i<l ; i = i - (-1) )
        {
            this.set(keys[i], values[i]) ;
        }
    }},

    /**
     * Removes the mapping for this key from this map if present.
     * @param {*} key - The key whose mapping is to be removed from the map.
     * @return previous value associated with specified key, or null if there was no mapping for key. A <code>null</code> return can also indicate that the map previously associated null with the specified key.
     * @name delete
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    delete : { value : function ( key )
    {
        let v = null ;
        let i = this.indexOfKey( key ) ;
        if ( i > -1 )
        {
            v = this._values[i] ;
            this._keys.splice(i, 1) ;
            this._values.splice(i, 1) ;
        }
        return v ;
    }},

    /**
     * The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.
     * @param {function} callback - Function to execute for each element.
     * @param {Object} thisArg - Value to use as this when executing callback.
     * @name forEach
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    forEach : { value : function( callback , thisArg = null )
    {
        if (typeof callback !== "function")
        {
            throw new TypeError( callback + ' is not a function' );
        }

        let l = this._keys.length ;
        for( let i = 0 ; i<l ; i++ )
        {
            callback.call( thisArg , this._values[i] , this._keys[i] , this ) ;
        }
    }},

    /**
     * Returns the value to which this map maps the specified key.
     * @param {*} key - The key of the entry to retrieve in the collection.
     * @return the value to which this map maps the specified key.
     * @name get
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    get : { value : function( key )
    {
        return this._values[ this.indexOfKey( key ) ] ;
    }},

    /**
     * Returns the value to which this map maps the specified key.
     * @param {number} index - The index of the key in the array map.
     * @return the value to which this map maps the specified key.
     * @name getKeyAt
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    getKeyAt : { value : function ( index )
    {
        return this._keys[ index ] ;
    }},

    /**
     * Returns the value to which this map maps the specified key.
     * @param {number} index - The index of the value in the array map.
     * @return the value to which this map maps the specified key.
     * @name getValueAt
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    getValueAt : { value : function ( index /*uint*/ )
    {
        return this._values[ index ] ;
    }},

    /**
     * Returns <code>true</code> if this map contains a mapping for the specified key.
     * @param {*} key - The key of the entry to retrieve in the collection.
     * @name has
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    has : { value : function ( key )
    {
        return this.indexOfKey(key) > -1 ;
    }},

    /**
     * Returns <code>true</code> if this map maps one or more keys to the specified value.
     * @return <code>true</code> if this map maps one or more keys to the specified value.
     * @name hasValue
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    hasValue : { value : function ( value )
    {
        return this.indexOfValue( value ) > -1 ;
    }},

    /**
     * Returns the index of the specified key in argument.
     * @param {*} key - The key in the map to search.
     * @return The index of the specified key in argument.
     * @name indexOfKey
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    indexOfKey : { value : function (key)
    {
        let l = this._keys.length ;
        while( --l > -1 )
        {
            if ( this._keys[l] === key )
            {
                return l ;
            }
        }
        return -1 ;
    }},

    /**
     * Returns the index of the specified value in argument.
     * @param {*} value - The value in the map to search.
     * @return the index of the specified value in argument.
     * @name indexOfValue
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    indexOfValue : { value : function (value)
    {
        let l = this._values.length ;
        while( --l > -1 )
        {
            if ( this._values[l] === value )
            {
                return l ;
            }
        }
        return -1 ;
    }},

    /**
     * Returns <code>true</code> if this map contains no key-value mappings.
     * @return <code>true</code> if this map contains no key-value mappings.
     * @name isEmpty
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    isEmpty : { value : function ()
    {
        return this._keys.length === 0 ;
    }},

    /**
     * Returns the values iterator of this map.
     * @return the values iterator of this map.
     * @name iterator
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    iterator : { value : function ()
    {
        return new MapIterator( this ) ;
    }},

    /**
     * Returns the keys iterator of this map.
     * @return the keys iterator of this map.
     * @name keyIterator
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    keyIterator : { value : function () /*Iterator*/
    {
        return new ArrayIterator( this._keys ) ;
    }},

    /**
     * Returns an array representation of all keys in the map.
     * @return an array representation of all keys in the map.
     * @name keys
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    keys : { value : function ()
    {
        return this._keys.concat() ;
    }},

    /**
     * Associates the specified value with the specified key in this map.
     * @param {*} key - The key to register the value.
     * @param {*} value - The value to be mapped in the map.
     * @name set
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    set : { value : function ( key , value )
    {
        let r = null ;
        let i = this.indexOfKey( key ) ;
        if ( i < 0 )
        {
            this._keys.push( key ) ;
            this._values.push( value ) ;
        }
        else
        {
            r = this._values[i] ;
            this._values[i] = value ;
        }
        return r ;
    }},

    /**
     * Sets the value of the <code>"key"</code> in the <code>ArrayMap</code> with the specified index.
     * @param {number} index - The position of the entry in the ArrayMap.
     * @param {*} key - The key of the entry to change.
     * @return A {@link system.data.maps.MapEntry|MapEntry} who corresponding the old key/value entry or null if the key already exist or the specified index don't exist.
     * @throws RangeError If the index is out of the range of the Map size.
     * @name setKeyAt
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    setKeyAt : { value : function( index , key )
    {
        if ( index >= this._keys.length )
        {
            throw new RangeError( "ArrayMap.setKeyAt(" + index + ") failed with an index out of the range.") ;
        }
        if ( this.containsKey( key ) )
        {
            return null ;
        }
        let k = this._keys[index] ;
        if (k === undefined)
        {
            return null ;
        }
        let v = this._values[index] ;
        this._keys[index] = key ;
        return new MapEntry( k , v ) ;
    }},

    /**
     * Sets the value of the "value" in the HashMap (ArrayMap) with the specified index.
     * @param {number} index - The position of the entry in the ArrayMap.
     * @param {*} value - The value of the entry to change.
     * @return A {@link system.data.maps.MapEntry|MapEntry} who corresponding the old key/value entry or null if the key already exist or the specified index don't exist.
     * @name setValueAt
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    setValueAt : { value : function( index , value )
    {
        if ( index >= this._keys.length )
        {
            throw new RangeError( "ArrayMap.setValueAt(" + index + ") failed with an index out of the range.") ;
        }
        let v = this._values[index] ;  // TODO refactoring
        if (v === undefined)
        {
            return null ;
        }
        let k = this._keys[index] ;
        this._values[index] = value ;
        return new MapEntry( k , v ) ;
    }},

    /**
     * Returns the string representation of this map.
     * @return the string representation of this map.
     * @name toString
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    toString : { value : function () { return formatter.format( this ) ; }},

    /**
     * Returns an array representation of all values in the map.
     * @return an array representation of all values in the map.
     * @name values
     * @memberof system.data.maps.ArrayMap
     * @instance
     * @function
     */
    values : { value : function ()
    {
        return this._values.concat() ;
    }}
}) ;