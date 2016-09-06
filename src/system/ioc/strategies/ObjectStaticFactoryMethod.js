"use strict" ;

import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectMethod } from '../ObjectMethod.js' ;

import { createArguments } from '../builders/createArguments.js' ;

/**
 * This object create a static proxy factory configured in the ObjectDefinition and replace the natural factory of the ObjectFactory.
 * @param type The type of the static class use to create the object with a static method.
 * @param name The name of the static method to invoke to create the object.
 * @param args The array representation of allt the arguments to call with the object method.
 */
export function ObjectStaticFactoryMethod( type /*String*/ , name /*String*/ , args /*Array*/ )
{
    ObjectMethod.call( name , args ) ;
    Object.defineProperties( this ,
    {
        /**
         * The factory string representation of the reference of this factory method object.
         */
        type : { value : type , writable : true }
    }) ;
}

Object.defineProperties( ObjectStaticFactoryMethod ,
{
    /**
     * Returns the ObjectStaticFactoryMethod representation of the specified generic object or null.
     * @return the ObjectStaticFactoryMethod representation of the specified generic object or null.
     */
    build :
    {
        value : function( o ) /*ObjectStaticFactoryMethod*/
        {
            if ( o === null )
            {
                return null ;
            }
            if ( o.hasOwnProperty(ObjectAttribute.TYPE) && o.hasOwnProperty(ObjectAttribute.NAME) )
            {
                return new ObjectStaticFactoryMethod
                (
                    o[ ObjectAttribute.TYPE ] || null ,
                    o[ ObjectAttribute.NAME ] || null ,
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

/**
 * @extends ObjectMethod
 */
ObjectStaticFactoryMethod.prototype = Object.create( ObjectMethod.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : ObjectStaticFactoryMethod , writable : true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return '[ObjectStaticFactoryMethod]' ; } , writable : true  }
}) ;