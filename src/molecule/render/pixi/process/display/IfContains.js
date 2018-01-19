"use strict" ;

import { Contains } from '../../rules/Contains.js' ;

import { IfTask } from 'system/logics/IfTask.js' ;

/**
 * Perform some tasks based on whether a DisplayObjectContainer reference contains a specific display.
 * @name IfContains
 * @memberof molecule.render.pixi.process.display
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @param {PIXI.Container} container - The {PIXI.Container} reference to evaluate.
 * @param {PIXI.DisplayObject} child - The {PIXI.DisplayObject} reference to evaluate.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.
 * @see molecule.render.pixi.rules.Contains
 */
export function IfContains( container = null , child = null , thenTask = null , elseTask = null , ...elseIfTasks ) // jshint ignore:line
{
    IfTask.call( this , new Contains( container ,child ) , thenTask , elseTask ) ;
    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks ) ;
    }
}

IfContains.prototype = Object.create( IfTask.prototype ,
{
    constructor : { writable : true , value : IfContains }
});