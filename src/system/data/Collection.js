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
 * The root interface in the collection hierarchy. 
 * <p>A collection represents a group of objects, known as its elements.</p> 
 * <p>Some collections allow duplicate elements and others do not. Some are ordered and others unordered.</p> 
 */
if ( system.data.Collection == undefined ) 
{
    /**
     * Creates a new Collection instance.
     */
    system.data.Collection = function () 
    { 
        //
    }
    
    /**
     * @extends Object
     */
    proto = system.data.Collection.extend( Object ) ;
    
    /**
     * Adds the specified element in the collection (optional operation).
     */
    proto.add = function( o ) /*Boolean*/ 
    {
        //
    }
    
    /**
     * Removes all of the elements from this collection (optional operation).
     */
    proto.clear = function() /*void*/ 
    {
        //
    }
    
    /**
     * Returns a shallow copy of this collection (optional operation)
     * @return a shallow copy of this collection (optional operation)
     */
    proto.clone = function() 
    {
        //
    }
    
    /**
     * Returns {@code true} if this collection contains the specified element.
     * @return {@code true} if this collection contains the specified element.
     */
    proto.contains = function( o )/*Boolean*/ 
    {
        //
    }
    
    /**
     * Returns the element from this collection at the passed index.
     * @return the element from this collection at the passed index.
     */
    proto.get = function( key ) 
    {
        //
    }
    
    /**
     * Returns the position of the passed object in the collection.
     * @param o the object to search in the collection.
     * @param fromIndex the index to begin the search in the collection.
     * @return the index of the object or -1 if the object isn't find in the collection.
     */
    proto.indexOf = function( o , fromIndex /*uint*/ ) /*Boolean*/ 
    {
        //
    }
    
    /**
     * Returns {@code true} if this collection contains no elements.
     * @return {@code true} if this collection is empty else {@code false}.
     */
    proto.isEmpty = function ()/*Boolean*/ 
    {
        //
    }
    
    /**
     * Returns the iterator reference of the object.
     * @return the iterator reference of the object.
     */
    proto.iterator = function() /*Iterator*/ 
    {
        //
    }
    
    /**
     * Removes a single instance of the specified element from this collection, if it is present (optional operation).
     */
    proto.remove = function (o) 
    {
        //
    }
    
    /**
     * Retrieves the number of elements in this collection.
     * @return the number of elements in this collection.
     */
    proto.size = function ()/*Number*/ 
    {
        //
    }
    
    /**
     * Returns an array containing all of the elements in this collection.
     * @return an array containing all of the elements in this collection.
     */
    proto.toArray = function ()/*Array*/ 
    {
        //
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance
     */
    proto.toString = function ()/*String*/ 
    {
        //
    }
    
    //////// encapsulate
    
    delete proto ;

}