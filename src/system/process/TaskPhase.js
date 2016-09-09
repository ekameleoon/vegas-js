"use strict" ;

/**
 * The enumeration of all phases in a task process.
 */
export var TaskPhase = Object.defineProperties( {} ,
{
    ERROR    : { value : 'error'    , enumerable : true } ,
    DELAYED  : { value : 'delayed'  , enumerable : true } ,
    FINISHED : { value : 'finished' , enumerable : true } ,
    INACTIVE : { value : 'inactive' , enumerable : true } ,
    RUNNING  : { value : 'running'  , enumerable : true } ,
    STOPPED  : { value : 'stopped'  , enumerable : true } ,
    TIMEOUT  : { value : 'timeout'  , enumerable : true }
}) ;

