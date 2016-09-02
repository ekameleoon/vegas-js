"use strict" ;

import { Property } from './Property.js' ;

/**
 * Determinates an "attribute" value object.
 * @param name The name of the attribute.
 * @param value The value of the attribute.
 */
export function Attribute( name , value )
{
    this.name  = name ;
    this.value = value ;
}

/**
 * @extends Object
 */
Attribute.prototype = Object.create( Property.prototype );
Attribute.prototype.constructor = Attribute;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Attribute.prototype.toString = function () /*String*/
{
    return "[Attribute]" ;
}