"use strict" ;

import { createArguments }  from './createArguments.js' ;
import { createListeners }  from './createListeners.js' ;
import { createProperties } from './createProperties.js' ;
import { createReceivers }  from './createReceivers.js' ;
import { createStrategy }   from './createStrategy.js' ;

import { ObjectDefinition } from '../ObjectDefinition.js' ;
import { ObjectAttribute } from '../ObjectAttribute.js' ;

/**
 * Creates a new ObjectDefinition instance and populated it with the specified init object in argument.
 * @param o A generic object to populate the new ObjectDefinition instance.
 * @return An ObjectDefinition instance.
 * @memberof system.ioc.builders
 * @function
 * @private
 */
export function createObjectDefinition( o )
{
    let definition = new ObjectDefinition
    (
        o[ ObjectAttribute.OBJECT_ID ]        || null ,
        o[ ObjectAttribute.TYPE ]             || null ,
        o[ ObjectAttribute.OBJECT_SINGLETON ] || false ,
        o[ ObjectAttribute.LAZY_INIT ]        || false
    ) ;

    if( (ObjectAttribute.IDENTIFY in o) && (o[ ObjectAttribute.IDENTIFY ] instanceof Boolean || typeof(o[ ObjectAttribute.IDENTIFY ]) === 'boolean') )
    {
        definition.identify = o[ ObjectAttribute.IDENTIFY ] ;
    }

    if( (ObjectAttribute.LOCK in o) && (o[ ObjectAttribute.LOCK ] instanceof Boolean || typeof(o[ ObjectAttribute.LOCK ]) === 'boolean') )
    {
        definition.lock = o[ ObjectAttribute.LOCK ] ;
    }

    if( (ObjectAttribute.ARGUMENTS in o ) && ( o[ ObjectAttribute.ARGUMENTS ] instanceof Array ) )
    {
        definition.constructorArguments = createArguments( o[ ObjectAttribute.ARGUMENTS ] );
    }

    if( ObjectAttribute.OBJECT_DESTROY_METHOD_NAME in o )
    {
        definition.destroyMethodName = o[ ObjectAttribute.OBJECT_DESTROY_METHOD_NAME ] ;
    }

    if( ObjectAttribute.OBJECT_INIT_METHOD_NAME in o )
    {
        definition.initMethodName = o[ ObjectAttribute.OBJECT_INIT_METHOD_NAME ] ;
    }

    if( ObjectAttribute.OBJECT_SCOPE in o )
    {
        definition.scope = o[ ObjectAttribute.OBJECT_SCOPE ] ;
    }

    if( (ObjectAttribute.OBJECT_DEPENDS_ON in o) && ( o[ ObjectAttribute.OBJECT_DEPENDS_ON ] instanceof Array ) )
    {
        definition.dependsOn = o[ ObjectAttribute.OBJECT_DEPENDS_ON ] ;
    }

    if( (ObjectAttribute.OBJECT_GENERATES in o) && (o[ ObjectAttribute.OBJECT_GENERATES ] instanceof Array) )
    {
        definition.generates = o[ ObjectAttribute.OBJECT_GENERATES ] ;
    }

    let listeners = createListeners( o ) ;
    if( listeners )
    {
        definition.listeners = listeners ;
    }

    let properties = createProperties( o ) ;
    if( properties )
    {
        definition.properties = properties ;
    }

    let receivers = createReceivers( o ) ;
    if( receivers )
    {
        definition.receivers = receivers ;
    }

    let strategy = createStrategy( o ) ;
    if( strategy )
    {
        definition.strategy = strategy ;
    }

    return definition ;
}