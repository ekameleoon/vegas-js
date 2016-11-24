/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is a string.
 * @name IsString
 * @memberof system.rules
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @param {Object} [value=null] The value to evaluate.
 * @example
 * var IsString = system.rules.IsString ;
 *
 * trace( (new IsString( new String('hello') )).eval() ) ; // true
 * trace( (new IsString( 'hello' )).eval() ) ; // true
 * trace( (new IsString( '' )).eval() ) ; // true
 * trace( (new IsString( 1 )).eval() ) ; // false
 */
export function IsString( value = null )
{
    /**
     * The value to evaluate.
     * @memberof system.rules.IsString
     * @name value
     * @type {Object}
     * @instance
     * @default null
     */
    this.value  = value ;
}

IsString.prototype = Object.create( Rule.prototype );
IsString.prototype.constructor = IsString ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.IsString
 * @inheritdoc
 */
IsString.prototype.eval = function ()
{
    return typeof(this.value) === 'string' || this.value instanceof String ;
}