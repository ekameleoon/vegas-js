"use strict" ;

import { True } from '../rules/True.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Defines if condition is true in an <elseif> conditional block.
 */
export function ElseIfTrue( condition , then /*Action*/ = null  )
{
    ElseIf.call( this , new True(condition) , then ) ;
}

ElseIfTrue.prototype             = Object.create( ElseIf.prototype );
ElseIfTrue.prototype.constructor = ElseIfTrue ;
ElseIfTrue.prototype.toString    = function () { return "[ElseIfTrue]" }