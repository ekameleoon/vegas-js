"use strict" ;

import { KeyValuePair } from '../KeyValuePair.js' ;
import { MapEntry }     from './MapEntry.js' ;
import { formatter }    from './MapFormatter.js' ;

import { ArrayIterator } from '../iterators/ArrayIterator.js' ;
import { MapIterator }   from '../iterators/MapIterator.js' ;

/**
 * Hash table based implementation of the Map interface.
 * <p><b>Attention :</b> this class is the ArrayMap class in the AS3 version of VEGAS.</p>
 * @example
 * <pre>
 * var map = new system.data.maps.ArrayMap() ;
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
 *
 * trace( 'values : ' + map.values()) ;
 * trace( map.has('key2')) ;
 * trace( map.get('key2') ) ;
 * trace( map.indexOfKey('key2')) ;
 *
 * map.delete( 'key2' ) ;
 *
 * trace ("map : " + map) ;
 * </pre>
 * @param keys An optional Array of all keys to fill in this Map.
 * @param values An optional Array of all values to fill in this Map. This Array must have the same size like the 'keys' argument.
 */
export function ArrayMap( keys /*Array*/ , values /*Array*/ )
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
        var b = ( keys instanceof Array && values instanceof Array && keys.length > 0 && keys.length === values.length ) ;
        this._keys   = b ? [].concat(keys)   : [] ;
        this._values = b ? [].concat(values) : [] ;
    }
}

/**
 * @extends KeyValuePair
 */
ArrayMap.prototype = Object.create( KeyValuePair.prototype ,
{
    /**
     * Returns the number of key-value mappings in this map.
     */
    length :
    {
        get : function() { return this._keys.length ; }
    }
}) ;

ArrayMap.prototype.constructor = ArrayMap ;

/**
 * Removes all mappings from this map (optional operation).
 */
ArrayMap.prototype.clear = function ()
{
    this._keys   = [] ;
    this._values = [] ;
}

/**
 * Returns a shallow copy of this ArrayMap instance: the keys and values themselves are not cloned.
 * @return a shallow copy of this ArrayMap instance: the keys and values themselves are not cloned.
 */
ArrayMap.prototype.clone = function ()
{
    return new ArrayMap( this._keys , this._values ) ;
}

/**
 * Removes the mapping for this key from this map if present.
 * @param o The key whose mapping is to be removed from the map.
 * @return previous value associated with specified key, or null if there was no mapping for key. A null return can also indicate that the map previously associated null with the specified key.
 */
ArrayMap.prototype.delete = function ( key )
{
    var v = null ;
    var i = this.indexOfKey( key ) ;
    if ( i > -1 )
    {
        v = this._values[i] ;
        this._keys.splice(i, 1) ;
        this._values.splice(i, 1) ;
    }
    return v ;
}

/**
 * The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.
 * @param callback Function to execute for each element.
 * @param thisArg Value to use as this when executing callback.
 */
ArrayMap.prototype.forEach = function( callback , thisArg = null )
{
    if (typeof callback !== "function")
    {
        throw new TypeError( callback + ' is not a function' );
    }

    var l = this._keys.length ;
    for( var i = 0 ; i<l ; i++ )
    {
        callback.call( thisArg , this._values[i] , this._keys[i] , this ) ;
    }
}

/**
 * Returns the value to which this map maps the specified key.
 * @return the value to which this map maps the specified key.
 */
ArrayMap.prototype.get = function( key )
{
    return this._values[ this.indexOfKey( key ) ] ;
}

/**
 * Returns the value to which this map maps the specified key.
 * @return the value to which this map maps the specified key.
 */
ArrayMap.prototype.getKeyAt = function ( index /*uint*/ )
{
    return this._keys[ index ] ;
}

/**
 * Returns the value to which this map maps the specified key.
 * @return the value to which this map maps the specified key.
 */
ArrayMap.prototype.getValueAt = function ( index /*uint*/ )
{
    return this._values[ index ] ;
}

/**
 * Returns {@code true} if this map contains a mapping for the specified key.
 * @return {@code true} if this map contains a mapping for the specified key.
 */
ArrayMap.prototype.has = function ( key ) /*Boolean*/
{
    return this.indexOfKey(key) > -1 ;
}

/**
 * Returns {@code true} if this map maps one or more keys to the specified value.
 * @return {@code true} if this map maps one or more keys to the specified value.
 */
