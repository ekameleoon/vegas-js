"use strict" ;

import { dump } from '../../../core/dump.js' ;
import { logger } from '../logger.js' ;
import { Logger } from '../../logging/Logger.js' ;
import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectReceiver } from '../ObjectReceiver.js' ;
import { ObjectOrder } from '../ObjectOrder.js' ;

/**
 * Creates the Array of all receivers defines in the passed-in factory object definition.
 * @return the Array of all receivers defines in the passed-in factory object definition.
 */
export function createReceivers( factory ) /*Array*/
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
    else if( ( ObjectAttribute.OBJECT_RECEIVERS in factory ) && (factory[ ObjectAttribute.OBJECT_RECEIVERS ] instanceof Array ) )
    {
        a = factory[ ObjectAttribute.OBJECT_RECEIVERS ] ;
    }

    if ( a === null || a.length === 0 )
    {
        return null ;
    }

    var def ;
    var receivers = [] ;
    var signal ;

    var id = String(factory[ ObjectAttribute.OBJECT_ID ]) ;
    var len = a.length ;

    for ( var i = 0 ; i<len ; i++ )
    {
        def = a[i] ;
        if ( def !== null && ( ObjectReceiver.SIGNAL in def ) )
        {
            signal = def[ ObjectReceiver.SIGNAL ] ;
            if ( !(signal instanceof String || typeof(signal) === 'string') || signal.length === 0 )
            {
                continue ;
            }
            receivers.push
            (
                new ObjectReceiver
                (
                    signal ,
                    def[ ObjectReceiver.SLOT ] ,
                    isNaN(def[ ObjectReceiver.PRIORITY ]) ? 0 : def[ ObjectReceiver.PRIORITY ] ,
                    def[ ObjectReceiver.AUTO_DISCONNECT ] === true ,
                    ( def[ ObjectReceiver.ORDER ] === ObjectOrder.BEFORE ) ? ObjectOrder.BEFORE : ObjectOrder.AFTER
                )
            ) ;
        }
        else
        {
            if( logger && (logger instanceof Logger) )
            {
                logger.warning
                (
                    "ObjectBuilder.createReceivers failed, a receiver definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}" ,
                    id ,
                    i ,
                    dump( def )
                ) ;
            }
        }
    }
    return ( receivers.length > 0 ) ? receivers : null ;
}