"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Used to indicates if a value is greater than another value.
 * @param value1 The first value to evaluate.
 * @param value2 The second value to evaluate.
 * @example
 * <pre>
 * var GreaterThan = system.rules.GreaterThan ;
 *
 * var rule ;
 *
 * rule = new GreaterThan( 1 , 1 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new GreaterThan( 1 , 2 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new GreaterThan( 3 , 2 ) ;
 * trace( rule.eval() ) ; // true
 * </pre>
 */
export function GreaterThan( value1 = null , value2 = null )
{
    this.value1 = value1 ;
    this.value2 = value2 ;
}

/**
 * @extends Rule
 */
GreaterThan.prototype = Object.create( Rule.prototype );
GreaterThan.prototype.constructor = GreaterThan ;

/**
 * Evaluates the specified object.
 */
GreaterThan.prototype.eval = function ()
{
    return this.value1 > this.value2 ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
GreaterThan.prototype.toString = function () /*String*/
{
    return "[GreaterThan]" ;
}