"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Used to indicates if a value is less or equal than another value.
 * @name LessOrEqualsThan
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value1=Nan] - The first value to evaluate.
 * @param {number} [value2=Nan] - The second value to evaluate.
 * @example
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
 */
export function LessOrEqualsThan( value1 = NaN , value2 = NaN )
{
    /**
     * The first value to evaluate.
     * @memberof system.rules.LessOrEqualsThan
     * @name value1
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value1 = value1 ;
    /**
     * The second value to evaluate.
     * @memberof system.rules.LessOrEqualsThan
     * @name value2
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value2 = value2 ;
}

LessOrEqualsThan.prototype = Object.create( Rule.prototype );
LessOrEqualsThan.prototype.constructor = LessOrEqualsThan ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.LessOrEqualsThan
 * @inheritdoc
 */
LessOrEqualsThan.prototype.eval = function ()
{
    return this.value1 <= this.value2 ;
}