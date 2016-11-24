"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Used to indicates if a value is greater or equal than another value.
 * @name GreaterOrEqualsThan
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value1=Nan] - The first value to evaluate.
 * @param {number} [value2=Nan] - The second value to evaluate.
 * @example
 * var GreaterOrEqualsThan = system.rules.GreaterOrEqualsThan ;
 *
 * var rule ;
 *
 * rule = new GreaterOrEqualsThan( 1 , 1 ) ;
 * trace( rule.eval() ) ; // true
 *
 * rule = new GreaterOrEqualsThan( 1 , 2 ) ;
 * trace( rule.eval() ) ; // false
 *
 * rule = new GreaterOrEqualsThan( 3 , 2 ) ;
 * trace( rule.eval() ) ; // true
 */
export function GreaterOrEqualsThan( value1 = NaN , value2 = NaN )
{
    /**
     * The first value to evaluate.
     * @memberof system.rules.GreaterOrEqualsThan
     * @name value1
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value1 = value1 ;
    /**
     * The second value to evaluate.
     * @memberof system.rules.GreaterOrEqualsThan
     * @name value2
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value2 = value2 ;
}

GreaterOrEqualsThan.prototype = Object.create( Rule.prototype );
GreaterOrEqualsThan.prototype.constructor = GreaterOrEqualsThan ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.GreaterOrEqualsThan
 * @inheritdoc
 */
GreaterOrEqualsThan.prototype.eval = function ()
{
    return this.value1 >= this.value2 ;
}