"use strict" ;

/**
 * The enumeration of all phases in a task process.
 * @summary The enumeration of all phases in the {@link system.process.Task|Task} objects.
 * @namespace system.process.TaskPhase
 * @memberof system.process
 */
export var TaskPhase = Object.defineProperties( {} ,
{
    /**
     * The <code>'error'</code> type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    ERROR : { value : 'error' , enumerable : true } ,

    /**
     * The <code>'delayed'</code> type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    DELAYED : { value : 'delayed'  , enumerable : true } ,

    /**
     * The <code>'finished'</code> type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    FINISHED : { value : 'finished' , enumerable : true } ,

    /**
     * The <code>'inactive'</code> type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    INACTIVE : { value : 'inactive' , enumerable : true } ,

    /**
     * The <code>'running'</code> type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    RUNNING : { value : 'running' , enumerable : true } ,

    /**
     * The <code>'stopped'</code> type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    STOPPED : { value : 'stopped' , enumerable : true } ,

    /**
     * The <code>'timeout'</code> type.
     * @memberof system.process.TaskPhase
     * @const
     * @type {string}
     */
    TIMEOUT : { value : 'timeout' , enumerable : true }
}) ;

