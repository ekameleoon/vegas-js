"use strict" ;

import { MultiEvaluator } from '../evaluators/MultiEvaluator.js' ;

/**
 * This collector register a <code>parameters</code> object reference, this object can be use to configurate the application with externals values.
 */
export function Parameters( parameters /*Object*/ )
{
    Object.defineProperties( this ,
    {
        /**
         * Defines the parameters object reference of the application.
         */
        parameters : { value : parameters , writable : true } ,

        /**
         * Indicates if the class throws errors or return null when an error is throwing.
         */
        _evaluators : { value : new MultiEvaluator() , writable : true }
    }) ;

    this._evaluators.autoClear = true ;
}

/**
 * @extends Object
 */
Parameters.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Parameters },

    /**
     * Indicates if the parameters object contains the specified variable.
     */
    contains : { value : function( name ) /*Boolean*/
    {
        return this.parameters && this.parameters.hasOwnProperty(name) && this.parameters.name !== null ;
    }},

    /**
     * Returns the value of the specified variable in the parameters reference.
     * @param name The name of the variable to resolve in the parameters reference.
     * @param ...rest (optional) All <code class="prettyprint">IEvaluator</code> objects used to evaluate and initialize the value of the specified FlashVars.
     * @example
     * <pre>
     * var PropertyEvaluator = system.evaluators.PropertyEvaluator ;
     * var RomanEvaluator    = system.evaluators.RomanEvaluator ;
     * var Parameters        = system.ioc.Parameters ;
     *
     * var obj = { id  : "XII" , metas : { count : 100 } } ;
     *
     * var params = new Parameters( { value : "metas.count" } ) ;
     * var value  = params.get( "value" , new PropertyEvaluator(obj), new RomanEvaluator()) ;
     * trace( "result : " + value ) ;
     * </pre>
     * @return the value of the specified variable in the Parameters object.
     */
    get : { value : function( name /*String*/ , ...rest )
    {
        if ( this.parameters && this.contains(name) )
        {
            if ( rest.length === 0 )
            {
                return this.parameters[name] ;
            }
            else
            {
                this._evaluators.add( rest ) ;
                return this._evaluators.eval( this.parameters[name] ) ;
            }
        }
        else
        {
            return null ;
        }
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function ()
    {
        return '[Parameters]' ;
    }}
}) ;