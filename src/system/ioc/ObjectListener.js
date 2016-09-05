"use strict" ;

import { ObjectOrder } from './ObjectOrder.js' ;

/**
 * This object defines a listener definition in an object definition.
 * @param dispatcher The dispatcher expression reference of the listener.
 * @param type type name of the event dispatched by the dispatcher of this listener.
 * @param method The name of the method to invoke when the event is handle.
 * @param useCapture Determinates if the event flow use capture or not.
 * @param order Indicates the order to register the listener "after" or "before" (see the system.ioc.ObjectOrder enumeration class).
 */
export function ObjectListener( dispatcher /*String*/ , type /*String*/ , method /*Boolean*/ = null , useCapture /*Boolean*/ = false, order /*String*/ = "after" )
{
    Object.defineProperties( this ,
    {
        /**
         * The dispatcher expression reference of the listener.
         */
        dispatcher : { value : dispatcher , writable : true } ,

        /**
         * The name of the method to invoke when the event is handle.
         */
        method : { value : method , writable : true } ,

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
         * The type name of the event dispatched by the dispatcher.
         */
        type : { value : type , writable : true } ,

        /**
         * Determinates if the event flow use capture or not.
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
     */
    DISPATCHER : { value : "dispatcher" , enumerable : true } ,

    /**
     * Defines the "method" attribute in a listener object definition.
     */
    METHOD : { value : "method" , enumerable : true } ,

    /**
     * Defines the "order" attribute in a listener object definition.
     */
    ORDER : { value : "order" , enumerable : true } ,

    /**
     * Defines the "useCapture" attribute in a listener object definition.
     */
    USE_CAPTURE : { value : "useCapture" , enumerable : true } ,

    /**
     * Defines the "type" attribute in a listener object definition.
     */
    TYPE : { value : "type" , enumerable : true }
});

/**
 * @extends Object
 */
 ObjectListener.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value :  ObjectListener },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
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