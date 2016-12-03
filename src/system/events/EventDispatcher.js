/* jshint unused:false */
"use strict" ;

import { Event } from './Event.js' ;
import { EventListener } from './EventListener.js' ;
import { EventPhase } from './EventPhase.js' ;
import { IEventDispatcher } from './IEventDispatcher.js' ;

/**
 * The EventDispatcher class is the base class for all classes that dispatch events. The EventDispatcher class implements the IEventDispatcher interface and is the base class for the DisplayObject class. The EventDispatcher class allows any object on the display list to be an event target and as such, to use the methods of the IEventDispatcher interface.
 * @name EventDispatcher
 * @class
 * @memberof system.events
 * @implements system.events.IEventDispatcher
 * @param {system.events.IEventDispatcher} target - The target object for events dispatched to the EventDispatcher object. This parameter is used when the EventDispatcher instance is aggregated by a class that implements IEventDispatcher; it is necessary so that the containing object can be the target for events. Do not use this parameter in simple cases in which a class extends EventDispatcher.
 * @example
 * var Click = function( name )
 * {
 *     this.name = name ;
 * }
 *
 * Click.prototype = Object.create( EventListener.prototype ,
 * {
 *     constructor : { value : Click } ,
 *     handleEvent : { value : function( event )
 *     {
 *         trace( this + ' ' + this.name + ' event:' + event ) ;
 *     }}
 * });
 *
 * var click1 = new Click( '#1') ;
 * var click2 = new Click( '#2') ;
 *
 * // ------
 *
 * var select = function( event )
 * {
 *     trace( "select event:" + event ) ;
 * };
 *
 * // ------
 *
 * var dispatcher = new EventDispatcher() ;
 *
 * dispatcher.addEventListener( Event.CLICK , click1 ) ;
 * dispatcher.addEventListener( Event.CLICK , click2 ) ;
 * dispatcher.addEventListener( Event.CLICK , select , false , 100 ) ;
 *
 * // ------
 *
 * dispatcher.dispatchEvent( new Event( Event.CLICK ) ) ;
 *
 * // ------
 *
 * dispatcher.removeEventListener( Event.CLICK , click2 ) ;
 * dispatcher.removeEventListener( Event.CLICK , select ) ;
 *
 * // ------
 *
 * dispatcher.dispatchEvent( new Event( Event.CLICK ) ) ;
 */
export function EventDispatcher( target )
{
    Object.defineProperties( this ,
    {
        target            : { writable : true , value : target instanceof IEventDispatcher ? target : null } ,
        _captureListeners : { value : {} } ,
        _listeners        : { value : {} }
    });
}

