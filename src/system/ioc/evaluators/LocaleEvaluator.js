"use strict" ;

import { PropertyEvaluator } from '../../evaluators/PropertyEvaluator.js' ;
import { ObjectConfig }      from '../ObjectConfig.js' ;

/**
 * Evaluates a type string expression and return the value who corresponding in the config of the factory.
 * @memberof system.ioc.evaluators
 * @name LocaleEvaluator
 * @class
 * @private
 * @example
 * var LocaleEvaluator = system.ioc.evaluators.LocaleEvaluator ;
 * var ObjectConfig = system.ioc.ObjectConfig ;
 *
 * var i18n =
 * {
 *     message : "hello world" ,
 *     title   : "my title"    ,
 *     menu    :
 *     {
 *         title : "my menu title" ,
 *         label : "my label"
 *     }
 * }
 *
 * var configurator = new ObjectConfig() ;
 *
 * configurator.locale = i18n ;
 *
 * var evaluator = new LocaleEvaluator( configurator ) ;
 *
 * trace( evaluator.eval( "test"       ) ) ; // null
 * trace( evaluator.eval( "message"    ) ) ; // hello world
 * trace( evaluator.eval( "title"      ) ) ; // my title
 * trace( evaluator.eval( "menu.title" ) ) ; // my menu title
 * trace( evaluator.eval( "menu.label" ) ) ; // my label
 */
export function LocaleEvaluator( config )
{
    PropertyEvaluator.call(this) ;
    this.config = (config instanceof ObjectConfig) ? config : null ;
    Object.defineProperties( this ,
    {
        target :
        {
            get : function() { return this.config !== null ? this.config.locale : null ; }
        }
    }) ;
}

LocaleEvaluator.prototype = Object.create( PropertyEvaluator.prototype ,
{
    constructor : { value : LocaleEvaluator } ,

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @memberof system.ioc.evaluators.LocaleEvaluator
     * @function
     * @instance
     */
    toString : { value : function() { return '[LocaleEvaluator]' ; } }
});