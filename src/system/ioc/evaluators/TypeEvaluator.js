"use strict" ;
/* jshint evil: true*/

import { getDefinitionByName } from '../../../core/reflect/getDefinitionByName.js' ;

import { ArrayMap } from '../../data/maps/ArrayMap.js' ;
import { Evaluable } from '../../Evaluable.js' ;
import { ExpressionFormatter } from '../../formatters/ExpressionFormatter.js' ;

import { ObjectConfig } from '../ObjectConfig.js' ;
import { TypePolicy } from '../TypePolicy.js' ;

/**
 * Evaluates a type string expression and return the type Class who corresponding in the application.
 * @name TypeEvaluator
 * @class
 * @memberof system.ioc.evaluators
 * @private
 * @example
 * var conf = new ObjectConfig() ;
 *
 * conf.typePolicy  = TypePolicy.ALL ; // TypePolicy.NONE, TypePolicy.ALIAS, TypePolicy.EXPRESSION
 * conf.typeAliases =
 * [
 *     { alias : "Signal" , type : "system.signals.Signal" }
 * ] ;
 *
 * conf.typeExpression =
 * [
 *     { name:"map"     , value:"system.data.maps" } ,
 *     { name:"ArrayMap" , value:"{map}.ArrayMap"  }
 * ] ;
 *
 * var evaluator = new TypeEvaluator( conf );
 *
 * trace( evaluator.eval( "Signal"      ) ) ; // [class MovieClip]
 * trace( evaluator.eval( "{ArrayMap}"  ) ) ; // [class ArrayMap]
 * trace( evaluator.eval( "test"        ) ) ; // null
 * trace( evaluator.eval( "{map}.Test"  ) ) ; // null
 */
export function TypeEvaluator( config = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The ObjectConfig reference.
         * @memberof system.ioc.evaluators.TypeEvaluator
         * @instance
         */
        config : { value : (config instanceof ObjectConfig) ? config : null , writable : true } ,

        /**
         * Indicates if the class throws errors or return null when an error is throwing.
         * @memberof system.ioc.evaluators.TypeEvaluator
         * @instance
         */
        throwError : { value : false , writable : true }
    }) ;
}

TypeEvaluator.prototype = Object.create( Evaluable.prototype ,
{
    constructor : { value : TypeEvaluator } ,

    /**
     * Evaluates the specified object.
     * @memberof system.ioc.evaluators.TypeEvaluator
     * @function
     * @instance
     */
    eval : { value : function( o )
    {
        if ( o instanceof Function )
        {
            return o ;
        }
        else if ( o instanceof String || typeof(o) === 'string' )
        {
            var type   = String(o) ;
            var config = this.config ;
            if ( config && config instanceof ObjectConfig )
            {
                var policy = config.typePolicy ;
                if ( policy !== TypePolicy.NONE )
                {
                    if ( policy === TypePolicy.ALL || policy === TypePolicy.ALIAS )
                    {
                        var aliases = config.typeAliases ;
                        if ( (aliases instanceof ArrayMap) && aliases.has(type) )
                        {
                            type = aliases.get(type) ;
                        }
                    }

                    if ( policy === TypePolicy.ALL || policy === TypePolicy.EXPRESSION )
                    {
                       if ( config.typeExpression instanceof ExpressionFormatter )
                       {
                           type = config.typeExpression.format(type) ;
                       }
                    }
                }
            }

            try
            {
                var func = getDefinitionByName( type , config.domain ) ;
                if( func instanceof Function )
                {
                    return func ;
                }
            }
            catch( e)
            {
                if ( this.throwError )
                {
                    throw new EvalError( this + " eval failed : " + e.toString() ) ;
                }
            }
        }

        return null ;
    }}
});

