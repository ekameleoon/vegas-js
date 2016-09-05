"use strict" ;

/**
 * Enumeration of all sort of "orders" can be use in the object definitions.
 */
export var ObjectOrder = Object.defineProperties( {} ,
{
    /**
     * The "after" order value.
     */
    AFTER : { value : "after" , enumerable : true },

    /**
     * The "before" order value.
     */
    BEFORE : { value : "before" , enumerable : true },

    /**
     * The "none" order value.
     */
    NONE : { value : "none" , enumerable : true },

    /**
     * The "now" order value.
     */
    NOW : { value : "now" , enumerable : true }
});