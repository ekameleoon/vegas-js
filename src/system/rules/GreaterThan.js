"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Used to indicates if a value is greater than another value.
 * @name GreaterThan
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value1=Nan] - The first value to evaluate.
 * @param {number} [value2=Nan] - The second value to evaluate.
 * @example
 * var GreaterThan = system.rules.GreaterThan ;
 *
 * var rule ;
 *
 * rule = new GreaterThan( 1 , 1 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new GreaterThan( 1 , 2 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new GreaterThan( 3 , 2 ) ;
 * trace( rule.eval() ) ; // true
 * </pre>
 */
export function GreaterThan( value1 = NaN , value2 = NaN )
{
    /**
     * The first value to evaluate.
     * @memberof system.rules.GreaterThan
     * @name value1
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value1 = value1 ;
    /**
     * The second value to evaluate.
     * @memberof system.rules.GreaterThan
     * @name value2
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value2 = value2 ;
}

GreaterThan.prototype = Object.create( Rule.prototype );
GreaterThan.prototype.constructor = GreaterThan ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.GreaterThan
 * @inheritdoc
 */
GreaterThan.prototype.eval = function ()
{
    return this.value1 > this.value2 ;
}