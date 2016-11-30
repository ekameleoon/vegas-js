"use strict" ;

import { ObjectStrategy }  from '../ObjectStrategy.js' ;

/**
 * This stategy get a reference in the IoC factory if the "factoryReference" attribute is used in the object definition.
 * @param ref {String] The reference id String representation of an objet definition in the factory.
 * @private
 * @name ObjectReference
 * @memberof system.ioc.strategies
 */
export function ObjectReference( ref )
{
    Object.defineProperties( this ,
    {
        ref : { value : (ref instanceof String) || typeof(ref) === 'string' ? ref : null , writable : true }
    }) ;
}

ObjectReference.prototype = Object.create( ObjectStrategy.prototype ,
{
    constructor : { value : ObjectReference },

    toString : { value : function () { return '[ObjectReference]' ; }}
}) ;