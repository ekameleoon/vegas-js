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
 * A collection designed for holding elements prior to processing. Besides basic Collection operations, queues provide additional insertion, extraction, and inspection operations.
 * <p>Queues typically, but do not necessarily, order elements in a FIFO (first-in-first-out) manner.</p>
 * <p>Whatever the ordering used, the head of the queue is that element which would be removed by a call to remove() or poll().</p>
 */
if ( system.data.Queue == undefined ) 
{
    /**
     * Creates a new Queue instance.
     */
    system.data.Queue = function () 
    { 
        //
    }
    
    /**
     * @extends Object
     */
    proto = system.data.Queue.extend( Object ) ;
    
    /**
     * Retrieves and removes the head of this queue.
     */
    proto.dequeue = function( o ) /*Boolean*/ 
    {
        //
    }
    
    /**
     * Retrieves, but does not remove, the head of this queue.
     */
    proto.element = function() /*void*/ 
    {
        //
    }
    
    /**
     * Inserts the specified element into this queue, if possible.
     */
    proto.enqueue = function() 
    {
        //
    }
    
    /**
     * Retrieves, but does not remove, the head of this queue, returning null if this queue is empty.
     */
    proto.peek = function( o )/*Boolean*/ 
    {
        //
    }
    
    /**
     * Retrieves and removes the head of this queue.
     */
    proto.poll = function( key ) 
    {
        //
    }
    
    //////// encapsulate
    
    delete proto ;

}