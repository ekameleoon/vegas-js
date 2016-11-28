"use strict" ;

import { BooleanRule } from '../rules/BooleanRule.js' ;
import { Rule } from '../rules/Rule.js' ;

/**
 * Defines a conditional rule to defines an <code>elseif</code> block in a {@link system.logics.IfTask|IfTask} reference.
 * @name ElseIf
 * @memberof system.logics
 * @implements {system.rules.Rule}
 * @augments system.rules.Rule
 * @class
 * @param {system.rules.Rule} [rule=null] - The condition to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the condition is <code>true</code>.
 */
export function ElseIf( rule = null , then = null )
{
    /**
     * The condition to evaluate.
     * @memberof system.rules.ElseIf
     * @name rule
     * @type system.rules.Rule
     * @instance
     * @default null
     */
    this.rule = ( rule instanceof Rule ) ? rule : new BooleanRule( rule ) ;

    /**
     * The {@link system.process.Action|Action} to execute if the condition is <code>true</code>.
     * @memberof system.rules.ElseIf
     * @name then
     * @type system.process.Action
     * @instance
     * @default null
     */
    this.then = then ;
}

ElseIf.prototype = Object.create( Rule.prototype ,
{
    /**
     * The constructor reference.
     */
    constructor : { value : ElseIf , writable : true } ,

    /**
     * Evaluates the specified object.
     * @name eval
     * @memberof system.rules.ElseIf
     * @function
     * @instance
     */
    eval : { writable : true , value : function ()
    {
        if ( this.rule && this.rule instanceof Rule )
        {
            return this.rule.eval() ;
        }
        else
        {
            return false ;
        }
    }}
});