"use strict" ;

/**
 * The ActionEntry objects contains all informations about an Action in a {@link system.process.TaskGroup} object.
 * @name ActionEntry
 * @class
 * @private
 * @memberof system.process
 * @extends system.process.Action
 * @augments system.process.Action
 * @param {system.process.Action} action - The Action reference register in this entry.
 * @param {number} [priority=0] - The priority value of the entry.
 * @param {boolean} [auto=false] - This flag indicates if the receiver must be disconnected when handle the first time a signal.
 */
export function ActionEntry( action , priority = 0 , auto = false )
{
    /**
     * The Action reference register in this entry.
     * @memberof system.process.ActionEntry
     * @type {system.process.Action}
     * @instance
     */
    this.action   = action ;

    /**
     * This flag indicates if the receiver must be disconnected when handle the first time a signal.
     * @memberof system.process.ActionEntry
     * @type {boolean}
     * @instance
     */
    this.auto = Boolean( auto ) ;

    /**
     * The priority value of the entry.
     * @memberof system.process.ActionEntry
     * @type {number}
     * @instance
     */
    this.priority = priority > 0 ? Math.ceil( priority ) : 0 ;
}

ActionEntry.prototype = Object.create( Object.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { value : ActionEntry },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function()
    {
        return "[ActionEntry action:" + this.action + " priority:" + this.priority + " auto:" + this.auto + "]" ;
    }}
});