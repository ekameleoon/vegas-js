"use strict" ;

import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectProperty }  from '../ObjectProperty.js' ;

/**
 * This object defines a property definition in the object definitions.
 * @param {string} factory - The string name of the reference in the factory used to create the object.
 * @param {string} name - The name of the property.
 * @param {array} evaluators - The Array representation of all evaluators who evaluate the value of the property.
 * @private
 * @name ObjectFactoryProperty
 * @memberof system.ioc.strategies
 * @extends system.ioc.ObjectStrategy
 */
export function ObjectFactoryProperty( factory  , name  , evaluators  = null )
{
    ObjectProperty.call( this , name , null, null, evaluators ) ;
    Object.defineProperties( this ,
    {
        factory : { value : factory , writable : true }
    }) ;
}

ObjectFactoryProperty.prototype = Object.create( ObjectProperty.prototype ,
{
    constructor : { writable : true , value : ObjectFactoryProperty }
}) ;

Object.defineProperties( ObjectFactoryProperty ,
{
    /**
     * Returns the ObjectFactoryProperty representation of the specified generic object or null.
     * @return the ObjectFactoryProperty representation of the specified generic object or null.
     * @memberof system.ioc.strategies.ObjectFactoryProperty
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