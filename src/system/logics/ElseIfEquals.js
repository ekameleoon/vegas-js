"use strict" ;

import { Equals } from '../rules/Equals.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Defines an equality between two values in an <elseif> conditional block.
 * @name ElseIfEquals
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @param {Object} [value1] - The condition to evaluate.
 * @param {Object} [value2] - The condition to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the two values are equals.
 * @see system.rules.Equals
 */
export function ElseIfEquals( value1 , value2 , then = null  )
{
    ElseIf.call( this , new Equals(value1, value2) , then ) ;
}

ElseIfEquals.prototype = Object.create( ElseIf.prototype ,
{
    constructor : { writable : true , value : ElseIfEquals }
});