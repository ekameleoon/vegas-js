"use strict" ;

import { dump } from '../../../core/dump.js' ;
import { logger } from '../logger.js' ;
import { Logger } from '../../logging/Logger.js' ;
import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectListener } from '../ObjectListener.js' ;
import { ObjectOrder } from '../ObjectOrder.js' ;

/**
 * Creates the Array of all listeners defines in the passed-in factory object definition.
 * @return the Array of all listeners defines in the passed-in factory object definition.
 */
export function createListeners( factory ) /*Array*/
{
    if ( !factory )
    {
        return null ;
    }

    var a = null ;

    if ( factory instanceof Array )
    {
        a = factory ;
    }
    else if( factory.hasOwnProperty( ObjectAttribute.OBJECT_LISTENERS ) && (factory[ ObjectAttribute.OBJECT_LISTENERS ] instanceof Array ) )
    {
        a = factory[ ObjectAttribute.OBJECT_LISTENERS ] ;
    }

    if ( a === null || a.length === 0 )
    {
        return null ;
    }

    var def ;
    var dispatcher ;
    var type ;

    var listeners = [] ;

    var id = String(factory[ ObjectAttribute.OBJECT_ID ]) ;
    var len = a.length ;

    for ( var i = 0 ; i<len ; i++ )
    {
        def = a[i] ;
        if ( def !== null && def.hasOwnProperty(ObjectListener.DISPATCHER) && def.hasOwnProperty(ObjectListener.TYPE) )
        {
            dispatcher = def[ ObjectListener.DISPATCHER ] ;
            if ( dispatcher === null || dispatcher.length === 0 )
            {
                continue ;
            }
            type = def[ ObjectListener.TYPE ] ;
            if ( type === null || type.length === 0 )
            {
                continue ;
            }
            listeners.push
            (
                new ObjectListener
                (
                    dispatcher , type , def[ ObjectListener.METHOD ] ,
                    def[ ObjectListener.USE_CAPTURE ] === true , def[ ObjectListener.ORDER ] === ObjectOrder.BEFORE ? ObjectOrder.BEFORE : ObjectOrder.AFTER
                )
            ) ;
        }
        else
        {
            if( logger instanceof Logger)
            {
                logger.warn
                (
                    "ObjectBuilder.createListeners failed, a listener definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}" ,
                    id ,
                    i ,
                    dump( def )
                ) ;
            }
        }
    }
    return ( listeners.length > 0 ) ? listeners : null ;
}