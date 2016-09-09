"use strict" ;

import { True } from '../rules/True.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given condition holds true.
 */
export function IfTrue( condition , thenTask /*Action*/ = null , elseTask /*Action*/ = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new True(condition) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfTrue.prototype             = Object.create( IfTask.prototype );
IfTrue.prototype.constructor = IfTrue ;
IfTrue.prototype.toString    = function () { return "[IfTrue]" }