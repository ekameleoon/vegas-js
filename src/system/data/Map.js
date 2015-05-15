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
 * An object that maps keys to values. A map cannot contain duplicate keys. Each key can map to at most one value.
 */
if ( system.data.Map == undefined ) 
{
    /**
     * Creates a new Map instance.
     */
    system.data.Map = function () 
    { 
        //
    }
    
    /**
     * @extends Object
     */
    proto = system.data.Map.extend( Object ) ;
    
    /**
     * Removes all mappings from this map (optional operation).
     */
    proto.clear = function () 
    {
        //
    }
    
    /**
     * Returns a shallow copy of the map.
     * @return a shallow copy of the map.
     */
    proto.clone = function () 
    {
        //
    }
    
    /**
     * Returns {@code true} if this map contains a mapping for the specified key.
     * @return {@code true} if this map contains a mapping for the specified key.
     */
    proto.containsKey = function ( key ) /*Boolean*/ 
    {
        //
    }
    
    /**
     * Returns {@code true} if this map maps one or more keys to the specified value.
     * @return {@code true} if this map maps one or more keys to the specified value.
     */
    proto.containsValue = function ( value ) /*Boolean*/ 
    {
        //
    }
    
    /**
     * Returns the value to which this map maps the specified key.
     */
    proto.get = function (key) 
    {
        //
    }
    
    /**
     * Returns an array of all the keys in the map.
     */
    proto.getKeys = function () /*Array*/ 
    {
        //
    }
    
    /**
     * Returns an array of all the values in the map.
     */
    proto.getValues = function () /*Array*/ 
    {
        //
    }
    
    /**
     * Returns the index of the specified key in argument.
     * @param key the key in the map to search.
     * @return the index of the specified key in argument.
     */
    proto.indexOfKey = function (key) /*Number*/ 
    {
        //
    }
    
    /**
     * Returns the index of the specified value in argument.
     * @param value the value in the map to search.
     * @return the index of the specified value in argument.
     */
    proto.indexOfValue = function (value) /*Number*/ 
    {
        //
    }
    
    /**
     * Returns {@code true} if this map contains no key-value mappings.
     * @return {@code true} if this map contains no key-value mappings.
     */
    proto.isEmpty = function () /*Boolean*/ 
    {
        //
    }
    
    /**
     * Returns the values iterator of this map.
     * @return the values iterator of this map.
     */
    proto.iterator = function () /*Iterator*/ 
    {
        //
    }
    
    /**
     * Returns the keys iterator of this map. 
     * @return the keys iterator of this map.
     */
    proto.keyIterator = function () /*Iterator*/ 
    {
        //
    }
    
    /**
     * Associates the specified value with the specified key in this map (optional operation).
     */
    proto.put = function ( key , value ) 
    {
        //
    }
    
    /**
     * Copies all of the mappings from the specified map to this map (optional operation).
     */
    proto.putAll = function (m /*Map*/) 
    {
        //
    }
    
    /**
     * Removes the mapping for this key from this map if it is present (optional operation).
     */
    proto.remove = function (key) 
    {
        //
    }
    
    /**
     * Returns the number of key-value mappings in this map.
     */
    proto.size = function () /*Number*/ 
    {
        //
    }
    
    /**
     * Returns the eden string representation of this instance.
     * @return the eden string representation of this instance
     */
    proto.toSource = function () /*String*/ 
    {
        //
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance
     */
    proto.toString = function () 
    {
        //
    }
    
    //// encapsulate
    
    delete proto ;
}