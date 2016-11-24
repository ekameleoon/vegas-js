"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is NaN.
 * @name IsNaN
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {number} [value=NaN] - The value to evaluate.
 * @example
 * var IsNaN = system.rules.IsNaN ;
 * trace( (new IsNaN( 0 )).eval() ) ; // false
 * trace( (new IsNaN( 1 )).eval() ) ; // false
 * trace( (new IsNaN( 'foo' )).eval() ) ; // false
 * trace( (new IsNaN( NaN )).eval() ) ; // true
 *
 * trace( (new IsNaN( 0 , false )).eval() ) ; // false
 * trace( (new IsNaN( 1 , false )).eval() ) ; // false
 * trace( (new IsNaN( 'foo' , false )).eval() ) ; // true
 * trace( (new IsNaN( NaN , false)).eval() ) ; // true
 */
export function IsNaN( value = NaN , strict = true )
{
    /**
     * The condition to evaluate.
     * @memberof system.rules.True
     * @name value
     * @type {number}
     * @instance
     * @default NaN
     */
    this.value = value ;

    /**
     * The flag to indicates if the evaluation is strict (is <code>NaN</code> only) or not (test if the object is a <code>Number</code> and if not is <code>NaN</code>).
     * @memberof system.rules.IsNaN
     * @name strict
     * @type {boolean}
     * @instance
     * @default true
     */
    this.strict = Boolean(strict) ;
}

IsNaN.prototype = Object.create( Rule.prototype );
IsNaN.prototype.constructor = IsNaN ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.IsNaN
 * @inheritdoc
 */
IsNaN.prototype.eval = function ()
{
    if( this.strict)
    {
        return isNaN(this.value) ;
    }
    else
    {
        return !(this.value instanceof Number || typeof(this.value) === 'number') || isNaN(this.value)
    }
}