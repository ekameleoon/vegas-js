"use strict" ;

/**
 * Defines factory strategies in the factory.
 * @name ObjectStrategy
 * @class
 * @memberof system.ioc
 */
export function ObjectStrategy() {}

ObjectStrategy.prototype = Object.create( Object.prototype ,
{
    constructor : { value :  ObjectStrategy , writable : true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @memberof system.ioc.ObjectStrategy
     * @function
     * @instance
     */
    toString : { value : function () { return '[' + this.constructor.name + ']' ; } , writable : true }
}) ;