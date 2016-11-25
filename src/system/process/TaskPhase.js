"use strict" ;

/**
 * The enumeration of all phases in a task process.
 * @namespace system.process.TaskPhase
 * @memberof system.process
 */
export var TaskPhase = Object.defineProperties( {} ,
{
    /**
     * The 'error' type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    ERROR : { value : 'error' , enumerable : true } ,

    /**
     * The 'delayed' type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    DELAYED : { value : 'delayed'  , enumerable : true } ,

    /**
     * The 'finished' type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    FINISHED : { value : 'finished' , enumerable : true } ,

    /**
     * The 'inactive' type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    INACTIVE : { value : 'inactive' , enumerable : true } ,

    /**
     * The 'running' type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    RUNNING : { value : 'running' , enumerable : true } ,

    /**
     * The 'stopped' type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    STOPPED : { value : 'stopped' , enumerable : true } ,

    /**
     * The 'timeout' type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    TIMEOUT : { value : 'timeout' , enumerable : true }
}) ;

