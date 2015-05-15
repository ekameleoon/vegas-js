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
 * {@code Event} is the basical event structure to work with {@link EventDispatcher}.
 * {@code
 * var e = new system.events.Event( "change" , this , "Hello World") ;
 * 
 * trace("> " + e) ;
 * 
 * trace("> target : " + e.getTarget()) ;
 * trace("> type : " + e.getType()) ;
 * trace("> context : " + e.getContext()) ;
 * trace("> timeStamp : " + new Date(e.getTimeStamp()) ) ;
 * }
 */
if ( system.events.Event == undefined) 
{
    /**
     * @requirese
     */
    require("system.events.EventPhase") ;
    
    /**
     * Creates a new {@code Event} instance.
     * <p><b>Example :</b></p>
     * <pre>
     * var e:Event = new Event(type, target, context, [bubbles:Boolean, [eventPhase:Number, [time:Number, [stop:Boolean]]]]) ;
     * </pre>
     * @param type the string type of the instance. 
     * @param target the target of the event.
     * @param context the optional context object of the event.
     * @param bubbles indicates if the event is a bubbling event.
     * @param eventPhase the current EventPhase of the event.
     * @param time this parameter is used in the deserialization of the object.
     * @param stop this parameter is used in the deserialization of the object.
     */
    system.events.Event = function ( type/*String*/ , target/*Object*/ , context/*Object*/ , bubbles /*Boolean*/ , eventPhase /*Number*/ , time /*Number*/ , stop /*Number*/ ) 
    {
        var EventPhase = system.events.EventPhase ;
        
        this._context = context || null ;
        this._target  = target  || null ;
        this._type    = type    || null ;
        
        this._bubbles    = Boolean( bubbles ) ;
        this._cancelled  = false ;
        this._eventPhase = isNaN( eventPhase ) ? EventPhase.AT_TARGET : eventPhase ;
        this._inQueue    = false ;
        this._time       = ( time > 0 ) ? time : ( ( new Date()).valueOf() ) ;
        this.stop        = isNaN( stop ) ? EventPhase.NONE : stop ;
    }
    
    //////////////
    
    /**
     * @extends Object
     */
    proto = system.events.Event.extend( Object ) ;
    
    //////////////
    
    /**
     * This property indicated in the event model if this event is stopped.
     */
    proto.stop /*uint*/ = 0 ;
     
    /**
     * Indicates whether the behavior associated with the event can be prevented.
     */
    proto.cancel = function () /*void*/ 
    {
        this._cancelled = true ;
    }
    
    /**
     * Returns the shallow copy of this event.
     * @return the shallow copy of this event.
     */
    proto.clone = function () 
    {
        return new system.events.Event( this._type, this._target , this._context ) ;
    }
    
    /**
     * A utility function for implementing the toString() method in custom Event classes. 
     * Overriding the toString() method is recommended, but not required.
     */
    proto.formatToString = function( className /*String*/ /* , ... arguments */ ) /*String*/
    {
        var args /*Array*/ = Array.fromArguments(arguments) ;
        
        args.shift() ;
        
        var source /*String*/ ;
        
        source = "[" ;
        
        source += className || this.getConstructorName() ;
        
        if ( args.length > 0 )
        {
            var m ; var i ;
            var l = args.length ;
            for( i = 0 ; i<l ; i++ )
            {
                m = args[i] ;
                if ( m in this )
                {
                    source += " " + m + ":" + this[m] ;
                }
            }
        }
        
        source += "]" ;
        
        return source ;
    }
    
    /**
     * Initialize the event with the properties type, bubbles, cancelable.
     * @param type the type of the event.
     * @param bubbles a boolean to indicate if the event is a bubbling event.
     * @param cancelable a boolean to indicate if the event is a capturing event.
     */
    proto.initEvent = function ( type /*String*/ , bubbles /*Boolean*/ , cancelable /*Boolean*/ ) /*void*/ 
    {
        this._type      = type ;
        this._bubbles   = bubbles ;
        this._cancelled = cancelable ;
        this._time = (new Date()).valueOf() ;
    }
    
    /**
     * Returns {@code true} if the event is cancelled.
     * @return {@code true} if the event is cancelled.  
     */
    proto.isCancelled = function() /*Boolean*/ 
    {
        return this._cancelled ;
    }
    
    /**
     * Returns {@code true} if the event is queued.
     * @return {@code true} if the event is queued.
     */
    proto.isQueued = function() /*Boolean*/ 
    {
        return this._inQueue ;
    }
    
    /**
     * Sets if the event is queued.
     */
    proto.queueEvent = function() /*void*/ 
    {
        this._inQueue = true ;
    }
    
    /**
     * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
     */
    proto.stopImmediatePropagation = function () /*void*/ 
    {
        this.stop = system.events.EventPhase.STOP_IMMEDIATE ;
    }
    
    /**
     * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow.
     */
    proto.stopPropagation = function () /*void*/ 
    {
        this.stop = system.events.EventPhase.STOP ;
    }
    
    /**
     * Returns a string representing the source code of the object.
     * @return a string representing the source code of the object.
     */
    proto.toSource = function () /*String*/ 
    {
        var pattern /*String*/ = "new " + this.getConstructorPath() + "({0}, {1}, {2}, {3}, {4}, {5}, {6})" ;
        var args /*Array*/ = 
        [
            (this._type != null ) ? this._type.toSource() : null ,
            (this._target == null || this._target == _global) ? null : this._target.toSource() ,
            (this._context != null) ? this._context.toSource() : null ,
            (this._bubbles != null) ? this._bubbles.toSource() : false ,
            isNaN(this._eventPhase) ? 0 : this._eventPhase.toSource() ,
            isNaN(this._time) ? 0 : this._time ,
            this.stop.toSource() 
        ] ;
        return core.format.apply(this, [pattern].concat(args)) ;
    }
    
    /**
     * Returns the string representation of this event.
     * @return the string representation of this event.
     */
    proto.toString = function () /*String*/ 
    {
        return this.formatToString( null, "type", "target", "context", "bubbles", "cancelable", "eventPhase" );
    }
    
    //////////////
    
    /**
     * Returns {@code true} if the event is bubbling.
     * @return {@code true} if the event is bubbling.
     */
    proto.getBubbles = function () /*Boolean*/ 
    {
        return this._bubbles ;
    }
    
    /**
     * Sets if the event is bubbling.
     */
    proto.setBubbles = function ( b /*Boolean*/ ) /*void*/ 
    {
        this._bubbles = b ;
    }
    
    /**
     * Indicates if the event is cancelable.
     */
    proto.getCancelable = function () /*Boolean*/ 
    {
        return this._cancelled ;
    }
    
    /**
     * Returns the optional context of this event.
     * @return an object, corresponding the optional context of this event.
     */
    proto.getContext = function () /*Object*/ 
    {
        return this._context ;
    }
    
    /**
     * Sets the optional context object of this event. 
     */
    proto.setContext = function ( context /*Object*/ ) /*void*/ 
    {
        this._context = context || null ;
    }
    
    /**
     * The object that is actively processing the Event object with an event listener.
     */
    proto.getCurrentTarget = function () /*Object*/ 
    {
        return this._currentTarget ;
    }
    
    /**
     * Sets the optional context object of this event. 
     */
    proto.setCurrentTarget = function ( target /*Object*/ ) /*void*/ 
    {
        this._currentTarget = target ;
    }
    
    /**
     * Returns the current phase in the event flow.
     * @return the current phase in the event flow.
     * @see system.events.EventPhase
     */
    proto.getEventPhase = function () /*uint*/ 
    {
        return this._eventPhase ;
    }
    
    /**
     * Sets the current phase in the event flow.
     */
    proto.setEventPhase = function ( n /*uint*/ ) /*void*/ 
    {
        this._eventPhase = n ;
    }
    
    /**
     * The event target.
     */
    proto.getTarget = function () /*Object*/ 
    {
        return this._target ;
    }
    
    /**
     * Sets the event target.
     */
    proto.setTarget = function ( target /*Object*/ ) /*void*/ 
    {
        this._target = target || null ;
    }
    
    /**
     * Indicates the timestamp of the event.
     */
    proto.getTimeStamp = function () /*Number*/ 
    {
        return this._time ;
    }
    
    /**
     * The type of event.
     */
    proto.getType = function () /*String*/ 
    {
        return this._type ;
    }
    
    /**
     * Sets the event type.
     */
    proto.setType = function ( type /*String*/ ) /*void*/ 
    {
        this._type = type || null ;
    }
    
    //////////////
    
    proto.__defineGetter__( "bubbles" , proto.getBubbles ) ;
    proto.__defineSetter__( "bubbles" , proto.setBubbles ) ;
    
    proto.__defineGetter__( "cancelable" , proto.getCancelable ) ;
    
    proto.__defineGetter__( "context" , proto.getContext ) ;
    proto.__defineSetter__( "context" , proto.setContext ) ;
    
    proto.__defineGetter__( "currentTarget" , proto.getCurrentTarget ) ;
    proto.__defineSetter__( "currentTarget" , proto.setCurrentTarget ) ;
    
    proto.__defineGetter__( "eventPhase" , proto.getEventPhase ) ;
    proto.__defineSetter__( "eventPhase" , proto.setEventPhase ) ;
    
    proto.__defineGetter__( "target" , proto.getTarget ) ;
    proto.__defineSetter__( "target" , proto.setTarget ) ;
    
    proto.__defineGetter__( "timeStamp" , proto.getTimeStamp ) ;
    
    proto.__defineGetter__( "type" , proto.getType ) ;
    proto.__defineSetter__( "type" , proto.setType ) ;
    
    //////////////
    
    /**
     * @private
     */
    proto._bubbles /*Boolean*/ = false ;
    
    /**
     * @private
     */
    proto._cancelled /*Boolean*/ = false ;
    
    /**
     * @private
     */
    proto._context /*Object*/ = null ;
    
    /**
     * @private
     */
    proto._currentTarget /*Object*/ = null ;
    
    /**
     * @private
     */
    proto._inQueue /*Boolean*/ = false ;
    
    /**
     * @private
     */
    proto._target /*Object*/ = null ;
    
    /**
     * @private
     */
    proto._time /*Number*/ = 0 ;
    
    /**
     * @private
     */
    proto._type /*String*/ = null ;
    
    /**
     * Sets the timestamp of the event (used this method only in internal in the Event class).
     */
    proto._setTimeStamp = function ( t /*Number*/ ) 
    {
        this._time = t ;
    }
    
    //////////////
    
    delete proto ;
}