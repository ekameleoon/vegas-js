/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is undefined.
 * @name Undefined
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {object} [value=undefined] - The value to evaluate.
 * @example
 * var Undefined = system.rules.Undefined ;
 * trace( (new Undefined( undefined )).eval() ) ; // true
 * trace( (new Undefined( 'hello'   )).eval() ) ; // true
 */
export function Undefined( value = undefined )
{
    /**
     * The value to evaluate.
     * @memberof system.rules.Undefined
     * @name value
     * @type {object}
     * @instance
     * @default undefined
     */
    this.value = value ;
}

Undefined.prototype = Object.create( Rule.prototype );
Undefined.prototype.constructor = Undefined ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Undefined
 * @inheritdoc
 */
Undefined.prototype.eval = function ()
{
    return this.value === undefined ;
}