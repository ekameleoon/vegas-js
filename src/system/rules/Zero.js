"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is undefined.
 * @name Zero
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value=Nan] - The value to evaluate.
 * @example
 * var Zero = system.rules.Zero ;
 * trace( (new Zero( 0 )).eval() ) ; // true
 * trace( (new Zero( 1 )).eval() ) ; // false
 * trace( (new Zero( 'test' )).eval() ) ; // false
 */
export function Zero( value = NaN )
{
    /**
     * The condition to evaluate.
     * @memberof system.rules.True
     * @name value
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value = value ;
}

Zero.prototype = Object.create( Rule.prototype );
Zero.prototype.constructor = Zero ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Zero
 * @inheritdoc
 */
Zero.prototype.eval = function ()
{
    return this.value === 0 ;
}