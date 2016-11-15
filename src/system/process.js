"use strict" ;

import '../polyfill.js' ;

import { Attribute }    from './process/caches/Attribute.js' ;
import { Method    }    from './process/caches/Method.js' ;
import { Property  }    from './process/caches/Property.js' ;

import { Action }        from './process/Action.js' ;
import { ActionEntry }   from './process/ActionEntry.js' ;
import { Batch }         from './process/Batch.js' ;
import { BatchTask }     from './process/BatchTask.js' ;
import { Cache }         from './process/Cache.js' ;
import { Chain }         from './process/Chain.js' ;
import { Do }            from './process/Do.js' ;
import { FrameTimer }    from './process/FrameTimer.js' ;
import { Lock }          from './process/Lock.js' ;
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
import { Timer }         from './process/Timer.js' ;
import { Unlock }        from './process/Unlock.js' ;

import { isLockable  } from './process/Lockable.js' ;
import { isResetable } from './process/Resetable.js' ;
import { isResumable } from './process/Resumable.js' ;
import { isRunnable  } from './process/Runnable.js' ;
import { isStartable } from './process/Startable.js' ;
import { isStoppable } from './process/Stoppable.js' ;

/**
 * The VEGAS.js framework - The system.process library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var process = Object.assign
({
    isLockable    : isLockable ,
    isResetable   : isResetable ,
    isResumable   : isResumable ,
    isRunnable    : isRunnable ,
    isStartable   : isStartable ,
    isStoppable   : isStoppable ,

    caches : Object.assign
    ({
        Attribute : Attribute ,
        Method    : Method ,
        Property  : Property
    }),

    Action        : Action ,
    ActionEntry   : ActionEntry ,
    Batch         : Batch ,
    BatchTask     : BatchTask ,
    Cache         : Cache ,
    Chain         : Chain ,
    Do            : Do,
    FrameTimer    : FrameTimer,
    Lock          : Lock ,
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
    TimeoutPolicy : TimeoutPolicy,
    Timer         : Timer,
    Unlock        : Unlock
}) ;