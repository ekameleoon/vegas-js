"use strict" ;

/**
 * The <code>Receiver</code> interface is the primary method for receiving values from Signal objects.
 * @name Receiver
 * @interface
 * @memberof system.signals
 */
export function Receiver()
{

}

Receiver.prototype = Object.create( Object.prototype );
Receiver.prototype.constructor = Receiver;

/**
 * This method is called when the receiver is connected with a Signal object.
 * @memberof system.signals.Receiver
 * @function
 */
Receiver.prototype.receive = function() {}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @memberof system.signals.Receiver
 * @function
 */
Receiver.prototype.toString = function () 
{
    return "[Receiver]" ;
}