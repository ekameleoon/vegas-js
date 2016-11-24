"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @name Or
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @example
 * var Or = system.rules.Or ;
 * var BooleanRule = system.rules.BooleanRule ;
 *
 * var rule1 = new BooleanRule( true  ) ;
 * var rule2 = new BooleanRule( false ) ;
 * var rule3 = new BooleanRule( true  ) ;
 *
 * var o ;
 *
 * o = new Or( rule1 , rule1 ) ;
 * trace( o.eval() ) ; // true
 *
 * o = new Or( rule1 , rule1 , rule1 ) ;
 * trace( o.eval() ) ; // true
 *
 * o = new Or( rule1 , rule2 ) ;
 * trace( o.eval() ) ; // true
 *
 * o = new Or( rule2 , rule1 ) ;
 * trace( o.eval() ) ; // true
 *
 * o = new Or( rule2 , rule2 ) ;
 * trace( o.eval() ) ; // false
 *
 * o = new Or( rule1 , rule2 , rule3 ) ;
 * trace( o.eval() ) ; // true
 *
 * o = new Or( rule1 , rule3 ) ;
 * o.add( rule2 ) ;
 * trace( o.length ) ; // 3
 * trace( o.eval() ) ; // true
 *
 * o.clear()
 * trace( o.length ) ; // 0
 * trace( o.eval() ) ; // false
 * o.add(rule1) ;
 * trace( o.eval() ) ; // true
 */
export function Or( rule1 /*Rule*/ , rule2 /*Rule*/ , ...rules )
{
    Object.defineProperties( this ,
    {
        /**
         * The collection of all rules to evaluate.
         * @memberof system.rules.Or
         * @type {array}
         * @instance
         */
        rules : { value : [] , enumerable : true },

        /**
         * The number of rules to evaluate.
         * @memberof system.rules.Or
         * @type {number}
         * @instance
         * @readonly
         */
        length : { get : function() { return (this.rules instanceof Array) ? this.rules.length : 0 ; } }
    });

    if( !(rule1 instanceof Rule) || !(rule2 instanceof Rule)  )
    {
        throw new ReferenceError( this + ' constructor failed, the two rules in argument must be defined.' ) ;
    }

    this.add( rule1 ) ;
    this.add( rule2 ) ;

    if ( rules && rules.length > 0 )
    {
        var len = rules.length ;
        for( var i = 0 ; i<len ; i++ )
        {
            if( rules[i] instanceof Rule )
            {
                this.add( rules[i] ) ;
            }
        }
    }
}

Or.prototype = Object.create( Rule.prototype );
Or.prototype.constructor = Or ;

/**
 * Insert a new Rule in the Or condition.
 * @name add
 * @memberof system.rules.Or
 * @function
 * @instance
 * @param {system.rules.Rule} rule The rule to register.
 * @return The current object reference.
 */
Or.prototype.add = function( rule )
{
    if( rule instanceof Rule )
    {
        this.rules.push(rule) ;
    }
    return this ;
}

/**
 * Clear all rules to evaluates.
 * @name clear
 * @memberof system.rules.Or
 * @function
 * @instance
 * @return The current object reference.
 */
Or.prototype.clear = function()
{
    this.rules.length = 0 ;
    return this ;
}

/**
 * Evaluates the specified object.
 * @memberof system.rules.Or
 * @inheritdoc
 */
Or.prototype.eval = function ()
{
    if( this.rules.length > 0 )
    {
        var b = this.rules[0].eval() ;
        var l = this.rules.length ;
        for ( var i = 1 ; i<l ; i++ )
        {
            b = b || (this.rules[i].eval()) ;
        }
        return b ;
    }
    else
    {
        return false ;
    }
}