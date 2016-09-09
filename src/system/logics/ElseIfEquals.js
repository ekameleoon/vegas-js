"use strict" ;

import { Equals } from '../rules/Equals.js' ;

import { ElseIf } from './ElseIf.js' ;

/**
 * Defines an equality between two values in an <elseif> conditional block.
 */
export function ElseIfEquals( value1 , value2 , then /*Action*/ = null  )
{
    ElseIf.call( this , new Equals(value1, value2) , then ) ;
}

ElseIfEquals.prototype             = Object.create( ElseIf.prototype );
ElseIfEquals.prototype.constructor = ElseIfEquals ;
ElseIfEquals.prototype.toString    = function () { return "[ElseIfEquals]" }