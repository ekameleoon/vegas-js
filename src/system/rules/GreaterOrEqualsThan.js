"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Used to indicates if a value is greater or equal than another value.
 * @param value1 The first value to evaluate.
 * @param value2 The second value to evaluate.
 * @example
 * <pre>
 * var GreaterOrEqualsThan = system.rules.GreaterOrEqualsThan ;
 *
 * var rule ;
 *
 * rule = new GreaterOrEqualsThan( 1 , 1 ) ;
 * trace( rule.eval() ) ; // true
 *
 * rule = new GreaterOrEqualsThan( 1 , 2 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new GreaterOrEqualsThan( 3 , 2 ) ;
 * trace( rule.eval() ) ; // true
 * </pre>
 */
export function GreaterOrEqualsThan( value1 = null , value2 = null )
{
    this.value1 = value1 ;
    this.value2 = value2 ;
}

/**
 * @extends Rule
 */
GreaterOrEqualsThan.prototype = Object.create( Rule.prototype );
GreaterOrEqualsThan.prototype.constructor = GreaterOrEqualsThan ;

/**
 * Evaluates the specified object.
 */
GreaterOrEqualsThan.prototype.eval = function ()
{
    return this.value1 >= this.value2 ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
GreaterOrEqualsThan.prototype.toString = function () /*String*/
{
    return "[GreaterOrEqualsThan]" ;
}