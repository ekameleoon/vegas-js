/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is a boolean.
 * @name IsNumber
 * @memberof system.rules
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @param {Object} [value=null] The value to evaluate.
 * @example
 * var IsNumber = system.rules.IsNumber ;
 *
 * trace( (new IsNumber( 0 )).eval() ) ; // true
 * trace( (new IsNumber( 1 )).eval() ) ; // true
 * trace( (new IsNumber( NaN )).eval() ) ; // true
 *
 * trace( (new IsNumber( true )).eval() ) ; // false
 * trace( (new IsNumber( null )).eval() ) ; // false
 */
export function IsNumber( value = null )
{
    /**
     * The value to evaluate.
     * @memberof system.rules.IsNumber
     * @name value
     * @type {Object}
     * @instance
     * @default null
     */
    this.value  = value ;
}

IsNumber.prototype = Object.create( Rule.prototype );
IsNumber.prototype.constructor = IsNumber ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.IsNumber
 * @inheritdoc
 */
IsNumber.prototype.eval = function ()
{
    return typeof(this.value) === 'number' || this.value instanceof Number ;
}