/*jshint unused: false*/
"use strict" ;

import { ArrayMap }  from '../data/maps/ArrayMap.js' ;

import { Action }      from './Action.js' ;
import { ActionEntry } from './ActionEntry.js' ;
import { Task }        from './Task.js' ;

/**
 * A simple representation of the Action interface, to group some Action objects in one.
 * @param mode Specifies the mode of the chain. The mode can be "normal" (default), "transient" or "everlasting".
 * @param actions A dynamic object who contains Action references to initialize the chain.
 * @example
 * var do1 = new system.process.Do() ;
 * var do2 = new system.process.Do() ;
 *
 * do1.something = function()
 * {
 *     console.log( "#1 something" ) ;
 * }
 *
 * do2.something = function()
 * {
 *     console.log( "#2 something" ) ;
 * }
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
 * var batch = new system.process.BatchTask() ;
 *
 * batch.add( do1 ) ;
 * batch.add( do2 ) ;
 *
 * batch.verbose = true ;
 *
 * trace( 'batch : ' + batch.toString(true) ) ; // batch : [TaskGroup[[Do],[Do]]]
 * trace( 'running : ' + batch.running ) ; // running : false
 * trace( 'length : ' + batch.length ) ; // length : 2
 *
 * batch.finishIt.connect(finish) ;
 * batch.startIt.connect(start) ;
 *
 * batch.run() ;
 *
 * // start: [TaskGroup[[Do],[Do]]]
 * // #1 something
 * // #2 something
 * // finish: [TaskGroup[[Do],[Do]]]
 */
export function TaskGroup( mode /*String*/ , actions /*Array*/)
{
    Task.call(this) ;

    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _actions :
        {
            value : [] ,
            writable : true
        },
        /**
         * @private
         */
        _buffer :
        {
            value : new ArrayMap() ,
            writable : true
        },
        /**
         * @private
         */
        _stopped :
        {
            value : false ,
            writable : true
        },
        /**
         * @private
         */
        _mode :
        {
            value : TaskGroup.NORMAL ,
            writable : true
        }
    }) ;

    this.verbose = false ;

    if( typeof(mode) === "string" || ( mode instanceof String ) )
    {
        this.mode = mode ;
    }

    if ( actions && ( actions instanceof Array ) && ( actions.length > 0 ) )
    {
        actions.forEach( ( action ) =>
        {
            if( action instanceof Action )
            {
                this.add( action ) ;
            }
        });
    }
}

Object.defineProperties( TaskGroup ,
{
    /**
     * Determinates the "everlasting" mode of the group.
     * In this mode the action register in the task-group can't be auto-remove.
     */
    EVERLASTING : { value : 'everlasting' , enumerable : true } ,

    /**
     * Determinates the "normal" mode of the group.
     * In this mode the task-group has a normal life cycle.
     */
    NORMAL : { value : 'normal' , enumerable : true } ,

    /**
     * Determinates the "transient" mode of the group.
     * In this mode all actions are strictly auto-remove in the task-group when are invoked.
     */
    TRANSIENT : { value : 'transient' , enumerable : true } ,
}) ;

/**
 * @extends Task
 */
TaskGroup.prototype = Object.create( Task.prototype ,
{
    /**
     * Indicates the numbers of actions register in the group.
     */
    length :
    {
        get : function()
        {
            return this._actions.length ;
        },
        set : function( value )
        {
            if ( this._running )
            {
                throw new Error( this + " length property can't be changed, the batch process is in progress." ) ;
            }
            this.dispose() ;
            var old /*uint*/  = this._actions.length ;
            this._actions.length = value ;
            var l /*int*/ = this._actions.length ;
            if ( l > 0 )
            {
                var slot ;
                var e /*ActionEntry*/ ;
                while( --l > -1 )
                {
                    e = this._actions[l] ;
                    if ( e && e.action )
                    {
                        slot = this.next.bind(this) ;
                        this._buffer.set( e , slot ) ;
                        e.action.finishIt.connect( slot ) ;
                    }
                }
            }
            else if ( old > 0 )
            {
                this.notifyCleared() ; // clear notification
            }
        }
    },

    /**
     * Determinates the mode of the chain. The mode can be "normal", "transient" or "everlasting".
     * @see TaskGroup.NORMAL, TaskGroup.EVERLASTING, TaskGroup.TRANSIENT
     */
    mode :
    {
        get : function()
        {
            return this._mode ;
        },
        set : function( value )
        {
            this._mode = ( value === TaskGroup.TRANSIENT || value === TaskGroup.EVERLASTING ) ? value : TaskGroup.NORMAL ;
        }
    },

    /**
     * Indicates if the chain is stopped.
     */
    stopped :
    {
        get : function()
        {
            return this._stopped ;
        }
    }
});

TaskGroup.prototype.constructor = TaskGroup;
TaskGroup.prototype.__className__ = 'TaskGroup' ;

/**
 * Adds an action in the chain.
 * @param priority Determinates the priority level of the action in the chain.
 * @param autoRemove Apply a removeAction after the first finish notification.
 * @return <code>true</code> if the insert is success.
 */
