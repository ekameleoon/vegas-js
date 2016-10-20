"use strict" ;

import { Lockable } from "../process/Lockable.js" ;

/**
 *  The Model interface defines all models in the application.
 */
export function Model()
{

}

/**
 * @extends Lockable
 */
Model.prototype = Object.create( Lockable.prototype );
Model.prototype.constructor = Model;

/**
 * Returns true if the specific value is valid.
 * @return true if the specific value is valid.
 */
Model.prototype.supports = function( value ) /*Boolean*/
{
    return value === value ;
}

/**
 * Evaluates the specified value and throw an Error object if the value is not valid.
 * @throws Error if the value is not valid.
 */
Model.prototype.validate = function ( value ) /*void*/
{
    if ( !this.supports( value ) )
    {
        throw new Error( this + " validate(" + value + ") is mismatch." ) ;
    }
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Model.prototype.toString = function () /*String*/
{
    return '[' + this.constructor.name + ']' ;
}