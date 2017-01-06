"use strict" ;

import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectMethod } from '../ObjectMethod.js' ;

import { createArguments } from '../builders/createArguments.js' ;

/**
 * This object create a static proxy factory configured in the ObjectDefinition and replace the natural factory of the ObjectFactory.
 * @param {string} type - The type of the static class use to create the object with a static method.
 * @param {string} name - The name of the static method to invoke to create the object.
 * @param {array} args - The array representation of allt the arguments to call with the object method.
 * @private
 * @name ObjectStaticFactoryMethod
 * @memberof system.ioc.strategies
 */
export function ObjectStaticFactoryMethod( type , name , args )
{
    ObjectMethod.call( this , name , args ) ;
    Object.defineProperties( this ,
    {
        /**
         * The static target reference.
         * @memberof system.ioc.strategies.ObjectStaticFactoryMethod
         * @instance
         */
        type : { value : type , writable : true }
    }) ;
}

ObjectStaticFactoryMethod.prototype = Object.create( ObjectMethod.prototype ,
{
    constructor : { value : ObjectStaticFactoryMethod , writable : true }
}) ;

Object.defineProperties( ObjectStaticFactoryMethod ,
{
    /**
     * Returns the ObjectStaticFactoryMethod representation of the specified generic object or null.
     * @return the ObjectStaticFactoryMethod representation of the specified generic object or null.
     * @memberof system.ioc.strategies.ObjectStaticFactoryMethod
     * @function
     */
    build :
    {
        value : function( o )
        {
            if ( o === null )
            {
                return null ;
            }
            if ( ( ObjectAttribute.TYPE in o ) && ( ObjectAttribute.NAME in o ) )
            {
                let strategy = new ObjectStaticFactoryMethod
                (
                    o[ ObjectAttribute.TYPE ] || null ,
                    o[ ObjectAttribute.NAME ] || null ,
                    createArguments( o[ ObjectAttribute.ARGUMENTS ] || null )
                ) ;
                return strategy ;
            }
            else
            {
                return null ;
            }
        }
    }
});