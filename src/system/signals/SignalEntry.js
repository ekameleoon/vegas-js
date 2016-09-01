"use strict" ;

/**
 * A SignalEntry object contains all informations about a receiver entry in a Signal collection.
 * @param receiver The receiver reference.
 * @param priority The priority value of the entry.
 * @param auto This flag indicates if the receiver must be disconnected when handle the first time a signal.
 */
export function SignalEntry( receiver , priority /*uint*/ , auto /*Boolean*/ )
{
    /**
     * Indicates if the receiver must be disconnected when handle the first time a signal.
     */
    this.auto = Boolean( auto ) ;

    /**
     * The receiver reference of this entry.
     */
    this.receiver = receiver || null ;

    /**
     * Determinates the priority value of the object.
     */
    this.priority = priority > 0 ? Math.ceil( priority ) : 0 ;
}

///////////////////

/**
 * @extends Object
 */
SignalEntry.prototype = Object.create( Object.prototype );
SignalEntry.prototype.constructor = SignalEntry;

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
SignalEntry.prototype.toString = function() /*String*/
{
    return '[SignalEntry]' ;
}