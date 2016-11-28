"use strict" ;

import { Null } from '../rules/Null.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given value is <code>null</code>.
 * @name IfNull
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @see system.rules.Null
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.

 */
export function IfNull( value , strict = false , thenTask /*Action*/ = null , elseTask /*Action*/ = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new Null(value,strict) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfNull.prototype = Object.create( IfTask.prototype ,
{
    constructor : { writable : true , value : IfNull }
});