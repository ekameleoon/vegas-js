"use strict" ;

import { ObjectStrategy }  from './ObjectStrategy.js' ;

/**
 * This stategy object set an object in the IoC factory with an easy value if the attribute "factoryValue" is used in the object definition.
 * @param value The value object.
 */
export function ObjectValue( value )
{
    Object.defineProperties( this ,
    {
        value : { value : value , writable : true }
    }) ;
}

/**
 * @extends Object
 */
ObjectValue.prototype = Object.create( ObjectStrategy.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : ObjectValue },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return '[ObjectValue]' ; }}
}) ;