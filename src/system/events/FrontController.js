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
 * The Front Controller pattern defines a single EventDispatcher that is responsible for processing application requests.
 * <p>A front controller centralizes functions such as view selection, security, 
 * and templating, and applies them consistently across all pages or views. 
 * Consequently, when the behavior of these functions need to change, only a small part of the application needs to be changed: 
 * the controller and its helper classes.</p>
 * <p><b>Example :</b></p>
 * {@code
 * var action1 = function ( e ) 
 * {
 *     trace( "action1 : " + e.type ) ;
 * }
 * 
 * var action2 = function ( e ) 
 * {
 *     trace( "action2 : " + e.type ) ;
 * }
 * 
 * var listener1 = new system.events.Delegate( this , action1 ) ;
 * var listener2 = new system.events.Delegate( this , action2 ) ;
 * 
 * var controller = new system.events.FrontController() ;
 * 
 * controller.insert( "notify1" , listener1 ) ;
 * controller.insert( "notify2" , listener2 ) ;
 * 
 * var e1 = new system.events.Event( "notify1" , this ) ;
 * var e2 = new system.events.Event( "notify2" , this ) ;
 * 
 * controller.fireEvent( e1 ) ;
 * controller.fireEvent( e2 ) ;
 * }
 * @see system.events.EventDispatcher
 */
