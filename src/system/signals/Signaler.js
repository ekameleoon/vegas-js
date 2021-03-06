/*jslint unused: false */
"use strict" ;

/**
 * The {system.signal.Signaler|Signaler} interface is the primary method for emit messages.
 * @name Signaler
 * @interface
 * @memberof system.signals
 */
export function Signaler() {}

Signaler.prototype = Object.create( Object.prototype,
{
    constructor : { writable : true , value : Signaler } ,

    /**
     * Indicates the number of receivers connected.
     * @memberof system.signals.Signaler
     * @readonly
     */
    length : { get : function () { return 0 ; }} ,

    /**
     * Connects a Function or a Receiver object.
     * @param {Function|system.signals.Receiver} receiver - The receiver to connect : a Function reference or a Receiver object.
     * @param {number} [priority=0] Determinates the priority level of the receiver.
     * @param {boolean} [autoDisconnect=false] Apply a disconnect after the first trigger
     * @return <code>true</code> If the receiver is connected with the signal emitter.
     * @memberof system.signals.Signaler
     */
    connect : { writable : true , value : function( receiver , priority = 0 , autoDisconnect = false ) {} },

    /**
     * Returns <code>true</code> if one or more receivers are connected.
     * @memberof system.signals.Signaler
     * @return {boolean} <code>true</code> if one or more receivers are connected.
     */
    connected : { writable : true , value : function() {} },

    /**
     * Disconnect the specified object or all objects if the parameter is null.
     * @return {boolean} <code>true</code> if the specified receiver exist and can be disconnected.
     * @memberof system.signals.Signaler
     */
    disconnect: { writable : true , value : function( receiver ) {} },

    /**
     * Emit the specified values to the receivers.
     * @param {*} [values] All values to emit to the receivers.
     * @memberof system.signals.Signaler
     */
    emit: { writable : true , value : function() {} },

    /**
     * Returns <code>true</code> if the specified receiver is connected.
     * @return <code>true</code> if the specified receiver is connected.
     * @memberof system.signals.Signaler
     */
    hasReceiver : { writable : true , value : function( receiver ) {} }
});
