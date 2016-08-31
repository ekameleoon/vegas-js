/*jslint unused: false */
"use strict" ;

/**
 * The <code class="prettyprint">Receiver</code> interface is the primary method for receiving values from Signal objects.
 */
export function Signaler()
{

}

///////////////////

Signaler.prototype = Object.create
(
    Object.prototype,
    {
        /**
         * Indicates the number of receivers connected.
         */
        length :
        {
            get : function ()
            {
                return 0 ;
            }
        }
    }
);

Signaler.prototype.constructor = Signaler;

///////////////////

/**
 * Connects a Function or a Receiver object.
 * @param receiver The receiver to connect : a Function reference or a Receiver object.
 * @param priority Determinates the priority level of the receiver.
 * @param autoDisconnect Apply a disconnect after the first trigger
 * @return <code>true</code> If the receiver is connected with the signal emitter.
 */
Signaler.prototype.connect = function( receiver , priority /*uint*/ , autoDisconnect /*Boolean*/ ) /*uint*/
{
    //
}

/**
 * Returns <code>true</code> if one or more receivers are connected.
 * @return <code>true</code> if one or more receivers are connected.
 */
Signaler.prototype.connected = function() /*Boolean*/
{
    //
}

/**
 * Disconnect the specified object or all objects if the parameter is null.
 * @return <code>true</code> if the specified receiver exist and can be unregister.
 */
Signaler.prototype.disconnect = function( receiver ) /*Boolean*/
{
    //
}

/**
 * Emit the specified values to the receivers.
 * @param ...values All values to emit to the receivers.
 */
Signaler.prototype.emit = function( ) /*void*/
{
    //
}

/**
 * Indicates the number of receivers connected.
 */
Signaler.prototype.getLength = function( ) /*uint*/
{
    //
}

/**
 * Returns <code class="prettyprint">true</code> if the specified receiver is connected.
 * @return <code class="prettyprint">true</code> if the specified receiver is connected.
 */
Signaler.prototype.hasReceiver = function ( receiver ) /*Boolean*/
{
    //
}
