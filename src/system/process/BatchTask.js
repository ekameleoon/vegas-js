"use strict" ;

import { ArrayMap }      from '../data/maps/ArrayMap.js' ;
import { BatchTaskNext } from './BatchTaskNext.js' ;
import { TaskGroup }     from './TaskGroup.js' ;

/**
 * Batchs a serie of actions and run it in the same time.
 * @summary Batchs a serie of actions and run it in the same time.
 * @param {string} [mode=normal] - Specifies the <code>mode</code> of the group. This <code>mode</code> can be <code>"normal"</code> (default), <code>"transient"</code> or <code>"everlasting"</code>.
 * @param {array} [actions=null] An optional array who contains Action references to initialize the chain.
 * @name BatchTask
 * @class
 * @memberof system.process
 * @extends system.process.TaskGroup
 * @example
 * var do1 = new system.process.Do() ;
 * var do2 = new system.process.Do() ;
 *
 * do1.something = function()
 * {
 *     console.log( "do1 something" ) ;
 * }
 *
 * do2.something = function()
 * {
 *     console.log( "do2 something" ) ;
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
 * trace( 'batch   : ' + batch.toString(true) ) ;
 * trace( 'running : ' + batch.running ) ;
 * trace( 'length  : ' + batch.length ) ;
 *
 * batch.finishIt.connect(finish) ;
 * batch.startIt.connect(start) ;
 *
 * batch.run() ;
 */
export function BatchTask ( mode = 'normal' , actions = null )
{
    TaskGroup.call( this , mode , actions ) ;

    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _current : { value : null , writable : true },

        /**
         * @private
         */
        _currents : { value : new ArrayMap() , writable : true },

        /**
         * @private
         */
        _next : { value : new BatchTaskNext(this) }
    }) ;
}

BatchTask.prototype = Object.create( TaskGroup.prototype ,
{
    /**
     * Indicates the current Action reference when the batch is in progress.
     * @memberof system.process.BatchTask
     * @type {system.process.Action}
     * @instance
     * @readonly
     */
    current : { get   : function() { return this._current ; } }
}) ;

BatchTask.prototype.constructor = BatchTask;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 * @name clone
 * @memberof system.process.BatchTask
 * @function
 * @instance
 */
BatchTask.prototype.clone = function()
{
    return new BatchTask( this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
}

/**
 * Resume the chain.
 * @name resume
 * @memberof system.process.BatchTask
 * @function
 * @instance
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
 * @name run
 * @memberof system.process.BatchTask
 * @function
 * @instance
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
            var actions = [] ;

            this._actions.forEach( ( entry ) =>
            {
                if ( entry && entry.action )
                {
                    actions.push( entry.action ) ;
                    this._currents.set( entry.action , entry ) ;
                }
            });

            actions.forEach( ( action ) =>
            {
                action.run() ;
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
 * @name stop
 * @memberof system.process.BatchTask
 * @function
 * @instance
 */
BatchTask.prototype.stop = function() /*void*/
{
    if ( this._running )
    {
        if ( this._actions.length > 0 )
        {
            let a ;
            let e ;
            let l = this._actions.length ;
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