EventDispatcher.prototype = Object.create( IEventDispatcher.prototype ,
{
    /**
     * @private
     */
    constructor : { writable : true , value : EventDispatcher },

    /**
     * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event. You can register event listeners on all nodes in the display list for a specific type of event, phase, and priority.
     * <p>After you successfully register an event listener, you cannot change its priority through additional calls to <code>addEventListener()</code>. To change a listener's priority, you must first call <code>removeEventListener()</code>. Then you can register the listener again with the new priority level.</p>
     * <p>After the listener is registered, subsequent calls to <code>addEventListener()</code> with a different value for either <code>type</code> or <code>useCapture</code> result in the creation of a separate listener registration. For example, if you first register a listener with <code>useCapture</code> set to <code>true</code>, it listens only during the capture phase. If you call <code>addEventListener()</code> again using the same listener object, but with <code>useCapture</code> set to <code>false</code>, you have two separate listeners: one that listens during the capture phase, and another that listens during the target and bubbling phases.</p>
     * <p>You cannot register an event listener for only the target phase or the bubbling phase. Those phases are coupled during registration because bubbling applies only to the ancestors of the target node.</p>
     * <p>When you no longer need an event listener, remove it by calling <code>EventDispatcher.removeEventListener()</code>; otherwise, memory problems might result. Objects with registered event listeners are not automatically removed from memory because the garbage collector does not remove objects that still have references.</p>
     * <p>Copying an EventDispatcher instance does not copy the event listeners attached to it. (If your newly created node needs an event listener, you must attach the listener after creating the node.) However, if you move an EventDispatcher instance, the event listeners attached to it move along with it.</p>
     * <p>If the event listener is being registered on a node while an event is also being processed on this node, the event listener is not triggered during the current phase but may be triggered during a later phase in the event flow, such as the bubbling phase.</p>
     * <p>If an event listener is removed from a node while an event is being processed on the node, it is still triggered by the current actions. After it is removed, the event listener is never invoked again (unless it is registered again for future processing).</p>
     * @param {string} type - The type of event.
     * @param {function|system.events.EventListener} listener - The listener function that processes the event. This function must accept an event object as its only parameter and must return nothing, as this example shows:
     * <p><code>function(evt)</code></p>The function can have any name.
     * @param {boolean} [useCapture=false] - Determines whether the listener works in the capture phase or the target and bubbling phases. If <code>useCapture</code> is set to <code>true</code>, the listener processes the event only during the capture phase and not in the target or bubbling phase. If <code>useCapture</code> is <code>false</code>, the listener processes the event only during the target or bubbling phase. To listen for the event in all three phases, call <code>addEventListener()</code> twice, once with <code>useCapture</code> set to <code>true</code>, then again with <code>useCapture</code> set to <code>false</code>.
     * @param {number} [priority=0] - The priority level of the event listener. Priorities are designated by a 32-bit integer. The higher the number, the higher the priority. All listeners with priority <i>n</i> are processed before listeners of priority <i>n-1</i>. If two or more listeners share the same priority, they are processed in the order in which they were added. The default priority is 0.
     * @name addEventListener
     * @memberof system.events.EventDispatcher
     * @function
     * @instance
     */
    addEventListener : { writable : true , value : function( type, listener, useCapture = false, priority = 0 )
    {
        if( !( type instanceof String || typeof(type) === 'string') )
        {
            throw new TypeError( this + " addEventListener failed, the type argument must be a valid String expression." ) ;
        }

        if( !( listener instanceof Function || listener instanceof EventListener ) )
        {
            throw new TypeError( this + " addEventListener failed, the listener must be a valid Function or EventListener reference." ) ;
        }

        let collection = useCapture ? this._captureListeners : this._listeners ;

        let entry =
        {
            type       : type,
            listener   : listener ,
            useCapture : useCapture,
            priority   : priority
        };

        if ( !(type in collection) )
        {
            collection[type] = [ entry ];
        }
        else
        {
            collection[type].push( entry );
        }

        collection[type].sort( this.compare );
    } },

    /**
     * Dispatches an event into the event flow. The event target is the EventDispatcher object upon which <code>dispatchEvent()</code> is called.
     * @param {system.event.Event} event - The event object dispatched into the event flow.
     * @return A value of <code>true</code> unless <code>preventDefault()</code> is called on the event, in which case it returns <code>false</code>.
     * @name dispatchEvent
     * @memberof system.events.EventDispatcher
     * @function
     * @instance
     */
    dispatchEvent : { writable : true , value : function( event )
    {
        if( !( event instanceof Event ) )
        {
            throw new TypeError( this + " dispatchEvent failed, the event argument must be a valid Event object." ) ;
        }

        event = event.withTarget( this.target || this );

        let ancestors = this.createAncestorChain();

        event._eventPhase = EventPhase.CAPTURING_PHASE ;

        EventDispatcher.internalHandleCapture( event , ancestors );

        if ( !event.isPropagationStopped() )
        {
            event._eventPhase = EventPhase.AT_TARGET;
            event.withCurrentTarget( event._target );
            let listeners = this._listeners[ event.type ];
            if (this._listeners[ event.type ])
            {
                EventDispatcher.processListeners( event, listeners );
            }
        }

        if ( event.bubbles && !event.isPropagationStopped() )
        {
            event._eventPhase = EventPhase.BUBBLING_PHASE;
            EventDispatcher.internalHandleBubble( event , ancestors ) ;
        }

        return !event.isDefaultPrevented();
    }},

    /**
     * Checks whether the EventDispatcher object has any listeners registered for a specific type of event. This allows you to determine where an EventDispatcher object has altered handling of an event type in the event flow hierarchy. To determine whether a specific event type will actually trigger an event listener, use <code>IEventDispatcher.willTrigger()</code>.
     * <p>The difference between <code>hasEventListener()</code> and <code>willTrigger()</code> is that <code>hasEventListener()</code> examines only the object to which it belongs, whereas <code>willTrigger()</code> examines the entire event flow for the event specified by the <code>type</code> parameter.</p>
     * @param {string} type - The type of event.
     * @return A value of <code>true</code> if a listener of the specified type is registered; <code>false</code> otherwise.
     * @name hasEventListener
     * @memberof system.events.EventDispatcher
     * @function
     * @instance
     */
    hasEventListener : { writable : true , value : function( type )
    {
        return Boolean(this._listeners[type] || this._captureListeners[type]) ;
    }},

    /**
     * Removes a listener from the EventDispatcher object. If there is no matching listener registered with the EventDispatcher object, a call to this method has no effect.
     * @param {string} type - The type of event.
     * @param {function} listener - listener The listener object to remove.
     * @param {boolean} [useCapture=false] - Specifies whether the listener was registered for the capture phase or the target and bubbling phases. If the listener was registered for both the capture phase and the target and bubbling phases, two calls to <code>removeEventListener()</code> are required to remove both: one call with <code>useCapture</code> set to <code>true</code>, and another call with <code>useCapture</code> set to <code>false</code>.
     * @name removeEventListener
     * @memberof system.events.EventDispatcher
     * @function
     * @instance
     */
    removeEventListener : { writable : true , value : function( type , listener, useCapture = false )
    {
        if( !( type instanceof String || typeof(type) === 'string') )
        {
            throw new TypeError( this + " removeEventListener failed, the type must be a valid String expression." ) ;
        }

        if( !( listener instanceof Function || listener instanceof EventListener ) )
        {
            throw new TypeError( this + " removeEventListener failed, the listener must be a valid Function or EventListener reference." ) ;
        }

        let collection = useCapture ? this._captureListeners : this._listeners ;
        let listeners  = collection[type];
        if ( listeners && listeners.length > 0 )
        {
            let len = listeners.length ;
            for ( let i = 0 ; i < len ; ++i )
            {
                if ( listeners[i].listener === listener )
                {
                    if ( len === 1 )
                    {
                        delete collection[type] ;
                    }
                    else
                    {
                        listeners.splice(i, 1);
                    }
                    break;
                }
            }
        }
    }},

    /**
     * The string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof system.events.EventDispatcher
     * @function
     * @instance
     */
    toString : { writable : true , value : function ()
    {
        var exp = '[' + this.constructor.name ;
        if( this.target )
        {
            exp += ' target:' + this.target ;
        }
        return exp + ']' ;
    }},

    /**
     * Checks whether an event listener is registered with this EventDispatcher object or any of its ancestors for the specified event type. This method returns <code>true</code> if an event listener is triggered during any phase of the event flow when an event of the specified type is dispatched to this EventDispatcher object or any of its descendants.
     * <p>The difference between <code>hasEventListener()</code> and <code>willTrigger()</code> is that <code>hasEventListener()</code> examines only the object to which it belongs, whereas <code>willTrigger()</code> examines the entire event flow for the event specified by the <code>type</code> parameter.</p>
     * @param {string} type - The type of event.
     * @return A value of <code>true</code> if a listener of the specified type will be triggered; <code>false</code> otherwise.
     * @name willTrigger
     * @memberof system.events.EventDispatcher
     * @function
     * @instance
     */
    willTrigger : { writable : true , value : function( type )
    {
        let parents = this.createAncestorChain();
        if( (parents instanceof Array) && parents.length > 0 )
        {
            let parent ;
            let len = parents.length ;
            while( --len > -1 )
            {
                parent = parents[len] ;
                if( (parent instanceof IEventDispatcher) && parent.hasEventListener( type ) )
                {
                    return true;
                }
            }
        }
        return this.hasEventListener(type);
    }} ,

    // -------------

    /**
     * @private
     * @name createAncestorChain
     * @memberof system.events.EventDispatcher
     * @function
     * @instance
     */
    createAncestorChain : { writable : true , value : function()
    {
        return null; // overrides
    }},

    // -------------

    /**
     * @private
     * @name compare
     * @memberof system.events.EventDispatcher
     * @function
     * @instance
     */
    compare : { value : function( entry1 , entry2 )
    {
        if ( entry1.priority > entry2.priority )
        {
            return -1;
        }
        else if ( entry1.priority < entry2.priority )
        {
            return 1;
        }
        else
        {
            return 0 ;
        }
    }},

    /**
     * @private
     * @name processCapture
     * @memberof system.events.EventDispatcher
     * @function
     * @instance
     */
    processCapture : { value : function( event )
    {
        event.withCurrentTarget( this.target || this ) ;
        let listeners = this._captureListeners[ event.type ];
        if ( listeners )
        {
            EventDispatcher.processListeners( event , listeners );
        }
    }},

    /**
     * @private
     * @name processBubble
     * @memberof system.events.EventDispatcher
     * @function
     * @instance
     */
    processBubble : { value : function( event )
    {
        event.withCurrentTarget( this.target || this );
        var listeners = this._listeners[ event.type ];
        if ( listeners )
        {
            EventDispatcher.processListeners( event, listeners ) ;
        }
    }}
});

