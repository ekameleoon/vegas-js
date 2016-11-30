/* jshint unused: false*/
"use strict" ;

import { Action }      from './Action.js' ;
import { ActionEntry } from './ActionEntry.js' ;
import { Task }        from './Task.js' ;

/**
 * @description The abstract class to creates collections who group some {@link system.process.Action|Action} objects in one.
 * <p><b>Subclasses:</b> {@link system.process.BatchTask|BatchTask}, {@link system.process.Chain|Chain}</p>
 * @summary The abstract class to creates collections who group some {@link system.process.Action|Action} objects in one.
 * @name TaskGroup
 * @class
 * @memberof system.process
 * @extends system.process.Task
 * @param {string} [mode=normal] - Specifies the <code>mode</code> of the group. This <code>mode</code> can be <code>"normal"</code> (default), <code>"transient"</code> or <code>"everlasting"</code>.
 * @param {array} [actions=null] An optional array who contains Action references to initialize the chain.
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
export function TaskGroup( mode = 'normal' , actions = null )
{
    Task.call(this) ;

    Object.defineProperties( this ,
    {
        /**
         * Indicates if the toString method must be verbose or not.
         * @memberof system.process.TaskGroup
         * @type {boolean}
         * @instance
         * @default <code>false</code>
         */
        verbose : { value : false , writable : true },

        /**
         * @private
         */
        _actions : { value : [] , writable : true },

        /**
         * @private
         */
        _next : { value : null , writable : true , configurable : true },

        /**
         * @private
         */
        _stopped : { value : false , writable : true } ,

        /**
         * @private
         */
        _mode : { value : TaskGroup.NORMAL , writable : true }
    }) ;

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
     * Determinates the <code>"everlasting"</code> mode of the group.
     * In this mode the action register in the task-group can't be auto-remove.
     * @memberof system.process.TaskGroup
     * @type {boolean}
     */
    EVERLASTING : { value : 'everlasting' , enumerable : true } ,

    /**
     * Determinates the <code>"normal"</code> mode of the group.
     * In this mode the task-group has a normal life cycle.
     * @memberof system.process.TaskGroup
     * @type {boolean}
     */
    NORMAL : { value : 'normal' , enumerable : true } ,

    /**
     * Determinates the <code>"transient"</code> mode of the group.
     * In this mode all actions are strictly auto-remove in the task-group when are invoked.
     * @memberof system.process.TaskGroup
     * @type {boolean}
     */
    TRANSIENT : { value : 'transient' , enumerable : true } ,
}) ;

TaskGroup.prototype = Object.create( Task.prototype ,
{
    constructor : { writable : true , value : TaskGroup },

    /**
     * Indicates the numbers of actions register in the group.
     * @name length
     * @memberof system.process.TaskGroup
     * @instance
     * @readonly
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
            var l  = this._actions.length ;
            if ( l > 0 )
            {
                var e /*ActionEntry*/ ;
                while( --l > -1 )
                {
                    e = this._actions[l] ;
                    if ( e && e.action && this._next )
                    {
                        e.action.finishIt.connect( this._next ) ;
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
     * Determinates the mode of the chain. The mode can be <code>"normal"</code>, <code>"transient"</code> or <code>"everlasting"</code>.
     * @see {@link system.process.TaskGroup#NORMAL}, {@link system.process.TaskGroup#EVERLASTING}, {@link system.process.TaskGroup#TRANSIENT}
     * @name mode
     * @memberof system.process.TaskGroup
     * @instance
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
     * @name stopped
     * @memberof system.process.TaskGroup
     * @instance
     * @readonly
     */
    stopped :
    {
        get : function()
        {
            return this._stopped ;
        }
    },

    /**
     * Adds an action in the chain.
     * @name add
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @param {system.process.Action} action - The <code>Action</code> to register in this collection.
     * @param {number} [priority=0] - Determinates the priority level of the action in the chain.
     * @param {boolean} [autoRemove=false] - Apply a remove after the first finish notification.
     * @return <code>true</code> if the insert is success.
     */
    add : { value : function( action , priority = 0 , autoRemove = false )
    {
        if ( this._running )
        {
            throw new Error( this + " add failed, the process is in progress." ) ;
        }

        if ( action && ( action instanceof Action ) )
        {
            autoRemove = Boolean( autoRemove ) ;

            priority   = ( priority > 0 ) ? Math.round(priority) : 0 ;

            if( this._next )
            {
                action.finishIt.connect( this._next ) ;
            }

            this._actions.push( new ActionEntry( action , priority , autoRemove ) ) ;

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
    }},

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new TaskGroup( this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
    }},

    /**
     * Returns <code class="prettyprint">true</code> if the specified Action is register in the group.
     * @name contains
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @return <code class="prettyprint">true</code> if the specified Action is register in the group.
     */
    contains : { writable : true , value : function( action )
    {
        if ( action && action instanceof Action )
        {
            if ( this._actions.length > 0 )
            {
                var e /*ActionEntry*/ ;
                var l  = this._actions.length ;
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
    }},

    /**
     * Dispose the chain and disconnect all actions but don't remove them.
     * @name dispose
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     */
    dispose : { writable : true , value : function()
    {
        if ( this._actions.length > 0 )
        {
            this._actions.forEach( ( entry ) =>
            {
                if ( entry instanceof ActionEntry )
                {
                    entry.action.finishIt.disconnect( this._next ) ;
                }
            });
        }
    }},

    /**
     * Gets the <code>Action</code> register in the collection at the specified index value or <code>null</code>.
     * @name get
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @param {number} index - The index of the action element in the collection.
     * @return the action register in the chain at the specified index value or <code>null</code>.
     */
    get : { writable : true , value : function( index /*uint*/ )
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
    }},

    /**
     * Returns <code>true</code> if the collection is empty.
     * @name isEmpty
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @return <code>true</code> if the chain is empty.
     */
    isEmpty : { writable : true , value : function()
    {
        return this._actions.length === 0 ;
    }},

    /**
     * Invoked when a task is finished.
     * @name toArray
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     */
    next : { writable : true , value : function( action /*Action*/ )
    {
        // overrides
    }},

    /**
     * Removes a specific action register in the chain and if the passed-in argument is null all actions register in the chain are removed.
     * If the chain is running the <code>stop()</code> method is called.
     * @name remove
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @param {system.process.Action} action - The action to remove in the collection.
     * @return <code>true</code> if the method succeeded.
     */
    remove : { writable : true , value : function( action )
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
                var l  = this._actions.length ;

                this._actions.forEach( ( element ) =>
                {
                    if ( element && (element instanceof ActionEntry) && element.action === action )
                    {
                        if ( this._next )
                        {
                            e.action.finishIt.disconnect( this._next ) ;
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
                this.notifyCleared() ;
                return true ;
            }
        }
        return false ;
    }},

    /**
     * Returns the Array representation of the chain.
     * @name toArray
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @return the <code>Array</code> representation of the chain.
     */
    toArray : { writable : true , value : function()
    {
        if ( this._actions.length > 0 )
        {
            var output  = [] ;
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
    }},

    /**
     * Returns the String representation of the chain.
     * @name toString
     * @memberof system.process.TaskGroup
     * @function
     * @instance
     * @return the String representation of the chain.
     */
    toString : { writable : true , value : function()
    {
        var s  = "[" + this.constructor.name ;
        if ( Boolean(this.verbose) )
        {
            if ( this._actions.length > 0 )
            {
                s += "[" ;
                var i  ;
                var e /*ActionEntry*/ ;
                var l  = this._actions.length ;
                var r  = [] ;
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
    }}
});