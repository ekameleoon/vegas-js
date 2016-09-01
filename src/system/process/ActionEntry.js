"use strict" ;

/**
 * The ActionEntry objects contains all informations about an Action in a TaskGroup.
 * @param action The Action reference.
 * @param priority The priority value of the entry.
 * @param auto This flag indicates if the receiver must be disconnected when handle the first time a signal.
 */
export function ActionEntry( action , priority /*uint*/ , auto /*Boolean*/ )
{
    this.action   = action ;
    this.auto     = Boolean( auto ) ;
    this.priority = priority > 0 ? Math.ceil( priority ) : 0 ;
}

/**
 * @extends Object
 */
ActionEntry.prototype = Object.create( Object.prototype );
ActionEntry.prototype.constructor = ActionEntry;

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
ActionEntry.prototype.toString = function() /*String*/
{
    return "[ActionEntry action:" + this.action + " priority:" + this.priority + " auto:" + this.auto + "]" ;
}
