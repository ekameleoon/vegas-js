"use strict" ;

import { isBoolean }   from '../../core/isBoolean.js' ;

import { Action }      from '../process/Action.js' ;
import { BooleanRule } from '../rules/BooleanRule.js' ;
import { ElseIf }      from './ElseIf.js' ;
import { Rule }        from '../rules/Rule.js' ;

/**
 * Perform some tasks based on whether a given condition holds true or not.
 */
export function IfTask( rule = null , thenTask /*Action*/ = null , elseTask /*Action*/ = null , ...elseIfTasks ) // jshint ignore:line
{
    Action.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * Returns the elseIfTask collection reference or null.
         */
        elseIfTask : { get : function() { return this._elseIfTask ; } } ,

        /**
         * Returns the elseTask action reference or null.
         */
        elseTask : { get : function() { return this._elseTask ; } } ,

        /**
         * Returns the thenTask action reference or null.
         */
        thenTask : { get : function() { return this._thenTask ; } } ,

        /**
         * Indicates if the class throws errors or notify a finished event when the task failed.
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

/**
 * @extends TaskGroup
 */
IfTask.prototype = Object.create( Action.prototype ,
{
    /**
     * Defines the action when the condition block use the else condition.
     * @param action The action to defines with the else condition in the IfTask reference.
     * @return The current IfTask reference.
     * @throws Error if an 'else' action is already register.
     */
    addElse : { value : function( action /*Action*/ ) /*IfTask*/
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
     * @param condition The condition of the 'elseif' element.
     * @param task The task to invoke if the 'elseif' condition is succeed.
     * @return The current IfTask reference.
     * @throws Error The condition and action reference not must be null.
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
     * @param rule The main Rule of the task.
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
     * @param action Defines the 'then' action in the IfTask reference.
     * @return The current IfTask reference.
     * @throws Error if the 'then' action is already register.
     */
    addThen : { value : function( action /*Action*/ ) /*IfTask*/
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
     * Removes the 'elseIf' action.
     * @return The current IfTask reference.
     */
    deleteElseIf : { value : function() /*IfTask*/
    {
        this._elseIfTasks.length = 0 ;
        return this ;
    }},

    /**
     * Removes the 'else' action.
     * @return The current IfTask reference.
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
     * Reset all elements in the process.
     */
    reset : { value : function()
    {
        this._elseIfTasks.length = 0 ;
        this._elseTask = null ;
        this._thenTask = null ;
    }},

    /**
     * Run the process.
     */
    run : { value : function()
    {
        if ( this.running )
        {
            return ;
        }

        this._done = false ;

        this.notifyStarted() ;

        if ( this.throwError && !this._rule )
        {
            throw new Error( this + " run failed, the 'conditional rule' of the task not must be null.") ;
        }

        if ( this._rule && this._rule.eval() )
        {
            if( this._thenTask instanceof Action )
            {
                this._execute( this._thenTask ) ;
            }
            else if ( this.throwError )
            {
                throw new Error( this + " run failed, the 'then' action not must be null.") ;
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
                throw new Error( this + " run failed, the 'then' action not must be null.") ;
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
            this._done = true ;
            action.finishIt.connect( this._finishTask , 1 , true ) ;
            action.run() ;
        }
    }},

    /**
     * @private
     */
    _finishTask : { value : function() { this.notifyFinished() ; } }
}) ;

IfTask.prototype.constructor = IfTask;