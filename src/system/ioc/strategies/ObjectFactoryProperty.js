"use strict" ;

import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectProperty }  from '../ObjectProperty.js' ;

/**
 * This object defines a property definition in the object definitions.
 * @param factory The string name of the reference in the factory used to create the object.
 * @param name The name of the property.
 * @param evaluators The Array representation of all evaluators who evaluate the value of the property.
 */
export function ObjectFactoryProperty( factory /*String*/ , name /*String*/ , evaluators /*Array*/ = null )
{
    ObjectProperty.call( name , null, null, evaluators ) ;
    Object.defineProperties( this ,
    {
        /**
         * The factory string representation of the reference of this factory method object.
         */
        factory : { value : factory , writable : true }
    }) ;
}

Object.defineProperties( ObjectFactoryProperty ,
{
    /**
     * Returns the ObjectFactoryProperty representation of the specified generic object or null.
     * @return the ObjectFactoryProperty representation of the specified generic object or null.
     */
    build :
    {
        value : function( o ) /*ObjectFactoryProperty*/
        {
            if ( o === null )
            {
                return null ;
            }
            if ( (ObjectAttribute.FACTORY in o) && (ObjectAttribute.NAME in o) )
            {
                return new ObjectFactoryProperty
                (
                    o[ ObjectAttribute.FACTORY    ] || null ,
                    o[ ObjectAttribute.NAME       ] || null ,
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
ObjectFactoryProperty.prototype = Object.create( ObjectProperty.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : ObjectFactoryProperty , writable : true },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return '[ObjectFactoryProperty]' ; } , writable : true  }
}) ;