"use strict" ;

import { ObjectOrder } from './ObjectOrder.js' ;

/**
 * This object defines a receiver definition in an object definition.
 * @param signal The id of the signal in the IoC factory.
 * @param slot The id of the receiver of function to connect in the IoC factory.
 * @param priority Determines the priority level of the receiver.
 * @param autoDisconnect Indicate if the receiver is auto disconnect in the signal when is used.
 * @param order Indicates the order to connect the receiver "after" or "before" (see the system.ioc.ObjectOrder enumeration class).
 */
export function ObjectReceiver( signal /*String*/ , slot /*String*/ = null , priority /*int*/ = 0 , autoDisconnect /*Boolean*/ = false , order /*String*/ = "after" )
{
    Object.defineProperties( this ,
    {
        /**
         * Indicates if the receiver (slot) is auto disconnect by the signal.
         */
        autoDisconnect : { value : autoDisconnect , writable : true } ,

        /**
         * Determinates the order of the receiver registration ('after' or by default 'before').
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
         */
        priority : { value : priority , writable : true } ,

        /**
         * The identifier of the signal to connect in the IoC factory.
         */
        signal : { value : signal , writable : true } ,

        /**
         * The identifier of the receiver of function to connect in the IoC factory.
         */
        slot : { value : slot , writable : true } ,

        /**
         * @private
         */
        _order : { value : ( order === ObjectOrder.BEFORE ) ? ObjectOrder.BEFORE : ObjectOrder.AFTER  , writable : true }
    }) ;
}

Object.defineProperties( ObjectReceiver ,
{
    /**
     * Defines the "autoDisconnect" attribute in a receiver object definition.
     */
    AUTO_DISCONNECT : { value : "autoDisconnect" , enumerable : true } ,

    /**
     * Defines the "order" attribute in a receiver object definition.
     */
    ORDER : { value : "order" , enumerable : true } ,

    /**
     * Defines the "priority" attribute in a receiver object definition.
     */
    PRIORITY : { value : "priority" , enumerable : true } ,

    /**
     * Defines the "signal" attribute in a receiver object definition.
     */
    SIGNAL : { value : "signal" , enumerable : true } ,

    /**
     * Defines the "slot" attribute in a receiver object definition.
     */
    SLOT : { value : "slot" , enumerable : true }
});

/**
 * @extends Object
 */
ObjectReceiver.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : ObjectReceiver },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function ()
    {
        var s = '[ObjectReceiver' ;
        if ( this.signal )
        {
           s += ' signal:"' + this.signal + '"' ;
        }
        if ( this.slot )
        {
           s += ' slot:"' + this.slot + '"' ;
        }
        if ( this._order )
        {
            s += ' order:"' + this._order + '"' ;
        }
        s += ']' ;
        return s ;
    }}
}) ;