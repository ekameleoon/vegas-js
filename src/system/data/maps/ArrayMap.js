/*
  Version: MPL 1.1/GPL 2.0/LGPL 2.1
 
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at
  http://www.mozilla.org/MPL/
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the
  License.
  
  The Original Code is [maashaack framework].
  
  The Initial Developers of the Original Code are
  Zwetan Kjukov <zwetan@gmail.com> and Marc Alcaraz <ekameleon@gmail.com>.
  Portions created by the Initial Developers are Copyright (C) 2006-2011
  the Initial Developers. All Rights Reserved.
  
  Contributor(s):
  
  Alternatively, the contents of this file may be used under the terms of
  either the GNU General Public License Version 2 or later (the "GPL"), or
  the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
  in which case the provisions of the GPL or the LGPL are applicable instead
  of those above. If you wish to allow use of your version of this file only
  under the terms of either the GPL or the LGPL, and not to allow others to
  use your version of this file under the terms of the MPL, indicate your
  decision by deleting the provisions above and replace them with the notice
  and other provisions required by the LGPL or the GPL. If you do not delete
  the provisions above, a recipient may use your version of this file under
  the terms of any one of the MPL, the GPL or the LGPL.
*/

/**
 * Hash table based implementation of the Map interface. 
 * <p><b>Attention :</b> this class is the ArrayMap class in the AS3 version of VEGAS.</p>
 * <p><b>Example :</b></p>
 * {@code
 * var map = new system.data.maps.ArrayMap() ;
 * 
 * map.put("key1", "value1") ;
 * map.put("key2", "value2") ;
 * map.put("key3", "value3") ;
 * 
 * trace ("map toString : " + map) ;
 * trace ("map toSource : " + map.toSource()) ;
 * 
 * trace ("------ iterator") ;
 * 
 * var it = map.iterator() ;
 * while (it.hasNext()) 
 * {
 *     trace (it.next() + " : " + it.key()) ;
 * }
 * 
 * trace ("------ clone") ;
 * 
 * var clone = map.clone() ;
 * 
 * clone.put("key1", "value4") ;
 * 
 * clone.remove("key2") ;
 * 
 * trace ("initial map : " + map   ) ;
 * trace ("clone map   : " + clone ) ;
 * }
 */
