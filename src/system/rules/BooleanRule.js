"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @example
 * <pre>
 * var BooleanRule = system.rules.BooleanRule ;
 *
 * var cond1 = new BooleanRule( true  ) ;
 * var cond2 = new BooleanRule( false ) ;
 * var cond3 = new BooleanRule( cond1 ) ;
 *
 * trace( cond1.eval() ) ; // true
 * trace( cond2.eval() ) ; // false
 * trace( cond3.eval() ) ; // true
 * </pre>
 */
export function BooleanRule( condition )
{
    Object.defineProperties( this ,
    {
        /**
         * The condition to evaluate.
         */
        condition : { value : condition , enumerable : true , writable : true }
    });
}

/**
 * @extends Rule
 */
BooleanRule.prototype = Object.create( Rule.prototype );
BooleanRule.prototype.constructor = BooleanRule ;

/**
 * Evaluates the specified object.
 */
BooleanRule.prototype.eval = function ()
{
    return ( this.condition instanceof Rule ) ? this.condition.eval() : Boolean( this.condition ) ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
BooleanRule.prototype.toString = function () /*String*/
{
    return "[BooleanRule]" ;
}