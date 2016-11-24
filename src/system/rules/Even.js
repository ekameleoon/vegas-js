"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the value is even.
 * @name Even
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {number} [value=NaN] ) The value to evaluate.
 * @example
 * var cond ;
 * var Even = system.rules.Even ;
 *
 * cond = new Even( 0 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Even( 1 ) ;
 * trace( cond.eval() ) ; // false
 *
 * cond = new Even( 2 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Even( 3 ) ;
 * trace( cond.eval() ) ; // false
 */
export function Even( value = NaN )
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

Even.prototype = Object.create( Rule.prototype );
Even.prototype.constructor = Even ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Even
 * @inheritdoc
 */
Even.prototype.eval = function ()
{
    return this.value%2 === 0 ;
}