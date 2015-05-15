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
 * Stores the listeners object an notifies them with the DOM Events level 2/3 of the W3C.
 * The EventDispatcher class implements the IEventDispatcher interface. 
 * This object allows any object to be an {@code EventTarget}.
 * <p><b>Example :</b></p>
 * {@code
 * Event           = system.events.Event ;
 * Delegate        = system.events.Delegate ;
 * EventDispatcher = system.events.EventDispatcher ;
 * 
 * var action = function ( e ) 
 * {
 *     trace ("action : " + e.type ) ;
 * }
 * 
 * var listener = new Delegate( this , action) ;
 * 
 * var dispatcher = new EventDispatcher() ;
 * 
 * dispatcher.addEventListener( "notify" , listener ) ;
 * 
 * dispatcher.dispatchEvent( new Event( "notify" , this ) ) ;
 * }
 */
if (system.events.EventDispatcher == undefined) 
{
    /**
     * @requires system.events.EventListenerEntry
     */
    require("system.events.EventListenerEntry") ;
    
    /**
     * @requires system.events.EventListenerGroup
     */
    require("system.events.EventListenerGroup") ;
    
    /**
     * @requires system.events.EventQueue
     */
    require("system.events.EventQueue") ;
    
    /**
     * @requires system.events.IEventDispatcher
     */
    require("system.events.IEventDispatcher") ;
    
    /**
     * Creates a new EventDispatcher instannce.
     * @param target The IEventDispatcher scope reference of this instance.
     * @param parent The parent EventDispatcher reference of this instance.
     * @param name The name value of this instance. 
     */
    system.events.EventDispatcher = function ( target /*IEventDispatcher*/ , parent /*EventDispatcher*/ ) 
    { 
        this._globalListeners = new system.events.EventListenerGroup() ;
        this._captures        = new system.data.maps.ArrayMap() ;
        this._listeners       = new system.data.maps.ArrayMap() ;
        this._queue           = new system.events.EventQueue() ;
        this._target          = target ;
        this.parent           = parent ;
    }
    
    /**
     * @extends system.events.IEventDispatcher
     */
    proto = system.events.EventDispatcher.extend( system.events.IEventDispatcher ) ;
    
    /**
     * The parent EventDispatcher reference of this EventDispatcher.
     */
    proto.parent = null ; /*EventDispatcher*/
    
    /**
     * Adds a child EventDispatcher reference at this instance.
     */
    proto.addChild = function ( child /*EventDispatcher*/ ) 
    {
        child.parent = this ;
    }
    
    /**
     * Allows the registration of event listeners on the event target.
     * @param type A string representing the event type to listen for. If type value is "ALL" addEventListener use addGlobalListener
     * @param listener The object that receives a notification when an event of the specified type occurs. This must be an object implementing the {@code EventListener} interface.
     * @param useCapture Determinates if the event flow use capture or not.
     * @param priority Determines the priority level of the event listener.
     * @param autoRemove Apply a removeEventListener after the first trigger
     */
    proto.addEventListener = function ( type /*String*/ , listener/*EventListener*/ , useCapture /*Boolean*/ , priority/*Number*/, autoRemove/*Boolean*/ ) /*void*/ 
    {
        priority = isNaN(priority) ? 0 : priority ;
        if (type == "ALL") 
        {
            this.addGlobalEventListener( listener , priority , autoRemove ) ;
        }
        else 
        {
            var map /*ArrayMap*/ = Boolean( useCapture ) ? this._captures : this._listeners ;
            if ( !map.containsKey(type)) 
            {
                map.put( type, new system.events.EventListenerGroup() ) ;
            }
            var group /*EventListenerGroup*/ = map.get( type ) ;
            group.addListener( listener , priority , autoRemove ) ;
            this._dispatchQueuedEvents() ;
        }
    }
    
    /**
     * Allows the registration of global event listeners on the event target.
     * @param listener The object that receives a notification when an event of the specified type occurs. This must be an object implementing the {@code EventListener} interface.
     * @param priority Determines the priority level of the event listener.
     * @param autoRemove Apply a removeEventListener after the first trigger
     */
    proto.addGlobalEventListener = function( listener /*EventListener*/ , priority /*uint*/ , autoRemove/*Boolean*/ ) /*void*/ 
    {
        this._globalListeners.addListener( listener, priority , autoRemove ) ;
        this._dispatchQueuedEvents() ;
    }
    
    /**
     * Dispatches an event into the event flow.
     * @param event The Event object that is dispatched into the event flow.
     * @param isQueue if the EventDispatcher isn't register to the event type the event is bufferized.
     * @param target the target of the event.
     * @param contect the context of the event.
     * @return the reference of the event dispatched in the event flow.
     */
    proto.dispatchEvent = function ( event, isQueue/*Boolean*/, target, context ) /*Event*/ 
    {
        if (!event) 
        {
            return null ;
        }
        
        var e /*Event*/ = system.events.EventFactory.create( event , target || this , context ) ;
        
        if ( e == null ) 
        {
            return null ;
        }
        
        if ( e.getTarget() == null )
        {
            e.setTarget( this.getTarget() ) ;
        }
        
        var EventPhase = system.events.EventPhase ;
        
        var phase /*uint*/ = e.getEventPhase() ;
        
        if ( phase == EventPhase.AT_TARGET ) 
        {
            this._capture( e ) ; // CAPTURING_PHASE
            
            e.setEventPhase( EventPhase.AT_TARGET ) ;
            
            e.setCurrentTarget( this.getTarget() ) ;
            
            this._propagate(e, isQueue || false ) ; // AT_TARGET
            
            this._bubble(e) ; // BUBBLING_PHASE
            
            e.setEventPhase( EventPhase.AT_TARGET ) ; // TODO inclure cette initialisation dans initEvent ??
        }
        else if ( phase == EventPhase.BUBBLING_PHASE ) 
        {
            this._propagateBubble( e ) ;
        }
        else if ( phase == EventPhase.CAPTURING_PHASE ) 
        {
            this._propagateCapture( e ) ;
        }
        
        return e ;
    }
    
    /**
     * Returns the {@code Array} of all the listeners registered with the specific type.
     * @return the {@code Array} of all the listeners registered with the specific type.
     */
    proto.getEventListeners = function( type/*String*/ ) /*Array*/ 
    {
        var result = [] ;
        if ( this._listeners.containsKey(type) ) 
        {
            var listeners /*Array*/ = this._listeners.get(type).toArray() ;
            if ( listeners.length > 0 )
            {
                var l /*int*/ = listeners.length ;
                for( var i /*int*/ = 0 ; i<l ; i++ )
                {
                    result.push( listeners[i].listener ) ;
                }
            }
        }
        return result ;
    }
    
    /**
     * Returns the global {@code EventListenerCollection} of this EventDispatcher.
     * @return the global {@code EventListenerCollection} of this EventDispatcher.
     */
    proto.getGlobalEventListeners = function() /*Array*/ 
    {
        var result = [] ;
        var listeners /*Array*/ = this._globalListeners.toArray() ;
        if ( listeners.length > 0 )
        {
            var l /*int*/ = listeners.length ;
            for( var i /*int*/ = 0 ; i<l ; i++ )
            {
                result.push( listeners[i].listener ) ;
            }
        }
        return result ;
    }
    
    /**
     * Returns an array set of all register event's name in this EventTarget.
     * @return an array set of all register event's name in this EventTarget.
     */
    proto.getRegisteredTypes = function () /*Array*/ 
    {
        return this._listeners.getKeys() ;
    }
    
    /**
     * Returns the current target of this EventDispatcher.
     * @return the current target of this EventDispatcher.
     */
    proto.getTarget = function () 
    {
        return this._target != null ? this._target : this ;
    }
    
    /**
     * Checks whether the EventDispatcher object has any listeners registered for a specific type of event.
     * This allows you to determine where altered handling of an event type has been introduced in the event flow heirarchy by an EventDispatcher object.
     */ 
    proto.hasEventListener = function( type/*String*/ ) /*Boolean*/ 
    {
        return this._listeners.containsKey( type ) ;
    }
    
    /**
     * Removes the EventDispatcher child reference of this EventDispatcher instance.
     */
    proto.removeChild = function ( child /*EventDispatcher*/ ) /*Void*/ 
    {
        child.parent = null ;
    }
    
    /** 
     * Removes a listener from the EventDispatcher object.
     * If there is no matching listener registered with the EventDispatcher object, then calling this method has no effect.
     * @param Specifies the type of event.
     * @param the class name(string) or a EventListener object.
     */
    proto.removeEventListener = function ( type /*String*/ , listener , useCapture /*Boolean*/ ) /*void*/ 
    {
        if ( type == "ALL" ) 
        {
            return this.removeGlobalEventListener( listener ) ;
        }
        else if ( listener instanceof system.events.EventListener )
        {
            var map /*ArrayMap*/ = !Boolean( useCapture ) ? this._listeners : this._captures ;
            if ( map.containsKey( type ) ) 
            {
                var group /*EventListenerGroup*/ = map.get( type ) ;
                group.removeListener(listener) ;
                if ( group.numListeners() == 0 )
                {
                    map.remove( type ) ;
                }
            }
        }
    }
    
    /**
     * Removes a global listener from the EventDispatcher object.
     * If there is no matching listener registered with the EventDispatcher object, then calling this method has no effect.
     * @param the class name(string) or a EventListener object.
     */
    proto.removeGlobalEventListener = function( listener ) /*void*/ 
    {
        if ( listener instanceof system.events.EventListener )
        {
            this._globalListeners.removeListener(listener) ;
        }
    }
    
    /**
     * Returns the source code string representation of the object.
     * @return the source code string representation of the object.
     */
    proto.toSource = function () /*Array*/ 
    {
        return "new " + this.getConstructorPath() + "()" ;
    }
    
    ////////////////////
    
    /**
     * Returns the name of the display.
     * @return the name of the display.
     */
    proto.getName = function() /*String*/
    {
        return this._name ;
    }
    
    /**
     * Sets the name of the instance.
     */
    proto.setName = function( name /*String*/ ) /*void*/ 
    {
        this._name = name ;
    }
    
    ////////////////////
    
    proto.__defineGetter__( "name" , proto.getName ) ;
    proto.__defineSetter__( "name" , proto.setName ) ;
    
    proto.__defineGetter__( "target" , proto.getTarget ) ;
    
    ////////////////////
    
    /**
     * Determinates the default singleton name.
     */
    system.events.EventDispatcher.DEFAULT_SINGLETON_NAME /*String*/ = "__default__" ;
    
    /**
     * Returns a global {@code EventDispatcher} singleton. Uses this method to create [@code FrontController} patterns for example.
     * @return a global {@code EventDispatcher} singleton.
     */
    system.events.EventDispatcher.getInstance = function ( name /*String*/ ) /*EventDispatcher*/ 
    {
        var EventDispatcher = system.events.EventDispatcher ;
        if ( !name ) 
        {
            name = "__default__" ;
        }
        if ( !EventDispatcher.instances.containsKey(name) ) 
        {
            EventDispatcher.instances.put(name, new EventDispatcher(null, null, name)) ;
        }
        return EventDispatcher.instances.get(name) ;
    }
    
    /**
     * Flush all global EventDispatcher singleton.
     */
    system.events.EventDispatcher.flush = function () /*Void*/ 
    {
        system.events.EventDispatcher.instances.clear() ;
    }
    
    /**
     * Indicates the number of singletons defines in the factory of the EventDispatcher class.
     */
    system.events.EventDispatcher.numInstances = function () /*uint*/ 
    {
        return system.events.EventDispatcher.instances.size() ;
    }
    
    /**
     * Release the specified EventDispatcher singleton in your application.
     */
    system.events.EventDispatcher.release = function ( name /*String*/ ) /*EventDispatcher*/ 
    {
        if (!name) 
        {
            name = "__default__" ;
        }
        return system.events.EventDispatcher.instances.remove(name) ;
    }
    
    /**
     * Removes a global EventDispatcher singleton.
     */
    system.events.EventDispatcher.removeInstance = function (name /*String*/ ) /*Boolean*/ 
    {
        if ( system.events.EventDispatcher.instances.containsKey(name) ) 
        {
            return system.events.EventDispatcher.instances.remove(name) != null ;
        }
        else 
        {
            return false ;
        }
    }
    
    /**
     * The ArrayMap of all global singletons of this object.
     */
    system.events.EventDispatcher.instances /*ArrayMap*/ = new system.data.maps.ArrayMap() ;
    
    ////////////////////
    
    /**
     * The internal EventListenerCollection to register all global listeners.
     * @private
     */
    proto._globalListeners /*EventListenerGroup*/ = null ;
    
    /**
     * The ArrayMap to put all captures.
     * @private
     */
    proto._captures /*ArrayMap*/ = null ;
    
    /**
     * The ArrayMap of all listeners.
     * @private
     */
    proto._listeners /*ArrayMap*/ = null ;
    
    /**
     * The internal EventQueue buffer.
     * @private
     */
    proto._queue /*EventQueue*/ = null ;
    
    /**
     * The internal name's property of the instance.
     * @private
     */
    proto._name /*String*/ = null ;
    
    /**
     * The internal IEventDispatcher target.
     * @private
     */
    proto._target /*IEventDispatcher*/ = null ;
    
    /**
     * @private
     */
    proto._bubble = function (e /*Event*/ ) /*Boolean*/ 
    {
        var EventPhase = system.events.EventPhase ;
        if ( e.stop >= EventPhase.STOP ) 
        {
            return false ;
        }
        var parents /*Array*/ = this._getParents() ;
        if ( parents != null ) 
        {
            var l /*Number*/ = parents.length ;
            var i /*Number*/ = 0 ;
            var current /*EventDispatcher*/ ;
            while ( i < l ) 
            {
                if ( e.getBubbles() ) 
                {
                    current = parents[i] ;
                    e.setCurrentTarget(current.getTarget()) ;
                    e.setEventPhase( EventPhase.BUBBLING_PHASE ) ;
                    current.dispatchEvent(e) ;
                    if ( e.stop >= EventPhase.STOP ) 
                    {
                        return false ;
                    }
                }
                i++ ;
            }
        }
        return true ;
    }
    
    /**
     * @private
     */
    proto._capture = function( e /*Event*/ ) /*Boolean*/
    {
        var parents /*Array*/ = this._getParents() ;
        if ( parents != null ) 
        {
            var l /*Number*/ = parents.length ;
            var current /*EventDispatcher*/ ;
            var EventPhase = system.events.EventPhase ;
            while (--l > -1) 
            {
                current = parents[l] ;
                e.setCurrentTarget( current.getTarget() ) ;
                e.setEventPhase(EventPhase.CAPTURING_PHASE) ;
                current.dispatchEvent( e ) ;
                if (e["stop"] >= EventPhase.STOP ) 
                {
                    return false ;
                }
            }
        }
        return true ;
    }
    
    /**
     * @private
     */
    proto._dispatchQueuedEvents = function() /*Void*/ 
    {
        var q /*Queue*/ = this._queue.getQueuedEvents();
        if ( q.size() > 0 ) 
        {
            var e /*Event*/ ;
            var ar /*Array*/ = q.toArray() ;
            var len /*int*/ = ar.length ;
            for (var i /*int*/ = 0 ; i < len ; i++) 
            {
                e = ar[i] ;
                this.dispatchEvent( e , e.isQueued() ) ;
            }
        }
    }
    
    /**
     * @private
     */
    proto._getParents = function () /*Array*/ 
    {
        if (this.parent == null) return null ;
        var ar /*Array*/ = [] ;
        var tmp /*EventDispatcher*/ = this.parent ;
        while(tmp != null) 
        {
            ar.push(tmp) ;
            tmp = tmp.parent ;
        }
        return ar ;
    }
    
    /**
     * @private
     */
    proto._propagateBubble = function ( e /*Event*/ ) /*Void*/ 
    {
        if ( e.getEventPhase() == system.events.EventPhase.BUBBLING_PHASE ) 
        {
            this._propagate(e) ;
        }
    }
    
    /**
     * @private
     */
    proto._propagateCapture = function ( e /*Event*/ ) /*Void*/ 
    {
        if ( this._captures.containsKey( e.getType() ) ) 
        {
            e.setEventPhase( system.events.EventPhase.CAPTURING_PHASE ) ;
            e.setCurrentTarget( this.getTarget() ) ;
            var group/*EventListenerGroup*/ = this._captures.get( e.getType() ) ;
            if ( group )
            {
                group.propagate(e) ;
            }
        }
    }
    
    /**
     * @private
     */
    proto._propagate = function ( e /*Event*/, isQueue /*Boolean*/ ) /*Event*/ 
    {
        var EventPhase = system.events.EventPhase ;
        if ( e.stop >= EventPhase.STOP ) 
        {
            return e ; // hack the interface limitation
        }
        if ( this._listeners.containsKey( e.getType() ) ) 
        {
            var group /*EventListenerGroup*/ = this._listeners.get( e.getType() ) ;
            group.propagate(e) ;
        }
        if ( e.isCancelled() ) 
        {
            return e ;
        }
        this._globalListeners.propagate(e) ;
        if ( isQueue == false || e.isCancelled() ) 
        {
            return e ;
        }
        this._queue.enqueue(e) ;
        return e ;
    }
    
    ////////////////////
    
    delete proto ;
}