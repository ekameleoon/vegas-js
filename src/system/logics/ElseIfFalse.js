"use strict" ;

import { False } from '../rules/False.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Defines if condition is false in an <elseif> conditional block.
 */
export function ElseIfFalse( condition , then /*Action*/ = null  )
{
    ElseIf.call( this , new False(condition) , then ) ;
}

ElseIfFalse.prototype             = Object.create( ElseIf.prototype );
ElseIfFalse.prototype.constructor = ElseIfFalse ;
ElseIfFalse.prototype.toString    = function () { return "[ElseIfFalse]" }