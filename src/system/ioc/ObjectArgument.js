"use strict" ;

import { ObjectAttribute } from './ObjectAttribute.js' ;

/**
 * This object defines an argument definition in an object definition.
 * @name ObjectArgument
 * @class
 * @memberof system.ioc
 * @param {*} value - The value of the argument.
 * @param {string} [policy=value] - The policy of the property ({@link system.ioc.ObjectAttribute.REFERENCE|ObjectAttribute.REFERENCE} or by default {@link system.ioc.ObjectAttribute.VALUE|ObjectAttribute.VALUE})
 * @param {array} [evaluators] - The optional Array representation of all evaluators who evaluate the value of the argument.
 */
export function ObjectArgument( value , policy = "value" , evaluators = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _policy : { value : null , writable : true } ,
    });

    this.policy = policy ;

    /**
     * Defines the policy of the property.
     * @name value
     * @memberof system.ioc.ObjectArgument
     * @instance
     */
    this.value = value ;

    /**
     * Defines the policy of the property.
     * @name evaluators
     * @memberof system.ioc.ObjectArgument
     * @instance
     * @type Array
     */
    this.evaluators = (evaluators instanceof Array) ? [].concat(evaluators) : null ;
}

ObjectArgument.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ObjectArgument } ,

    /**
     * Defines the policy of the property.
     * @name policy
     * @memberof system.ioc.ObjectArgument
     * @type {string}
     * @instance
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
    },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[ObjectArgument]' ; } }
});