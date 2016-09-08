"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Used to indicates if a value is greater than another value.
 * @param value1 The first value to evaluate.
 * @param value2 The second value to evaluate.
 * @example
 * <pre>
 * var LessThan = system.rules.LessThan ;
 *
 * var rule ;
 *
 * rule = new LessThan( 1 , 1 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new LessThan( 1 , 2 ) ;
 * trace( rule.eval() ) ; // true
 *
 * rule = new LessThan( 3 , 2 ) ;
 * trace( rule.eval() ) ; // false
 * </pre>
 */
export function LessThan( value1 = null , value2 = null )
{
    this.value1 = value1 ;
    this.value2 = value2 ;
}

/**
 * @extends Evaluable
 */
LessThan.prototype = Object.create( Rule.prototype );
LessThan.prototype.constructor = LessThan ;

/**
 * Evaluates the specified object.
 */
LessThan.prototype.eval = function ()
{
    return this.value1 < this.value2 ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
LessThan.prototype.toString = function () /*String*/
{
    return "[LessThan]" ;
}