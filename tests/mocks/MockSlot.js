'use strict'

import { Receiver }     from "../../src/system/signals/Receiver.js" ;


export function MockSlot()
{
    Receiver.call( this );

    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _received : { value : false , writable : true },

        /**
         * @private
         */
        _values : { value : null , writable : true }

    });
}

MockSlot.prototype = Object.create( Receiver.prototype ,
{
    constructor : { writable : true , value : MockSlot } ,

    getValues : { value : function()
    {
        return this._values;
    }},

    isReceived : { value : function ()
    {
        return this._received;
    }},

    receive : { value : function ( values )
    {
        this._received = true ;
        this._values   = values ;
    }},

    reset : { value : function ()
    {
        this._received = false ;
        this._values   = null ;
    }}
});
