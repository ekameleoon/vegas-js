"use strict" ;

import { dump } from '../../../core/dump.js' ;
import { logger } from '../logger.js' ;
import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectProperty } from '../ObjectProperty.js' ;

import { createArguments } from './createArguments.js' ;

/**
 * Creates the Array of all properties defines in the passed-in factory object definition.
 * @return the Array of all properties defines in the passed-in factory object definition.
 * @memberof system.ioc.builders
 * @function
 * @private
 */
export function createProperties( factory )
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
    else if( (ObjectAttribute.OBJECT_PROPERTIES in factory) && (factory[ ObjectAttribute.OBJECT_PROPERTIES ] instanceof Array ) )
    {
        a = factory[ ObjectAttribute.OBJECT_PROPERTIES ] ;
    }

    if ( !(a instanceof Array) || (a.length === 0) )
    {
        return null ;
    }

    let properties = [] ;
    let id = String(factory[ ObjectAttribute.OBJECT_ID ]) ;
    let len = a.length ;
    let prop = null ;

    for ( let i = 0 ; i<len ; i++ )
    {
        prop = a[i] ;

        let args = null ;
        let conf = null ;
        let i18n = null ;
        let name = null ;
        let ref  = null ;
        let value = null ;
        let evaluators = null ;

        if ( prop && (ObjectAttribute.NAME in prop) )
        {
            name = prop[ ObjectAttribute.NAME ] ;

            if ( !(name instanceof String || typeof(name) === 'string') || (name.length === '') )
            {
                continue ;
            }

            if( ObjectAttribute.EVALUATORS in prop )
            {
                evaluators = (prop[ ObjectAttribute.EVALUATORS ] instanceof Array) ? prop[ ObjectAttribute.EVALUATORS ] : null ;
            }

            if( ObjectAttribute.ARGUMENTS in prop )
            {
                args = prop[ ObjectAttribute.ARGUMENTS  ] || null ;
            }

            if( ObjectAttribute.CONFIG in prop )
            {
                conf = prop[ ObjectAttribute.CONFIG ] || null ;
            }

            if( ObjectAttribute.LOCALE in prop )
            {
                i18n = prop[ ObjectAttribute.LOCALE ] || null ;
            }

            if( ObjectAttribute.REFERENCE in prop )
            {
                ref = prop[ ObjectAttribute.REFERENCE  ] || null ;
            }

            if( ObjectAttribute.VALUE in prop )
            {
                value = prop[ ObjectAttribute.VALUE ] ;
            }

            if ( args && (args instanceof Array) )
            {
                properties.push( new ObjectProperty( name , createArguments( args ) , ObjectAttribute.ARGUMENTS ) ) ;
            }
            else if ( (ref instanceof String || typeof(ref) === 'string') && (ref !== '') )
            {
                properties.push( new ObjectProperty( name , ref , ObjectAttribute.REFERENCE , evaluators ) ) ;
            }
            else if ( (conf instanceof String || typeof(conf) === 'string') && (conf !== '') )
            {
                properties.push( new ObjectProperty( name, conf , ObjectAttribute.CONFIG , evaluators ) ) ;
            }
            else if ( (i18n instanceof String || typeof(i18n) === 'string') && (i18n !== '') )
            {
                properties.push( new ObjectProperty( name, i18n , ObjectAttribute.LOCALE , evaluators ) ) ;
            }
            else
            {
                properties.push( new ObjectProperty( name , value , ObjectAttribute.VALUE , evaluators ) ) ;
            }
        }
        else if( logger )
        {
            logger.warning
            (
                "createProperties failed, a property definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}" ,
                id , i , dump( prop )
            ) ;
        }
    }

    return ( properties.length > 0 ) ? properties : null ;
}