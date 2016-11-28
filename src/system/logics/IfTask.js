"use strict" ;

import { isBoolean }   from '../../core/isBoolean.js' ;

import { Action }      from '../process/Action.js' ;
import { BooleanRule } from '../rules/BooleanRule.js' ;
import { ElseIf }      from './ElseIf.js' ;
import { Rule }        from '../rules/Rule.js' ;
import { Signal }      from '../signals/Signal.js' ;
import { TaskPhase }   from '../process/TaskPhase.js' ;

/**
 * Perform some tasks based on whether a given condition holds true or not.
 * @name IfTask
 * @memberof system.logics
 * @implements system.process.Action
 * @augments system.process.Action
 * @class
 * @example <caption><strong>Usage </strong>:</caption>
 * var task = new IfTask( rule:Rule    , thenTask:Action , elseTask:Action , ...elseIfTasks )
 * var task = new IfTask( rule:Boolean , thenTask:Action , elseTask:Action , ...elseIfTasks )
 * @example <caption><strong>Basic example </strong>:</caption>
 * // -------- Imports
 *
 * var IfTask      = system.logics.IfTask ;
 * var Do          = system.process.Do ;
 * var ElseIf      = system.logics.ElseIf ;
 * var EmptyString = system.rules.EmptyString ;
 * var Equals      = system.rules.Equals ;
 *
 * // -------- init
 *
 * var task ;
 *
 * var do1 = new Do() ;
 * var do2 = new Do() ;
 * var do3 = new Do() ;
 * var do4 = new Do() ;
 *
 * do1.something = function() { trace("do1 ###") } ;
 * do2.something = function() { trace("do2 ###") } ;
 * do3.something = function() { trace("do3 ###") } ;
 * do4.something = function() { trace("do4 ###") } ;
 *
 * // -------- behaviors
 *
 * var error = function( message , action  )
 * {
 *     trace( "error:" + action + " message:" + message ) ;
 * };
 *
 * var finish = function( action )
 * {
 *     trace( "finish: " + action ) ;
 * };
 *
 * var start = function( action )
 * {
 *     trace( "start: " + action ) ;
 * };
 *
 * trace(' -------- test 1');
 *
 * task = new IfTask( new EmptyString('') , do1 , do2 ) ;
 *
 * task.finishIt.connect(finish) ;
 * task.errorIt.connect(error) ;
 * task.startIt.connect(start) ;
 *
 * task.run() ;
 *
 * trace(' -------- test 2');
 *
 * task.clear() ;
 *
 * task.rule = new Equals(1,2) ;
 *
 * task.addThen( do1 )
 *     .addElse( do2 )
 *     .run() ;
 *
 * trace(' -------- test 3 : <elseIf>');
 *
 * task.clear() ;
 *
 * task.addRule( new Equals(1,2) )
 *     .addThen( do1 )
 *     .addElseIf
 *     (
 *         new ElseIf( new Equals(2,1) , do3 ) ,
 *         new ElseIf( new Equals(2,2) , do4 )
 *     )
 *     .addElse( do2 )
 *     .run() ;
 *
 * trace(' -------- test 4 : <then> is already register');
 *
 * task.clear() ;
 * task.throwError = true ;
 *
 * try
 * {
 *     task.addThen( do1 )
 *         .addElse( do2 )
 *         .addThen( do3 )
 * }
 * catch (e)
 * {
 *     trace( e ) ;
 * }
 *
 * trace(' -------- test 5 : <rule> is not defined');
 *
 * try
 * {
 *     task.run() ;
 * }
 * catch (e)
 * {
 *     trace( e ) ;
 * }
 *
 * trace(' -------- test 6 : <rule> is not defined and throwError = false');
 *
 * task.throwError = false ;
 *
 * task.run() ;
 * @param {system.rules.Rule} rule - The initial condition.
 * @param {system.process.Action} thenTask - The action to execute if the main condition if <code>true</code>.
 * @param {system.process.Action} elseTask - The action invoked if all the conditions failed.
 * @param {array} elseTask - The optional collection of {@link system.logics.ElseIf} tasks.
 */
