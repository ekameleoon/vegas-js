"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the value is odd.
 * @param value The value to evaluate.
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
export function Odd( value = null )
{
    this.value = value ;
}

/**
 * @extends Evaluable
 */
Odd.prototype = Object.create( Rule.prototype );
Odd.prototype.constructor = Odd ;

/**
 * Evaluates the specified object.
 */
Odd.prototype.eval = function ()
{
    return this.value%2 !== 0 ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Odd.prototype.toString = function () /*String*/
{
    return "[Odd]" ;
}