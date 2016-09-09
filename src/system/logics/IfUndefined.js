"use strict" ;

import { Undefined } from '../rules/Undefined.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given value is undefined.
 */
export function IfUndefined( value , thenTask /*Action*/ = null , elseTask /*Action*/ = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new Undefined(value) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfUndefined.prototype             = Object.create( IfTask.prototype );
IfUndefined.prototype.constructor = IfUndefined ;
IfUndefined.prototype.toString    = function () { return "[IfUndefined]" }