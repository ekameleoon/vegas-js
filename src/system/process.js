"use strict" ;

import '../polyfill.js' ;

import { Action }        from './process/Action.js' ;
import { ActionEntry }   from './process/ActionEntry.js' ;
import { Batch }         from './process/Batch.js' ;
import { BatchTask }     from './process/BatchTask.js' ;
import { Do }            from './process/Do.js' ;
import { Lockable }      from './process/Lockable.js' ;
import { Priority }      from './process/Priority.js' ;
import { Resetable }     from './process/Resetable.js' ;
import { Resumable }     from './process/Resumable.js' ;
import { Runnable }      from './process/Runnable.js' ;
import { Startable }     from './process/Startable.js' ;
import { Stoppable }     from './process/Stoppable.js' ;
import { Task }          from './process/Task.js' ;
import { TaskGroup }     from './process/TaskGroup.js' ;
import { TaskPhase }     from './process/TaskPhase.js' ;
import { TimeoutPolicy } from './process/TimeoutPolicy.js' ;

/**
 * The VEGAS.js framework - The system.process library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var process = Object.assign
({
    Action        : Action ,
    ActionEntry   : ActionEntry ,
    Batch         : Batch ,
    BatchTask     : BatchTask ,
    Do            : Do,
    Lockable      : Lockable ,
    Priority      : Priority ,
    Resetable     : Resetable ,
    Resumable     : Resumable ,
    Runnable      : Runnable ,
    Startable     : Startable ,
    Stoppable     : Stoppable ,
    Task          : Task ,
    TaskGroup     : TaskGroup ,
    TaskPhase     : TaskPhase ,
    TimeoutPolicy : TimeoutPolicy
}) ;