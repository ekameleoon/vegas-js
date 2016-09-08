"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Used to indicates if a value is less or equal than another value.
 * @param value1 The first value to evaluate.
 * @param value2 The second value to evaluate.
 * @example
 * <pre>
 * var LessOrEqualsThan = system.rules.LessOrEqualsThan ;
 *
 * var rule ;
 *
 * rule = new LessOrEqualsThan( 1 , 1 ) ;
 * trace( rule.eval() ) ; // true
 *
 * rule = new LessOrEqualsThan( 1 , 2 ) ;
 * trace( rule.eval() ) ; // true
 *
 * rule = new LessOrEqualsThan( 3 , 2 ) ;
 * trace( rule.eval() ) ; // false
 * </pre>
 */
export function LessOrEqualsThan( value1 = null , value2 = null )
{
    this.value1 = value1 ;
    this.value2 = value2 ;
}

/**
 * @extends Rule
 */
LessOrEqualsThan.prototype = Object.create( Rule.prototype );
LessOrEqualsThan.prototype.constructor = LessOrEqualsThan ;

/**
 * Evaluates the specified object.
 */
LessOrEqualsThan.prototype.eval = function ()
{
    return this.value1 <= this.value2 ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
LessOrEqualsThan.prototype.toString = function () /*String*/
{
    return "[LessOrEqualsThan]" ;
}