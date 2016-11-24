"use strict" ;

import { isEquatable } from '../Equatable.js' ;
import { Rule } from './Rule.js' ;

/**
 * Used to perform a logical conjunction on two conditions and more.
 * @name Equals
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @param {Object|system.rules.Rule|system.Equatable} [value1=null] - The first value to evaluate.
 * @param {Object|system.rules.Rule|system.Equatable} [value2=null] - The second value to evaluate.
 * @example
 * var BooleanRule = system.rules.BooleanRule ;
 * var Equals      =  system.rules.Equals ;
 *
 * var e ;
 *
 * ///// Compares objects.
 *
 * e = new Equals( 1 , 1 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new Equals( 1 , 2 ) ;
 * trace( e.eval() ) ; // false
 *
 * ///// Compares Rule objects.
 *
 * var cond1 = new BooleanRule( true  ) ;
 * var cond2 = new BooleanRule( false ) ;
 * var cond3 = new BooleanRule( true  ) ;
 *
 * e = new Equals( cond1 , cond1 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new Equals( cond1 , cond2 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new Equals( cond1 , cond3 ) ;
 * trace( e.eval() ) ; // true
 *
 * ///// Compares Equatable objects.
 *
 * var equals = function( o )
 * {
 *     return this.id === o.id ;
 * }
 *
 * var o1 = { id:1 , equals:equals } ;
 * var o2 = { id:2 , equals:equals } ;
 * var o3 = { id:1 , equals:equals } ;
 *
 * e = new Equals( o1 , o1 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new Equals( o1 , o2 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new Equals( o1 , o3 ) ;
 * trace( e.eval() ) ; // true
 */
export function Equals( value1 = null , value2 = null )
{
    /**
     * The first value to evaluate.
     * @memberof system.rules.Equals
     * @name value1
     * @type {Object|system.rules.Rule|system.Equatable}
     * @instance
     * @default null
     */
    this.value1 = value1 ;
    /**
     * The second value to evaluate.
     * @memberof system.rules.Equals
     * @name value2
     * @type {Object|system.rules.Rule|system.Equatable}
     * @instance
     * @default null
     */
    this.value2 = value2 ;
}

Equals.prototype = Object.create( Rule.prototype );
Equals.prototype.constructor = Equals ;

/**
 * Evaluates the specified object.
 * @memberof system.rules.Equals
 * @inheritdoc
 */
Equals.prototype.eval = function ()
{
    if ( this.value1 === this.value2 )
    {
        return true ;
    }
    else if ( (this.value1 instanceof Rule) && (this.value2 instanceof Rule) )
    {
        return this.value1.eval() === this.value2.eval() ;
    }
    else if ( isEquatable(this.value1) )
    {
        return this.value1.equals( this.value2 ) ;
    }
    else
    {
        return false ;
    }
}