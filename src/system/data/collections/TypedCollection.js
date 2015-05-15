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
 * Converts a Collection to a custom string representation.
 */
if ( system.data.collections.TypedCollection == undefined) 
{
    /**
     * @requires system.data.Collection
     */
    require( "system.data.Collection" ) ;
    
    /**
     * @requires system.data.collections.CollectionFormatter
     */
    require( "system.data.Typeable" ) ;
    
    /**
     * Creates a new TypedCollection instance.
     * @param type the type of this Typeable object (a Class or a Function).
     * @param collection The Collection reference of this wrapper.
     * @throws TypeError if the type is null or undefined.
     * @throws TypeError if a value in the passed-in Collection object isn't valid.
     */ 
    system.data.collections.TypedCollection = function ( type , collection /*Collection*/ ) 
    {
        if ( collection == null ) 
        {
            throw new TypeError("The passed-in 'collection' argument not must be 'null' or 'undefined'.") ;
        }
        this.type = type ;
        if ( collection.size() > 0 ) 
        {
            var it = collection.iterator() ;
            while ( it.hasNext() ) 
            {
                this.validate( it.next() ) ;
            }
        }
        this._co = collection ;
    }
    
    /**
     * @extends system.data.Typeable
     */
    proto = system.data.collections.TypedCollection.extend( system.data.Typeable ) ;
    
    /**
     * Ensures that this collection contains the specified element (optional operation).
     */
    proto.add = function( o ) /*Boolean*/ 
    {
        this.validate(o) ;
        return this._co.add( o ) ;
    }
    
    /**
     * Removes all of the elements from this collection (optional operation).
     */
    proto.clear = function() /*void*/ 
    {
        this._co.clear() ;
    }
    
    /**
     * Returns a shallow copy of this collection (optional operation)
     * @return a shallow copy of this collection (optional operation)
     */
    proto.clone = function() 
    {
        return new system.data.collections.TypedCollection( this._type , this._co ) ;
    }
    
    /**
     * Returns {@code true} if this collection contains the specified element.
     * @return {@code true} if this collection contains the specified element.
     */
    proto.contains = function( o ) /*Boolean*/ 
    {
        return this._co.contains(o) ;
    }
    
    /**
     * Returns the element from this collection at the passed index.
     * @return the element from this collection at the passed index.
     */
    proto.get = function( key ) 
    {
        return this._co.get(key) ;
    }
    
    /**
     * Returns the position of the passed object in the collection.
     * @param o the object to search in the collection.
     * @param fromIndex the index to begin the search in the collection.
     * @return the index of the object or -1 if the object isn't find in the collection.
     */
    proto.indexOf = function( o , fromIndex /*uint*/ ) /*Boolean*/ 
    {
        return this._co.indexOf( o , fromIndex ) ;
    }
    
    /**
     * Returns {@code true} if this collection contains no elements.
     * @return {@code true} if this collection is empty else {@code false}.
     */
    proto.isEmpty = function ()/*Boolean*/ 
    {
        return this._co.isEmpty() ;
    }
    
    /**
     * Returns the iterator reference of the object.
     * @return the iterator reference of the object.
     */
    proto.iterator = function() /*Iterator*/ 
    {
        return this._co.iterator();
    }
    
    /**
     * Removes a single instance of the specified element from this collection, if it is present (optional operation).
     */
    proto.remove = function (o) 
    {
        return this._co.remove( o ) ;
    }
    
    /**
     * Retrieves the number of elements in this collection.
     * @return the number of elements in this collection.
     */
    proto.size = function () /*Number*/ 
    {
        return this._co.size() ;
    }
    
    /**
     * Returns an array containing all of the elements in this collection.
     * @return an array containing all of the elements in this collection.
     */
    proto.toArray = function () /*Array*/ 
    {
        return this._co.toArray() ;
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance
     */
    proto.toSource = function () /*String*/ 
    {
        var source /*String*/ = "new " + this.getConstructorPath() + "(" ;
        if ( typeof(this._type) == "string" || this._type instanceof String )
        {
            source += this._type.toSource() ;
        }
        else if ( this._type instanceof Function )
        {
            source += (new this._type()).getConstructorPath() ;
        }
        source += "," ;
        source += core.dump( this._co ) ;
        source += ")" ;
        return source ;
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance
     */
    proto.toString = function ()/*String*/ 
    {
        return this._co.toString() ;
    }
    
    /////////// encapsulate
    
    delete proto ;
}