Object.defineProperties( EventDispatcher ,
{
    processListeners : { value : function ( event , listeners )
    {
        if( listeners instanceof Array && listeners.length > 0 )
        {
            let len = listeners.length ;
            let listener ;
            for ( let i = 0 ; i < len ; ++i )
            {
                listener = listeners[i].listener ;

                let flag ;

                if( listener instanceof EventListener )
                {
                    flag = listener.handleEvent(event) ;
                }
                else
                {
                    flag = listener(event) ;
                }

                if( flag === false )
                {
                    event.stopPropagation();
                    event.preventDefault();
                }

                if ( event.isImmediatePropagationStopped() )
                {
                    break;
                }
            }
        }
    }},

    internalHandleCapture : { value : function( event , ancestors )
    {
        if ( !(ancestors instanceof Array) || ancestors.length <= 0 )
        {
            return ;
        }
        let dispatcher ;
        let len = ancestors.length - 1
        for ( let i = len ; i >= 0 ; i-- )
        {
            dispatcher = ancestors[i] ;
            dispatcher.processCapture( event );
            if ( event.isPropagationStopped() )
            {
                break ;
            }
        }
    }},

    internalHandleBubble : { value : function( event , ancestors )
    {
        if (!ancestors || ancestors.length <= 0)
        {
            return;
        }
        let dispatcher ;
        let len = ancestors.length ;
        for ( let i = 0; i < len ; i++)
        {
            dispatcher = ancestors[i];
            dispatcher.processBubble( event ) ;
            if ( event.isPropagationStopped() )
            {
                break;
            }
        }
    }}
});