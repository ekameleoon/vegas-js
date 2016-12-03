"use strict" ;

/**
 * An event listener associates a callback function with a specific event.
 * <p>The {@link system.events.EventListener} interface is the primary method for handling events. Users implement the {@link system.events.EventListener} interface and register their listener on an {@link system.events.IEventDispatcher} using the <code>addEventListener</code>. The users should also remove their {@link system.events.EventListener} from its {@link system.events.IEventDispatcher} after they have completed using the listener.</p>
 * @name EventListener
 * @interface
 * @memberof system.events
 */
export function EventListener() {}

EventListener.prototype = Object.create( Object.prototype ,
{
    /**
     * @private
     */
    constructor : { writable : true , value : EventListener } ,

    /**
     * This method is called whenever an event occurs of the type for which the EventListener interface was registered.
     * @memberof system.events.EventListener
     * @function
     */
    handleEvent : { writable : true , value : function() {} } ,

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @memberof system.events.EventListener
     * @function
     */
    toString : { writable : true , value : function ()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});

