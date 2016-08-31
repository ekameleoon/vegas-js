"use strict" ;

/**
 * The <code class="prettyprint">Receiver</code> interface is the primary method for receiving values from Signal objects.
 */
export function Receiver()
{

}

///////////////////

Receiver.prototype = Object.create( Object.prototype );
Receiver.prototype.constructor = Receiver;

///////////////////

/**
 * This method is called when the receiver is connected with a Signal object.
 * @param ...values All the values emitting by the signals connected with this object.
 */
Receiver.prototype.receive = function() {}
