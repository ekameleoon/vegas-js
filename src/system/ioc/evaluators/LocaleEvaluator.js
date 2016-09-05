"use strict" ;

import { PropertyEvaluator } from '../../evaluators/PropertyEvaluator.js' ;
import { ObjectConfig }      from '../ObjectConfig.js' ;

/**
 * Evaluates a type string expression and return the value who corresponding in the config of the factory.
 * @example
 * <pre>
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
 * </pre>
 */
export function LocaleEvaluator( config /*ObjectConfig*/ )
{
    this.config = (config instanceof ObjectConfig) ? config : null ;
}

/**
 * @extends Object
 */
LocaleEvaluator.prototype = Object.create( PropertyEvaluator.prototype ,
{
    constructor : { value : LocaleEvaluator } ,

    /**
     * The config object reference used in the factory to register values and expressions.
     */
    target :
    {
        get : function() { return this.config !== null ? this.config.locale : null ; }
    },

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[LocaleEvaluator]' ; } }
});