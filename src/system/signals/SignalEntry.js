"use strict" ;

/**
 * A SignalEntry object contains all informations about a receiver entry in a Signal collection.
 * @name SignalEntry
 * @memberof system.signals
 * @class
 * @constructs
 * @param {system.signals.Receiver|Function} receiver The receiver to connect : a Function reference or a Receiver object.
 * @param {number} [priority=0] The priority value of the entry.
 * @param {boolean} [auto=false] This flag indicates if the receiver must be disconnected when handle the first time a signal.
 */
export function SignalEntry( receiver , priority = 0 , auto = false )
{
    /**
     * Indicates if the receiver must be disconnected when handle the first time a signal.
     * @memberof system.signals.SignalEntry
     * @default false
     * @type {boolean}
     * @instance
     */
    this.auto = Boolean( auto ) ;

    /**
     * The receiver reference of this entry.
     * @memberof system.signals.SignalEntry
     * @default null
     * @type {system.signals.Receiver|Function}
     * @instance
     */
    this.receiver = receiver || null ;

    /**
     * Determinates the priority value of the object.
     * @memberof system.signals.SignalEntry
     * @default 0
     * @type {number}
     * @instance
     */
    this.priority = priority > 0 ? Math.ceil( priority ) : 0 ;
}

SignalEntry.prototype = Object.create( Object.prototype );
SignalEntry.prototype.constructor = SignalEntry;

/**
 * Returns the String representation of the object.
 * @name toString
 * @memberof system.signals.SignalEntry
 * @return the String representation of the object.
 * @function
 * @instance
 */
SignalEntry.prototype.toString = function() /*String*/
{
    return '[SignalEntry]' ;
}