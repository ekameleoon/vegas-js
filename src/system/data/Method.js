"use strict" ;

import { Property } from './Property.js' ;

/**
 * Determinates a basic <b>method</b> definition.
 * @summary Determinates a basic <b>method</b> definition.
 * @name Method
 * @class
 * @memberof system.data
 * @implements system.data.Property
 * @param {string} name The name of the method.
 * @param {array} [arg=null] The optional array of arguments of the method.
 * @see system.data.Attribute
 * @see system.process.Cache
 */
export function Method( name = null , args = null )
{
    /**
     * The name of the method.
     * @name name
     * @memberof system.data.Method
     * @type {string}
     */
    this.name = (name instanceof String || typeof(name) === 'string') ? name : null ;

    /**
     * The optional array of arguments of the method.
     * @name args
     * @memberof system.data.Method
     * @type {array}
     */
    this.args = (args instanceof Array) ? args : null ;
}

Method.prototype = Object.create( Property.prototype );
Method.prototype.constructor = Method;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @name toString
 * @memberof system.data.Method
 * @function
 * @instance
 */
Method.prototype.toString = function () { return "[Method]" ; }