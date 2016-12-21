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

Receiver.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Receiver } ,

    /**
     * This method is called when the receiver is connected with a Signal object.
     * @memberof system.signals.Receiver
     * @function
     */
    receive : { writable : true , value : function() {} } ,

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @memberof system.signals.Receiver
     * @function
     */
    toString : { writable : true , value : function ()
    {
        return "[Receiver]" ;
    }}
});


