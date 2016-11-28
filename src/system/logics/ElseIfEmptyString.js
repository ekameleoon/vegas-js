"use strict" ;

import { EmptyString } from '../rules/EmptyString.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Evaluates if the value is an empty String.
 * @name ElseIfEmptyString
 * @memberof system.logics
 * @extends system.logics.ElseIf
 * @class
 * @param {Object} [value=null] - The value to evaluate.
 * @param {system.process.Action} [then=null] - The action to execute if the value is an empty <code>string</code>.
 * @see system.rules.EmptyString
 */
export function ElseIfEmptyString( value = null , then = null  )
{
    ElseIf.call( this , new EmptyString(value) , then ) ;
}

ElseIfEmptyString.prototype = Object.create( ElseIf.prototype ,
{
    constructor : { writable : true , value : ElseIfEmptyString }
});