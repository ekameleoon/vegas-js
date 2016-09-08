/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is undefined.
 * @param value The value to evaluate.
 * @example
 * var Undefined = system.rules.Undefined ;
 *
 * trace( (new Undefined( undefined )).eval() ) ; // true
 * trace( (new Undefined( 'hello'   )).eval() ) ; // true
 * </pre>
 */
export function Undefined( value )
{
    this.value  = value ;
}

/**
 * @extends Rule
 */
Undefined.prototype = Object.create( Rule.prototype );
Undefined.prototype.constructor = Undefined ;

/**
 * Evaluates the specified object.
 */
Undefined.prototype.eval = function ()
{
    return this.value === undefined ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Undefined.prototype.toString = function () /*String*/
{
    return "[Undefined]" ;
}