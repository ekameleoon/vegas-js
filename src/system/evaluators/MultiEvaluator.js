"use strict" ;

import { Evaluable } from '../Evaluable.js' ;

/**
 * This <b>Evaluator</b> combine a collection of evaluators to evaluate a specified value.
 * @example
 * <pre>
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
 * </pre>
 */
export function MultiEvaluator( elements )
{
    Object.defineProperties( this ,
    {
        /**
         * Indicates if the MultiEvaluator is cleared before insert new Evaluable objects (in the add method).
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

/**
 * @extends Evaluable
 */
MultiEvaluator.prototype = Object.create( Evaluable.prototype ,
{
    /**
     * Indicates the number of elements registered in this collection.
     */
    length :
    {
        get : function()
        {
            return this._evaluators.length ;
        }
    },

    /**
     * Inserts <code class="prettyprint">Evaluable</code> objects in the MultiEvaluator.
     * @param ...evaluators The enumeration list of Evaluable objets or Arrays of Evaluator. Only Array and Evaluable are compatible to fill the MultiEvaluator.
     */
    add :
    {
        value : function ( ...evaluators )
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
        }
    },

    /**
     * Clear all the Evaluable objects.
     */
    clear :
    {
        value : function()
        {
            this._evaluators = [] ;
        }
    },

    /**
     * Evaluates the specified object.
     */
    eval :
    {
        value : function( o )
        {
            this._evaluators.forEach( ( element ) =>
            {
                if( element instanceof Evaluable )
                {
                    o = element.eval( o ) ;
                }
            }) ;
            return o ;
        }
    },

    /**
     * Removes an <code class="prettyprint">Evaluable</code> objects in the MultiEvaluator if is register.
     * @param evaluator The <code class="prettyprint">Evaluable</code> to find and remove.
     * @return <code class="prettyprint">true</code> if the Evaluable is removed.
     */
    remove :
    {
        value : function( evaluator )
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
        }
    }


});

MultiEvaluator.prototype.constructor = MultiEvaluator ;

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
MultiEvaluator.prototype.toString = function () /*String*/
{
    return "[MultiEvaluator]" ;
}