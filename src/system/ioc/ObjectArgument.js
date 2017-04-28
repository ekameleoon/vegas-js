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
         * The optional <code>Array</code> representation of all registered arguments if the passed-in argument is a callback function reference.
         * @name args
         * @memberof system.ioc.ObjectArgument
         * @instance
         * @type Array
         */
        args : { value : null, writable : true } ,

        /**
         * The optional <code>Array</code> representation of all evaluators to transform the value of this object.
         * @name evaluators
         * @memberof system.ioc.ObjectArgument
         * @instance
         * @type Array
         */
        evaluators : { value : evaluators instanceof Array ? evaluators : null, writable : true } ,

        /**
         * The optional <code>scope</code> object if the argument definition target a callback function reference.
         * @name scope
         * @memberof system.ioc.ObjectArgument
         * @instance
         */
        scope : { value : null, writable : true } ,

        /**
         * The value of the argument.
         * @name value
         * @memberof system.ioc.ObjectArgument
         * @instance
         */
        value : { value : value , writable : true } ,

        /**
         * @private
         */
        _policy : { value : null , writable : true }
    });

    this.policy = policy ;
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
                case ObjectAttribute.CALLBACK  :
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
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof system.ioc.ObjectArgument
     * @instance
     * @function
     */
    toString : { value : function () { return '[ObjectArgument]' ; }}
});