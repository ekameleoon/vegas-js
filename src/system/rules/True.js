"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is true.
 * @param value The value to evaluate.
 * @example
 * var True = system.rules.True ;
 *
 * var cond1 = new True( true  ) ;
 * var cond2 = new True( false ) ;
 * var cond3 = new True( cond1 ) ;
 * var cond4 = new True( cond2 ) ;
 *
 * trace( cond1.eval() ) ; // true
 * trace( cond2.eval() ) ; // false
 * trace( cond3.eval() ) ; // true
 * trace( cond4.eval() ) ; // false
 * </pre>
 */
export function True( condition = null )
{
    this.condition = condition ;
}

/**
 * @extends Rule
 */
True.prototype = Object.create( Rule.prototype );
True.prototype.constructor = True ;

/**
 * Evaluates the specified object.
 */
True.prototype.eval = function ()
{
    return ( ( this.condition instanceof Rule ) ? this.condition.eval() : Boolean( this.condition ) ) === true ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
True.prototype.toString = function () /*String*/
{
    return "[True]" ;
}