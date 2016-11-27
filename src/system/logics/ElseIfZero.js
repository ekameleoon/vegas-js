"use strict" ;

import { Zero } from '../rules/Zero.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Defines if a value <code>=== 0</code> in an <elseif> conditional block.
 * @name ElseIfZero
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @constructor
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the values equals <code>0</code>.
 * @see system.rules.Zero
 */
export function ElseIfZero( value , then = null  )
{
    ElseIf.call( this , new Zero(value) , then ) ;
}

ElseIfZero.prototype = Object.create( ElseIf.prototype ,
{
    constructor : { writable : true , value : ElseIfZero }
});