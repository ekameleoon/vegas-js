"use strict" ;

import { True } from '../rules/True.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given condition holds true.
 * @name IfTrue
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.True
 * @param {Object} condition - The object to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.

 */
export function IfTrue( condition , thenTask = null , elseTask = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new True(condition) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfTrue.prototype = Object.create( IfTask.prototype ,
{
    constructor : { value : IfTrue , writable : true }
});