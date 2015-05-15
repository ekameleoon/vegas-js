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
 * The EventTarget interface inspired by the <a href='http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/'>Document Object Model (DOM) Level 2/3 Events Specification</a>.
 */
if ( system.events.EventTarget == undefined ) 
{
    /**
     * Creates a new EventTarget instance.
     */
    system.events.EventTarget = function () 
    { 
        //
    }
    
    /**
     * @extends Object
     */
    proto = system.events.EventTarget.extend( Object ) ;
    
    /**
     * Allows the registration of event listeners on the event target.
     * @param type A string representing the event type to listen for. If eventName value is {@code ALL} this method use {@code addGlobalListener}
     * @param listener The object that receives a notification when an event of the specified type occurs. This must be an object implementing the {@code EventListener} interface.
     * @param useCapture Determinates if the event flow use capture or not.
     * @param priority Determines the priority level of the event listener.
     * @param autoRemove Apply a removeEventListener after the first trigger
     */
    proto.addEventListener = function ( type /*String*/, listener/*EventListener*/, useCapture/*Boolean*/, priority/*Number*/ , autoRemove/*Boolean*/ ) /*void*/ 
    {
        // override this method.
    }
    
    /**
     * Dispatches an event into the event flow.
     * @param event The Event object that is dispatched into the event flow.
     * @param isQueue if the EventDispatcher isn't register to the event type the event is bufferized.
     * @param target the target of the event.
     * @param contect the context of the event.
     * @return the reference of the event dispatched in the event flow.
     */
    proto.dispatchEvent = function ( event, isQueue/*Boolean*/, target , context ) /*Event*/ 
    {
        // override this method.
    }
    
    /** 
     * Removes a listener from the {@code EventDispatcher} object.
     * <p>If there is no matching listener registered with the EventDispatcher object, then calling this method has no effect.</p>
     * @param type Specifies the type of event.
     * @param listener the class name(string) or a EventListener object.
     * @param useCapture Indicates if the register listener use capture or not.
     */
    proto.removeEventListener = function ( type /*String*/ , listener, useCapture/*Boolean*/ ) /*void*/ 
    {
        // override this method.
    }
    
    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    proto.toString = function () /*String*/ 
    {
        return "[" + this.getConstructorName() + "]" ;
    }
    
    ////////
    
    delete proto ;
}