"use strict" ;

import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectProperty }  from '../ObjectProperty.js' ;

/**
 * This object create a static proxy factory configured in the IObjectDefinition and replace the natural factory of the ObjectFactory.
 * @param type The type of the static class use to create the object reference with a static property or constant.
 * @param name The name of the static property or constant to invoke to create the object "reference".
 * @param evaluators The Array representation of all evaluators who evaluate the value of the property.
 * @private
 * @name ObjectStaticFactoryProperty
 * @memberof @memberof system.ioc.strategies
 * @extends system.ioc.ObjectProperty
 */
export function ObjectStaticFactoryProperty( name  , type  , evaluators  = null )
{
    ObjectProperty.call( this , name , null, null, evaluators ) ;
    Object.defineProperties( this ,
    {
        type : { value : type , writable : true }
    }) ;
}

ObjectStaticFactoryProperty.prototype = Object.create( ObjectProperty.prototype ,
{
    constructor : { value : ObjectStaticFactoryProperty , writable : true }
}) ;

Object.defineProperties( ObjectStaticFactoryProperty ,
{
    /**
     * Returns the ObjectStaticFactoryProperty representation of the specified generic object or null.
     * @return the ObjectStaticFactoryProperty representation of the specified generic object or null.
     * @memberof system.ioc.strategies.ObjectStaticFactoryProperty
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