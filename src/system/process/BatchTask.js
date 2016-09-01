"use strict" ;

import { TaskGroup } from './TaskGroup.js' ;
import { ArrayMap }  from '../data/maps/ArrayMap.js' ;

/**
 * Batchs a serie of Action and run it in the same time.
 * @param mode Specifies the mode of the chain. The mode can be "normal" (default), "transient" or "everlasting".
 * @param actions A dynamic object who contains Action references to initialize the chain.
 */
export function BatchTask ( mode /*String*/ , actions /*Array*/)
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _current :
        {
            value    : null ,
            writable : true
        },
        /**
         * @private
         */
        _currents :
        {
            value    : new ArrayMap() ,
            writable : true
        }
    }) ;
    TaskGroup.call( this , mode , actions ) ;
}

/**
 * @extends TaskGroup
 */
BatchTask.prototype = Object.create( TaskGroup.prototype ,
{
    /**
     * Indicates the current Action reference when the batch is in progress.
     */
    current :
    {
        get : function()
        {
            return this._current ;
        }
    }
}) ;
BatchTask.prototype.constructor = BatchTask;
BatchTask.prototype.__className__ = 'TaskGroup' ;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
BatchTask.prototype.clone = function()
{
    return new BatchTask( this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
}

/**
 * Invoked when a task is finished.
 */
BatchTask.prototype.next = function( action /*Action*/ ) /*void*/
{
    if ( action && this._currents.has( action ) )
    {
        var entry = this._currents.get( action ) ;
        if ( this._mode !== TaskGroup.EVERLASTING )
        {
            if ( this._mode === TaskGroup.TRANSIENT || (entry.auto && this._mode === TaskGroup.NORMAL) )
            {
                if ( action )
                {
                    var slot ;
                    var e /*ActionEntry*/ ;
                    var l /*int*/ = this._actions.length ;
                    while( --l > -1 )
                    {
                        e = this._actions[l] ;
                        if ( e && e.action === action )
                        {
                            slot = this._buffer.get( this._current ) ;

                            action.finishIt.disconnect( slot ) ;

                            this._actions.splice( l , 1 ) ;
                            this._buffer.delete( e ) ;

                            break ;
                        }
                    }
                }
            }
        }

        this._currents.delete( action ) ;
    }

    if ( this._current )
    {
        this.notifyChanged() ;
    }

    this._current = action ;

    this.notifyProgress() ;

    if ( this._currents.length === 0 )
    {
        this._current = null ;
        this.notifyFinished() ;
    }
}

/**
 * Resume the chain.
 */
BatchTask.prototype.resume = function() /*void*/
{
    if ( this._stopped )
    {
        this._running = true ;
        this._stopped = false ;
        this.notifyResumed() ;
        if ( this._actions.length > 0 )
        {
            var a /*Action*/ ;
            var e /*ActionEntry*/ ;
            var l /*int*/ = this._actions.length ;
            while( --l > -1 )
            {
                e = this._actions[l] ;
                if ( e )
                {
                    a = e.action ;
                    if ( a )
                    {
                        if ( "resume" in a )
                        {
                            a.resume() ;
                        }
                        else
                        {
                            this.next( a ) ; // finalize the action to clean the batch
                        }
                    }
                }
            }
        }
    }
    else
    {
        this.run() ;
    }
}

/**
 * Launchs the chain process.
 */
BatchTask.prototype.run = function() /*void*/
{
    if ( !this._running )
    {
        this.notifyStarted() ;

        this._currents.clear() ;
        this._stopped = false ;
        this._current  = null ;

        if ( this._actions.length > 0 )
        {
            this._actions.forEach( ( entry ) =>
            {
                if ( entry && entry.action )
                {
                    this._currents.set( entry.action , entry ) ;
                }
            });

            this._actions.forEach( ( entry ) =>
            {
                if ( entry && entry.action )
                {
                    entry.action.run() ;
                }
            });
        }
        else
        {
            this.notifyFinished() ;
        }
    }
}

/**
 * Stops the task group.
 */
BatchTask.prototype.stop = function() /*void*/
{
    if ( this._running )
    {
        if ( this._actions.length > 0 )
        {
            var a /*Action*/ ;
            var e /*ActionEntry*/ ;
            var l /*int*/ = this._actions.length ;
            while( --l > -1 )
            {
                e = this._actions[l] ;
                if ( e )
                {
                    a = e.action ;
                    if ( a )
                    {
                        if ( "stop" in a )
                        {
                            a.stop() ;
                        }
                    }
                }
            }
        }
        this._running = false ;
        this._stopped = true ;
        this.notifyStopped() ;
    }
}