export function IfTask( rule = null , thenTask = null , elseTask = null , ...elseIfTasks ) // jshint ignore:line
{
    Action.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * This signal emit when the action failed.
         * @memberof system.logics.IfTask
         * @type {system.signals.Signal}
         * @instance
         * @readonly
         */
        errorIt : { value : new Signal() } ,

        /**
         * Indicates if the class throws errors or notify a finished event when the task failed.
         * @memberof system.logics.IfTask
         * @type {boolean}
         * @default false
         * @instance
         */
        throwError : { value : false , writable : true , enumerable : true } ,

        /**
         * @private
         */
        _done : { value :false , writable : true } ,

        /**
         * @private
         */
        _elseIfTasks : { value : [] } ,

        /**
         * @private
         */
        _elseTask :
        {
            value    : ( elseTask instanceof Action ) ? elseTask : null ,
            writable : true
        },

        /**
         * @private
         */
        _rule :
        {
            value    : ( rule instanceof Rule ) ? rule : new BooleanRule( rule ) ,
            writable : true
        } ,

        /**
         * @private
         */
        _thenTask :
        {
            value    : ( thenTask instanceof Action ) ? thenTask : null ,
            writable : true
        }
    }) ;

    if( elseIfTasks.length > 0 )
    {
        this.addElseIf.apply( this , elseIfTasks) ;
    }
}

