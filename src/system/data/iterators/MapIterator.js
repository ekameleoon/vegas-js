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
 * Converts a <code class="prettyprint">Map</code> to an iterator.
 */
if ( system.data.iterators.MapIterator == undefined) 
{
    /**
     * Creates a new MapIterator instance.
     * @param m the Map reference of this iterator.
     */
    system.data.iterators.MapIterator = function ( m /*Map*/ ) 
    { 
        if ( m && ( m instanceof system.data.Map) )
        {
            this._m = m ;
            this._i = new system.data.iterators.ArrayIterator( m.getKeys() ) ;
            this._k = null ;
        }
        else
        {
           throw new ReferenceError( this + " constructor failed, the passed-in Map argument not must be 'null'.") ;
        } 
    }
    
    /**
     * @extends system.data.Iterator
     */
    proto = system.data.iterators.MapIterator.extend( system.data.Iterator ) ;
    
    /**
     * Returns {@code true} if the iteration has more elements.
     * @return {@code true} if the iteration has more elements.
     */
    proto.hasNext = function () 
    {
        return this._i.hasNext() ;
    }
    
    /**
     * Returns the current key of the internal pointer of the iterator (optional operation).
     * @return the current key of the internal pointer of the iterator (optional operation).
     */
    proto.key = function() 
    {
        return this._k ;
    }
    
    /**
     * Returns the next element in the iteration.
     * @return the next element in the iteration.
     */
    proto.next = function () 
    {
         this._k = this._i.next() ;
         return this._m.get( this._k ) ;
    }
    
    /**
     * Removes from the underlying collection the last element returned by the iterator (optional operation).
     */
    proto.remove = function() 
    {
        this._i.remove() ;
        return this._m.remove( this._k ) ;
    }
    
    /**
     * Reset the internal pointer of the iterator (optional operation).
     */
    proto.reset = function() /*void*/
    {
        this._i.reset() ;
    }
    
    /**
     * Changes the position of the internal pointer of the iterator (optional operation).
     */
    proto.seek = function ( position ) /*void*/
    {
        throw new Error( "This Iterator does not support the seek() method.") ;
    }
    
    /////////// encapsulate
    
    delete proto ;
}