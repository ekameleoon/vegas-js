"use strict" ;

import { Equals } from '../rules/Equals.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given condition holds equality of two values.
 * @name IfEquals
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.Equals
 * @param {Object} value1 - The first value to evaluate.
 * @param {Object} value2 - The second value to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.
 */
export function IfEquals( value1 , value2 , thenTask = null , elseTask = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new Equals(value1,value2) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfEquals.prototype = Object.create( IfTask.prototype ,
{
    constructor : { writable : true , value : IfEquals }
});