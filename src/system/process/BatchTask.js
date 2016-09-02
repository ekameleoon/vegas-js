"use strict" ;

import { ArrayMap }      from '../data/maps/ArrayMap.js' ;
import { BatchTaskNext } from './BatchTaskNext.js' ;
import { TaskGroup }     from './TaskGroup.js' ;

/**
 * Batchs a serie of Action and run it in the same time.
 * @param mode Specifies the mode of the chain. The mode can be "normal" (default), "transient" or "everlasting".
 * @param actions A dynamic object who contains Action references to initialize the chain.
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
export function BatchTask ( mode /*String*/ , actions /*Array*/)
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

/**
 * @extends TaskGroup
 */
BatchTask.prototype = Object.create( TaskGroup.prototype ,
{
    /**
     * Indicates the current Action reference when the batch is in progress.
     */
    current : { get   : function() { return this._current ; } } ,

    /**
     * @private
     */
    __className__ : { value : 'BatchTask' , configurable : true }
}) ;

BatchTask.prototype.constructor = BatchTask;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
BatchTask.prototype.clone = function()
{
    return new BatchTask( this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
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