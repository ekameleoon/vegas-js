"use strict" ;

import { ObjectOrder } from './ObjectOrder.js' ;

/**
 * This object defines a listener definition in an object definition.
 * @name ObjectListener
 * @class
 * @memberof system.ioc
 * @param {string} dispatcher - The dispatcher expression reference of the listener.
 * @param {string} type - The type name of the event dispatched by the dispatcher of this listener.
 * @param {string} [method=null] - The name of the method to invoke when the event is handle.
 * @param {boolean} [useCapture=false] -  Determinates if the event flow use capture or not.
 * @param {string} [order=after] Indicates the order to register the listener "after" or "before" (see the system.ioc.ObjectOrder enumeration class).
 */
export function ObjectListener( dispatcher , type , method = null , useCapture = false, order = "after" )
{
    Object.defineProperties( this ,
    {
        /**
         * The dispatcher expression reference of the listener.
         * @name dispatcher
         * @memberof system.ioc.ObjectListener
         * @instance
         */
        dispatcher : { value : dispatcher , writable : true } ,

        /**
         * The <b>name</b> of the method to invoke when the event is handle.
         * @name method
         * @memberof system.ioc.ObjectListener
         * @instance
         */
        method : { value : method , writable : true } ,

        /**
         * Determinates the <code>order</code> of the receiver registration (<code>'after'</code> or by default <code>'before'</code>).
         * @name order
         * @memberof system.ioc.ObjectListener
         * @instance
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
         * The type name of the event dispatched by the dispatcher.
         * @name type
         * @memberof system.ioc.ObjectListener
         * @instance
         */
        type : { value : type , writable : true } ,

        /**
         * Determinates if the event flow use capture or not.
         * @name useCapture
         * @memberof system.ioc.ObjectListener
         * @instance
         * @type boolean
         */
        useCapture : { value : Boolean(useCapture) , writable : true } ,

        /**
         * @private
         */
        _order : { value : ( order === ObjectOrder.BEFORE ) ? ObjectOrder.BEFORE : ObjectOrder.AFTER  , writable : true }
    }) ;
}

Object.defineProperties(  ObjectListener ,
{
    /**
     * Defines the "dispatcher" attribute in a listener object definition.
     * @memberof system.ioc.ObjectListener
     * @type string
     * @default dispatcher
     */
    DISPATCHER : { value : "dispatcher" , enumerable : true } ,

    /**
     * Defines the "method" attribute in a listener object definition.
     * @memberof system.ioc.ObjectListener
     * @type string
     * @default method
     */
    METHOD : { value : "method" , enumerable : true } ,

    /**
     * Defines the "order" attribute in a listener object definition.
     * @memberof system.ioc.ObjectListener
     * @type string
     * @default order
     */
    ORDER : { value : "order" , enumerable : true } ,

    /**
     * Defines the "useCapture" attribute in a listener object definition.
     * @memberof system.ioc.ObjectListener
     * @type string
     * @default useCapture
     */
    USE_CAPTURE : { value : "useCapture" , enumerable : true } ,

    /**
     * Defines the "type" attribute in a listener object definition.
     * @memberof system.ioc.ObjectListener
     * @type string
     * @default type
     */
    TYPE : { value : "type" , enumerable : true }
});

ObjectListener.prototype = Object.create( Object.prototype ,
{
    constructor : { value :  ObjectListener } ,

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof system.ioc.ObjectListener
     * @instance
     * @function
     */
    toString : { value : function ()
    {
        var s = '[ObjectListener' ;
        if ( this.signal )
        {
           s += ' dispatcher:"' + this.dispatcher + '"' ;
        }
        if ( this.slot )
        {
           s += ' type:"' + this.type + '"' ;
        }
        if ( this.method )
        {
            s += ' method:"' + this.method + '"' ;
        }
        if ( this._order )
        {
            s += ' order:"' + this._order + '"' ;
        }
        s += ']' ;
        return s ;
    }}
}) ;