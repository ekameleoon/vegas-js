"use strict" ;

/**
 * A SignalEntry object contains all informations about a receiver entry in a Signal collection.
 * @param receiver The receiver reference.
 * @param priority The priority value of the entry.
 * @param auto This flag indicates if the receiver must be disconnected when handle the first time a signal.
 */
export function SignalEntry( receiver , priority /*uint*/ , auto /*Boolean*/ )
{
    this.auto     = Boolean( auto ) ;
    this.receiver = receiver ;
    this.priority = priority > 0 ? Math.ceil( priority ) : 0 ;
}

///////////////////

/**
 * @extends Object
 */
SignalEntry.prototype = Object.create( Object.prototype );
SignalEntry.prototype.constructor = SignalEntry;

///////////////////

/**
 * Indicates if the receiver must be disconnected when handle the first time a signal.
 */
SignalEntry.prototype.auto = false ;

/**
 * Determinates the priority value of the object.
 */
SignalEntry.prototype.priority = 0 ;

/**
 * The receiver reference of this entry.
 */
SignalEntry.prototype.receiver = null ;

///////////////////

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
SignalEntry.prototype.toString = function() /*String*/
{
    return "[SignalEntry receiver:" + this.receiver + " priority:" + this.priority + " auto:" + this.auto + "]" ;
}