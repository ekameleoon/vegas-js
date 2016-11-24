"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the division of a value by another returns 0.
 * @name DivBy
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @param {number} [value1=NaN] - The first value to evaluate.
 * @param {number} [value2=NaN] - The second value to evaluate.
 * @example
 * var DivBy = system.rules.DivBy ;
 *
 * var cond ;
 *
 * cond = new DivBy( 4 , 2 ) ;
 * trace( cond.eval() ) ; // true
 *
 * cond = new DivBy( 5 , 2 ) ;
 * trace( cond.eval() ) ; // false
 */
export function DivBy( value1 = NaN , value2 = NaN )
{
    /**
     * The first value to evaluate.
     * @memberof system.rules.DivBy
     * @name value1
     * @type {number}
     * @instance
     */
    this.value1 = value1 ;

    /**
     * The second value to evaluate.
     * @memberof system.rules.DivBy
     * @name value2
     * @type {number}
     * @instance
     */
    this.value2 = value2 ;
}

DivBy.prototype = Object.create( Rule.prototype );
DivBy.prototype.constructor = DivBy ;

/**
 * Evaluates the specified object.
 * @name eval
 * @memberof system.rules.DivBy
 * @function
 * @instance
 */
DivBy.prototype.eval = function ()
{
    return (this.value1 % this.value2) === 0 ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @name toString
 * @memberof system.rules.DivBy
 * @function
 * @instance
 */
DivBy.prototype.toString = function () /*String*/
{
    return "[DivBy]" ;
}