"use strict" ;

import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectMethod } from '../ObjectMethod.js' ;

import { createArguments } from '../builders/createArguments.js' ;

/**
 * This object defines a property definition in the object definitions.
 * @param factory The string name of the reference in the factory used to create the object.
 * @param name The name of the static method to invoke to create the object.
 * @param arguments The array of the arguments to passed-in the factory method.
 */
export function ObjectFactoryMethod( factory /*String*/ , name /*String*/ , args /*Array*/ )
{
    ObjectMethod.call( name , args ) ;
    Object.defineProperties( this ,
    {
        /**
         * The factory string representation of the reference of this factory method object.
         */
        factory : { value : factory , writable : true }
    }) ;
}

Object.defineProperties( ObjectFactoryMethod ,
{
    /**
     * Returns the ObjectFactoryMethod representation of the specified generic object or null.
     * @return the ObjectFactoryMethod representation of the specified generic object or null.
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

/**
 * @extends ObjectMethod
 */
ObjectFactoryMethod.prototype = Object.create( ObjectMethod.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : ObjectFactoryMethod , writable : true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return '[ObjectFactoryMethod]' ; } , writable : true  }
}) ;