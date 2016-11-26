"use strict" ;

import { False } from '../rules/False.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Performs some tasks based on whether a given condition holds false.
 * @name IfFalse
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.False
 */
export function IfFalse( condition , thenTask = null , elseTask = null , ...elseIfTasks )  // jshint ignore:line
{
    IfTask.call( this , new False(condition) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfFalse.prototype = Object.create( IfTask.prototype ,
{
    constructor : { value : IfFalse , writable : true }
});