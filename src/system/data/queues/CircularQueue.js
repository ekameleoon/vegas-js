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
 * The CircularQueue class allows for storing objects in a circular queue of a predefined size.
 * <p><b>Example :</b></p>
 * {@code
 * var q = new system.data.queues.CircularQueue(5) ;
 * 
 * trace ("maxSize : " + q.maxSize()) ;
 * trace ("enqueue item1 : " + q.enqueue ("item1")) ;
 * trace ("enqueue item2 : " + q.enqueue ("item2")) ;
 * trace ("enqueue item3 : " + q.enqueue ("item3")) ;
 * trace ("enqueue item4 : " + q.enqueue ("item4")) ;
 * trace ("enqueue item5 : " + q.enqueue ("item5")) ;
 * trace ("enqueue item6 : " + q.enqueue ("item6")) ;
 * 
 * trace ("element : " + q.element()) ;
 * trace ("dequeue : " + q.dequeue()) ;
 * trace ("element : " + q.element()) ;
 * trace ("size    : " + q.size()) ;
 * trace ("isFull  : " + q.isFull()) ;
 * trace ("array   : " + q.toArray()) ;
 * 
 * trace("") ;
 * 
 * trace ("queue : " + q) ;
 * 
 * trace("") ;
 * 
 * trace ("dequeue       : " + q.dequeue()) ;
 * trace ("enqueue item6 : " + q.enqueue("item6")) ;
 * trace ("enqueue item7 : " + q.enqueue("item7")) ;
 * trace ("peek          : " + q.peek()) ;
 * trace ("size          : " + q.size()) ;
 * trace ("isFull        : " + q.isFull()) ;
 * 
 * trace("") ;
 * 
 * trace ("q : " + q) ;
 * 
 * trace ("------- clone") ;
 * 
 * var clone = q.clone() ;
 * trace ("dequeue clone       : " + clone.dequeue()) ;
 * trace ("enqueue clone item8 : " + clone.enqueue("item8")) ;
 * trace ("original queue      : " + q) ;
 * trace ("clone queue         : " + clone) ;
 * trace ("clone iterator      :") ;
 * var i = clone.iterator() ;
 * while (i.hasNext()) 
 * {
 *     trace ("\t+ " + i.next()) ;
 * }
 * trace("clone.toSource : " + clone.toSource()) ;
 * }
 */
