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
 * LinearQueue stores values in a 'first-in, first-out' manner.
 * <p><b>Example :</b></p>
 * <pre>
 * var q = new system.data.queues.LinearQueue(["item0", "item1"])  ;
 * 
 * trace ("queue size : " + q.size()) ;
 * 
 * trace ("enqueue item2 : " + q.enqueue ("item2")) ;
 * trace ("enqueue item3 : " + q.enqueue ("item3")) ;
 * trace ("enqueue item4 : " + q.enqueue ("item4")) ;
 * 
 * trace ("------- element") ;
 * 
 * trace ("element : " + q.element()) ;
 * trace ("peek : " + q.peek()) ;
 * 
 * trace ("------- dequeue") ;
 * 
 * trace ("dequeue : " + q.dequeue()) ;
 * 
 * trace ("------- iterator") ;
 * 
 * var it = q.iterator() ;
 * while (it.hasNext()) 
 * {
 *     trace (it.next()) ;
 * }
 * 
 * trace ("queue size : " + q.size() ) ;
 * trace ("queue toSource : " + q.toSource()) ;
 * </pre>
 */
if ( system.data.queues.LinearQueue == undefined ) 
{
    /**
     * @requires system.data.collections.ArrayCollection
     */
    require( "system.data.collections.ArrayCollection" ) ;
    
    /**
     * Creates a new LinearQueue instance.
     * @param init An optional Array or Collection or Iterable object to fill the collection.
     */
    system.data.queues.LinearQueue = function ( init /*Array*/ ) 
    { 
        system.data.collections.ArrayCollection.call( this , init ) ;
    }
    
    /**
     * @extends vegas.data.collections.ArrayCollection
     */
    proto = system.data.queues.LinearQueue.extend( system.data.collections.ArrayCollection ) ;
    
    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     */
    proto.clone = function () 
    {
        return new system.data.queues.LinearQueue( this._a ) ;
    }

    /**
     * Retrieves and removes the head of this queue.
     * @return {@core true} if the head of this queue is removed.
     */
    proto.dequeue = function () /*Boolean*/ 
    {
        return this.poll() != null ;
    }
    
    /**
     * Retrieves, but does not remove, the head of this queue.
     * @return {@core true} if the head reference of this queue.
     */
    proto.element = function () 
    {
        return this._a[0] ;
    }
    
    /**
     * Inserts the specified element into this queue, if possible.
     * @return {@code true} if the element is inserted in the queue.
     */
    proto.enqueue = function (o) /*Boolean*/ 
    {
        if ( o == null ) 
        {
            return false ;
        }
        this._a.push(o) ;
        return true ;
    }
    
    /**
     * Retrieves, but does not remove, the head of this queue, returning null if this queue is empty.
     * @return {@code null} if the queue is empty else the head of the queue.
     */
    proto.peek = function () 
    {
        if ( this.isEmpty() ) 
        {
            return null ;
        }
        return this._a[0] ;
    }
    
    /**
     * Retrieves and removes the head of this queue.
     * @return the head of the queue and removes this reference in the queue.
     */
    proto.poll = function () 
    {
        if ( this.isEmpty() ) 
        {
            return null ;
        }
        return this._a.shift() ;
    }
    
    ///////
    
    delete proto ;
}