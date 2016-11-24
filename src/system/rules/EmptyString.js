"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the value is an empty String.
 * @name EmptyString
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @param {string} value - The value to evaluate.
 * @example
 * var EmptyString = system.rules.EmptyString ;
 *
 * var cond1 = new EmptyString( null ) ;
 * var cond2 = new EmptyString( "" ) ;
 * var cond3 = new EmptyString( "hello" ) ;
 *
 * trace( cond1.eval() ) ; // false
 * trace( cond2.eval() ) ; // true
 * trace( cond3.eval() ) ; // false
 */
export function EmptyString( value = null )
{
    /**
     * @memberof system.rules.EmptyString
     * @name value
     * @type {string}
     * @instance
     */
    this.value = value ;
}

EmptyString.prototype = Object.create( Rule.prototype );
EmptyString.prototype.constructor = EmptyString ;

/**
 * Evaluates the specified object.
 * @name eval
 * @memberof system.rules.EmptyString
 * @function
 * @instance
 */
EmptyString.prototype.eval = function ()
{
    return this.value === "" ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @name toString
 * @memberof system.rules.EmptyString
 * @function
 * @instance
 */
EmptyString.prototype.toString = function () /*String*/
{
    return "[EmptyString]" ;
}