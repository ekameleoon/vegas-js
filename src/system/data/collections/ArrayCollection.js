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
if ( system.data.collections.ArrayCollection == undefined) 
{
    /**
     * @requires system.data.Collection
     */
    require( "system.data.Collection" ) ;
    
    /**
     * @requires system.data.collections.CollectionFormatter
     */
    require( "system.data.collections.CollectionFormatter" ) ;
    
    /**
     * Creates a new ArrayCollection instance.
     */
    system.data.collections.ArrayCollection = function ( init ) 
    {
        if ( init != null )
        {
            if ( init instanceof system.data.Collection )
            {
                init = init.toArray() ;
            }
            else if ( "iterator" in init && ( init["iterator"] instanceof Function ) )
            {
                var ar /*Array*/    = [] ;
                var it /*Iterator*/ = init.iterator() ;
                while( it.hasNext() )
                {
                    ar.push( it.next() ) ;
                }
                init = ar ;
            }
        }
        if ( init != null && init instanceof Array && init.length > 0 )
        {
            this._a = init.slice() ;
        }
        else
        {
            this._a = [] ;
        }
    }
    
    /**
     * @extends system.data.Collection
     */
    proto = system.data.collections.ArrayCollection.extend( system.data.Collection ) ;
    
    /**
     * Adds the specified element in the collection (optional operation).
     */
    proto.add = function( o ) /*Boolean*/ 
    {
        if ( o === undefined ) 
        {
            return false ;
        }
        this._a.push(o) ;
        return true ;
    }
    
    /**
     * Appends all of the elements in the specified collection to the end of this Collection, in the order that they are returned by the specified collection's iterator (optional operation).
     * @return <code class="prettyprint">true</code> if this list changed as a result of the call.
     */
    proto.addAll = function( c /*Collection*/ ) /*Boolean*/ 
    {
        if ( c == null || !( c instanceof system.data.Collection ) )
        {
            return false ;
        }
        if ( c.size() > 0 ) 
        {
            var it /*Iterator*/ = c.iterator() ;
            while( it.hasNext() ) 
            {
                this.add( it.next() ) ;
            }
            return true ;
        }
        else 
        {
            return false ;
        }
    }
    
    /**
     * Removes all of the elements from this collection (optional operation).
     */
    proto.clear = function() /*void*/ 
    {
        this._a.splice(0) ;
    }
    
    /**
     * Returns a shallow copy of this collection (optional operation)
     * @return a shallow copy of this collection (optional operation)
     */
    proto.clone = function() 
    {
        return new system.data.collections.ArrayCollection( this.toArray() ) ;
    }
    
    /**
     * Returns {@code true} if this collection contains the specified element.
     * @return {@code true} if this collection contains the specified element.
     */
    proto.contains = function( o ) /*Boolean*/ 
    {
        return this._a.indexOf( o ) >- 1  ;
    }
    
    /**
     * Returns {@code true} if this collection contains the specified element.
     * @return {@code true} if this collection contains the specified element.
     */
    proto.containsAll = function( c /*Collection*/ ) /*Boolean*/ 
    {
        if ( c == this )
        {
            return true ;
        }
        else if ( c == null || !( c instanceof system.data.Collection ) )
        {
            return false ;
        }
        var it /*Iterator*/ = c.iterator() ;
        while( it.hasNext() ) 
        {
            if ( !this.contains( it.next() ) ) 
            {
                return false ;
            }
        }
        return true ;
    }
    
    /**
     * Compares the specified object with this object for equality.
     * @return <code class="prettyprint">true</code> if the the specified object is equal with this object.
     */
    proto.equals = function( o ) /*Boolean*/ 
    {
        if ( o == this ) 
        {
            return true ;
        }
        if ( o == null || !( o instanceof system.data.Collection ) || ( o.size() != this.size() ) )
        {
            return false ;
        }
        return this.containsAll( o ) ;
    }
    
    /**
     * Returns the element from this collection at the passed index.
     * @return the element from this collection at the passed index.
     */
    proto.get = function( key ) 
    {
        return this._a[ key ] ;
    }
    
    /**
     * Returns the position of the passed object in the collection.
     * @param o the object to search in the collection.
     * @param fromIndex the index to begin the search in the collection.
     * @return the index of the object or -1 if the object isn't find in the collection.
     */
    proto.indexOf = function( o , fromIndex /*uint*/ ) /*Boolean*/ 
    {
        return this._a.indexOf( o , fromIndex ) ;
    }
    
    /**
     * Returns {@code true} if this collection contains no elements.
     * @return {@code true} if this collection is empty else {@code false}.
     */
    proto.isEmpty = function ()/*Boolean*/ 
    {
        return this._a.length == 0 ;
    }
    
    /**
     * Returns the iterator reference of the object.
     * @return the iterator reference of the object.
     */
    proto.iterator = function() /*Iterator*/ 
    {
        return new system.data.iterators.ArrayIterator( this._a ) ;
    }
    
    /**
     * Removes a single instance of the specified element from this collection, if it is present (optional operation).
     */
    proto.remove = function (o) 
    {
        var it /*Iterator*/ = this.iterator() ;
        if ( o == null ) 
        {
            while( it.hasNext() ) 
            {
                if ( it.next() == null ) 
                {
                    it.remove() ;
                    return true ;
                }
            } 
        }
        else 
        {
            while ( it.hasNext() ) 
            {
                var v = it.next() ;
                if (o == v) 
                {
                    it.remove() ;
                    return true ;
                }
            }
        }
        return false ;
    }
    
    /**
     * Removes from this Collection all the elements that are contained in the specified Collection (optional operation).
     */
    proto.removeAll = function ( c /*Collection*/ ) /*Boolean*/ 
    {
        if ( c == null || !( c instanceof system.data.Collection ) )
        {
            return false ;
        }
        var b /*Boolean*/ = false ;
        var it /*Iterator*/ = this.iterator() ;
        while ( it.hasNext() ) 
        {
            if ( c.contains( it.next() ) ) 
            {
                it.remove() ;
                b = true ;
            }
        }
        return b ;
    }
    
    /**
     * Retains only the elements in this Collection that are contained in the specified Collection (optional operation).
     */
    proto.retainAll = function ( c /*Collection*/ ) /*Boolean*/ 
    {
        if ( c == null || !( c instanceof system.data.Collection ) )
        {
            return false ;
        }
        var b /*Boolean*/ = false ;
        var it /*Iterator*/ = this.iterator() ;
        while ( it.hasNext() ) 
        {
            if ( !c.contains( it.next() ) ) 
            {
                it.remove() ;
                b = true ;
            }
        }
        return b ;
    }
    
    /**
     * Retrieves the number of elements in this collection.
     * @return the number of elements in this collection.
     */
    proto.size = function () /*Number*/ 
    {
        return this._a.length ;
    }
    
    /**
     * Returns an array containing all of the elements in this collection.
     * @return an array containing all of the elements in this collection.
     */
    proto.toArray = function () /*Array*/ 
    {
        return this._a ;
    }
    
    /**
     * Returns the source representation of this instance.
     * @return the source representation of this instance
     */
    proto.toSource = function () /*String*/ 
    {
        var source /*String*/ = "new " + this.getConstructorPath() + "(" ;
        if ( this._a.length > 0 )
        {
            source += core.dump( this._a ) ;
        } 
        source += ")" ;
        return source ;
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance
     */
    proto.toString = function ()/*String*/ 
    {
        return system.data.collections.formatter.format( this ) ;
    }
    
    /////////// encapsulate
    
    delete proto ;
}