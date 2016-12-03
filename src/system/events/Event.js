"use strict" ;

/**
 * The <code>Event</code> class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.
 * @name Event
 * @class
 * @memberof system.events
 * @param {string} type - The type of the event.
 * @param {boolean} bubbles - Determines whether the Event object participates in the bubbling stage of the event flow. The default value is <code>false</code>.
 * @param {boolean} cancelable - Determines whether the Event object can be canceled. The default values is <code>false</code>.
 * @see system.events.EventDispatcher
 * @example
 * var click = function( event )
 * {
 *     trace( "click: " + event ) ;
 * };
 *
 * var dispatcher = new EventDispatcher() ;
 *
 * dispatcher.addEventListener( Event.CLICK , click ) ;
 *
 * dispatcher.dispatchEvent( new Event( Event.CLICK ) ) ;
 */
export function Event( type , bubbles = false, cancelable = false )
{
    Object.defineProperties( this ,
    {
        _bubbles                     : { writable : true , value : Boolean(bubbles) } ,
        _cancelable                  : { writable : true , value : Boolean(cancelable) } ,
        _constructorName             : { writable : true , value : null } ,
        _currentTarget               : { writable : true , value : null } ,
        _defaultPrevented            : { writable : true , value : false } ,
        _eventPhase                  : { writable : true , value : 0 } ,
        _propagationStopped          : { writable : true , value : false } ,
        _immediatePropagationStopped : { writable : true , value : false } ,
        _target                      : { writable : true , value : null } ,
        _type                        : { writable : true , value : (type instanceof String || typeof(type) === 'string') ? type : null } ,
    });
}

