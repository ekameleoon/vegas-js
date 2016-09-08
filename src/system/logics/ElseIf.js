"use strict" ;

import { BooleanRule } from '../rules/BooleanRule.js' ;
import { Rule } from '../rules/Rule.js' ;

/**
 * Defines a conditional rule to defines a specific 'elseif' block in a IfTask reference.
 */
export function ElseIf( rule /*Rule*/ = null , then /*Action*/ = null )
{
    this.rule = ( rule instanceof Rule ) ? rule : new BooleanRule( rule ) ;
    this.then = then ;
}

/**
 * @extends Rule
 */
ElseIf.prototype = Object.create( Rule.prototype );
ElseIf.prototype.constructor = ElseIf ;

/**
 * Evaluates the specified object.
 */
ElseIf.prototype.eval = function ()
{
    if ( this.rule && this.rule instanceof Rule )
    {
        return this.rule.eval() ;
    }
    else
    {
        return false ;
    }
}

/**
 * Returns the string representation of this instance.
 * @return the string representation of this instance.
 */
ElseIf.prototype.toString = function () /*String*/
{
    return "[ElseIf]" ;
}