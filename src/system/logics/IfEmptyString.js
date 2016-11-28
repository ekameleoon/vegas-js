"use strict" ;

import { EmptyString } from '../rules/EmptyString.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given value is an empty string <code>""</code>.
 * @name IfEmptyString
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @see system.rules.EmptyString
 * @param {Object} value - The value to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.
 */
export function IfEmptyString( value , thenTask = null , elseTask = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new EmptyString(value) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfEmptyString.prototype = Object.create( IfTask.prototype ,
{
    constructor : { writable : true , value : IfEmptyString }
});