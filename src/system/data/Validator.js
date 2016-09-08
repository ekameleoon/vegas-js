/*jshint laxbreak : true*/
/*jshint unused   : false*/
"use strict" ;

export function isValidator( target )
{
    if( target )
    {
        return (target instanceof Validator)
             || (('supports' in target) && target.supports instanceof Function)
             || (('validate' in target) && target.validate instanceof Function) ;
    }

    return false ;
}

/**
 * Defines the methods that objects that participate in a validation operation.
 */
export function Validator()
{
    //
}

/**
 * @extends Object
 */
Validator.prototype = Object.create( Object.prototype ) ;
Validator.prototype.constructor = Validator ;

/**
 * Returns true if the specific value is valid.
 * @return true if the specific value is valid.
 */
Validator.prototype.supports = function( value ) /*Boolean*/ {}

/**
 * Evaluates the specified value and throw an Error object if the value is not valid.
 * @throws Error if the value is not valid.
 */
Validator.prototype.validate = function ( value ) /*void*/ {}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance
 */
Validator.prototype.toString = function () { return '[Validator]' ; }