IfTask.prototype = Object.create( Action.prototype ,
{
    /**
     * The constructor reference.
     */
    constructor : { writable : true , value : IfTask } ,

    /**
     * The collection of condition/action invokable if the main rule is not true.
     * @memberof system.logics.IfTask
     * @type {array}
     * @instance
     * @readonly
     */
    elseIfTask : { get : function() { return this._elseIfTask ; } } ,

    /**
     * The action invoked if all the conditions failed.
     * @memberof system.logics.IfTask
     * @type {system.process.Action}
     * @instance
     * @readonly
     */
    elseTask : { get : function() { return this._elseTask ; } } ,

    /**
     * The rule reference of this task.
     * @memberof system.logics.IfTask
     * @type {system.rules.Rule}
     * @instance
     */
    rule :
    {
        get : function() { return this._rule ; } ,
        set : function( rule )
        {
            this._rule = ( rule instanceof Rule ) ? rule : new BooleanRule(rule) ;
        }
    } ,

    /**
     * The action to execute if the main condition if <code>true</code>.
     * @memberof system.logics.IfTask
     * @type {system.process.Action}
     * @instance
     */
    thenTask : { get : function() { return this._thenTask ; } } ,

    /**
     * Defines the action when the condition block use the else condition.
     * @name addElse
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @param {system.process.Action} action The action to defines with the else condition in the {system.logics.IfTask} reference.
     * @return The current IfTask reference.
     * @throws Error if an 'else' action is already register.
     */
    addElse : { value : function( action )
    {
        if ( this._elseTask )
        {
            throw new Error( this + " addElse failed, you must not nest more than one <else> into <if>");
        }
        else if( action instanceof Action )
        {
            this._elseTask = action ;
        }
        return this ;
    }},

    /**
     * Defines an action when the condition block use the elseif condition.
     * @name addElseIf
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @param {...system.logics.ElseIf|system.rules.Rule|system.process.Action} condition - A {system.logics.ElseIf} instance or a serie of {system.rules.Rule}/{system.process.Action}.
     * @return The current IfTask reference.
     * @example
     *
     * var IfTask      = system.logics.IfTask ;
     * var Do          = system.process.Do ;
     * var ElseIf      = system.logics.ElseIf ;
     * var EmptyString = system.rules.EmptyString ;
     * var Equals      = system.rules.Equals ;
     *
     * var do1 = new Do() ;
     * var do2 = new Do() ;
     * var do3 = new Do() ;
     * var do4 = new Do() ;
     *
     * do1.something = function() { trace("do1 ###") } ;
     * do2.something = function() { trace("do2 ###") } ;
     * do3.something = function() { trace("do3 ###") } ;
     * do4.something = function() { trace("do4 ###") } ;
     *
     * var task = new IfTask() ;
     *
     * task.addRule( new Equals(1,2) )
     *     .addThen( do1 )
     *     .addElseIf
     *     (
     *         new ElseIf( new Equals(2,1) , do3 ) ,
     *         new Equals(2,2) , do4
     *     )
     *     .addElse( do2 )
     *     .run() ; // do4 ###
     */
    addElseIf : { value : function( ...elseIfTask  ) /*IfTask*/
    {
        if ( elseIfTask && elseIfTask.length > 0 )
        {
            var ei ;
            var len = elseIfTask.length ;
            for( var i = 0 ; i<len ; i++ )
            {
                ei = null ;
                if( elseIfTask[i] instanceof ElseIf )
                {
                    ei = elseIfTask[i] ;
                }
                else if ( (elseIfTask[i] instanceof Rule || isBoolean(elseIfTask[i]) ) && (elseIfTask[i+1] instanceof Action) )
                {
                    ei = new ElseIf( elseIfTask[i] , elseIfTask[i+1] ) ;
                    i++ ;
                }

                if ( ei )
                {
                    this._elseIfTasks.push( ei ) ;
                }
            }
        }

        return this ;
    }},

    /**
     * Defines the main conditional rule of the task.
     * @name addRule
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @param {system.rules.Rule} rule - The main <code>Rule</code> of the task.
     * @return The current IfTask reference.
     * @throws Error if a 'condition' is already register.
     */
    addRule : { value : function( rule ) /*IfTask*/
    {
        if ( this._rule )
        {
            throw new Error( this + " addRule failed, you must not nest more than one <condition> into <if>");
        }
        else
        {
            this._rule = ( rule instanceof Rule ) ? rule : new BooleanRule(rule) ;
        }
        return this ;
    }},

    /**
     * Defines the action when the condition block success and must run the 'then' action.
     * @name addThen
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @param {system.process.Action} action - Defines the '<b>then</b>' action in the <code>IfTask</code> reference.
     * @return The current <code>IfTask</code> reference.
     * @throws <code>Error</code> if the 'then' action is already register.
     */
    addThen : { value : function( action )
    {
        if ( this._thenTask )
        {
            throw new Error( this + " addThen failed, you must not nest more than one <then> into <if>");
        }
        else if( action instanceof Action )
        {
            this._thenTask = action ;
        }
        return this ;
    }},

    /**
     * Clear all elements conditions and conditional tasks in the process.
     * @name clear
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @return The current <code>IfTask</code> reference.
     */
    clear : { value : function()
    {
        this._rule = null ;
        this._elseIfTasks.length = 0 ;
        this._elseTask = null ;
        this._thenTask = null ;
        return this ;
    }},

    /**
     * Removes the 'elseIf' action.
     * @name deleteElseIf
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @return The current <code>IfTask</code> reference.
     */
    deleteElseIf : { value : function() /*IfTask*/
    {
        this._elseIfTasks.length = 0 ;
        return this ;
    }},

    /**
     * Removes the 'else' action.
     * @name deleteElse
     * @memberof system.logics.IfTask
     * @function
     * @instance
     * @return The current <code>IfTask</code> reference.
     */
    deleteElse : { value : function() /*IfTask*/
    {
        this._elseTask = null ;
        return this ;
    }},

    /**
     * Removes the 'rule' of the task.
     * @return The current IfTask reference.
     */
    deleteRule : { value : function() /*IfTask*/
    {
        this._rule = null ;
        return this ;
    }},

    /**
     * Removes the 'then' action.
     * @return The current IfTask reference.
     */
    deleteThen : { value : function() /*IfTask*/
    {
        this._thenTask = null ;
        return this ;
    }},

    /**
     * Notify when the process is started.
     * @name notifyError
     * @memberof system.logics.IfTask
     * @function
     * @instance
     */
    notifyError : { value : function( message ) /*void*/
    {
        this._running = false ;
        this._phase  = TaskPhase.ERROR ;
        this.errorIt.emit( message , this ) ;
        if( this.throwError )
        {
            throw new Error( message ) ;
        }
    }},

    /**
     * Run the process.
     * @memberof system.logics.IfTask
     */
    run : { value : function()
    {
        if ( this.running )
        {
            return ;
        }

        this._done = false ;

        this.notifyStarted() ;

        if ( !this._rule || !(this._rule instanceof Rule) )
        {
            this.notifyError( this + " run failed, the 'conditional rule' of the task not must be null." ) ;
            this.notifyFinished() ;
            return ;
        }

        if ( this._rule.eval() )
        {
            if( this._thenTask instanceof Action )
            {
                this._execute( this._thenTask ) ;
            }
            else if ( this.throwError )
            {
                this.notifyError( this + " run failed, the 'then' action not must be null.") ;
            }
        }
        else
        {
            if ( this._elseIfTasks.length > 0 )
            {
                var ei ;
                var len = this._elseIfTasks.length ;
                for (var i = 0 ; (i<len) && !this._done ; i++ )
                {
                    ei = this._elseIfTasks[i] ;
                    if ( (ei instanceof ElseIf) && ei.eval() )
                    {
                        this._execute( ei.then ) ;
                    }
                }
            }

            if( !this._done && this._elseTask )
            {
                this._execute( this._elseTask ) ;
            }
        }

        if( !this._done )
        {
            if ( this.throwError )
            {
                this.notifyError( this + " run failed, the 'then' action not must be null.") ;
            }
            else
            {
                this.notifyFinished() ;
            }
        }
    }},

    // ---------- private

    /**
     * @private
     */
    _execute : { value : function( action /*Action*/ )
    {
        if ( action instanceof Action )
        {
            action.finishIt.connect( this._finishTask.bind(this) , 1 , true ) ;
            action.run() ;
        }
    }},

    /**
     * @private
     */
    _finishTask :
    {
        value : function()
        {
            this._done = true ;
            this.notifyFinished() ;
        }
    }
}) ;