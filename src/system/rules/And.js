"use strict" ;

import { Rule } from './Rule.js' ;

/**
 * Evaluates a type string expression and return the property value who corresponding in the target object specified in this evaluator.
 * @name And
 * @memberof system.rules
 * @class
 * @constructs
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @example
 * var And = system.rules.And ;
 * var BooleanRule = system.rules.BooleanRule ;
 *
 * var rule1 = new BooleanRule( true  ) ;
 * var rule2 = new BooleanRule( false ) ;
 * var rule3 = new BooleanRule( true  ) ;
 *
 * var a ;
 *
 * a = new And( rule1 , rule1 ) ;
 * trace( a.eval() ) ; // true
 *
 * a = new And( rule1 , rule1 , rule1 ) ;
 * trace( a.eval() ) ; // true
 *
 * a = new And( rule1 , rule2 ) ;
 * trace( a.eval() ) ; // false
 *
 * a = new And( rule2 , rule1 ) ;
 * trace( a.eval() ) ; // false
 *
 * a = new And( rule2 , rule2 ) ;
 * trace( a.eval() ) ; // false
 *
 * a = new And( rule1 , rule2 , rule3 ) ;
 * trace( a.eval() ) ; // false
 *
 * a = new And( rule1 , rule3 ) ;
 * a.add( rule2 ) ;
 * trace( a.length ) ; // 3
 * trace( a.eval() ) ; // false
 *
 * a.clear()
 * trace( a.length ) ; // 0
 * trace( a.eval() ) ; // false
 * a.add(rule1) ;
 * trace( a.eval() ) ; // true
 */
export function And( rule1 /*Rule*/ , rule2 /*Rule*/ , ...rules )
{
    Object.defineProperties( this ,
    {
        /**
         * The collection of all rules to evaluate.
         * @memberof system.rules.And
         * @type {array}
         * @instance
         */
        rules : { value : [] , enumerable : true },

        /**
         * The number of rules to evaluate.
         * @memberof system.rules.And
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

And.prototype = Object.create( Rule.prototype );
And.prototype.constructor = And ;

/**
 * Insert a new Rule in the And condition.
 * @name add
 * @memberof system.rules.And
 * @function
 * @instance
 * @param {system.rules.Rule} rule The rule to register.
 * @return The current object reference.
 */
And.prototype.add = function( rule )
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
 * @memberof system.rules.And
 * @function
 * @instance
 * @return The current object reference.
 */
And.prototype.clear = function()
{
    this.rules.length = 0 ;
    return this ;
}

/**
 * Evaluates the specified object.
 * @memberof system.rules.And
 * @inheritdoc
 */
And.prototype.eval = function ()
{
    if( this.rules.length > 0 )
    {
        var b = this.rules[0].eval() ;
        var l = this.rules.length ;
        for ( var i = 1 ; i<l ; i++ )
        {
            b = b && (this.rules[i].eval()) ;
        }
        return b ;
    }
    else
    {
        return false ;
    }
}