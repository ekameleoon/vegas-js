"use strict" ;

import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectProperty }  from '../ObjectProperty.js' ;

/**
 * This object create a static proxy factory configured in the IObjectDefinition and replace the natural factory of the ObjectFactory.
 * @param type The type of the static class use to create the object reference with a static property or constant.
 * @param name The name of the static property or constant to invoke to create the object "reference".
 * @param evaluators The Array representation of all evaluators who evaluate the value of the property.
 */
export function ObjectStaticFactoryProperty( name /*String*/ , type /*String*/ , evaluators /*Array*/ = null )
{
    ObjectProperty.call( name , null, null, evaluators ) ;
    Object.defineProperties( this ,
    {
        /**
         * The string representation of the type name of the static factory class.
         */
        type : { value : type , writable : true }
    }) ;
}

Object.defineProperties( ObjectStaticFactoryProperty ,
{
    /**
     * Returns the ObjectStaticFactoryProperty representation of the specified generic object or null.
     * @return the ObjectStaticFactoryProperty representation of the specified generic object or null.
     */
    build :
    {
        value : function( o ) /*ObjectStaticFactoryProperty*/
        {
            if ( o === null )
            {
                return null ;
            }
            if ( (ObjectAttribute.TYPE in o) && (ObjectAttribute.NAME in o) )
            {
                return new ObjectStaticFactoryProperty
                (
                    o[ ObjectAttribute.NAME       ] || null ,
                    o[ ObjectAttribute.TYPE       ] || null ,
                    o[ ObjectAttribute.EVALUATORS ] || null
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
 * @extends ObjectProperty
 */
ObjectStaticFactoryProperty.prototype = Object.create( ObjectProperty.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : ObjectStaticFactoryProperty , writable : true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return '[ObjectStaticFactoryProperty]' ; } , writable : true  }
}) ;