Event.prototype = Object.create( Object.prototype ,
{
    /**
     * @private
     */
    constructor : { writable : true , value : Event } ,

    /**
     * Indicates whether an event is a bubbling event. If the event can bubble, this value is <code>true</code>; otherwise it is <code>false</code>.
     * <p>When an event occurs, it moves through the three phases of the event flow: the capture phase, which flows from the top of the display list hierarchy to the node just before the target node; the target phase, which comprises the target node; and the bubbling phase, which flows from the node subsequent to the target node back up the display list hierarchy.</p>
     * <p>Some events, such as the <code>activate</code> and <code>unload</code> events, do not have a bubbling phase. The <code>bubbles</code> property has a value of <code>false</code> for events that do not have a bubbling phase.</p>
     * @name bubbles
     * @memberof system.events.Event
     * @instance
     * @type boolean
     */
    bubbles : { get : function() { return this._bubbles } } ,

    /**
     * Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is <code>true</code>; otherwise it is <code>false</code>.
     * @see system.events.Event.preventDefault()
     * @name cancelable
     * @memberof system.events.Event
     * @instance
     * @type boolean
     */
    cancelable : { get : function() { return this._cancelable  ; } }  ,

    /**
     * The object that is actively processing the Event object with an event listener. For example, if a user clicks an OK button, the current target could be the node containing that button or one of its ancestors that has registered an event listener for that event.
     * @name currentTarget
     * @memberof system.events.Event
     * @instance
     * @type Object
     */
    currentTarget : { get : function() { return this._currentTarget } }  ,

    /**
     * The current phase in the event flow. This property can contain the following numeric values:
     * <ul>
     * <li>The capture phase (<code>EventPhase.NONE === 0</code>).</li>
     * <li>The capture phase (<code>EventPhase.CAPTURING_PHASE === 1</code>).</li>
     * <li>The target phase (<code>EventPhase.AT_TARGET === 2</code>).</li>
     * <li>The bubbling phase (<code>EventPhase.BUBBLING_PHASE === 3</code>).</li>
     * </ul>
     * @name eventPhase
     * @memberof system.events.Event
     * @instance
     * @type number
     */
    eventPhase : { get : function() { return this._eventPhase ; } } ,

    /**
     * The event target. This property contains the target node. For example, if a user clicks an OK button, the target node is the display list node containing that button.
     * @name target
     * @memberof system.events.Event
     * @instance
     * @type Object
     */
    target : { get : function() { return this._target } } ,

    /**
     * The type of event. The type is case-sensitive.
     * @name type
     * @memberof system.events.Event
     * @instance
     * @type string
     */
    type : { get : function() { return this._type } } ,

    /**
     * Duplicates an instance of an Event subclass.
     * <p>Returns a new <code>Event</code> object that is a copy of the original instance of the Event object. You do not normally call <code>clone()</code>; the EventDispatcher class calls it automatically when you redispatch an event—that is, when you call <code>dispatchEvent(event)</code> from a handler that is handling <code>event</code>.</p>
     * <p>The new Event object includes all the properties of the original.</p>
     * <p>When creating your own custom Event class, you must override the inherited <code>Event.clone()</code> method in order for it to duplicate the properties of your custom class. If you do not set all the properties that you add in your event subclass, those properties will not have the correct values when listeners handle the redispatched event.</p>
     * <p>In this example, <code>PingEvent</code> is a subclass of <code>Event</code> and therefore implements its own version of <code>clone()</code>.</p>
     * @example
     * class UrlEvent extends Event
     * {
     *     constructor( type , url , bubbles = false, cancelable = false )
     *     {
     *         super( type , bubbles , cancelable ) ;
     *         this.url = url;
     *     }
     *
     *     clone()
     *     {
     *         return new UrlEvent( this.type , this.url, this.bubbles, this.cancelable );
     *     }
     *
     *     toString()
     *     {
     *         return this.formatToString( this.constructor.name , "type", "url" , "bubbles", "cancelable", "eventPhase" );
     *     }
     * }
     * @return A new Event object that is identical to the original.
     * @name clone
     * @memberof system.events.Event
     * @function
     * @instance
     */
    clone : { writable : true , value : function ()
    {
        return new Event( this._type, this._bubbles, this._cancelable );
    }},

    /**
     * A utility function for implementing the <code>toString()</code> method in custom ActionScript 3.0 Event classes. Overriding the <code>toString()</code> method is recommended, but not required.
     * @name formatToString
     * @memberof system.events.Event
     * @instance
     * @function
     * @param {string} className - The class name to passed-in the string expression.
     * @param {...string} [rest] - rest The properties of the <code>Event<code> class and the properties that you add in your custom <code>Event</code> class.
     * @example
     * class UrlEvent extends Event
     * {
     *     constructor( type , url , bubbles = false, cancelable = false )
     *     {
     *         super( type , bubbles , cancelable ) ;
     *         this.url = url;
     *     }
     *
     *     toString()
     *     {
     *         return this.formatToString( this.constructor.name , "type", "url" , "bubbles", "cancelable", "eventPhase" );
     *     }
     * }
     */
    formatToString : { value : function( className , ...rest )
    {
        if( !className )
        {
            if( !this._constructorName )
            {
                this._constructorName = this.constructor.name ;
            }
            className = this._constructorName ;
        }
        let ar  = [] ;
        let len = rest.length ;
        for ( let i = 0; i < len ; ++i )
        {
            if( rest[i] in this )
            {
                ar.push( rest[i] + ":" + this[rest[i]] ) ;
            }
        }
        return "[" + className + " " + ar.join(' ') + "]" ;
    }},

    /**
     * Checks whether the <code>preventDefault()</code> method has been called on the event. If the <code>preventDefault()</code> method has been called, returns <code>true</code>; otherwise, returns <code>false</code>.
     * @return If <code>preventDefault()</code> has been called, returns <code>true</code>; otherwise, returns <code>false</code>.
     * @see system.events.Event.preventDefault
     * @name isDefaultPrevented
     * @memberof system.events.Event
     * @instance
     * @function
     */
    isDefaultPrevented : { value : function()
    {
        return this._defaultPrevented ;
    }},

    /**
     * Check if event.stopImmediatePropagation() was called.
     * @name isImmediatePropagationStopped
     * @memberof system.events.Event
     * @instance
     * @function
     */
    isImmediatePropagationStopped : { value : function()
    {
        return this._immediatePropagationStopped ;
    }},

    /**
     * Check if event.stopPropagation() was called.
     * @name isPropagationStopped
     * @memberof system.events.Event
     * @instance
     * @function
     */
    isPropagationStopped : { value : function()
    {
        return this._propagationStopped ;
    }},

    /**
     * Cancels an event's default behavior if that behavior can be canceled.
     * <p>Many events have associated behaviors that are carried out by default. For example, if a user types a character into a text field, the default behavior is that the character is displayed in the text field. Because the <code>TextEvent.TEXT_INPUT</code> event's default behavior can be canceled, you can use the <code>preventDefault()</code> method to prevent the character from appearing.</p>
     * <p>An example of a behavior that is not cancelable is the default behavior associated with the <code>Event.REMOVED</code> event, which is generated whenever Flash Player is about to remove a display object from the display list. The default behavior (removing the element) cannot be canceled, so the <code>preventDefault()</code> method has no effect on this default behavior.</p>
     * <p>You can use the <code>Event.cancelable</code> property to check whether you can prevent the default behavior associated with a particular event. If the value of <code>Event.cancelable</code> is <code>true</code>, then <code>preventDefault()</code> can be used to cancel the event; otherwise, <code>preventDefault()</code> has no effect.</p>
     * @see system.events.Event.isDefaultPrevented
     * @see system.events.Event.cancelable
     * @name preventDefault
     * @memberof system.events.Event
     * @instance
     * @function
     */
    preventDefault : { value : function()
    {
        if( this._cancelable )
        {
            this._defaultPrevented = true;
        }
    }},

    /**
    * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow. This method takes effect immediately, and it affects event listeners in the current node. In contrast, the <code>stopPropagation()</code> method doesn't take effect until all the event listeners in the current node finish processing.
    * <p><b>Note:</b> This method does not cancel the behavior associated with this event; see <code>preventDefault()</code> for that functionality.</p>
    * @see system.events.Event.stopPropagation
    * @see system.events.Event.preventDefault
    * @name stopImmediatePropagation
    * @memberof system.events.Event
    * @instance
    * @function
    */
    stopImmediatePropagation : { value : function()
    {
        this._immediatePropagationStopped = true;
    }},

    /**
    * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow. This method does not affect any event listeners in the current node (<code>currentTarget</code>). In contrast, the <code>stopImmediatePropagation()</code> method prevents processing of event listeners in both the current node and subsequent nodes. Additional calls to this method have no effect. This method can be called in any phase of the event flow.
    * <p><b>Note:</b> This method does not cancel the behavior associated with this event; see <code>preventDefault()</code> for that functionality.</p>
    * @see system.events.Event.stopImmediatePropagation
    * @see system.events.Event.preventDefault
    * @name stopPropagation
    * @memberof system.events.Event
    * @instance
    * @function
    */
    stopPropagation : { value : function()
    {
        this._propagationStopped = true;
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof system.events.Event
     * @function
     * @instance
     */
    toString : { writable : true , value : function ()
    {
        return this.formatToString( null , "type", "bubbles", "cancelable");
    }},

    // ------

    /**
     * @private
     */
    withTarget : { value : function( target )
    {
        var event = this.target ? this.clone() : this ;
        event._target = target;
        return event ;
    }},

    /**
     * @private
     */
    withCurrentTarget  : { value : function( currentTarget )
    {
        this._currentTarget = currentTarget ;
        return this;
    }}
});

Object.defineProperties( Event ,
{
    /**
     * The <code>ACTIVATE</code> constant defines the value of the <code>type</code> property of an <code>activate</code> event object.
     * @name ACTIVATE
     * @memberof system.events.Event
     * @const
     * @see system.events.Event.DEACTIVATE
     */
    ACTIVATE : { value : "activate" } ,
    /**
     * The <code>Event.ADDED</code> constant defines the value of the <code>type</code> property of an <code>added</code> event object.
     * @name ADDED
     * @memberof system.events.Event
     * @const
     * @see system.events.Event.ADDED_TO_STAGE
     * @see system.events.Event.REMOVED
     * @see system.events.Event.REMOVED_FROM_STAGE
     */
    ADDED : { value : "added" } ,
    /**
     * The <code>Event.ADDED_TO_STAGE</code> constant defines the value of the <code>type</code> property of an <code>addedToStage</code> event object.
     * @name ADDED_TO_STAGE
     * @memberof system.events.Event
     * @const
     * @see system.events.Event.ADDED
     * @see system.events.Event.REMOVED
     * @see system.events.Event.REMOVED_FROM_STAGE
     */
    ADDED_TO_STAGE : { value : "addedToStage" } ,
    /**
     * The <code>Event.CANCEL</code> constant defines the value of the <code>type</code> property of a <code>cancel</code> event object.
     * @name CANCEL
     * @memberof system.events.Event
     * @const
     */
    CANCEL : { value : "cancel" } ,
    /**
     * The <code>Event.CHANGE</code> constant defines the value of the <code>type</code> property of a <code>change</code> event object.
     * @name CHANGE
     * @memberof system.events.Event
     * @const
     */
    CHANGE : { value : "change" } ,
    /**
     * The <code>Event.CLEAR</code> constant defines the value of the <code>type</code> property of a <code>clear</code> event object.
     * @name CLEAR
     * @memberof system.events.Event
     * @const
     */
    CLEAR : { value : "clear" } ,
    /**
     * The <code>Event.CLICK</code> constant defines the value of the <code>type</code> property of a <code>click</code> event object.
     * @name CLICK
     * @memberof system.events.Event
     * @const
     */
    CLICK : { value : "click" } ,
    /**
     * The <code>Event.CLOSE</code> constant defines the value of the <code>type</code> property of a <code>close</code> event object.
     * @name CLOSE
     * @memberof system.events.Event
     * @const
     */
    CLOSE : { value : "close" } ,
    /**
     * The <code>Event.COMPLETE</code> constant defines the value of the <code>type</code> property of a <code>complete</code> event object.
     * @name COMPLETE
     * @memberof system.events.Event
     * @const
     */
    COMPLETE : { value : "complete" } ,
    /**
     * The <code>Event.CONNECT</code> constant defines the value of the <code>type</code> property of a <code>connect</code> event object.
     * @name CONNECT
     * @memberof system.events.Event
     * @const
     */
    CONNECT : { value : "connect" } ,
    /**
     * The <code>Event.COPY</code> constant defines the value of the <code>type</code> property of a <code>copy</code> event object.
     * @name COPY
     * @memberof system.events.Event
     * @const
     */
    COPY : { value : "copy" } ,
    /**
     * The <code>Event.CUT</code> constant defines the value of the <code>type</code> property of a <code>cut</code> event object.
     * @name CUT
     * @memberof system.events.Event
     * @const
     */
    CUT : { value : "cut" } ,
    /**
     * The <code>Event.DEACTIVATE</code> constant defines the value of the <code>type</code> property of a <code>deactivate</code> event object.
     * @name DEACTIVATE
     * @memberof system.events.Event
     * @const
     * @see system.events.Event.ACTIVATE
     */
    DEACTIVATE : { value : "deactivate" } ,
    /**
     * The <code>Event.FULLSCREEN</code> constant defines the value of the <code>type</code> property of a <code>fullScreen</code> event object.
     * @name FULLSCREEN
     * @memberof system.events.Event
     * @const
     */
    FULLSCREEN : { value : "fullScreen" } ,
    /**
     * The <code>Event.INIT</code> constant defines the value of the <code>type</code> property of an <code>init</code> event object.
     * @name INIT
     * @memberof system.events.Event
     * @const
     */
    INIT : { value : "init" } ,
    /**
     * The <code>Event.OPEN</code> constant defines the value of the <code>type</code> property of an <code>open</code> event object.
     * @name OPEN
     * @memberof system.events.Event
     * @const
     */
    OPEN : { value : "open" } ,
    /**
     * The <code>Event.PASTE</code> constant defines the value of the <code>type</code> property of a <code>paste</code> event object.
     * @name PASTE
     * @memberof system.events.Event
     * @const
     */
    PASTE : { value : "paste" } ,
    /**
     * The <code>Event.REMOVED</code> constant defines the value of the <code>type</code> property of a <code>removed</code> event object.
     * @name REMOVED
     * @memberof system.events.Event
     * @const
     * @see system.events.Event.ADDED
     * @see system.events.Event.ADDED_TO_STAGE
     * @see system.events.Event.REMOVED_FROM_STAGE
     */
    REMOVED : { value : "removed" } ,
    /**
     * The <code>Event.REMOVED_FROM_STAGE</code> constant defines the value of the <code>type</code> property of a <code>removedFromStage</code> event object.
     * @name REMOVED_FROM_STAGE
     * @memberof system.events.Event
     * @const
     * @see system.events.Event.ADDED
     * @see system.events.Event.REMOVED
     * @see system.events.Event.ADDED_TO_STAGE
     */
    REMOVED_FROM_STAGE : { value : "removedFromStage" } ,
    /**
     * The <code>Event.RENDER</code> constant defines the value of the <code>type</code> property of a <code>render</code> event object.
     * @name RENDER
     * @memberof system.events.Event
     * @const
     */
    RENDER : { value : "render" } ,
    /**
     * The <code>Event.RESIZE</code> constant defines the value of the <code>type</code> property of a <code>resize</code> event object.
     * @name RESIZE
     * @memberof system.events.Event
     * @const
     */
    RESIZE : { value : "resize" } ,
    /**
     * The <code>Event.SCROLL</code> constant defines the value of the <code>type</code> property of a <code>scroll</code> event object.
     * @name SCROLL
     * @memberof system.events.Event
     * @const
     */
    SCROLL : { value : "scroll" } ,
    /**
     * The <code>Event.SELECT</code> constant defines the value of the <code>type</code> property of a <code>select</code> event object.
     * @name SELECT
     * @memberof system.events.Event
     * @const
     */
    SELECT : { value : "select" } ,
    /**
     * The <code>Event.UNLOAD</code> constant defines the value of the <code>type</code> property of a <code>unload</code> event object.
     * @name UNLOAD
     * @memberof system.events.Event
     * @const
     */
   UNLOAD : { value : "unload" }
 });