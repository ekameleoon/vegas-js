/* jshint unused:false */
"use strict" ;

/**
 * The <code>IEventDispatcher</code> interface defines methods for adding or removing event listeners, checks whether specific types of event listeners are registered, and dispatches events.
 * <p>In general, the easiest way for a user-defined class to gain event dispatching capabilities is to extend <code>EventDispatcher</code>. If this is impossible (that is, if the class is already extending another class), you can instead implement the IEventDispatcher interface, create an <code>EventDispatcher</code> member, and write simple hooks to route calls into the aggregated <code>EventDispatcher</code>.</p>
 * @name IEventDispatcher
 * @memberof system.events
 * @interface
 */
export function IEventDispatcher() {}

IEventDispatcher.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : IEventDispatcher },

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
     * @param {function} listener - The listener function that processes the event. This function must accept an event object as its only parameter and must return nothing, as this example shows:
     * <p><code>function(evt)</code></p>The function can have any name.
     * @param {boolean} [useCapture=false] - Determines whether the listener works in the capture phase or the target and bubbling phases. If <code>useCapture</code> is set to <code>true</code>, the listener processes the event only during the capture phase and not in the target or bubbling phase. If <code>useCapture</code> is <code>false</code>, the listener processes the event only during the target or bubbling phase. To listen for the event in all three phases, call <code>addEventListener()</code> twice, once with <code>useCapture</code> set to <code>true</code>, then again with <code>useCapture</code> set to <code>false</code>.
     * @param {number} [priority=0] - The priority level of the event listener. Priorities are designated by a 32-bit integer. The higher the number, the higher the priority. All listeners with priority <i>n</i> are processed before listeners of priority <i>n-1</i>. If two or more listeners share the same priority, they are processed in the order in which they were added. The default priority is 0.
     * @param {boolean} [useWeakReference=false] - Determines whether the reference to the listener is strong or weak. A strong reference (the default) prevents your listener from being garbage-collected. A weak reference does not.
     * <p>Class-level member functions are not subject to garbage collection, so you can set <code>useWeakReference</code> to <code>true</code> for class-level member functions without subjecting them to garbage collection. If you set <code>useWeakReference</code> to <code>true</code> for a listener that is a nested inner function, the function will be garbge-collected and no longer persistent. If you create references to the inner function (save it in another variable) then it is not garbage-collected and stays persistent.</p>
     * @name addEventListener
     * @memberof system.events.IEventDispatcher
     * @function
     * @instance
     */
    addEventListener : { writable : true , value : function( type, listener, useCapture = false, priority = 0, useWeakReference = false ) {} },

    /**
     * Dispatches an event into the event flow. The event target is the EventDispatcher object upon which <code>dispatchEvent()</code> is called.
     * @param {system.event.Event} event - The event object dispatched into the event flow.
     * @return A value of <code>true</code> unless <code>preventDefault()</code> is called on the event, in which case it returns <code>false</code>.
     * @name dispatchEvent
     * @memberof system.events.IEventDispatcher
     * @function
     * @instance
     */
    dispatchEvent : { writable : true , value : function( event ) {} },

    /**
     * Checks whether the EventDispatcher object has any listeners registered for a specific type of event. This allows you to determine where an EventDispatcher object has altered handling of an event type in the event flow hierarchy. To determine whether a specific event type will actually trigger an event listener, use <code>IEventDispatcher.willTrigger()</code>.
     * <p>The difference between <code>hasEventListener()</code> and <code>willTrigger()</code> is that <code>hasEventListener()</code> examines only the object to which it belongs, whereas <code>willTrigger()</code> examines the entire event flow for the event specified by the <code>type</code> parameter.</p>
     * @param {string} type - The type of event.
     * @return A value of <code>true</code> if a listener of the specified type is registered; <code>false</code> otherwise.
     * @name hasEventListener
     * @memberof system.events.IEventDispatcher
     * @function
     * @instance
     */
    hasEventListener : { writable : true , value : function( type ) {} },

    /**
     * Removes a listener from the EventDispatcher object. If there is no matching listener registered with the EventDispatcher object, a call to this method has no effect.
     * @param {string} type - The type of event.
     * @param {function} listener - listener The listener object to remove.
     * @param {boolean} [useCapture=false] - Specifies whether the listener was registered for the capture phase or the target and bubbling phases. If the listener was registered for both the capture phase and the target and bubbling phases, two calls to <code>removeEventListener()</code> are required to remove both: one call with <code>useCapture</code> set to <code>true</code>, and another call with <code>useCapture</code> set to <code>false</code>.
     * @name removeEventListener
     * @memberof system.events.IEventDispatcher
     * @function
     * @instance
     */
    removeEventListener : { writable : true , value : function( type, listener, useCapture = false ) {} },

    /**
     * Checks whether an event listener is registered with this EventDispatcher object or any of its ancestors for the specified event type. This method returns <code>true</code> if an event listener is triggered during any phase of the event flow when an event of the specified type is dispatched to this EventDispatcher object or any of its descendants.
     * <p>The difference between <code>hasEventListener()</code> and <code>willTrigger()</code> is that <code>hasEventListener()</code> examines only the object to which it belongs, whereas <code>willTrigger()</code> examines the entire event flow for the event specified by the <code>type</code> parameter.</p>
     * @param {string} type - The type of event.
     * @return A value of <code>true</code> if a listener of the specified type will be triggered; <code>false</code> otherwise.
     * @name willTrigger
     * @memberof system.events.IEventDispatcher
     * @function
     * @instance
     */
    willTrigger : { writable : true , value : function( type ) {} }
});