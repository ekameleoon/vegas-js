"use strict" ;

import { False } from '../rules/False.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Performs some tasks based on whether a given condition holds false.
 * @name IfFalse
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @see system.rules.False
 * @param {Object} condition - The object to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.

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
    constructor : { writable : true , value : IfFalse }
});