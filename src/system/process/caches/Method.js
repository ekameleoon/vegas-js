"use strict" ;

import { Property } from './Property.js' ;

/**
 * Determinates a "method" value object.
 * @param name The name of the method.
 * @param arg The optional array of arguments of the method.
 */
export function Method( name , args )
{
    this.name  = name ;
    this.args  = args ;
}

/**
 * @extends Object
 */
Method.prototype = Object.create( Property.prototype );
Method.prototype.constructor = Method;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Method.prototype.toString = function () /*String*/
{
    return "[Method]" ;
}