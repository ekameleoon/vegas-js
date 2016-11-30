"use strict" ;

/**
 * Enumeration of all sorting orders used in the <b>object definitions</b>.
 * @name ObjectOrder
 * @namespace system.ioc.ObjectOrder
 * @memberof system.ioc
 */
export var ObjectOrder = Object.defineProperties( {} ,
{
    /**
     * The <code>"after"</code> order value.
     * @name AFTER
     * @memberof system.ioc.ObjectOrder
     * @type {string}
     * @default after
     * @const
     */
    AFTER : { value : "after" , enumerable : true },

    /**
     * The <code>"before"</code> order value.
     * @name BEFORE
     * @memberof system.ioc.ObjectOrder
     * @type {string}
     * @default before
     * @const
     */
    BEFORE : { value : "before" , enumerable : true },

    /**
     * The <code>"none"</code> order value.
     * @name NONE
     * @memberof system.ioc.ObjectOrder
     * @type {string}
     * @default none
     * @const
     */
    NONE : { value : "none" , enumerable : true },

    /**
     * The <code>"now"</code> order value.
     * @name NOW
     * @memberof system.ioc.ObjectOrder
     * @type {string}
     * @default now
     * @const
     */
    NOW : { value : "now" , enumerable : true }
});