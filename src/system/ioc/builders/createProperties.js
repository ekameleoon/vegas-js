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
    else if( (ObjectAttribute.PROPERTIES in factory) && (factory[ObjectAttribute.PROPERTIES] instanceof Array ) )
    {
        a = factory[ObjectAttribute.PROPERTIES] ;
    }

    if ( !(a instanceof Array) || (a.length === 0) )
    {
        return null ;
    }

    let properties = [] ;
    let id = String(factory[ ObjectAttribute.ID ]) ;
    let len = a.length ;
    let prop = null ;

    for ( let i = 0 ; i<len ; i++ )
    {
        prop = a[i] ;

        let args = null ;
        let call = null ;
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
                args = prop[ ObjectAttribute.ARGUMENTS ] || null ;
            }

            if( ObjectAttribute.CONFIG in prop )
            {
                conf = prop[ ObjectAttribute.CONFIG ] || null ;
            }

            if( ObjectAttribute.LOCALE in prop )
            {
                i18n = prop[ ObjectAttribute.LOCALE ] || null ;
            }

            if( ObjectAttribute.CALLBACK in prop )
            {
                call = prop[ ObjectAttribute.CALLBACK ] ;
            }

            if( ObjectAttribute.REFERENCE in prop )
            {
                ref = prop[ ObjectAttribute.REFERENCE ] || null ;
            }

            if( ObjectAttribute.VALUE in prop )
            {
                value = prop[ ObjectAttribute.VALUE ] ;
            }

            let property = null ;

            if ( (ref instanceof String || typeof(ref) === 'string') && (ref !== '') )
            {
                property = new ObjectProperty( name , ref , ObjectAttribute.REFERENCE , evaluators ) ;
            }
            else if ( (conf instanceof String || typeof(conf) === 'string') && (conf !== '') )
            {
                property = new ObjectProperty( name , conf , ObjectAttribute.CONFIG , evaluators ) ;
            }
            else if ( (i18n instanceof String || typeof(i18n) === 'string') && (i18n !== '') )
            {
                property = new ObjectProperty( name , i18n , ObjectAttribute.LOCALE , evaluators ) ;
            }
            else if( call instanceof Function || ( (call instanceof String || typeof(call) === 'string') && (call !== '') ) )
            {
                property = new ObjectProperty( name , call , ObjectAttribute.CALLBACK , evaluators ) ;
                if( args && (args instanceof Array) )
                {
                    property.args = createArguments( args )
                }
                if( ObjectAttribute.SCOPE in prop )
                {
                    property.scope = prop[ ObjectAttribute.SCOPE ] || null ;
                }
            }
            else if ( args && (args instanceof Array) )
            {
                property = new ObjectProperty( name , createArguments( args ) , ObjectAttribute.ARGUMENTS ) ;
            }
            else
            {
                property = new ObjectProperty( name , value , ObjectAttribute.VALUE , evaluators ) ;
            }

            if( property )
            {
                properties.push( property ) ;
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