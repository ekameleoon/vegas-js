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
        value : { writable : true , value : value }
    }) ;
}

ObjectValue.prototype = Object.create( ObjectStrategy.prototype ,
{
    constructor : { writable : true , value : ObjectValue }
}) ;