/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is a boolean.
 * @param value The value to evaluate.
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
 * </pre>
 */
export function IsBoolean( value )
{
    this.value  = value ;
}

/**
 * @extends Rule
 */
IsBoolean.prototype = Object.create( Rule.prototype );
IsBoolean.prototype.constructor = IsBoolean ;

/**
 * Evaluates the specified object.
 */
IsBoolean.prototype.eval = function ()
{
    return typeof(this.value) === 'boolean' || this.value instanceof Boolean ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
IsBoolean.prototype.toString = function () /*String*/
{
    return "[IsBoolean]" ;
}