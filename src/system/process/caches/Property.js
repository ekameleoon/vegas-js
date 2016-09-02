"use strict" ;

/**
 * This interface should be implemented by any properties definition object.
 */
export function Property()
{

}
/**
 * @extends Object
 */
Property.prototype = Object.create( Object.prototype );
Property.prototype.constructor = Property;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
Property.prototype.toString = function () /*String*/
{
    return "[Property]" ;
}