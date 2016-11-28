"use strict" ;

import { False } from '../rules/False.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Defines if condition is <code>false</code> in an <elseif> conditional block.
 * @name ElseIfFalse
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the value is <code>false</code>.
 * @see system.rules.False
 */
export function ElseIfFalse( value , then = null  )
{
    ElseIf.call( this , new False(value) , then ) ;
}

ElseIfFalse.prototype = Object.create( ElseIf.prototype ,
{
    constructor : { writable : true , value : ElseIfFalse }
});