"use strict" ;

import { dump } from '../../core/dump.js' ;
import { logger } from '../logger.js' ;
import { ObjectAttribute } from '../ObjectAttribute.js' ;
import { ObjectProperty } from '../ObjectProperty.js' ;

import { createArguments } from './createArguments.js' ;

/**
 * Creates the Array of all properties defines in the passed-in factory object definition.
 * @return the Array of all properties defines in the passed-in factory object definition.
 */
export function createProperties( factory ) /*Array*/
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
    else if( factory.hasOwnProperty( ObjectAttribute.OBJECT_PROPERTIES ) && (factory[ ObjectAttribute.OBJECT_PROPERTIES ] instanceof Array ) )
    {
        a = factory[ ObjectAttribute.OBJECT_PROPERTIES ] ;
    }

    if ( a === null || a.length === 0 )
    {
        return null ;
    }

    var properties = [] ;

    var args  ;
    var conf ;
    var i18n ;
    var prop ;
    var name ;
    var ref  ;
    var value ;
    var evaluators ;

    var id = String(factory[ ObjectAttribute.OBJECT_ID ]) ;
    var len = a.length ;

    for ( var i = 0 ; i<len ; i++ )
    {
        prop = a[i] ;

        if ( prop !== null && prop.hasOwnProperty( ObjectAttribute.NAME ) )
        {
            name = prop[ ObjectAttribute.NAME ] ;

            if ( name === null || name.length === 0 )
            {
                continue ;
            }

            args       = prop[ ObjectAttribute.ARGUMENTS  ] ;
            evaluators = prop[ ObjectAttribute.EVALUATORS ] ;
            conf       = prop[ ObjectAttribute.CONFIG     ] ;
            i18n       = prop[ ObjectAttribute.LOCALE     ] ;
            ref        = prop[ ObjectAttribute.REFERENCE  ] ;
            value      = prop[ ObjectAttribute.VALUE      ] ;

            if ( args !== null )
            {
                properties.push( new ObjectProperty( name , createArguments( args ) , ObjectAttribute.ARGUMENTS ) ) ; // arguments property
            }
            else if ( ref !== null )
            {
                properties.push( new ObjectProperty( name , ref , ObjectAttribute.REFERENCE , evaluators ) ) ; // ref property
            }
            else if ( conf !== null && conf.length > 0 )
            {
                properties.push( new ObjectProperty( name, conf , ObjectAttribute.CONFIG , evaluators ) ) ; // config property
            }
            else if ( i18n !== null && i18n.length > 0 )
            {
                properties.push( new ObjectProperty( name, i18n , ObjectAttribute.LOCALE , evaluators ) ) ; // locale property
            }
            else
            {
                properties.push( new ObjectProperty( name , value , ObjectAttribute.VALUE , evaluators ) ) ; // value property
            }
        }
        else
        {
            logger.warn
            (
                "ObjectBuilder.createProperties failed, a property definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}" ,
                id ,
                i ,
                dump( prop )
            ) ;
        }
    }
    return ( properties.length > 0 ) ? properties : null ;
}