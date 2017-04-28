"use strict" ;

import { ObjectAttribute } from './ObjectAttribute.js' ;
import { ObjectStrategy }  from './ObjectStrategy.js' ;

/**
 * This object defines a property definition in the object definitions.
 * @name ObjectProperty
 * @extends system.ioc.ObjectStrategy
 * @class
 * @memberof system.ioc
 * @param {string} name - The name of the property.
 * @param {*} value - The value of the property.
 * @param {string} policy - The policy of the property ( {@link system.ioc.ObjectAttribute.REFERENCE|ObjectAttribute.REFERENCE}, {@link system.ioc.ObjectAttribute.CONFIG|ObjectAttribute.CONFIG}, {@link system.ioc.ObjectAttribute.LOCALE|ObjectAttribute.LOCALE} or by default {@link system.ioc.ObjectAttribute.VALUE|ObjectAttribute.VALUE} )
 * @param evaluators The Array representation of all evaluators who evaluate the value of the property.
 */
export function ObjectProperty( name , value , policy = "value" , evaluators = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The optional <code>Array</code> representation of all registered arguments if the property is a callback function reference.
         * @name args
         * @memberof system.ioc.ObjectProperty
         * @instance
         * @type Array
         */
        args : { value : null, writable : true } ,

        /**
         * The optional <code>Array</code> representation of all evaluators to transform the value of this object.
         * @name evaluators
         * @memberof system.ioc.ObjectProperty
         * @instance
         * @type Array
         */
        evaluators : { value : evaluators instanceof Array ? evaluators : null, writable : true } ,

        /**
         * The name of the property.
         * @name name
         * @memberof system.ioc.ObjectProperty
         * @instance
         * @type string
         */
        name : { value : name , writable : true } ,

        /**
         * The optional <code>scope</code> object if the property definition target a callback function reference.
         * @name scope
         * @memberof system.ioc.ObjectProperty
         * @instance
         */
        scope : { value : null, writable : true } ,

        /**
         * The value of the property.
         * @name value
         * @memberof system.ioc.ObjectProperty
         * @instance
         */
        value : { value : value , writable : true } ,

        /**
         * @private
         */
        _policy : { value : null , writable : true }
    }) ;

    this.policy = policy ;
}

ObjectProperty.prototype = Object.create( ObjectStrategy.prototype ,
{
    constructor : { writable : true , value : ObjectProperty } ,

    /**
     * Determinates the policy of the property ( {@link system.ioc.ObjectAttribute.REFERENCE|ObjectAttribute.REFERENCE}, {@link system.ioc.ObjectAttribute.CONFIG|ObjectAttribute.CONFIG}, {@link system.ioc.ObjectAttribute.LOCALE|ObjectAttribute.LOCALE} or by default {@link system.ioc.ObjectAttribute.VALUE|ObjectAttribute.VALUE} )
     * @name policy
     * @memberof system.ioc.ObjectProperty
     * @instance
     * @type string
     */
    policy :
    {
        get : function() { return this._policy ; } ,
        set : function( str )
        {
            switch( str )
            {
                case ObjectAttribute.ARGUMENTS :
                case ObjectAttribute.CALLBACK  :
                case ObjectAttribute.CONFIG    :
                case ObjectAttribute.LOCALE    :
                case ObjectAttribute.REFERENCE :
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
}) ;