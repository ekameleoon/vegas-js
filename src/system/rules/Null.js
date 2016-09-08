/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is null.
 * @param value The value to evaluate.
 * @example
 * var Null = system.rules.Null ;
 *
 * var cond ;
 *
 * cond = new Null( undefined , true ) ;
 * trace( cond.eval() ) ; // false
 *
 * cond = new Null( undefined ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Null( null ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new Null( "hello" ) ;
 * trace( cond.eval() ) ; // false
 * </pre>
 */
export function Null( value , strict = false )
{
    this.value  = value ;
    this.strict = Boolean(strict) ;
}

/**
 * @extends Rule
 */
Null.prototype = Object.create( Rule.prototype );
Null.prototype.constructor = Null ;

/**
 * Evaluates the specified object.
 */
Null.prototype.eval = function ()
{
    if( this.strict )
    {
        return (this.value === null) ;
    }
    else
    {
        return (this.value == null) ;
    }
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Null.prototype.toString = function () /*String*/
{
    return "[Null]" ;
}