if ( system.data.maps.ArrayMap == undefined ) 
{
    /**
     * @requires system.data.Map
     */
    require( "system.data.Map" ) ;
    
    /**
     * @requires system.data.maps.MapEntry
     */
    require( "system.data.maps.MapEntry" ) ;
    
    /**
     * @requires system.data.maps.MapFormatter
     */
    require( "system.data.maps.MapFormatter" ) ;
    
    /**
     * Creates a new ArrayMap instance.
     * @param keys An optional Array of all keys to fill in this Map.
     * @param values An optional Array of all values to fill in this Map. This Array must have the same size like the 'keys' argument.
     */
    system.data.maps.ArrayMap = function ( keys /*Array*/ , values /*Array*/ ) 
    { 
        if ( keys == null || values == null )
        {
            this._keys   = [] ;
            this._values = [] ;
        }
        else
        {
            var b = ( keys instanceof Array && values instanceof Array && keys.length > 0 && keys.length == values.length ) ;
            this._keys   = b ? [].concat(keys)   : [] ;
            this._values = b ? [].concat(values) : [] ;
        }
    }
    
    /**
     * @extends system.data.maps.ArrayMap
     */
    proto = system.data.maps.ArrayMap.extend( system.data.Map ) ;
    
    /**
     * Removes all mappings from this map.
     */
    proto.clear = function () 
    {
        this._keys   = [] ;
        this._values = [] ;
    }
    
    /**
     * Returns a shallow copy of this ArrayMap instance: the keys and values themselves are not cloned.
     * @return a shallow copy of this ArrayMap instance: the keys and values themselves are not cloned.
     */
    proto.clone = function () 
    {
        return new system.data.maps.ArrayMap( this._keys , this._values ) ;
    }
    
    /**
     * Returns {@code true} if this map contains a mapping for the specified key.
     * @return {@code true} if this map contains a mapping for the specified key.
     */
    proto.containsKey = function ( key ) /*Boolean*/ 
    {
        return this.indexOfKey(key) > -1 ;
    }
    
    /**
     * Returns {@code true} if this map maps one or more keys to the specified value.
     * @return {@code true} if this map maps one or more keys to the specified value.
     */
    proto.containsValue = function ( value ) /*Boolean*/ 
    {
        return this.indexOfValue( value ) > -1 ;
    }
    
    /**
     * Returns the value to which this map maps the specified key.
     * @return the value to which this map maps the specified key.
     */
    proto.get = function (key) 
    {
        return this._values[ this.indexOfKey( key ) ] ;
    }
    
    /**
     * Returns the value to which this map maps the specified key.
     * @return the value to which this map maps the specified key.
     */
    proto.getKeyAt = function ( index /*uint*/ ) 
    {
        return this._keys[ index ] ;
    }
    
    /**
     * Returns an array representation of all keys in the map.
     * @return an array representation of all keys in the map.
     */
    proto.getKeys = function () /*Array*/ 
    {
        return this._keys.concat() ;
    }
    
    /**
     * Returns the value to which this map maps the specified key.
     * @return the value to which this map maps the specified key.
     */
    proto.getValueAt = function ( index /*uint*/ ) 
    {
        return this._values[ index ] ;
    }
    
    /**
     * Returns an array representation of all values in the map.
     * @return an array representation of all values in the map.
     */
    proto.getValues = function () /*Array*/ 
    {
        return this._values.concat() ;
    }
    
    /**
     * Returns the index of the specified key in argument.
     * @param key the key in the map to search.
     * @return the index of the specified key in argument.
     */
    proto.indexOfKey = function (key) /*int*/ 
    {
        var l = this._keys.length ;
        while( --l > -1 )
        {
            if ( this._keys[l] == key )
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
    proto.indexOfValue = function (value) /*int*/ 
    {
        var l = this._values.length ;
        while( --l > -1 )
        {
            if ( this._values[l] == value )
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
    proto.isEmpty = function () /*Boolean*/ 
    {
        return this._keys.length == 0 ;
    }
    
    /**
     * Returns the values iterator of this map.
     * @return the values iterator of this map.
     */
    proto.iterator = function () /*Iterator*/ 
    {
        return new system.data.iterators.MapIterator( this ) ;
    }
    
    /**
     * Returns the keys iterator of this map.
     * @return the keys iterator of this map.
     */
    proto.keyIterator = function () /*Iterator*/ 
    {
        return new system.data.iterators.ArrayIterator( this._keys ) ;
    }
    
    /**
     * Associates the specified value with the specified key in this map.
     * @param key the key to register the value.
     * @param value the value to be mapped in the map.
     */
    proto.put = function ( key , value ) 
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
    proto.putAll = function ( m /*Map*/ ) 
    {
        if ( m == null )
        {
            return ;
        }
        var aV /*Array*/ = m.getValues() ;
        var aK /*Array*/ = m.getKeys() ;
        var l = aK.length ;
        for (var i = 0 ; i<l ; i = i - (-1) ) 
        {
            this.put(aK[i], aV[i]) ;
        }
    }
    
    /**
     * Removes the mapping for this key from this map if present.
     * @param o The key whose mapping is to be removed from the map.
     * @return previous value associated with specified key, or null if there was no mapping for key. A null return can also indicate that the map previously associated null with the specified key.
     */
    proto.remove = function ( key ) 
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
     * Sets the value of the "key" in the ArrayMap with the specified index.
     * @param index The position of the entry in the ArrayMap.
     * @param value The value of the entry to change. 
     * @return A MapEntry who corresponding the old key/value entry or null if the key already exist or the specified index don't exist.
     * @throws RangeError If the index is out of the range of the Map size.
     */
    proto.setKeyAt = function( index /*uint*/ , key ) 
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
        return new system.data.maps.MapEntry( k , v ) ;
    }
    
    /**
     * Sets the value of the "value" in the HashMap (ArrayMap) with the specified index.
     * @return the old value in the map if exist.
     */
    proto.setValueAt = function( index /*Number*/ , value ) 
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
        return new system.data.maps.MapEntry( k , v ) ;
    }
    
    /**
     * Returns the number of key-value mappings in this map.
     * @return the number of key-value mappings in this map.
     */
    proto.size = function () /*Number*/ 
    {
        return this._keys.length ;
    }
    
    /**
     * Returns the eden representation of this map.
     * @return the eden representation of this map.
     */
    proto.toSource = function () /*String*/ 
    {
        return "new " + this.getConstructorPath() + "(" + this._keys.toSource() + "," + this._values.toSource() + ")" ;
    }
    
    /**
     * Returns the string representation of this map.
     * @return the string representation of this map.
     */
    proto.toString = function () 
    {
        return system.data.maps.formatter.format( this ) ;
    }
    
    /**
     * @private
     */
    proto._keys = [] ;
    
    /**
     * @private
     */
    proto._values = [] ;
    
    /// encapsulate
    
    delete proto ;
}