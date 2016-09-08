/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is a string.
 * @param value The value to evaluate.
 * @example
 * var IsString = system.rules.IsString ;
 *
 * trace( (new IsString( new String('hello') )).eval() ) ; // true
 * trace( (new IsString( 'hello' )).eval() ) ; // true
 * trace( (new IsString( '' )).eval() ) ; // true
 * trace( (new IsString( 1 )).eval() ) ; // false
 * </pre>
 */
export function IsString( value )
{
    this.value  = value ;
}

/**
 * @extends Rule
 */
IsString.prototype = Object.create( Rule.prototype );
IsString.prototype.constructor = IsString ;

/**
 * Evaluates the specified object.
 */
IsString.prototype.eval = function ()
{
    return typeof(this.value) === 'string' || this.value instanceof String ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
IsString.prototype.toString = function () /*String*/
{
    return "[IsString]" ;
}