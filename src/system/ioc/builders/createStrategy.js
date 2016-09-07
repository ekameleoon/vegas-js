"use strict" ;

import { ObjectAttribute } from '../ObjectAttribute.js' ;

import { ObjectFactoryMethod }         from '../strategies/ObjectFactoryMethod.js' ;
import { ObjectFactoryProperty }       from '../strategies/ObjectFactoryProperty.js' ;
import { ObjectReference }             from '../strategies/ObjectReference.js' ;
import { ObjectStaticFactoryMethod }   from '../strategies/ObjectStaticFactoryMethod.js' ;
import { ObjectStaticFactoryProperty } from '../strategies/ObjectStaticFactoryProperty.js' ;
import { ObjectValue }                 from '../strategies/ObjectValue.js' ;

/**
 * This helper create an ObjectStrategy object with a generic object in the IoC context.
 */
export function createStrategy( o ) /*ObjectStrategy*/
{
    switch( true )
    {
        case ( ObjectAttribute.OBJECT_FACTORY_METHOD in o )  :
        {
            return ObjectFactoryMethod.build( o[ ObjectAttribute.OBJECT_FACTORY_METHOD ] ) ;
        }
        case ( ObjectAttribute.OBJECT_FACTORY_PROPERTY  in o )  :
        {
            return ObjectFactoryProperty.build( o[ ObjectAttribute.OBJECT_FACTORY_PROPERTY ] ) ;
        }
        case ( ObjectAttribute.OBJECT_STATIC_FACTORY_METHOD  in o )  :
        {
            return ObjectStaticFactoryMethod.build( o[ ObjectAttribute.OBJECT_STATIC_FACTORY_METHOD ] ) ;
        }
        case ( ObjectAttribute.OBJECT_STATIC_FACTORY_PROPERTY in o )  :
        {
            return ObjectStaticFactoryProperty.build( o[ ObjectAttribute.OBJECT_STATIC_FACTORY_PROPERTY ] ) ;
        }
        case ( ObjectAttribute.OBJECT_FACTORY_REFERENCE in o )  :
        {
            return ObjectReference.build( o[ ObjectAttribute.OBJECT_FACTORY_REFERENCE ] ) ;
        }
        case ( ObjectAttribute.OBJECT_FACTORY_VALUE in o )  :
        {
            return ObjectValue.build( o[ ObjectAttribute.OBJECT_FACTORY_VALUE ] ) ;
        }
        default :
        {
            return null ;
        }
    }
}