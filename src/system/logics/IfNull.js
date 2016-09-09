"use strict" ;

import { Null } from '../rules/Null.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given value is undefined.
 */
export function IfNull( value , strict = false , thenTask /*Action*/ = null , elseTask /*Action*/ = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new Null(value,strict) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfNull.prototype             = Object.create( IfTask.prototype );
IfNull.prototype.constructor = IfNull ;
IfNull.prototype.toString    = function () { return "[IfNull]" }