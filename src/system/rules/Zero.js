/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is undefined.
 * @param value The value to evaluate.
 * @example
 * var Zero = system.rules.Zero ;
 *
 * trace( (new Zero( 0 )).eval() ) ; // true
 * trace( (new Zero( 1 )).eval() ) ; // false
 * trace( (new Zero( 'test' )).eval() ) ; // false
 * </pre>
 */
export function Zero( value )
{
    this.value  = value ;
}

/**
 * @extends Rule
 */
Zero.prototype = Object.create( Rule.prototype );
Zero.prototype.constructor = Zero ;

/**
 * Evaluates the specified object.
 */
Zero.prototype.eval = function ()
{
    return this.value === 0 ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Zero.prototype.toString = function () /*String*/
{
    return "[Zero]" ;
}