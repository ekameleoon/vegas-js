"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the value is an empty String.
 * @param value The value to evaluate.
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
 * </pre>
 */
export function EmptyString( value = null )
{
    this.value = value ;
}

/**
 * @extends Evaluable
 */
EmptyString.prototype = Object.create( Rule.prototype );
EmptyString.prototype.constructor = EmptyString ;

/**
 * Evaluates the specified object.
 */
EmptyString.prototype.eval = function ()
{
    return this.value === "" ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
EmptyString.prototype.toString = function () /*String*/
{
    return "[EmptyString]" ;
}