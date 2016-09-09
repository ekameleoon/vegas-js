"use strict" ;

import { Equals } from '../rules/Equals.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given condition holds equality of two values.
 */
export function IfEquals( value1 , value2 , thenTask /*Action*/ = null , elseTask /*Action*/ = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new Equals(value1,value2) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfEquals.prototype             = Object.create( IfTask.prototype );
IfEquals.prototype.constructor = IfEquals ;
IfEquals.prototype.toString    = function () { return "[IfEquals]" }