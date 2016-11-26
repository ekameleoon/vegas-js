"use strict" ;

import { Null } from '../rules/Null.js' ;

import { IfTask } from './IfTask.js' ;

/**
 * Perform some tasks based on whether a given value is <code>null</code>.
 * @name IfNull
 * @memberof system.logics
 * @extends system.logics.IfTask
 * @class
 * @constructor
 * @see system.rules.Null
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
    constructor : { writable : true , value : IfNull  }
});