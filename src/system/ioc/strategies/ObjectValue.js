"use strict" ;

import { ObjectStrategy }  from '../ObjectStrategy.js' ;

/**
 * This stategy object set an object in the IoC factory with an easy value if the attribute "factoryValue" is used in the object definition.
 * @param value The value object.
 * @private
 * @name ObjectValue
 * @memberof system.ioc.strategies
 * @extends system.ioc.ObjectStrategy
 */
export function ObjectValue( value )
{
    Object.defineProperties( this ,
    {
        value : { value : value , writable : true }
    }) ;
}

ObjectValue.prototype = Object.create( ObjectStrategy.prototype ,
{
    constructor : { value : ObjectValue },

    toString : { value : function () { return '[ObjectValue]' ; }}
}) ;