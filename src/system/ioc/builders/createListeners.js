"use strict" ;

import { dump } from '../../../core/dump.js' ;
import { logger } from '../logger.js' ;
import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectListener } from '../ObjectListener.js' ;
import { ObjectOrder } from '../ObjectOrder.js' ;

/**
 * Creates the Array of all listeners defines in the passed-in factory object definition.
 * @return the Array of all listeners defines in the passed-in factory object definition.
 * @memberof system.ioc.builders
 * @function
 * @private
 */
export function createListeners( factory )
{
    if ( !factory )
    {
        return null ;
    }

    let a = null ;

    if ( factory instanceof Array )
    {
        a = factory ;
    }
    else if( ( ObjectAttribute.LISTENERS in factory ) && (factory[ ObjectAttribute.LISTENERS ] instanceof Array ) )
    {
        a = factory[ ObjectAttribute.LISTENERS ] ;
    }

    if ( a === null || a.length === 0 )
    {
        return null ;
    }

    let def ;
    let dispatcher ;
    let type ;

    let listeners = [] ;

    let id = String(factory[ ObjectAttribute.ID ]) ;
    let len = a.length ;

    for ( let i = 0 ; i<len ; i++ )
    {
        def = a[i] ;
        if ( def !== null && (ObjectListener.DISPATCHER in def) && (ObjectListener.TYPE in def) )
        {
            dispatcher = def[ ObjectListener.DISPATCHER ] ;
            if ( !(dispatcher instanceof String || typeof(dispatcher) === 'string') || dispatcher.length === 0 )
            {
                continue ;
            }
            type = def[ ObjectListener.TYPE ] ;
            if ( !(type instanceof String || typeof(type) === 'string') || type.length === 0 )
            {
                continue ;
            }
            listeners.push
            (
                new ObjectListener
                (
                    dispatcher , type ,
                    def[ ObjectListener.METHOD ] ,
                    def[ ObjectListener.USE_CAPTURE ] === true ,
                    (def[ ObjectListener.ORDER ] === ObjectOrder.BEFORE) ? ObjectOrder.BEFORE : ObjectOrder.AFTER ,
                    isNaN(def[ ObjectListener.PRIORITY ]) ? 0 : def[ ObjectListener.PRIORITY ]
                )
            ) ;
        }
        else
        {
            if( logger )
            {
                logger.warning
                (
                    "ObjectBuilder.createListeners failed, a listener definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}" ,
                    id , i , dump( def )
                ) ;
            }
        }
    }
    return ( listeners.length > 0 ) ? listeners : null ;
}