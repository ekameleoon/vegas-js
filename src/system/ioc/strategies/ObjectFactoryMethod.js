"use strict" ;

import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectMethod } from '../ObjectMethod.js' ;

import { createArguments } from '../builders/createArguments.js' ;

/**
 * This object defines a property definition in the object definitions.
 * @param {string} factory - The string name of the reference in the factory used to create the object.
 * @param {string} name - The name of the static method to invoke to create the object.
 * @param {array} args - The array of the arguments to passed-in the factory method.
 * @private
 * @name ObjectFactoryMethod
 * @memberof system.ioc.strategies
 * @extends system.ioc.ObjectMethod
 */
export function ObjectFactoryMethod( factory , name , args )
{
    ObjectMethod.call( this , name , args ) ;
    Object.defineProperties( this ,
    {
        /**
         * The factory string representation of the reference of this factory method object.
         * @memberof system.ioc.strategies.ObjectFactoryMethod
         * @instance
         */
        factory : { value : factory , writable : true }
    }) ;
}

ObjectFactoryMethod.prototype = Object.create( ObjectMethod.prototype ,
{
    constructor : { value : ObjectFactoryMethod , writable : true }
});

Object.defineProperties( ObjectFactoryMethod ,
{
    /**
     * Returns the ObjectFactoryMethod representation of the specified generic object or null.
     * @return the ObjectFactoryMethod representation of the specified generic object or null.
     * @memberof system.ioc.strategies.ObjectFactoryMethod
     * @function
     */
    build :
    {
        value : function( o ) /*ObjectFactoryMethod*/
        {
            if ( o === null )
            {
                return null ;
            }
            if ( (ObjectAttribute.FACTORY in o) && (ObjectAttribute.NAME in o) )
            {
                return new ObjectFactoryMethod
                (
                    o[ ObjectAttribute.FACTORY || null ],
                    o[ ObjectAttribute.NAME    || null ],
                    createArguments( o[ ObjectAttribute.ARGUMENTS ] || null )
                ) ;
            }
            else
            {
                return null ;
            }
        }
    }
});