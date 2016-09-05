"use strict" ;

import { ObjectStrategy }  from './ObjectStrategy.js' ;

/**
 * This stategy get a reference in the IoC factory if the "factoryReference" attribute is used in the object definition.
 * @param ref {String] The reference id String representation of an objet definition in the factory.
 */
export function ObjectReference( ref )
{
    Object.defineProperties( this ,
    {
        ref : { value : (ref instanceof String) || typeof(ref) === 'string' ? ref : null , writable : true }
    }) ;
}

/**
 * @extends ObjectStrategy
 */
ObjectReference.prototype = Object.create( ObjectStrategy.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : ObjectReference },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return '[ObjectReference]' ; }}
}) ;