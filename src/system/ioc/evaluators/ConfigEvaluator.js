"use strict" ;

import { PropertyEvaluator } from '../../evaluators/PropertyEvaluator.js' ;
import { ObjectConfig }      from '../ObjectConfig.js' ;

/**
 * Evaluates a type string expression and return the value who corresponding in the config of the factory.
 * @example
 * <pre>
 * var ConfigEvaluator = system.ioc.evaluators.ConfigEvaluator ;
 * var ObjectConfig = system.ioc.ObjectConfig ;
 *
 * var init =
 * {
 *     message : "hello world" ,
 *     menu    :
 *     {
 *         title : "my title" ,
 *         count : 10 ,
 *         data  : [ "item1" , "item2", "item3" ]
 *     }
 * }
 *
 * var configurator = new ObjectConfig() ;
 *
 * configurator.config = init ;
 *
 * var evaluator = new ConfigEvaluator( configurator ) ;
 *
 * trace( evaluator.eval( "test"       ) ) ; // null
 * trace( evaluator.eval( "message"    ) ) ; // hello world
 * trace( evaluator.eval( "menu"       ) ) ; // [object Object]
 * trace( evaluator.eval( "menu.title" ) ) ; // my title
 * trace( evaluator.eval( "menu.count" ) ) ; // 10
 * trace( evaluator.eval( "menu.data"  ) ) ; // item1,item2,item3
 * trace( evaluator.eval( "menu.test"  ) ) ; // null
 * </pre>
 */
export function ConfigEvaluator( config /*ObjectConfig*/ )
{
    PropertyEvaluator.call(this) ;
    this.config = (config instanceof ObjectConfig) ? config : null ;
    Object.defineProperties( this ,
    {
        target :
        {
            get : function() { return this.config !== null ? this.config.config : null ; }
        }
    }) ;
}

/**
 * @extends Object
 */
ConfigEvaluator.prototype = Object.create( PropertyEvaluator.prototype ,
{
    constructor : { value : ConfigEvaluator } ,

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[ConfigEvaluator]' ; } }
});