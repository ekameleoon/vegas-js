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
 * Internal class used in {@code EventDispatcher} class to bufferize the events if no EventListener are registered with the event type of the event.
 */
if (system.events.EventQueue == undefined) 
{
    /**
     * Creates a new EventQueue instance.
     */
    system.events.EventQueue = function () 
    {
        this._events = new system.data.queues.LinearQueue() ;
    }
    
    /**
     * @extends system.core.CoreObject
     */
    proto = system.events.EventQueue.extend( Object ) ;
    
    /**
     * Removes all elements in the queue.
     */
    proto.clear = function () /*void*/ 
    {
        this._events.clear() ;
    }
    
    /**
     * Enqueue an event in the buffer if no EventListener are registered in the EventListener.
     */
    proto.enqueue = function ( e /*Event*/ ) /*Boolean*/ 
    {
        if ( e instanceof system.events.Event )
        {
            e.queueEvent() ;
            this._events.enqueue(e) ;
            return true ;
        }
        else
        {
            return false ;
        }
    }
    
    /**
     * Returns a queue with all events bufferized.
     * @return a queue with all events bufferized.
     */
    proto.getQueuedEvents = function ( type /*String*/ ) /*Queue*/ 
    {
        if ( type != null && ( typeof(type) == "string" || type instanceof String ) ) 
        {
            var q /*LinearQueue*/ = new system.data.queues.LinearQueue() ;
            var it /*Iterator*/   = this._events.iterator() ;
            while ( it.hasNext() ) 
            {
                var e /*Event*/ = it.next() ;
                if ( e.getType() == type ) 
                {
                    q.enqueue(e) ;
                }
            }
            return q ;
        } 
        else 
        {
            return this._events ;
        }
    }
    
    /**
     * The number of elements in the buffer.
     */
    proto.size = function () /*uint*/ 
    {
        return this._events.size() ;
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    proto.toString = function () /*String*/ 
    {
        return "[" + this.getConstructorName() + "]" ;
    }
    
    //////
    
    delete proto ;
}