/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is a boolean.
 * @name IsBoolean
 * @memberof system.rules
 * @augments system.rules.Rule
 * @implements {system.rules.Rule}
 * @class
 * @constructs
 * @param {Object} [value=null] The value to evaluate.
 * @example
 * var IsBoolean = system.rules.IsBoolean ;
 *
 * trace( (new IsBoolean( 0 )).eval() ) ; // false
 * trace( (new IsBoolean( 1 )).eval() ) ; // false
 *
 * trace( (new IsBoolean( true )).eval() ) ; // true
 * trace( (new IsBoolean( false )).eval() ) ; // true
 *
 * trace( (new IsBoolean( new Boolean(true) )).eval() ) ; // true
 * trace( (new IsBoolean( new Boolean(false) )).eval() ) ; // true
 */
export function IsBoolean( value = null )
{
    /**
     * The value to evaluate.
     * @memberof system.rules.IsBoolean
     * @name value
     * @type {Object}
     * @instance
     * @default null
     */
    this.value = value ;
}

IsBoolean.prototype = Object.create( Rule.prototype );
IsBoolean.prototype.constructor = IsBoolean ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.IsBoolean
 * @inheritdoc
 */
IsBoolean.prototype.eval = function ()
{
    return typeof(this.value) === 'boolean' || this.value instanceof Boolean ;
}