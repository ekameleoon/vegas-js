"use strict" ;

import { ObjectAttribute } from './ObjectAttribute.js' ;

/**
 * Represents the log information for a single logging notification.
 * The loging system dispatches a single message each time a process requests information be logged.
 * This entry can be captured by any object for storage or formatting.
 * @param message The context or message of the log.
 * @param level The level of the log.
 * @param channel The Logger reference of this entry.
 */
export function ObjectArgument( value , policy = "value" , evaluators = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _policy : { value : null , writable : true } ,

        /**
         * Defines the policy of the property.
         */
        policy :
        {
            get : function policy()
            {
                return this._policy ;
            },
            set : function( str )
            {
                switch (str)
                {
                    case ObjectAttribute.REFERENCE :
                    case ObjectAttribute.CONFIG    :
                    case ObjectAttribute.LOCALE    :
                    {
                        this._policy = str ;
                        break ;
                    }
                    default :
                    {
                        this._policy = ObjectAttribute.VALUE ;
                    }
                }
            }
        }
    });

    this.policy     = policy ;
    this.value      = value ;
    this.evaluators = (evaluators instanceof Array) ?[].concat(evaluators) : null ;
}

/**
 * @extends Object
 */
ObjectArgument.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ObjectArgument } ,

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[ObjectArgument]' ; } }
});