"use strict" ;

import { isEquatable } from '../Equatable.js' ;
import { Rule } from './Rule.js' ;

/**
 * Used to perform a logical conjunction on two conditions and more.
 * @param value1 The first value to evaluate.
 * @param value2 The second value to evaluate.
 * @example
 * <pre>
 * var BooleanRule = system.rules.BooleanRule ;
 * var NotEquals      =  system.rules.NotEquals ;
 *
 * var e ;
 *
 * ///// Compares objects.
 *
 * e = new NotEquals( 1 , 1 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new NotEquals( 1 , 2 ) ;
 * trace( e.eval() ) ; // true
 *
 * ///// Compares Rule objects.
 *
 * var cond1 = new BooleanRule( true  ) ;
 * var cond2 = new BooleanRule( false ) ;
 * var cond3 = new BooleanRule( true  ) ;
 *
 * e = new NotEquals( cond1 , cond1 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new NotEquals( cond1 , cond2 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new NotEquals( cond1 , cond3 ) ;
 * trace( e.eval() ) ; // false
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
 * e = new NotEquals( o1 , o1 ) ;
 * trace( e.eval() ) ; // false
 *
 * e = new NotEquals( o1 , o2 ) ;
 * trace( e.eval() ) ; // true
 *
 * e = new NotEquals( o1 , o3 ) ;
 * trace( e.eval() ) ; // false
 * </pre>
 */
export function NotEquals( value1 = null , value2 = null )
{
    this.value1 = value1 ;
    this.value2 = value2 ;
}

/**
 * @extends Rule
 */
NotEquals.prototype = Object.create( Rule.prototype );
NotEquals.prototype.constructor = NotEquals ;

/**
 * Evaluates the specified object.
 */
NotEquals.prototype.eval = function ()
{
    if ( this.value1 === this.value2 )
    {
        return false ;
    }
    else if ( (this.value1 instanceof Rule) && (this.value2 instanceof Rule) )
    {
        return this.value1.eval() !== this.value2.eval() ;
    }
    else if ( isEquatable(this.value1) )
    {
        return !(this.value1.equals( this.value2 )) ;
    }
    else
    {
        return true ;
    }
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
NotEquals.prototype.toString = function () /*String*/
{
    return "[NotEquals]" ;
}