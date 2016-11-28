"use strict" ;

import { Undefined } from '../rules/Undefined.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Defines if a value is <code>undefined</code> in an <elseif> conditional block.
 * @name ElseIfUndefined
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the values is <code>undefined</code>.
 * @see system.rules.Undefined
 */
export function ElseIfUndefined( value , then = null )
{
    ElseIf.call( this , new Undefined(value) , then ) ;
}

ElseIfUndefined.prototype = Object.create( ElseIf.prototype ,
{
    constructor : { writable : true , value : ElseIfUndefined }
});