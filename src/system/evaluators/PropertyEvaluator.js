"use strict" ;

import { Evaluable } from '../Evaluable.js' ;

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * <p><b>Example :</b></p>
 * <pre>
 * PropertyEvaluator = system.evaluators.PropertyEvaluator ;
 *
 * var obj =
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
 * var evaluator = new PropertyEvaluator( obj ) ;
 *
 * // valid expressions
 *
 * trace( evaluator.eval( "message"    ) ) ; // hello world
 * trace( evaluator.eval( "title"      ) ) ; // my title
 * trace( evaluator.eval( "menu.title" ) ) ; // my menu title
 * trace( evaluator.eval( "menu.label" ) ) ; // my label
 *
 * // invalid expressions
 *
 * trace( evaluator.eval( ""            ) ) ; // null
 * trace( evaluator.eval( "unknow"      ) ) ; // null
 * trace( evaluator.eval( "menu.unknow" ) ) ; // null
 *
 * // change the "undefineable" value returns in the eval() method when the evaluation failed.
 *
 * evaluator.undefineable = "empty" ;
 * trace( evaluator.eval( "unknow" ) ) ; // empty ;
 *
 * evaluator.undefineable = undefined ;
 * trace( evaluator.eval( "unknow" ) ) ; // undefined ;
 *
 * // activate the throwError mode.
 *
 * evaluator.throwError = true ;
 *
 * try
 * {
 *     evaluator.eval( "test" ) ;
 * }
 * catch( e )
 * {
 *     trace( e ) ; // ##EvalError: [object PropertyEvaluator] eval failed with the expression : test##
 * }
 * </pre>
 */
export function PropertyEvaluator( target )
{
    Object.defineProperties( this ,
    {
        /**
         * The separator character of the expression evaluator.
         */
        separator : { value : "." , writable : true } ,

        /**
         * The target reference use in the evaluator.
         */
        target : { value : target , writable : true } ,

        /**
         * Indicates if the eval() method throws errors or return null when an error is throwing.
         */
        throwError : { value : false , writable : true } ,

        /**
         * Defines the value returns from the eval() method if the expression can't be evaluate.
         */
        undefineable : { value : null , writable : true }
    }) ;
}

/**
 * @extends Evaluable
 */
PropertyEvaluator.prototype = Object.create( Evaluable.prototype );
PropertyEvaluator.prototype.constructor = PropertyEvaluator;

/**
 * Evaluates the specified object.
 */
PropertyEvaluator.prototype.eval = function ( o )
{
    if ( o !== null && ( typeof(o) === "string" || o instanceof String ) && this.target !== null )
    {
        var exp /*String*/ = String(o) ;
        if ( exp.length > 0 )
        {
            var value = this.target ;
            var members /*Array*/ = exp.split( this.separator ) ;
            var len /*int*/ = members.length ;
            for ( var i /*int*/ = 0 ; i < len ; i++ )
            {
                if ( members[i] in value )
                {
                    value = value[ members[i] ] ;
                }
                else
                {
                    if ( this.throwError )
                    {
                        throw new EvalError( this + " eval failed with the expression : " + o ) ;
                    }
                    return this.undefineable ;
                }
            }
            return value ;
        }
    }
    return this.undefineable ;
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
PropertyEvaluator.prototype.toString = function () /*String*/
{
    return "[PropertyEvaluator]" ;
}