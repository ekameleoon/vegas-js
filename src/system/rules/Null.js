/* jshint eqnull: true */
"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates if the condition is null.
 * @name Null
 * @memberof system.rules
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @constructs
 * @param {object} [value=null] - The value to evaluate.
 * @param {boolean} [strict=false] - This flag indicates if the condition use <code>==</code> or <code>===</code> to evalute the value.
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
 */
export function Null( value = undefined , strict = false )
{
    /**
     * The value to evaluate.
     * @memberof system.rules.Null
     * @name value
     * @type {object}
     * @instance
     * @default undefined
     */
    this.value = value ;

    /**
     * The value to evaluate.
     * @memberof system.rules.Null
     * @name strict
     * @type {boolean}
     * @instance
     * @default false
     */
    this.strict = Boolean(strict) ;
}

Null.prototype = Object.create( Rule.prototype );
Null.prototype.constructor = Null ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Null
 * @inheritdoc
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