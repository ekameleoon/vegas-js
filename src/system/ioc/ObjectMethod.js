"use strict" ;

import { ObjectStrategy }  from './ObjectStrategy.js' ;

/**
 * This object defines a method definition with a method name and this arguments.
 * @param name The name of the method to invoke.
 * @param arguments The array of the arguments to passed-in the method.
 */
export function ObjectMethod( name /*String*/ , args /*Array*/ )
{
    Object.defineProperties( this ,
    {
        /**
         * The optional Array representation of all evaluators to transform the value of this object.
         */
        args : { value : args , writable : true } ,

        /**
         * The name of the property.
         */
        name : { value : name , writable : true }
    }) ;
}

/**
 * @extends Object
 */
ObjectMethod.prototype = Object.create( ObjectStrategy.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : ObjectMethod , writable : true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return '[ObjectMethod]' ; } , writable : true  }
}) ;