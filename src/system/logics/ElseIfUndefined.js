"use strict" ;

import { Undefined } from '../rules/Undefined.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Defines if a value is undefined in an <elseif> conditional block.
 */
export function ElseIfUndefined( value , then /*Action*/ = null )
{
    ElseIf.call( this , new Undefined(value) , then ) ;
}

ElseIfUndefined.prototype             = Object.create( ElseIf.prototype );
ElseIfUndefined.prototype.constructor = ElseIfUndefined ;
ElseIfUndefined.prototype.toString    = function () { return "[ElseIfUndefined]" }