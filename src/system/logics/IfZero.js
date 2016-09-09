"use strict" ;

import { Zero } from '../rules/Zero.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given value is 0.
 */
export function IfZero( value , thenTask /*Action*/ = null , elseTask /*Action*/ = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new Zero(value) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfZero.prototype             = Object.create( IfTask.prototype );
IfZero.prototype.constructor = IfZero ;
IfZero.prototype.toString    = function () { return "[IfZero]" }