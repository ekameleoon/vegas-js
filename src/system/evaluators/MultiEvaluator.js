"use strict" ;

import { Evaluable } from '../Evaluable.js' ;

/**
 * This {@link system.Evaluable|Evaluable} combine a collection of evaluators to evaluates a specified value.
 * @summary This {@link system.Evaluable|Evaluable} combine a collection of evaluators to evaluates a specified value.
 * @name MultiEvaluator
 * @class
 * @memberof system.evaluators
 * @extends system.Evaluable
 * @example
 * var MultiEvaluator    = system.evaluators.MultiEvaluator ;
 * var PropertyEvaluator = system.evaluators.PropertyEvaluator ;
 * var RomanEvaluator    =  system.evaluators.RomanEvaluator ;
 *
 * var obj = { id  : "XII" , count : 100 } ;
 *
 * var evaluator1 = new PropertyEvaluator( obj ) ;
 * var evaluator2 = new RomanEvaluator() ;
 *
 * var evaluator = new MultiEvaluator() ;
 *
 * evaluator.add( evaluator1 ) ;
 * evaluator.add( evaluator2 ) ;
 *
 * trace( evaluator.eval( 'id' ) ) ; // 12
 * trace( evaluator.eval( 'count' ) ) ; // C
 * @param {array} [elements] - An optional array of evaluators to group.
 */
export function MultiEvaluator( elements = null )
{
    Object.defineProperties( this ,
    {
        /**
         * Indicates if the MultiEvaluator is cleared before insert new {@link system.Evaluable|Evaluable} objects (in the add method).
         * @memberof system.evaluators.MultiEvaluator
         * @type {boolean}
         * @instance
         * @default false
         */
        autoClear : { value : false , writable : true } ,

        /**
         * @private
         */
        _evaluators : { value : [] , writable : true }
    }) ;

    if ( elements instanceof Array && elements.length > 0 )
    {
        this.add.apply( this, elements ) ;
    }
}

MultiEvaluator.prototype = Object.create( Evaluable.prototype ,
{
    /**
     * Indicates the number of elements registered in this collection.
     * @memberof system.evaluators.MultiEvaluator
     * @type {number}
     * @instance
     * @readonly
     */
    length :
    {
        get : function()
        {
            return this._evaluators.length ;
        }
    },

    /**
     * Inserts an {@link system.Evaluable|Evaluable} objects in the <code>MultiEvaluator</code>.
     * @param {...system.Evaluable} evaluators - The enumeration list of {@link system.Evaluable|Evaluable} objets or Arrays of Evaluator. Only Array and Evaluable are compatible to fill the <b>MultiEvaluator</b>.
     * @memberof system.evaluators.MultiEvaluator
     * @function
     * @instance
     */
    add : { value : function ( ...evaluators )
    {
        if ( this.autoClear )
        {
            this.clear() ;
        }

        var l = evaluators.length ;
        if ( l > 0 )
        {
            var c, i, j ;
            var e ;
            for ( i = 0 ; i < l ; i++ )
            {
                e = evaluators[i] ;
                if ( e instanceof Evaluable )
                {
                    this._evaluators.push( e ) ;
                }
                else if ( e instanceof Array )
                {
                    c = e.length ;
                    for ( j = 0 ; j < c ; j++ )
                    {
                        if ( e[j] instanceof Evaluable )
                        {
                            this._evaluators.push( e[j] ) ;
                        }
                    }
                }
            }
        }
    }},

    /**
     * Clear all the {@link system.Evaluable|Evaluable} objects.
     * @memberof system.evaluators.MultiEvaluator
     * @function
     * @instance
     */
    clear : { value : function()
    {
        this._evaluators = [] ;
    }},

    /**
     * Evaluates the specified object.
     * @param {*} value - The object to evaluates.
     * @return The result of the evaluation.
     * @memberof system.evaluators.MultiEvaluator
     * @function
     * @instance
     */
    eval : { value : function( value )
    {
        this._evaluators.forEach( ( element ) =>
        {
            if( element instanceof Evaluable )
            {
                value = element.eval( value ) ;
            }
        }) ;
        return value ;
    }},

    /**
     * Removes an {@link system.Evaluable|Evaluable} objects in the <b>MultiEvaluator</b> if is register.
     * @param evaluator The {@link system.Evaluable|Evaluable} to find and remove.
     * @return <code>true</code> if the Evaluable is removed.
     * @memberof system.evaluators.MultiEvaluator
     * @function
     * @instance
     */
    remove : { value : function( evaluator )
    {
        if( evaluator instanceof Evaluable )
        {
            var index = this._evaluators.indexOf( evaluator ) ;
            if( index > - 1 )
            {
                this._evaluators.splice( index , 1 ) ;
                return true ;
            }
        }
        return false ;
    }}
});

MultiEvaluator.prototype.constructor = MultiEvaluator ;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 * @name toString
 * @memberof system.evaluators.MultiEvaluator
 * @function
 * @instance
 */
MultiEvaluator.prototype.toString = function () 
{
    return "[MultiEvaluator]" ;
}