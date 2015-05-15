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
 * The IEventDispatcher interface defines methods for adding or removing event listeners, checks whether specific types of event listeners are registered, and dispatches events. 
 * In general, the easiest way for a user-defined class to gain event dispatching capabilities is to extend EventDispatcher. If this is impossible (that is, if the class is already extending another class), you can instead implement the IEventDispatcher interface, create an EventDispatcher member, and write simple hooks to route calls into the aggregated EventDispatcher.
 */
if ( system.events.IEventDispatcher == undefined ) 
{
    /**
     * @requires system.events.EventTarget
     */
    require( "system.events.EventTarget" ) ;
    
    /**
     * Creates a new IEventDispatcher instance.
     */
    system.events.IEventDispatcher = function () 
    { 
        //
    }
    
    /**
     * @extends system.events.EventTarget 
     */
    proto = system.events.IEventDispatcher.extend( system.events.EventTarget ) ;
    
    /**
     * Allows the registration of global event listeners on the event target.
     * @param listener The object that receives a notification when an event of the specified type occurs. This must be an object implementing the <b>EventListener</b> interface.
     * @param priority Determines the priority level of the event listener.
     * @param autoRemove Apply a removeEventListener after the first trigger
     */
    proto.addGlobalEventListener = function( listener /*EventListener*/ , priority /*uint*/ , autoRemove/*Boolean*/) /*void*/ 
    {
        // override this method.
    }
    
    /**
     * Returns the {@code Array} representation of all EventListener objects register with the specified event type.
     * @return the {@code Array} representation of all EventListener objects register with the specified event type.
     */
    proto.getEventListeners = function( type /*String*/ ) /*Array*/ 
    {
        // override this method.
    }
    
    /**
     * Returns the {@code Array} representation of all global EventListener objects.
     * @return the {@code Array} representation of all global EventListener objects.
     */
    proto.getGlobalEventListeners = function() /*Array*/ 
    {
        // override this method.
    }
    
    /**
     * Returns a set of all register event's type in this EventTarget.
     * @return a set of all register event's type in this EventTarget.
     */
    proto.getRegisteredTypes = function() /*Array*/ 
    {
        // override this method.
    }
    
    /**
     * Checks whether the EventDispatcher object has any listeners registered for a specific type of event.
     * This allows you to determine where altered handling of an event type has been introduced in the event flow heirarchy by an EventDispatcher object.
     */ 
    proto.hasEventListener = function( type /*String*/ ) /*Boolean*/ 
    {
        // override this method.
    }
    
    /** 
     * Removes a global listener from the EventDispatcher object.
     * If there is no matching listener registered with the EventDispatcher object, then calling this method has no effect.
     * @param the string representation of the class name of the EventListener or a EventListener object.
     */
    proto.removeGlobalEventListener = function( listener ) /*void*/ 
    {
        // override this method.
    }
    
    ////////
    
    delete proto ;
}