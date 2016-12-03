"use strict" ;

/**
 * The <code>EventPhase</code> class provides values for the <code>eventPhase</code> property of the {@link system.events.Event} class.
 * @namespace system.events.EventPhase
 * @memberof system.events
 */
export var EventPhase = Object.defineProperties( {} ,
{
    /**
     * The target phase, which is the second phase of the event flow.
     * @memberof system.events.EventPhase
     * @const
     * @type {number}
     */
    AT_TARGET : { value : 2 , enumerable : true } ,

    /**
     * The bubbling phase, which is the third phase of the event flow.
     * @memberof system.events.EventPhase
     * @const
     * @type {number}
     */
    BUBBLING_PHASE : { value : 3 , enumerable : true } ,

    /**
     * The capturing phase, which is the first phase of the event flow.
     * @memberof system.events.EventPhase
     * @const
     * @type {number}
     */
    CAPTURING_PHASE : { value : 1 , enumerable : true } ,

    /**
     * No event is being processed at this time.
     * @memberof system.events.EventPhase
     * @const
     * @type {number}
     */
    NONE : { value : 0 , enumerable : true }
}) ;

