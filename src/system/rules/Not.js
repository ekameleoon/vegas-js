"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Used to perform logical negation on a specific condition.
 * @param condition The condition to evaluate.
 * @example
 * var BooleanRule = system.rules.BooleanRule ;
 * var Not         = system.rules.Not ;
 *
 * var cond1 = new BooleanRule( true  ) ;
 * var cond2 = new BooleanRule( false ) ;
 *
 * var no1 = new Not( true ) ;
 * var no2 = new Not( false ) ;
 * var no3 = new Not( cond1 ) ;
 * var no4 = new Not( cond2 ) ;
 *
 * trace( no1.eval() ) ; // false
 * trace( no2.eval() ) ; // true
 * trace( no3.eval() ) ; // false
 * trace( no4.eval() ) ; // true
 * </pre>
 */
export function Not( condition = null )
{
    this.condition = condition ;
}

/**
 * @extends Rule
 */
Not.prototype = Object.create( Rule.prototype );
Not.prototype.constructor = Not ;

/**
 * Evaluates the specified object.
 */
Not.prototype.eval = function ()
{
    return !( this.condition instanceof Rule ? this.condition.eval() : Boolean( this.condition ) ) ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Not.prototype.toString = function () /*String*/
{
    return "[Not]" ;
}