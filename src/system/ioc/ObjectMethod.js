"use strict" ;

import { ObjectStrategy }  from './ObjectStrategy.js' ;

/**
 * This object defines a method definition with a method name and this arguments.
 * @name ObjectMethod
 * @class
 * @extends system.ioc.ObjectStrategy
 * @memberof system.ioc
 * @param {string} name - The name of the method to invoke.
 * @param {array} args - The array of the arguments to passed-in the method.
 */
export function ObjectMethod( name , args )
{
    Object.defineProperties( this ,
    {
        /**
         * The optional <code>Array</code> representation of all arguments passed-in the method.
         * @name args
         * @memberof system.ioc.ObjectMethod
         * @instance
         * @type Array
         */
        args : { value : args , writable : true } ,

        /**
         * The name of the method.
         * @name name
         * @memberof system.ioc.ObjectMethod
         * @instance
         * @type string
         */
        name : { value : name , writable : true }
    }) ;
}

ObjectMethod.prototype = Object.create( ObjectStrategy.prototype ,
{
    constructor : { value : ObjectMethod , writable : true }
}) ;