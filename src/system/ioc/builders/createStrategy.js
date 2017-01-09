"use strict" ;

import { ObjectStrategies } from '../ObjectStrategies.js' ;

import { ObjectFactoryMethod }         from '../strategies/ObjectFactoryMethod.js' ;
import { ObjectFactoryProperty }       from '../strategies/ObjectFactoryProperty.js' ;
import { ObjectReference }             from '../strategies/ObjectReference.js' ;
import { ObjectStaticFactoryMethod }   from '../strategies/ObjectStaticFactoryMethod.js' ;
import { ObjectStaticFactoryProperty } from '../strategies/ObjectStaticFactoryProperty.js' ;
import { ObjectValue }                 from '../strategies/ObjectValue.js' ;

/**
 * This helper create an <code>ObjectStrategy</code> object based on a specific generic object definition.
 * @memberof system.ioc.builders
 * @function
 * @private
 */
export function createStrategy( o )
{
    if ( ObjectStrategies.FACTORY_METHOD in o )
    {
        return ObjectFactoryMethod.build( o[ ObjectStrategies.FACTORY_METHOD ] ) ;
    }
    else if ( ObjectStrategies.FACTORY_PROPERTY in o )
    {
        return ObjectFactoryProperty.build( o[ ObjectStrategies.FACTORY_PROPERTY ] ) ;
    }
    else if ( ObjectStrategies.FACTORY_REFERENCE in o )
    {
        return new ObjectReference( o[ ObjectStrategies.FACTORY_REFERENCE ] ) ;
    }
    else if ( ObjectStrategies.FACTORY_VALUE in o )
    {
        return new ObjectValue( o[ ObjectStrategies.FACTORY_VALUE ] ) ;
    }
    else if ( ObjectStrategies.STATIC_FACTORY_METHOD  in o )
    {
        return ObjectStaticFactoryMethod.build( o[ ObjectStrategies.STATIC_FACTORY_METHOD ] ) ;
    }
    else if ( ObjectStrategies.STATIC_FACTORY_PROPERTY in o )
    {
        return ObjectStaticFactoryProperty.build( o[ ObjectStrategies.STATIC_FACTORY_PROPERTY ] ) ;
    }
    else
    {
        return null ;
    }
}