"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the value is odd.
 * @name Odd
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {number} [value=NaN] ) The value to evaluate.
 * @example
 * var cond ;
 * var Odd = system.rules.Odd ;
 *
 * cond = new Odd( 0 ) ;
 * trace( cond.eval() ) ; // false
 *
 * cond = new Odd( 1 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Odd( 2 ) ;
 * trace( cond.eval() ) ; // false
 *
 * cond = new Odd( 3 ) ;
 * trace( cond.eval() ) ; // true
 * </pre>
 */
export function Odd( value = NaN )
{
    /**
     * The value to evaluate.
     * @memberof system.rules.Even
     * @name value
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value = value ;
}

Odd.prototype = Object.create( Rule.prototype );
Odd.prototype.constructor = Odd ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Odd
 * @inheritdoc
 */
Odd.prototype.eval = function ()
{
    return this.value%2 !== 0 ;
}