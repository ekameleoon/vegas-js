/*jshint laxbreak : true*/
/*jshint unused   : false*/
"use strict" ;

/**
 * Indicates if the specific <code>target</code> is a {@link system.data.Validator|Validator} object.
 * @name isValidator
 * @memberof system.data
 * @function
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is a {@link system.data.Validator|Validator}.
 */
export function isValidator( target )
{
    if( target )
    {
        if (target instanceof Validator)
        {
            return true ;
        }
        return (('supports' in target) && target.supports instanceof Function)
            && (('validate' in target) && target.validate instanceof Function) ;
    }
    return false ;
}

/**
 * Defines the methods that objects that participate in a validation operation.
 * @name Validator
 * @interface
 * @memberof system.data
 */
export function Validator() {}

Validator.prototype = Object.create( Object.prototype ) ;
Validator.prototype.constructor = Validator ;

/**
 * Indicates if the validator supports the passed-in value.
 * @param {*} value - The value to evaluate.
 * @return <code>true</code> if the specific value is valid.
 * @memberof system.data.Validator
 * @function
 */
Validator.prototype.supports = function( value ) {}

/**
 * Evaluates the specified value and throw an <code>Error</code> if the value is not valid.
 * @param {*} value - The value to evaluate.
 * @memberof system.data.Validator
 * @function
 * @throws <code>Error</code> if the value is not valid.
 */
Validator.prototype.validate = function ( value ) /*void*/ {}