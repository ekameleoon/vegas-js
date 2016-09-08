"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the value is even.
 * @param value The value to evaluate.
 * @example
 * var cond ;
 * var Even = system.rules.Even ;
 *
 * cond = new Even( 0 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Even( 1 ) ;
 * trace( cond.eval() ) ; // false
 *
 * cond = new Even( 2 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Even( 3 ) ;
 * trace( cond.eval() ) ; // false
 * </pre>
 */
export function Even( value = null )
{
    this.value = value ;
}

/**
 * @extends Rule
 */
Even.prototype = Object.create( Rule.prototype );
Even.prototype.constructor = Even ;

/**
 * Evaluates the specified object.
 */
Even.prototype.eval = function ()
{
    return this.value%2 === 0 ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Even.prototype.toString = function () /*String*/
{
    return "[Even]" ;
}