if ( system.data.queues.CircularQueue == undefined ) 
{
    /**
     * @requires system.data.Queue
     */
    require( "system.data.Queue" ) ;
    
    /**
     * @requires system.data.iterators.IterableFormatter
     */
    require( "system.data.iterators.IterableFormatter" ) ;
    
    /**
     * Creates a new CircularQueue instance.
     * @param length the max number of element in the queue
     * @param elements an array with elements to enqueue in the current stack.
     */
    system.data.queues.CircularQueue = function ( length /*Number*/ , elements /*Array*/ ) 
    { 
        this._queue = [] ;
        this._length = ( isNaN(length) ? system.data.queues.CircularQueue.MAX_CAPACITY : length ) + 1 ;
        this.clear() ;
        if ( elements && elements instanceof Array && elements.length > 0 ) 
        {
            var l /*int*/ = elements.length ;
            if ( l > 0 )
            {
                for ( var i /*int*/ = 0 ; i < l ; i++ ) 
                {
                    this.enqueue( elements[i] ) ;
                }
            }
        }
    }
    
    //////////////
    
    /**
     * The default numbers of elements in the queue.
     */
    system.data.queues.CircularQueue.MAX_CAPACITY = 99999 ; // Number.MAX_VALUE bug ?
    
    /**
     * The formatter of the CircularQueue class.
     */
    system.data.queues.CircularQueue.formatter = new system.data.iterators.IterableFormatter() ;
    
    //////////////
    
    /**
     * @extends system.data.Queue
     */
    proto = system.data.queues.CircularQueue.extend( system.data.Queue ) ;
    
    ////////////////////////////
    
    /**
     * Clear all elements in the queue.
     */
    proto.clear = function () 
    {
        this._queue = new Array( this._length ) ;
        this._count = 0 ;
        this._rear  = 0 ;
        this._front = 0 ;
    }
    
    /**
     * Returns a shallow copy of the queue.
     * @return a shallow copy of the queue.
     */
    proto.clone = function () 
    {
        var l /*Number*/ = this._length - 1 ;
        var a /*Array*/  = this.toArray() ;
        return new system.data.queues.CircularQueue( l , a ) ;
    }
    
    /**
     * Returns {@code true} if the queue contains the object passed in argument.
     * @return {@code true} if the queue contains the object passed in argument.
     */
    proto.contains = function( o ) /*Boolean*/ 
    {
        return this._queue.indexOf(o) != -1 ;
    }
    
    /**
     * Retreives the first element in the queue object, return a boolean.
     * @return {@code true} if the first element in the queue is dequeue.
     */
    proto.dequeue = function () /*Boolean*/ 
    {
        return this.poll() != null  ;
    }
    
    /**
     * Returns the value of the first element in the queue.
     * @return the value of the first element in the queue.
     */
    proto.element = function () 
    {
        return this._queue[this._front] ;
    }
    
    /**
     * Enqueue a new element in the queue if the que is not full, return a boolean.
     */
    proto.enqueue = function( o ) /*Boolean*/ 
    {
        var next /*Number*/ = this._rear + 1 ;
        if ( ( next == this._front ) || ( ( next == this._length ) && ( this._front == 0 ) ) ) 
        {
            return false ;
        }
        else
        {
            this._queue[this._rear++] = o ;
            this._count ++ ;
            if ( this._rear == this._length ) 
            {
                this._rear = 0 ;
            }
        }
        return true ;
    }
    
    /**
     * Returns {@code true} if the queue is empty.
     * @return {@code true} if the queue is empty.
     */
    proto.isEmpty = function () /*Boolean*/ 
    {
        return this._count == 0 ;
    }
    
    /**
     * Returns {@code true} if the queue is full.
     * @return {@code true} if the queue is full.
     */
    proto.isFull = function () /*Boolean*/ 
    {
        return this._count == this.maxSize() ;
    }
    
    /**
     * Returns the iterator of the queue.
     * @return the iterator of the queue.
     * @see {@code system.data.iterators.ProtectedIterator}
     */
    proto.iterator = function() /*Iterator*/ 
    {
        var ArrayIterator     = system.data.iterators.ArrayIterator ;
        var ProtectedIterator = system.data.iterators.ProtectedIterator ;
        return new ProtectedIterator( new ArrayIterator( this.toArray() ) ) ;
    }
    
    /**
     * Returns the max number of occurrences in the given queue.
     * @return the max number of occurrences in the given queue.
     */
    proto.maxSize = function () /*Number*/ 
    {
        return this._length -1 ;
    }
    
    /**
     * Retrieves, but does not remove, the head of this queue, returning null if this queue is empty.
     */
    proto.peek = function () 
    {
        return ( this._count == 0 ) ? null : this._queue[this._front] ;
    }
    
    /**
     * Retrieves and removes the head of this queue.
     */
    proto.poll = function () 
    {
        if ( this._front == this._length ) 
        {
            this._front = 0 ; // loop back
        }
        if ( this._front == this._rear ) 
        {
            return null ;  // queue is empty
        }
        else
        {
            this._count-- ;
            var mem = this._queue[this._front] ;
            this._queue[this._front] = undefined ;
            this._front++ ;
            return mem ; // return mem object
        }
    }
    
    /**
     * Returns the number of elements in the CircularQueue.
     * @return the number of elements in the CircularQueue.
     */
    proto.size = function () /*Number*/ 
    {
        return this._count ;
    }
    
    /**
     * Returns the array representation of the CircularQueue.
     * @return the array representation of the CircularQueue.
     */
    proto.toArray = function () /*Array*/ 
    {
        if (this._count == 0) 
        {
            return [] ;
        } 
        else 
        {
            var r /*Array*/ = new Array( this._count ) ;
            var i /*Number*/ = (this._front == this._length) ? 0 : this._front ;
            var cpt /*Number*/ = 0 ;
            while (cpt < this._count) 
            {
                r[cpt++] = this._queue[i++] ;
                if (i == this._length) 
                {
                    i = 0 ;
                }
            }
            return r ;
        }
    }
    
    /**
     * Returns the source representation of this instance.
     * @return the source representation of this instance
     */
    proto.toSource = function (indent /*Number*/, indentor/*String*/ ) /*String*/ 
    {
            var source = "new " + this.getConstructorPath() ;
            
            source += "(" ;
            
            source += this.maxSize() ;
            
            var ar = this.toArray() ;
            
            if ( ar.length > 0 )
            {
                source += "," ;
                source += core.dump( ar ) ;
            } 
            
            source += ")" ;
            
            return source ;
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance
     */
    proto.toString = function () /*String*/ 
    {
        return system.data.queues.CircularQueue.formatter.format(this) ;
    }
    
    //////////////
    
    delete proto ;
}