"use strict" ;

import { MultiEvaluator } from '../evaluators/MultiEvaluator.js' ;

/**
 * This collector register a <code>parameters</code> object reference, this object can be use to configurate the application with externals values.
 * @name Parameters
 * @class
 * @memberof system.ioc
 * @param {Object} parameters - The object to evaluates.
 */
export function Parameters( parameters )
{
    Object.defineProperties( this ,
    {
        /**
         * Defines the parameters object reference of the application.
         * @name parameters
         * @memberof system.ioc.Parameters
         * @instance
         * @type Object
         */
        parameters : { value : parameters , writable : true } ,

        /**
         * Indicates if the class throws errors or return null when an error is throwing.
         * @name evaluators
         * @memberof system.ioc.Parameters
         * @instance
         * @private
         */
        _evaluators : { value : new MultiEvaluator() , writable : true }
    }) ;

    this._evaluators.autoClear = true ;
}

Parameters.prototype = Object.create( Object.prototype ,
{
    constructor : { value : Parameters },

    /**
     * Indicates if the parameters object contains the specified variable.
     * @param {string} name - The name of the parameter to find.
     * @return <code>true</code> if the passed-in <code>name</code> is register.
     * @name contains
     * @memberof system.ioc.Parameters
     * @instance
     * @function
     */
    contains : { value : function( name )
    {
        return this.parameters && name && (name in this.parameters) && (this.parameters[name] !== null) ;
    }},

    /**
     * Returns the value of the specified variable in the parameters reference.
     * @name get
     * @memberof system.ioc.Parameters
     * @instance
     * @function
     * @param {string} name - The name of the variable to resolve in the parameters reference.
     * @param {...system.Evaluable} rest - All {@link system.Evaluable|Evaluable} objects used to evaluates and initializes the value of the specified application arguments.
     * @example
     * var PropertyEvaluator = system.evaluators.PropertyEvaluator ;
     * var RomanEvaluator    = system.evaluators.RomanEvaluator ;
     * var Parameters        = system.ioc.Parameters ;
     *
     * var obj = { id  : "XII" , metas : { count : 100 } } ;
     *
     * var params = new Parameters( { value : "metas.count" } ) ;
     * var value  = params.get( "value" , new PropertyEvaluator(obj), new RomanEvaluator()) ;
     * trace( "result : " + value ) ;
     * @return the value of the specified variable in the Parameters object.
     */
    get : { value : function( name , ...rest )
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
     * @name toString
     * @memberof system.ioc.Parameters
     * @instance
     * @function
     */
    toString : { value : function ()
    {
        return '[Parameters]' ;
    }}
}) ;