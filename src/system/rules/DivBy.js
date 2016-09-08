"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the division of a value by another returns 0.
 * @param value1 The first value to evaluate.
 * @param value2 The second value to evaluate.
 * @example
 * <pre>
 * var DivBy = system.rules.DivBy ;
 *
 * var cond ;
 *
 * cond = new DivBy( 4 , 2 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new DivBy( 5 , 2 ) ;
 * trace( cond.eval() ) ; // false
 * </pre>
 */
export function DivBy( value1 = null , value2 = null )
{
    this.value1 = value1 ;
    this.value2 = value2 ;
}

/**
 * @extends Rule
 */
DivBy.prototype = Object.create( Rule.prototype );
DivBy.prototype.constructor = DivBy ;

/**
 * Evaluates the specified object.
 */
DivBy.prototype.eval = function ()
{
    return (this.value1 % this.value2) === 0 ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
DivBy.prototype.toString = function () /*String*/
{
    return "[DivBy]" ;
}