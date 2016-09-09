"use strict" ;

import { EmptyString } from '../rules/EmptyString.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Evaluates if the value is an empty String.
 */
export function IfEmptyString( value , thenTask /*Action*/ = null , elseTask /*Action*/ = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new EmptyString(value) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfEmptyString.prototype             = Object.create( IfTask.prototype );
IfEmptyString.prototype.constructor = IfEmptyString ;
IfEmptyString.prototype.toString    = function () { return "[IfEmptyString]" }