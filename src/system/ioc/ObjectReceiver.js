"use strict" ;

import { ObjectOrder } from './ObjectOrder.js' ;

/**
 * This object defines a receiver definition in an object definition.
 * @name ObjectReceiver
 * @class
 * @memberof system.ioc
 * @param {string} signal - The <code>id</code> of the signal in the <b>IoC factory</b>.
 * @param {string} slot - The <code>id</code> of the receiver of function to connect in the <b>IoC factory</b>.
 * @param {number} [priority=0] - Determines the priority level of the receiver.
 * @param {boolean} [autoDisconnect=false] - Indicate if the receiver is auto disconnect in the signal when is used.
 * @param {string} [order=after] - Indicates the order to connect the receiver "after" or "before" (see the system.ioc.ObjectOrder enumeration class).
 */
export function ObjectReceiver( signal , slot = null , priority = 0 , autoDisconnect = false , order = "after" )
{
    Object.defineProperties( this ,
    {
        /**
         * Indicates if the receiver (slot) is auto disconnect by the signal.
         * @name autoDisconnect
         * @memberof system.ioc.ObjectReceiver
         * @instance
         * @type boolean
         * @default false
         */
        autoDisconnect : { value : autoDisconnect , writable : true } ,

        /**
         * Determinates the order of the receiver registration ('after' or by default 'before').
         * @name order
         * @memberof system.ioc.ObjectReceiver
         * @instance
         * @type string
         * @default after
         */
        order :
        {
            get : function() { return this._order ; } ,
            set : function( value )
            {
                this._order = ( value === ObjectOrder.BEFORE ) ? ObjectOrder.BEFORE : ObjectOrder.AFTER ;
            }
        },

        /**
         * Determines the priority level of the signal connection.
         * @name priority
         * @memberof system.ioc.ObjectReceiver
         * @instance
         * @type number
         * @default 0
         */
        priority : { value : priority , writable : true } ,

        /**
         * The identifier of the signal to connect in the <b>IoC factory</b>.
         * @name signal
         * @memberof system.ioc.ObjectReceiver
         * @instance
         * @type string
         */
        signal : { value : signal , writable : true } ,

        /**
         * The identifier of the receiver of function to connect in the <b>IoC factory</b>.
         * @name slot
         * @memberof system.ioc.ObjectReceiver
         * @instance
         * @type string
         */
        slot : { value : slot , writable : true } ,

        /**
         * @private
         */
        _order : { value : ( order === ObjectOrder.BEFORE ) ? ObjectOrder.BEFORE : ObjectOrder.AFTER  , writable : true }
    }) ;
}

ObjectReceiver.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ObjectReceiver },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @memberof system.ioc.ObjectReceiver
     * @function
     * @instance
     */
    toString : { value : function () { return '[ObjectReceiver]' ; }}
});

Object.defineProperties( ObjectReceiver ,
{
    /**
     * Defines the <code>"autoDisconnect"</code> attribute in a receiver object definition.
     * @memberof system.ioc.ObjectReceiver
     * @type {string}
     * @default autoDisconnect
     * @const
     */
    AUTO_DISCONNECT : { value : "autoDisconnect" , enumerable : true } ,

    /**
     * Defines the <code>"order" attribute in a receiver object definition.
     * @memberof system.ioc.ObjectReceiver
     * @type {string}
     * @default order
     * @const
     */
    ORDER : { value : "order" , enumerable : true } ,

    /**
     * Defines the <code>"priority"</code> attribute in a receiver object definition.
     * @memberof system.ioc.ObjectReceiver
     * @type {string}
     * @default priority
     * @const
     */
    PRIORITY : { value : "priority" , enumerable : true } ,

    /**
     * Defines the <code>"signal"</code> attribute in a receiver object definition.
     * @memberof system.ioc.ObjectReceiver
     * @type {string}
     * @default signal
     * @const
     */
    SIGNAL : { value : "signal" , enumerable : true } ,

    /**
     * Defines the <code>"slot"</code> attribute in a receiver object definition.
     * @memberof system.ioc.ObjectReceiver
     * @type {string}
     * @default slot
     * @const
     */
    SLOT : { value : "slot" , enumerable : true }
});