"use strict" ;

import { Null } from '../rules/Null.js' ;
import { ElseIf } from './ElseIf.js' ;

/**
 * Defines if a value is <code>null</code> in an <elseif> conditional block.
 * @name ElseIfNull
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the value is <code>null</code>.
 * @param {boolean} [strict=false] - This flag indicates if the condition use <code>==</code> or <code>===</code> to evalute the value.
 * @see system.rules.Null
 */
export function ElseIfNull( value , then = null , strict = false )
{
    ElseIf.call( this , new Null(value,strict) , then ) ;
}

ElseIfNull.prototype = Object.create( ElseIf.prototype ,
{
    constructor : { writable : true , value : ElseIfNull }
});