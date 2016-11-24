"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Used to indicates if a value is greater than another value.
 * @name LessThan
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value1=Nan] - The first value to evaluate.
 * @param {number} [value2=Nan] - The second value to evaluate.
 * @example
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
 */
export function LessThan( value1 = NaN , value2 = NaN )
{
    /**
     * The first value to evaluate.
     * @memberof system.rules.LessThan
     * @name value1
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value1 = value1 ;
    /**
     * The second value to evaluate.
     * @memberof system.rules.LessThan
     * @name value2
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value2 = value2 ;
}

LessThan.prototype = Object.create( Rule.prototype );
LessThan.prototype.constructor = LessThan ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.LessThan
 * @inheritdoc
 */
LessThan.prototype.eval = function ()
{
    return this.value1 < this.value2 ;
}