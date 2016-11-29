"use strict" ;

import '../polyfill.js' ;

import { logger } from './ioc/logger.js' ;

import { MagicReference }   from './ioc/MagicReference.js' ;
import { ObjectArgument }   from './ioc/ObjectArgument.js' ;
import { ObjectAttribute }  from './ioc/ObjectAttribute.js' ;
import { ObjectConfig }     from './ioc/ObjectConfig.js' ;
import { ObjectDefinition } from './ioc/ObjectDefinition.js' ;
import { ObjectDefinitionContainer } from './ioc/ObjectDefinitionContainer.js' ;
import { ObjectFactory }    from './ioc/ObjectFactory.js' ;
import { ObjectListener }   from './ioc/ObjectListener.js' ;
import { ObjectMethod }     from './ioc/ObjectMethod.js' ;
import { ObjectOrder }      from './ioc/ObjectOrder.js' ;
import { ObjectScope }      from './ioc/ObjectScope.js' ;
import { ObjectProperty }   from './ioc/ObjectProperty.js' ;
import { ObjectReceiver }   from './ioc/ObjectReceiver.js' ;
import { Parameters }       from './ioc/Parameters.js' ;
import { TypePolicy }       from './ioc/TypePolicy.js' ;

/**
 * The {@link system.ioc} library provides a simple and strong implementation of the <strong>Inversion of Control</strong> (<b>{@link https://en.wikipedia.org/wiki/Inversion_of_control|IoC}</b>) principle.
 * <p><b>IoC</b> is also known as <b>dependency injection</b> (DI). It is a process whereby objects define their dependencies, that is, the other objects they work with, only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method.</p>
 * <p> The container then injects those dependencies when it creates the <b>object definitions</b>. This process is fundamentally the inverse, hence the name Inversion of Control (IoC), of the <b>object definition</b> itself controlling the instantiation or location of its dependencies by using direct construction of classes, or a more complex mechanism.</p>
 * @summary The {@link system.ioc} library provides a simple et strong implementation of the <strong>Inversion of Control</strong> (<b>{@link https://en.wikipedia.org/wiki/Inversion_of_control|IoC}</b>) principle.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.ioc
 * @memberof system
 * @example
 * var Point = function( x , y )
 * {
 *     this.x = x ;
 *     this.y = y ;
 *     console.log("constructor:" + this.toString() ) ;
 * };
 *
 * Point.prototype.test = function( message = null )
 * {
 *     console.log( 'test:' + this.toString() + " message:" + message ) ;
 * }
 *
 * Point.prototype.toString = function()
 * {
 *     return "[Point x:" + this.x + " y:" + this.y + "]" ;
 * } ;
 *
 * var ObjectFactory = system.ioc.ObjectFactory ;
 *
 * var factory = new ObjectFactory();
 * var config  = factory.config ;
 *
 * config.setConfigTarget
 * ({
 *     origin : { x : 10 , y : 20 }
 * })
 *
 * config.setLocaleTarget
 * ({
 *     messages :
 *     {
 *         test : 'test'
 *     }
 * })
 *
 * var objects =
 * [
 *     {
 *         id   : "position" ,
 *         type : "Point" ,
 *         args : [ { value : 2 } , { ref : 'origin.y' }],
 *         properties :
 *         [
 *             { name : "x" , ref   :'origin.x' } ,
 *             { name : "y" , value : 100       }
 *         ]
 *     },
 *     {
 *         id         : "origin" ,
 *         type       : "Point" ,
 *         singleton  : true ,
 *         args       : [ { config : 'origin.x' } , { value : 20 }] ,
 *         properties :
 *         [
 *             { name : 'test' , args : [ { locale : 'messages.test' } ] }
 *         ]
 *     }
 * ];
 *
 * factory.run( objects );
 *
 * trace( factory.getObject('position') ) ;
 */
export var ioc = Object.assign
({
    // singleton
    logger : logger ,

    // classes
    MagicReference   : MagicReference,
    ObjectArgument   : ObjectArgument,
    ObjectAttribute  : ObjectAttribute,
    ObjectConfig     : ObjectConfig,
    ObjectDefinition : ObjectDefinition,
    ObjectDefinitionContainer : ObjectDefinitionContainer,
    ObjectFactory    : ObjectFactory,
    ObjectListener   : ObjectListener,
    ObjectMethod     : ObjectMethod,
    ObjectOrder      : ObjectOrder,
    ObjectProperty   : ObjectProperty,
    ObjectReceiver   : ObjectReceiver,
    ObjectScope      : ObjectScope,
    Parameters       : Parameters,
    TypePolicy       : TypePolicy
}) ;