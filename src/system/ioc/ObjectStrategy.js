"use strict" ;

/**
 * Defines factory strategies in the factory.
 */
export function ObjectStrategy() {}

/**
 * @extends Object
 */
ObjectStrategy.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value :  ObjectStrategy , writable : true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return "[ObjectStrategy]" ; } , writable : true }
}) ;