/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is a boolean.
 * @param value The value to evaluate.
 * @example
 * var IsNumber = system.rules.IsNumber ;
 *
 * trace( (new IsNumber( 0 )).eval() ) ; // true
 * trace( (new IsNumber( 1 )).eval() ) ; // true
 * trace( (new IsNumber( NaN )).eval() ) ; // true
 *
 * trace( (new IsNumber( true )).eval() ) ; // false
 * trace( (new IsNumber( null )).eval() ) ; // false
 * </pre>
 */
export function IsNumber( value )
{
    this.value  = value ;
}

/**
 * @extends Rule
 */
IsNumber.prototype = Object.create( Rule.prototype );
IsNumber.prototype.constructor = IsNumber ;

/**
 * Evaluates the specified object.
 */
IsNumber.prototype.eval = function ()
{
    return typeof(this.value) === 'number' || this.value instanceof Number ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
IsNumber.prototype.toString = function () /*String*/
{
    return "[IsNumber]" ;
}