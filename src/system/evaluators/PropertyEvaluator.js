"use strict" ;

import { Evaluable } from '../Evaluable.js' ;

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @summary Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @name PropertyEvaluator
 * @class
 * @memberof system.evaluators
 * @extends system.Evaluable
 * @example
 * var PropertyEvaluator = system.evaluators.PropertyEvaluator ;
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
 * @param {object} target - The object to evaluates.
 */
export function PropertyEvaluator( target )
{
    Object.defineProperties( this ,
    {
        /**
         * The separator character of the expression evaluator.
         * @memberof system.evaluators.PropertyEvaluator
         * @type {string}
         * @instance
         * @default '.'
         */
        separator : { value : "." , writable : true } ,

        /**
         * The target reference use in the evaluator.
         * @memberof system.evaluators.PropertyEvaluator
         * @type {object}
         * @instance
         */
        target : { value : target , writable : true , configurable : true } ,

        /**
         * Indicates if the eval() method throws errors or return null when an error is throwing.
         * @memberof system.evaluators.PropertyEvaluator
         * @type {boolean}
         * @default false
         * @instance
         */
        throwError : { value : false , writable : true } ,

        /**
         * Defines the value returns from the eval() method if the expression can't be evaluate.
         * @memberof system.evaluators.PropertyEvaluator
         * @type {object}
         * @default null
         * @instance
         */
        undefineable : { value : null , writable : true }
    }) ;
}

PropertyEvaluator.prototype = Object.create( Evaluable.prototype );
PropertyEvaluator.prototype.constructor = PropertyEvaluator;

/**
 * Evaluates the specified object.
 * @param {*} value - The object to evaluates.
 * @return The result of the evaluation.
 * @name eval
 * @memberof system.evaluators.PropertyEvaluator
 * @function
 * @instance
 */
PropertyEvaluator.prototype.eval = function ( o )
{
    if ( o !== null && ( typeof(o) === "string" || o instanceof String ) && (this.target !== null) )
    {
        var exp /*String*/ = String(o) ;
        if ( exp.length > 0 )
        {
            var value = this.target ;
            var members = exp.split( this.separator ) ;
            var len = members.length ;
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
 * @memberof system.evaluators.PropertyEvaluator
 * @function
 * @instance
 */
PropertyEvaluator.prototype.toString = function () /*String*/
{
    return "[PropertyEvaluator]" ;
}