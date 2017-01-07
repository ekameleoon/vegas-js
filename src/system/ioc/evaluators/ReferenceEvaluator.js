"use strict" ;

import { Evaluable }         from '../../Evaluable.js' ;
import { PropertyEvaluator } from '../../evaluators/PropertyEvaluator.js' ;

import { MagicReference }    from '../MagicReference.js' ;
import { ObjectFactory }     from '../ObjectFactory.js' ;

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @memberof system.ioc.evaluators
 * @name ReferenceEvaluator
 * @class
 * @private
 */
export function ReferenceEvaluator( factory )
{
    Object.defineProperties( this ,
    {
        /**
         * The factory reference.
         * @memberof system.ioc.evaluators.ReferenceEvaluator
         * @instance
         */
        factory : { value : (factory instanceof ObjectFactory) ? factory : null , writable : true } ,

        /**
         * The separator of the expression evaluator.
         * @memberof system.ioc.evaluators.ReferenceEvaluator
         * @instance
         */
        separator : { value : "." , writable : true } ,

        /**
         * The undefineable value returns in the eval method if the expression can't be evaluate.
         * @memberof system.ioc.evaluators.ReferenceEvaluator
         * @instance
         */
        undefineable : { value : null , writable : true } ,

        /**
         * Indicates if the class throws errors or return null when an error is throwing.
         * @memberof system.ioc.evaluators.ReferenceEvaluator
         * @instance
         */
        throwError :
        {
            get : function() { return this._propEvaluator.throwError ; } ,
            set : function( flag ) { this._propEvaluator.throwError = flag ; }
        },

        /**
         * @private
         */
        _propEvaluator : { value : new PropertyEvaluator() , writable : true }
    }) ;
}

ReferenceEvaluator.prototype = Object.create( Evaluable.prototype ,
{
    constructor : { value : ReferenceEvaluator } ,

    /**
     * Evaluates the specified object.
     * @memberof system.ioc.evaluators.ReferenceEvaluator
     * @function
     * @instance
     */
    eval : { value : function( o )
    {
        if ( (this.factory instanceof ObjectFactory) && (o instanceof String || typeof(o) === 'string' ) )
        {
            var exp = String(o) ;
            if ( exp.length > 0 )
            {
                var root ;

                try
                {
                    root = this.factory.config.root ;
                }
                catch (e)
                {
                    //
                }

                switch( exp )
                {
                    case MagicReference.CONFIG :
                    {
                        return this.factory.config.config ;
                    }
                    case MagicReference.LOCALE :
                    {
                        return this.factory.config.locale ;
                    }
                    case MagicReference.PARAMS :
                    {
                        return this.factory.config.parameters ;
                    }
                    case MagicReference.THIS :
                    {
                        return this.factory ;
                    }
                    case MagicReference.ROOT :
                    {
                        return root ;
                    }
                    case MagicReference.STAGE :
                    {
                        var stage = this.factory.config.stage ;
                        if ( stage !== null )
                        {
                            return stage ;
                        }
                        else if ( root && ( "stage" in root ) && ( root.stage !== null ) )
                        {
                             return root.stage ;
                        }
                        else
                        {
                            return this.undefineable ;
                        }
                        break ;
                    }
                    default :
                    {
                        var members = exp.split( this.separator ) ;
                        if ( members.length > 0 )
                        {
                            var ref   = members.shift() ;
                            var value = this.factory.getObject( ref ) ;
                            if ( value && members.length > 0 )
                            {
                                this._propEvaluator.target = value ;
                                value = this._propEvaluator.eval( members.join(".") ) ;
                                this._propEvaluator.target = null ;
                            }
                            return value ;
                        }
                    }
                }
            }
        }
        return this.undefineable ;
    }}
});

