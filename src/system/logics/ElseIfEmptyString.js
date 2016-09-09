"use strict" ;

import { EmptyString } from '../rules/EmptyString.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Evaluates if the value is an empty String.
 */
export function ElseIfEmptyString( value = null , then /*Action*/ = null  )
{
    ElseIf.call( this , new EmptyString(value) , then ) ;
}

ElseIfEmptyString.prototype             = Object.create( ElseIf.prototype );
ElseIfEmptyString.prototype.constructor = ElseIfEmptyString ;
ElseIfEmptyString.prototype.toString    = function () { return "[ElseIfEmptyString]" }