"use strict" ;

import { True } from '../rules/True.js' ;
import { ElseIf } from './ElseIf.js' ;

/**
 * Defines if condition is <code>true</code> in an <elseif> conditional block.
 * @name ElseIfTrue
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the value is <code>true</code>.
 * @see system.rules.True
 */
export function ElseIfTrue( condition , then = null  )
{
    ElseIf.call( this , new True(condition) , then ) ;
}

ElseIfTrue.prototype = Object.create( ElseIf.prototype ,
{
    constructor : { writable : true , value : ElseIfTrue }
});