TaskGroup.prototype.add = function( action /*Action*/ , priority /*uint*/ , autoRemove /*Boolean*/ ) /*Boolean*/
{
    if ( this._running )
    {
        throw new Error( this + " add failed, the process is in progress." ) ;
    }

    if ( action && ( action instanceof Action ) )
    {
        autoRemove = Boolean( autoRemove ) ;
        priority   = ( priority > 0 ) ? Math.round(priority) : 0 ;

        var entry = new ActionEntry( action , priority , autoRemove ) ;
        var slot  = this.next.bind( this ) ;

        action.finishIt.connect( slot ) ;
        this._buffer.set( entry , slot ) ;
        this._actions.push( entry ) ;

        /////// bubble sorting

        var i ;
        var j ;

        var a = this._actions ;

        var swap = ( j , k ) =>
        {
            var temp = a[j] ;
            a[j]     = a[k] ;
            a[k]     = temp ;
            return true ;
        }

        var swapped = false;

        var l = a.length ;

        for( i = 1 ; i < l ; i++ )
        {
            for( j = 0 ; j < ( l - i ) ; j++ )
            {
                if ( a[j+1].priority > a[j].priority )
                {
                    swapped = swap(j, j+1) ;
                }
            }
            if ( !swapped )
            {
                break;
            }
        }

        //////

        return true ;
    }
    return false ;
}

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
TaskGroup.prototype.clone = function()
{
    return new TaskGroup( this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
}

/**
 * Dispose the chain and disconnect all actions but don't remove them.
 */
TaskGroup.prototype.dispose = function() /*void*/
{
    if ( this._actions.length > 0 )
    {
        var slot ;
        this._actions.forEach( ( entry ) =>
        {
            if ( entry instanceof ActionEntry )
            {
                slot = this._buffer.get( entry ) ;
                if ( slot )
                {
                    entry.action.finishIt.disconnect( slot ) ;
                    this._buffer.remove( entry ) ;
                }
            }
        });
    }
}

/**
 * Returns the action register in the chain at the specified index value or <code>null</code>.
 * @return the action register in the chain at the specified index value or <code>null</code>.
 */
TaskGroup.prototype.get = function( index /*uint*/ ) /*Action*/
{
    if ( this._actions.length > 0 && index < this._actions.length )
    {
        var entry = this._actions[index] ;
        if ( entry )
        {
            return entry.action ;
        }
    }
    return null ;
}

/**
 * Returns <code class="prettyprint">true</code> if the specified Action is register in the group.
 * @return <code class="prettyprint">true</code> if the specified Action is register in the group.
 */
TaskGroup.prototype.contains = function( action /*Action*/ ) /*Action*/
{
    if ( action && action instanceof Action )
    {
        if ( this._actions.length > 0 )
        {
            var e /*ActionEntry*/ ;
            var l /*int*/ = this._actions.length ;
            while( --l > -1 )
            {
                e = this._actions[l] ;
                if ( e && e.action === action )
                {
                    return true ;
                }
            }
        }
    }
    return false ;
}

/**
 * Returns <code>true</code> if the chain is empty.
 * @return <code>true</code> if the chain is empty.
 */
TaskGroup.prototype.isEmpty = function() /*Boolean*/
{
    return this._actions.length === 0 ;
}

/**
 * Invoked when a task is finished.
 */
TaskGroup.prototype.next = function( action /*Action*/ ) /*void*/
{
    //
}

/**
 * Removes a specific action register in the chain and if the passed-in argument is null all actions register in the chain are removed.
 * If the chain is running the stop() method is called.
 * @return <code>true</code> if the method success.
 */
TaskGroup.prototype.remove = function( action /*Action*/ ) /*Boolean*/
{
    if ( this._running )
    {
        throw new Error( this + " remove failed, the process is in progress." ) ;
    }
    this.stop() ;
    if ( this._actions.length > 0 )
    {
        if ( action && action instanceof Action )
        {
            var e /*ActionEntry*/ ;
            var l /*int*/ = this._actions.length ;

            var slot ;

            this._actions.forEach( ( element ) =>
            {
                if ( element && (element instanceof ActionEntry) && element.action === action )
                {
                    slot = this._buffer.get( e ) ;
                    if ( slot )
                    {
                        e.action.finishIt.disconnect( slot ) ;
                        this._buffer.remove( e ) ;
                    }
                    this._actions.splice( l , 1 ) ;
                    return true ;
                }
            });
        }
        else
        {
            this.dispose() ;
            this._actions.length = 0 ;
            this._buffer.clear() ;
            this.notifyCleared() ;
            return true ;
        }
    }
    return false ;
}

/**
 * Returns the Array representation of the chain.
 * @return the Array representation of the chain.
 */
TaskGroup.prototype.toArray = function() /*Array*/
{
    if ( this._actions.length > 0 )
    {
        var output /*Array*/ = [] ;
        if( this._actions.length > 0 )
        {
            this._actions.forEach( ( element ) =>
            {
                if ( element && element instanceof ActionEntry && element.action )
                {
                    output.push( element.action ) ;
                }
            });
        }
        return output ;
    }
    else
    {
        return [] ;
    }
}

/**
 * Returns the String representation of the chain.
 * @return the String representation of the chain.
 */
TaskGroup.prototype.toString = function() /*String*/
{
    var s /*String*/ = "[" + this.__className__ ;
    if ( Boolean(this.verbose) )
    {
        if ( this._actions.length > 0 )
        {
            s += "[" ;
            var i /*int*/ ;
            var e /*ActionEntry*/ ;
            var l /*int*/ = this._actions.length ;
            var r /*Array*/ = [] ;
            for( i = 0 ; i < l ; i++ )
            {
                e = this._actions[i] ;
                r.push( ( e && e.action ) ? e.action : null ) ;
            }
            s += r.toString() ;
            s += "]" ;
        }
    }
    s += "]" ;
    return s ;
}