"use strict" ;

import { Task } from './system/process/Task.js' ;

/**
 * The abstract state task representation.
 * @summary Defines an abstract state task.
 * @name StateTask
 * @class
 * @memberof molecule.states.process
 * @implements system.process.Task
 * @constructs
 */
export function StateTask( state = null , factory = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The factory reference.
         * @name factory
         * @memberof molecule.states.process.StateTask
         * @instance
         */
        factory : { writable : true , value : factory } ,

        /**
         * The state reference.
         * @name state
         * @memberof molecule.states.process.StateTask
         * @instance
         */
        state : { writable : true , value : state }
    });

    Task.call( this ) ;
}

StateTask.prototype = Object.create( Task.prototype ,
{
    constructor : { writable : true , value : StateTask }
}) ;