if ( system.events.FrontController == undefined ) 
{
    /**
     * @requires system.data.maps.ArrayMap
     */
    require("system.data.maps.ArrayMap") ;
    
    /**
     * Creates a new FrontController instance.
     * @param channel the channel of this FrontController.
     * @param target the EventDispatcher reference to switch with the default EventDispatcher singleton in the controller.
     * <p><b>Example :</b> {@code var controller = new system.events.FrontController() ;}</p>
     */
    system.events.FrontController = function( channel /*String*/, target /*EventDispatcher*/  ) 
    {
        this._map = new system.data.maps.ArrayMap() ;
        if ( target && target instanceof system.events.IEventDispatcher )
        {
            this._dispatcher = target ;
        }
        else
        {
            if ( !( typeof(channel) == "string" || ( channel instanceof String ) ) )  
            {
                channel = null ;
            } 
            this._dispatcher = system.events.EventDispatcher.getInstance( channel )
        }
    }
    
    /**
     * @extends Object
     */
    proto = system.events.FrontController.extend( Object ) ;
    
    /**
     * Add a new entry into the FrontController.
     * @param type The type used to register the specified listener.
     * @param listener the EventListener to be insert in the FrontController map.
     */
    proto.add = function( type /*String*/ , listener /*EventListener*/ ) /*void*/ 
    {
        if ( type == null || !( typeof(type) == "string" || type instanceof String ) ) 
        {
            throw new TypeError( "The FrontController add() method failed, the 'type' argument not must be null and must be a String." ) ;
        }
        
        if ( listener == null || !( listener instanceof system.events.EventListener )) 
        {
            throw new TypeError( "The FrontController add() method failed, the event type '" + type + "' failed, the 'listener' argument not must be null." ) ;
        }
        
        if( this.contains( type ) )
        {
            this.remove( type ) ;
        }
        this._map.put.apply( this._map, arguments ) ;
        this._dispatcher.addEventListener(type, listener) ;
    }
    
    /**
     * Adds a new EventListener into an EventListenerBatch in the FrontController.
     * If this <code class="prettyprint">listener</code> argument is null' and if the <code class="prettyprint">eventName</code> argument isn't register with an EventListenerBatch in the FrontController, 
     * an empty EventListenerBatch is created and register in the FrontController with the specified 'eventName'.
     * @param type The type to register the specified listener.
     * @param listener (optional) The <code class="prettyprint">EventListener</code> mapped in the FrontController with the specified event type (This listener is added in an EventListenerBatch). 
     * @throws ArgumentError If the 'type' argument not must be null.
     */
    proto.addBatch = function( type /*String*/ , listener /*EventListener*/) /*void*/
    {
        if ( type == null || !( typeof(type) == "string" || type instanceof String ) ) 
        {
            throw new TypeError( "The FrontController addBatch() method failed, the 'type' argument not must be null and must be a String." ) ;
        }
        
        if ( listener == null || !( listener instanceof system.events.EventListener )) 
        {
            throw new TypeError( "The FrontController addBatch() method failed, the event type '" + type + "' failed, the 'listener' argument not must be null." ) ;
        }
        
        var batch ;
        
        if ( this._map.containsKey( type ) )
        {
            batch = this._map.get( type ) ;
            
            if ( batch instanceof system.events.EventListenerBatch )
            {
                batch.add( listener ) ;
                return ;
            }
        }
        
        batch = new system.events.EventListenerBatch() ;
        
        batch.add( listener ) ;
        
        this.add( type , batch ) ;
    }
    
    /**
     * Removes all entries in the FrontController. 
     */
    proto.clear = function () /*void*/ 
    {
        if ( this.size() > 0 )
        {
            var it /*Iterator*/ = this._map.keyIterator() ;
            var type /*String*/ ;
            var listener /*String*/ ;
            while( it.hasNext() )
            {
                type     = it.next() ;
                listener = this._map.get( type ) ;
                if ( listener ) 
                {
                    this._dispatcher.removeEventListener( type , listener ) ;
                }
            }
            this._map.clear() ;
        }
    }
    
    /**
     * Returns {@code true} if the type is registered in the FrontController.
     * @param type The search type value.
     * @return {@code true} if the type is registered in the FrontController.
     */
    proto.contains = function ( type /*String*/ ) /*Boolean*/ 
    {
        return this._map.containsKey(type) ;
    }
    
    /**
     * Dispatch an event into the FrontController
     * @param event The event to dispatch with the front controller.
     * @throws Error If the internal event dispatcher not must be null.
     */
    proto.fireEvent = function( event /*Event*/ ) /*void*/ 
    {
        if( this._dispatcher )
        {
            this._dispatcher.dispatchEvent( event ) ;
        }
        else
        {
            throw new Error( this + " fireEvent failed, the internal event dispatcher not must be null." ) ;
        }
    }
    
    /**
     * Returns an EventListener register in the front controller with the specified event name.
     * @usage  frontcontroller.getListener( "type" ) ;
     * @param  type the type of the EventListener to search.
     * @return an EventListener register in the front controller with the specified event type.
     */
    proto.getListener = function( type /*String*/ ) /*EventListener*/ 
    {
        return this._map.get( type ) ;
    }
    
    /**
     * Indicates if the specified <code class="prettyprint">EventListener</code> registered with the specified type in argument is an EventListenerBatch instance.
     * @param type The type to indicates if an EventListenerBatch is registered.
     * @return <code class="prettyprint">true</code> if the specified EventListener or listener function registered with the 'eventName' value in argument is an EventListenerBatch instance.
     */
    proto.isEventListenerBatch =  function( type /*String*/ ) /*Boolean*/
    {
        if ( this.contains( type ) )
        {
            return this._map.get( type ) instanceof system.events.EventListenerBatch ;
        }
        else
        {
            return false ;
        }
    }
    /**
     * Remove an entry into the FrontController.
     * @param type the name of the event type.
     */
    proto.remove = function( type /*String*/ ) /*void*/ 
    {
        var listener /*EventListener*/ = this._map.remove( type ) ;
        if ( listener != null ) 
        {
            this._dispatcher.removeEventListener( type , listener ) ;
        }
    }
    
    /**
     * Returns the number of entries in the FrontController.
     * @return the number of entries in the FrontController.
     */
    proto.size = function() /*Number*/ 
    {
        return this._map.size() ;
    }
    
    ////////////////////
    
    /**
     * Returns the internal EventDispatcher singleton reference of this FrontController.
     * @return the internal EventDispatcher singleton reference of this FrontController.
     */
    proto.getEventDispatcher = function() /*EventDispatcher*/
    {
        return this._dispatcher ;
    }
    
    /**
     * Sets the EventDispatcher reference of this FrontController.
     * @param target The EventDispatcher reference of this FrontController.
     */
    proto.setEventDispatcher = function ( target /*EventDispatcher*/ )
    {
        this._dispatcher = target ;
    }
    
    ////////////////////
    
    proto.__defineGetter__( "eventDispatcher" , proto.getEventDispatcher ) ;
    proto.__defineSetter__( "eventDispatcher" , proto.setEventDispatcher ) ;
    
    ////////////////////
    
    /**
     * The static internal map to register all singletons of the FrontController class in your application.
     */
    system.events.FrontController.instances /*ArrayMap*/ = new system.data.maps.ArrayMap() ;
    
    /**
     * Indicates if the specified singleton reference is register.
     * @param channel the channel value of the singleton reference register in the factory.
     * @return <code class="prettyprint">true</code> If the specified singleton reference is register.
     */
    system.events.FrontController.containsInstance = function( channel /*String*/ ) /*Boolean*/
    {
        return system.events.FrontController.instances.containsKey( channel ) ;
    }
    
    /**
     * Flush all global FrontController singletons.
     */
    system.events.FrontController.flush = function() /*void*/ 
    {
        system.events.FrontController.instances.clear() ;
    }
    
    /**
     * Returns the Array representation of all channels register in the FrontController factory or <code class="prettyprint">null</code> if no singletons are registered.
     * @return the Array representation of all channels register in the FrontController factory or <code class="prettyprint">null</code> if no singletons are registered.
     */
    system.events.FrontController.getChannels = function() /*Array*/
    {
        var i = system.events.FrontController.instances ;
        return ( i.size() > 0 ) ? i.getKeys() : null ; 
    }
    
    /**
     * Returns a global {@code FrontController} singleton.
     * @param channel The channel of the FrontController (default the EventDispatcher.DEFAULT_SINGLETON_NAME value).
     * @return a global {@code FrontController} singleton.
     */
    system.events.FrontController.getInstance = function(channel /*String*/ ) /*FrontController*/ 
    {
        if ( channel == null ) 
        {
            channel = system.events.EventDispatcher.DEFAULT_SINGLETON_NAME ;
        }
        
        var FrontController = system.events.FrontController ;
        
        if (!FrontController.instances.containsKey( channel )) 
        {
            FrontController.instances.put( channel , new system.events.FrontController(channel) ) ;
        }
        
        return FrontController.instances.get(channel) ;
    }
    
    /**
     * Removes a global FrontController singleton.
     * @param channel The channel of the FrontController to remove.
     * @return <code class="prettyprint">true</code> if a singleton is removed with the specified channel.
     */
    system.events.FrontController.removeInstance = function( channel /*String*/ ) /*Boolean*/ 
    {
        if ( channel == null ) 
        {
            channel = system.events.EventDispatcher.DEFAULT_SINGLETON_NAME ;
        }
        
        var FrontController = system.events.FrontController ;
        
        if ( FrontController.instances.containsKey(channel) ) 
        {
            return FrontController.instances.remove(channel) != null ;
        }
        else 
        {
            return false ;
        }
    }
    
    ////////////////////
    
    delete proto ;
 
}
