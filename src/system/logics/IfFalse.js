"use strict" ;

import { False } from '../rules/False.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given condition holds false.
 */
export function IfFalse( condition , thenTask /*Action*/ = null , elseTask /*Action*/ = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new False(condition) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfFalse.prototype             = Object.create( IfTask.prototype );
IfFalse.prototype.constructor = IfFalse ;
IfFalse.prototype.toString    = function () { return "[IfFalse]" }