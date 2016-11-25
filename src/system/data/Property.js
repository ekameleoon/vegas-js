"use strict" ;

/**
 * This interface should be implemented by any properties definition object.
 * @name Property
 * @interface
 * @memberof system.data
 * @see system.data.Attribute
 * @see system.data.Method
 * @see system.process.Cache
 */
export function Property()
{

}

Property.prototype = Object.create( Object.prototype );
Property.prototype.constructor = Property;