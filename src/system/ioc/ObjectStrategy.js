"use strict" ;

/**
 * Defines a custom factory strategy to build the objects.
 * @name ObjectStrategy
 * @class
 * @memberof system.ioc
 */
export function ObjectStrategy() {}

ObjectStrategy.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : ObjectStrategy },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @memberof system.ioc.ObjectStrategy
     * @function
     * @instance
     */
    toString : { writable : true , value : function () { return '[' + this.constructor.name + ']' ; } }
}) ;