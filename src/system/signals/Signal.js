"use strict"

import { Receiver    } from './Receiver.js' ;
import { Signaler    } from './Signaler.js' ;
import { SignalEntry } from './SignalEntry.js' ;

/**
 * Creates a new Signal instance.
 * @name Signal
 * @class
 * @implements system.signals.Signaler
 * @memberof system.signals
 * @example
 * function Slot( name )
 * {
 *     this.name = name ;
 * }
 *
 * Slot.prototype = Object.create( system.signals.Receiver.prototype );
 * Slot.prototype.constructor = Slot;
 *
 * Slot.prototype.receive = function ( message )
 * {
 *     trace( this + " : " + message ) ;
 * }
 *
 * Slot.prototype.toString = function ()
 * {
 *     return "[Slot name:" + this.name + "]" ;
 * }
 *
 * var slot1 = new Slot("slot1") ;
 *
 * var slot2 = function( message )
 * {
 *     trace( this + " : " + message ) ;
 * }
 *
 * var signal = new system.signals.Signal() ;
 *
 * //signal.proxy = slot1 ;
 *
 * signal.connect( slot1 , 0 ) ;
 * signal.connect( slot2 , 2 ) ;
 *
 * signal.emit( "hello world" ) ;
 */
export function Signal()
{
    Object.defineProperties( this ,
    {
        /**
         * The proxy reference of the signal to change the scope of the slot (function invoked when the signal emit a message).
         * @memberof system.signals.Signal
         * @default null
         * @type {Object}
         * @instance
         */
        proxy : { value : null, configurable : true , writable : true } ,

        /**
         * @private
         */
        receivers : { value : [] }
    }) ;
}

Signal.prototype = Object.create( Signaler.prototype ,
{
    constructor : { value : Signal , writable : true },

    /**
     * The number of receivers or slots register in the signal object.
     * @memberof system.signals.Signal
     * @default 0
     * @type {number}
     * @instance
     * @readonly
     */
    length : { get : function() { return this.receivers.length ; } },

    /**
     * Connects a Function or a Receiver object.
     * @memberof system.signals.Signal
     * @instance
     * @function
     * @param {system.signals.Receiver|Function} receiver The receiver to connect : a Function reference or a Receiver object.
     * @param {number} [priority=0] Determinates the priority level of the receiver.
     * @param {boolean} [autoDisconnect=false] Apply a disconnect after the first trigger
     * @return {boolean} <code>true</code> If the receiver is connected with the signal emitter.
     */
    connect : { value : function ( receiver , priority = 0 , autoDisconnect = false )
    {
        if ( receiver === null )
        {
            return false ;
        }

        autoDisconnect = autoDisconnect === true ;
        priority = priority > 0 ? (priority - (priority % 1)) : 0 ;

        if ( ( typeof(receiver) === "function" ) || ( receiver instanceof Function ) || ( receiver instanceof Receiver ) || ( "receive" in receiver ) )
        {
            if ( this.hasReceiver( receiver ) )
            {
                return false ;
            }

            this.receivers.push( new SignalEntry( receiver , priority , autoDisconnect ) ) ;

            /////// bubble sorting

            let i ;
            let j ;

            let a = this.receivers ;

            let swap = function( j , k )
            {
                var temp = a[j] ;
                a[j]     = a[k] ;
                a[k]     = temp ;
                return true ;
            }

            let swapped = false;

            let l = a.length ;

            for( i = 1 ; i < l ; i++ )
            {
                for( j = 0 ; j < ( l - i ) ; j++ )
                {
                    if ( a[j+1].priority > a[j].priority )
                    {
                        swapped = swap(j, j+1) ;
                    }
                }
                if ( !swapped )
                {
                    break;
                }
            }

            ///////

            return true ;
        }

        return false ;
    }},

    /**
     * Returns <code>true</code> if one or more receivers are connected.
     * @return {boolean} <code>true</code> if one or more receivers are connected.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    connected : { value : function ()
    {
        return this.receivers.length > 0 ;
    }},

    /**
     * Disconnect the specified object or all objects if the parameter is null.
     *
     * @return {boolean} <code>true</code> if the specified receiver exist and can be unregister.
     * @param {system.signals.Receiver|Function} receiver The receiver to disconnect : a Function reference or a Receiver object.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    disconnect : { value : function ( receiver )
    {
        if ( receiver === null )
        {
            if ( this.receivers.length > 0 )
            {
                this.receivers = [] ;
                return true ;
            }
            else
            {
                return false ;
            }
        }
        if ( this.receivers.length > 0 )
        {
            var l  = this.receivers.length ;
            while( --l > -1 )
            {
                if ( this.receivers[l].receiver === receiver )
                {
                    this.receivers.splice( l , 1 ) ;
                    return true ;
                }
            }
        }
        return false ;
    }},

    /**
     * Emit the specified values to the receivers.
     * @param {*} values - All values to emit to the receivers.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    emit : { value : function( ...values )
    {
        let l = this.receivers.length ;
        if ( l === 0 )
        {
            return ;
        }

        let i ;

        let r = [] ;
        let a = this.receivers.slice() ;
        let e ;

        var slot ;

        for ( i = 0 ; i < l ; i++ )
        {
            e = a[i] ;
            if ( e.auto )
            {
                r.push( e )  ;
            }
        }

        if ( r.length > 0 )
        {
            l = r.length ;
            while( --l > -1 )
            {
                i = this.receivers.indexOf( r[l] ) ;
                if ( i > -1 )
                {
                    this.receivers.splice( i , 1 ) ;
                }
            }
        }

        l = a.length ;

        for ( i = 0 ; i<l ; i++ )
        {
            slot = a[i].receiver ;

            if( slot instanceof Function || typeof(receiver) === "function" )
            {
                slot.apply( this.proxy || this , values ) ;
            }
            else if ( slot instanceof Receiver || ( "receive" in slot && (slot.receive instanceof Function) ) )
            {
                slot.receive.apply( this.proxy || slot , values ) ;
            }
        }
    }},

    /**
     * Returns <code>true</code> if the specified receiver is connected.
     * @return {boolean} <code>true</code> if the specified receiver is connected.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    hasReceiver : { value : function ( receiver )
    {
        if ( receiver === null )
        {
            return false ;
        }
        if ( this.receivers.length > 0 )
        {
            let l = this.receivers.length ;
            while( --l > -1 )
            {
                if ( this.receivers[l].receiver === receiver )
                {
                    return true ;
                }
            }
        }
        return false ;
    }},

    /**
     * Returns the Array representation of all receivers connected with the signal.
     * @return {array} The Array representation of all receivers connected with the signal.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    toArray : { value : function()
    {
        let r = [] ;
        let l = this.receivers.length ;
        if ( l > 0 )
        {
            for( let i=0 ; i<l ; i++ )
            {
                r.push( this.receivers[i].receiver ) ;
            }
        }
        return r ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @memberof system.signals.Signal
     * @instance
     * @function
     */
    toString : { value : function () { return '[Signal]' ; }}
});