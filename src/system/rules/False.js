"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is false.
 * @name False
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {boolean|system.rules.Rule} value - The value to evaluate.
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
 */
export function False( condition = false )
{
    /**
     * The condition to evaluate.
     * @memberof system.rules.False
     * @name value
     * @type {boolean|system.rules.Rule}
     * @instance
     * @default false
     */
    this.condition = condition ;
}

False.prototype = Object.create( Rule.prototype );
False.prototype.constructor = False ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.False
 * @inheritdoc
 */
False.prototype.eval = function ()
{
    return ( ( this.condition instanceof Rule ) ? this.condition.eval() : Boolean( this.condition ) ) === false ;
}