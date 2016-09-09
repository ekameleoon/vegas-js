"use strict" ;

import { Null } from '../rules/Null.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Defines if a value is null in an <elseif> conditional block.
 */
export function ElseIfNull( value , then /*Action*/ = null , strict = false )
{
    ElseIf.call( this , new Null(value,strict) , then ) ;
}

ElseIfNull.prototype             = Object.create( ElseIf.prototype );
ElseIfNull.prototype.constructor = ElseIfNull ;
ElseIfNull.prototype.toString    = function () { return "[ElseIfNull]" }