ArrayMap.prototype.hasValue = function ( value ) /*Boolean*/
{
    return this.indexOfValue( value ) > -1 ;
}

/**
 * Returns the index of the specified key in argument.
 * @param key the key in the map to search.
 * @return the index of the specified key in argument.
 */
ArrayMap.prototype.indexOfKey = function (key) /*int*/
{
    var l = this._keys.length ;
    while( --l > -1 )
    {
        if ( this._keys[l] === key )
        {
            return l ;
        }
    }
    return -1 ;
}

/**
 * Returns the index of the specified value in argument.
 * @param value the value in the map to search.
 * @return the index of the specified value in argument.
 */
ArrayMap.prototype.indexOfValue = function (value) /*int*/
{
    var l = this._values.length ;
    while( --l > -1 )
    {
        if ( this._values[l] === value )
        {
            return l ;
        }
    }
    return -1 ;
}

/**
 * Returns true if this map contains no key-value mappings.
 * @return true if this map contains no key-value mappings.
 */
ArrayMap.prototype.isEmpty = function () /*Boolean*/
{
    return this._keys.length === 0 ;
}

/**
 * Returns the values iterator of this map.
 * @return the values iterator of this map.
 */
ArrayMap.prototype.iterator = function () /*Iterator*/
{
    return new MapIterator( this ) ;
}

/**
 * Returns the keys iterator of this map.
 * @return the keys iterator of this map.
 */
ArrayMap.prototype.keyIterator = function () /*Iterator*/
{
    return new ArrayIterator( this._keys ) ;
}

/**
 * Returns an array representation of all keys in the map.
 * @return an array representation of all keys in the map.
 */
ArrayMap.prototype.keys = function () /*Array*/
{
    return this._keys.concat() ;
}

/**
 * Associates the specified value with the specified key in this map.
 * @param key the key to register the value.
 * @param value the value to be mapped in the map.
 */
ArrayMap.prototype.set = function ( key , value )
{
    var r = null ;
    var i /*Number*/ = this.indexOfKey( key ) ;
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
}

/**
 * Copies all of the mappings from the specified map to this one.
 */
ArrayMap.prototype.setAll = function ( map /*KeyValuePair*/ )
{
    if ( !map || !(map instanceof KeyValuePair) )
    {
        return ;
    }
    var keys   = map.keys() ;
    var values = map.values() ;
    var l      = keys.length ;
    for (var i = 0 ; i<l ; i = i - (-1) )
    {
        this.put(keys[i], values[i]) ;
    }
}

/**
 * Sets the value of the "key" in the ArrayMap with the specified index.
 * @param index The position of the entry in the ArrayMap.
 * @param value The value of the entry to change.
 * @return A MapEntry who corresponding the old key/value entry or null if the key already exist or the specified index don't exist.
 * @throws RangeError If the index is out of the range of the Map size.
 */
ArrayMap.prototype.setKeyAt = function( index /*uint*/ , key )
{
    if ( index >= this._keys.length )
    {
        throw new RangeError( "ArrayMap.setKeyAt(" + index + ") failed with an index out of the range.") ;
    }
    if ( this.containsKey( key ) )
    {
        return null ;
    }
    var k = this._keys[index] ;
    if (k === undefined)
    {
        return null ;
    }
    var v = this._values[index] ;

    this._keys[index] = key ;
    return new MapEntry( k , v ) ;
}

/**
 * Sets the value of the "value" in the HashMap (ArrayMap) with the specified index.
 * @return the old value in the map if exist.
 */
ArrayMap.prototype.setValueAt = function( index /*Number*/ , value )
{
    if ( index >= this._keys.length )
    {
        throw new RangeError( "ArrayMap.setValueAt(" + index + ") failed with an index out of the range.") ;
    }
    var v = this._values[index] ;  // TODO refactoring
    if (v === undefined)
    {
        return null ;
    }
    var k = this._keys[index] ;
    this._values[index] = value ;
    return new MapEntry( k , v ) ;
}

/**
 * Returns the string representation of this map.
 * @return the string representation of this map.
 */
ArrayMap.prototype.toString = function ()
{
    return formatter.format( this ) ;
}

/**
 * Returns an array representation of all values in the map.
 * @return an array representation of all values in the map.
 */
ArrayMap.prototype.values = function () /*Array*/
{
    return this._values.concat() ;
}