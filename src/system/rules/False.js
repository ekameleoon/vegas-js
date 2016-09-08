"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is false.
 * @param value The value to evaluate.
 * @example
 * var False = system.rules.False ;
 *
 * var cond1 = new False( true  ) ;
 * var cond2 = new False( false ) ;
 * var cond3 = new False( cond1 ) ;
 * var cond4 = new False( cond2 ) ;
 *
 * trace( cond1.eval() ) ; // false
 * trace( cond2.eval() ) ; // true
 * trace( cond3.eval() ) ; // true
 * trace( cond4.eval() ) ; // false
 * </pre>
 */
export function False( condition = null )
{
    this.condition = condition ;
}

/**
 * @extends Rule
 */
False.prototype = Object.create( Rule.prototype );
False.prototype.constructor = False ;

/**
 * Evaluates the specified object.
 */
False.prototype.eval = function ()
{
    return ( ( this.condition instanceof Rule ) ? this.condition.eval() : Boolean( this.condition ) ) === false ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
False.prototype.toString = function () /*String*/
{
    return "[False]" ;
}