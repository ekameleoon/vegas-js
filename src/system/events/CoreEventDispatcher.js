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
 * This basic class is used to create concrete <code class="prettyprint">IEventDispatcher</code> implementations. This class used composition with an internal <code class="prettyprint">EventDispatcher</code> object.
 * <p>You can overrides the internal <code class="prettyprint">EventDispatcher</code> instance with the <code class="prettyprint">initEventDispatcher</code> or the <code class="prettyprint">setEventDispatcher</code> methods. Used a global singleton reference in this method to register all events in a <code class="prettyprint">FrontController</code> for example.</p>
 */
if (system.events.CoreEventDispatcher == undefined) 
{
    /**
     * @requires system.events.IEventDispatcher
     */
    require("system.events.IEventDispatcher") ;
    
    /**
     * Creates a new CoreEventDispatcher.
     * @param global the flag to use a global event flow or a local event flow.
     * @param channel the name of the global event flow if the {@code global} argument is {@code true}.
     */
    system.events.CoreEventDispatcher = function ( global /*Boolean*/ , channel /*String*/  ) 
    { 
        this.setGlobal( global, channel ) ;
    }
    
    /**
     * @extends systemevents.IEventDispatcher
     */
    proto = system.events.CoreEventDispatcher.extend( system.events.IEventDispatcher ) ;
    
    /**
     * Allows the registration of event listeners on the event target.
     * @param type A string representing the event type to listen for. If eventName value is "ALL" addEventListener use addGlobalListener
     * @param listener The object that receives a notification when an event of the specified type occurs. This must be an object implementing the {@code EventListener} interface.
     * @param useCapture Determinates if the event flow use capture or not.
     * @param priority Determines the priority level of the event listener.
     * @param autoRemove Apply a removeEventListener after the first trigger
     */
    proto.addEventListener = function ( type/*String*/, listener /*EventListener*/ , useCapture/*Boolean*/ , priority/*Number*/ , autoRemove/*Boolean*/ ) /*void*/ 
    {
        this._dispatcher.addEventListener( type , listener , useCapture , priority , autoRemove ) ;
    }
    
    /**
     * Allows the registration of global event listeners on the event target.
     * @param listener The object that receives a notification when an event of the specified type occurs. This must be an object implementing the <b>EventListener</b> interface.
     * @param priority Determines the priority level of the event listener.
     * @param autoRemove Apply a removeEventListener after the first trigger
     */
    proto.addGlobalEventListener = function(listener/*EventListener*/, priority/*Number*/, autoRemove/*Boolean*/ ) /*void*/ 
    {
        this._dispatcher.addGlobalEventListener( listener , priority , autoRemove ) ;
    }
    
    /**
     * Dispatches an event into the event flow.
     * @param event The Event object that is dispatched into the event flow.
     * @param isQueue if the EventDispatcher isn't register to the event type the event is bufferized.
     * @param target the target of the event.
     * @param contect the context of the event.
     * @return the reference of the event dispatched in the event flow.
     */
    proto.dispatchEvent = function ( event , isQueue/*Boolean*/ , target , context) /*Event*/ 
    {
        return this._dispatcher.dispatchEvent( event , isQueue , target , context ) ;
    }
    
    /**
     * Returns the internal {@code EventDispatcher} reference.
     * @return the internal {@code EventDispatcher} reference.
     */
    proto.getEventDispatcher = function() /*EventDispatcher*/ 
    {
        return this._dispatcher ;
    }
    
    /**
     * Returns the {@code EventListenerCollection} of the specified event name.
     * @return the {@code EventListenerCollection} of the specified event name.
     */
    proto.getEventListeners = function( type /*String*/ ) /*Array*/ 
    {
        return this._dispatcher.getEventListeners( type ) ;
    }
    
    /**
     * Returns the {@code EventListenerCollection} of this EventDispatcher.
     * @return the {@code EventListenerCollection} of this EventDispatcher.
     */
    proto.getGlobalEventListeners = function()/*EventListenerCollection*/ 
    {
        return this._dispatcher.getGlobalEventListeners() ;
    }
    
    /**
     * Returns the EventDispatcher reference of the parent of this instance.
     * @return the EventDispatcher reference of the parent of this instance.
     */
    proto.getParent = function () /*EventDispatcher*/ 
    {
        return this._dispatcher.parent ;
    }
    
    /**
     * Returns an array set of all register event's name in this EventTarget.
     * @return an array set of all register event's name in this EventTarget.
     */
    proto.getRegisteredTypes = function()/*Array*/ 
    {
        return this._dispatcher.getRegisteredTypes() ;
    }
    
    /**
     * Returns the target of this instance.
     * @return the target of this instance.
     */
    proto.getTarget = function () 
    {
        return this._dispatcher.getTarget() ;
    }
    
    /**
     * Checks whether the EventDispatcher object has any listeners registered for a specific type of event.
     * This allows you to determine where altered handling of an event type has been introduced in the event flow heirarchy by an EventDispatcher object.
     */ 
    proto.hasEventListener = function( type /*String*/ ) /*Boolean*/ 
    {
        return this._dispatcher.hasEventListener( type ) ;
    }
    
    /**
     * Creates and returns the internal {@code EventDispatcher} reference (this method is invoqued in the constructor).
     * You can overrides this method if you wan use a global {@code EventDispatcher} singleton.
     * @return the internal {@code EventDispatcher} reference.
     */
    proto.initEventDispatcher = function () /*EventDispatcher*/ 
    {
        return new system.events.EventDispatcher( this ) ;
    }
    
    /**
     * Returns the value of the isGlobal flag of this model.
     * @return {@code true} if the model use a global EventDispatcher to dispatch this events.
     */
    proto.isGlobal = function() /*Boolean*/
    {
        return this._isGlobal ;
    }
    
    /**
     * Returns {@code true} if the object is locked.
     * @return {@code true} if the object is locked.
     */
    proto.isLocked = function() /*Boolean*/ 
    {
        return this.___isLock___ ;
    }
    
    /**
     * Locks the object.
     */
    proto.lock = function() /*void*/ 
    {
        this.___isLock___ = true ;
    }
    
    /** 
     * Removes a listener from the EventDispatcher object.
     * @param type The type of event.
     * @param listener The listener object to remove.
     * @param useCapture Specifies whether the listener was registered for the capture phase or the target and bubbling phases. If the listener was registered for both the capture phase and the target and bubbling phases, two calls to removeEventListener() are required to remove both, one call with useCapture() set to true , and another call with useCapture() set to false .
     */
    proto.removeEventListener = function ( type /*String*/ , listener /*EventListener*/ , useCapture /*Boolean*/ ) /*EventListener*/ 
    {
        return this._dispatcher.removeEventListener( type , listener , useCapture ) ;
    }
    
    /** 
     * Removes a global listener from the EventDispatcher object.
     * If there is no matching listener registered with the EventDispatcher object, then calling this method has no effect.
     * @param the string representation of the class name of the EventListener or a EventListener object.
     */
    proto.removeGlobalEventListener = function( listener )/*EventListener*/ 
    {
        return this._dispatcher.removeGlobalEventListener( listener ) ;
    }
    
    /**
     * Sets the internal {@code EventDispatcher} reference.
     */
    proto.setEventDispatcher = function( dispatcher /*EventDispatcher*/ ) /*void*/ 
    {
        this._dispatcher = dispatcher || this.initEventDispatcher() ;
    }
    
    /**
     * Sets if the model use a global {@code EventDispatcher} to dispatch this events, if the {@code flag} value is {@code false} the model use a local EventDispatcher.
     * @param flag the flag to use a global event flow or a local event flow.
     * @param channel the name of the global event flow if the {@code flag} argument is {@code true}.  
     */
    proto.setGlobal = function ( flag /*Boolean*/ , channel /*String*/ ) /*void*/ 
    {
        this._isGlobal = Boolean(flag) ;
        this.setEventDispatcher( this._isGlobal ? system.events.EventDispatcher.getInstance( channel ) : null ) ;
    }
    
    /**
     * Sets the parent EventDispatcher reference of this instance.
     */
    proto.setParent = function( parent /*EventDispatcher*/ )/*void*/ 
    {
        return this._dispatcher.parent = parent ;
    }
    
    /**
     * Returns the source code string representation of the object.
     * @return the source code string representation of the object.
     */
    proto.toSource = function () /*Array*/ 
    {
        return "new " + this.getConstructorPath() + "()" ;
    }
    
    /**
     * Unlocks the display.
     */
    proto.unLock = function() /*void*/ 
    {
        this.___isLock___ = false ;
    }
    
    ////////////
    
    proto.__defineGetter__( "parent" , proto.getParent ) ;
    proto.__defineSetter__( "parent" , proto.setParent ) ;
    
    proto.__defineGetter__( "target" , proto.getTarget ) ;
    
    ////////////
    
    /**
     * The internal flag to indicates if the display is locked or not.
     */ 
    proto.___isLock___ /*Boolean*/ = false ;
    
    ////////////
    
    delete proto ;
}