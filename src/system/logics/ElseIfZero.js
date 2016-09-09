"use strict" ;

import { Zero } from '../rules/Zero.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Defines if a value is 0 in an <elseif> conditional block.
 */
export function ElseIfZero( value , then /*Action*/ = null  )
{
    ElseIf.call( this , new Zero(value) , then ) ;
}

ElseIfZero.prototype             = Object.create( ElseIf.prototype );
ElseIfZero.prototype.constructor = ElseIfZero ;
ElseIfZero.prototype.toString    = function () { return "[ElseIfZero]" }