"use strict" ;

import { Property } from './Property.js' ;

/**
 * Determinates a basic <b>attribute</b> definition.
 * @summary Determinates a basic <b>attribute</b> definition.
 * @name Attribute
 * @class
 * @memberof system.data
 * @implements system.data.Property
 * @param {string} name The name of the attribute.
 * @param {*} value The value of the attribute.
 * @see system.data.Method
 * @see system.process.Cache
 */
export function Attribute( name = null , value = undefined )
{
    /**
     * The name of the attribute.
     * @name name
     * @memberof system.data.Attribute
     * @type {string}
     */
    this.name = (name instanceof String || typeof(name) === 'string') ? name : null ;

    /**
     * The value of the attribute.
     * @name name
     * @memberof system.data.Attribute
     * @type {*}
     */
    this.value = value ;
}

Attribute.prototype = Object.create( Property.prototype );
Attribute.prototype.constructor = Attribute;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @name toString
 * @memberof system.data.Attribute
 * @function
 * @instance
 */
Attribute.prototype.toString = function () { return "[Attribute]" ; }