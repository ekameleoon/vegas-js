"use strict" ;

import { ChainNext } from './ChainNext.js' ;
import { TaskGroup } from './TaskGroup.js' ;

/**
 * Creates a new Chain instance.
 * @param looping Specifies whether playback of the clip should continue, or loop (default false).
 * @param numLoop Specifies the number of the times the presentation should loop during playback.
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
 * var progress = function( action )
 * {
 *     trace( "progress: " + action ) ;
 * };
 *
 * var start = function( action )
 * {
 *     trace( "start: " + action ) ;
 * };
 *
 * var chain = new system.process.Chain() ;
 *
 * chain.finishIt.connect(finish) ;
 * chain.progressIt.connect(progress) ;
 * chain.startIt.connect(start) ;
 *
 * chain.add( do1 , 0 ) ;
 * chain.add( do2 , 2 , true) ;
 *
 * chain.verbose = true ;
 *
 * trace('---------') ;
 *
 * trace( 'batch   : ' + chain.toString(true) ) ;
 * trace( 'running : ' + chain.running ) ;
 * trace( 'length  : ' + chain.length ) ;
 *
 * trace('---------') ;
 *
 * chain.run() ;
 *
 * trace('---------') ;
 *
 * chain.run() ;
 */
export function Chain( looping /*Boolean*/ , numLoop /*uint*/ , mode /*String*/ , actions /*Array*/)
{
    TaskGroup.call( this , mode , actions ) ;

    Object.defineProperties( this ,
    {
        /**
         * Indicates if the chain loop when is finished.
         */
        looping : { value : Boolean( looping ) , writable : true } ,

        /**
         * The number of loops.
         */
        numLoop :
        {
            value    : ( numLoop > 0 ) ? Math.round( numLoop ) : 0 ,
            writable : true
        },

        /**
         * @private
         */
        _current     : { value : null , writable : true } ,
        _currentLoop : { value : 0    , writable : true } ,
        _position    : { value : 0    , writable : true } ,
        _next        : { value : new ChainNext(this)    }
    }) ;
}

/**
 * @extends TaskGroup
 */
Chain.prototype = Object.create( TaskGroup.prototype ,
{
    /**
     * Indicates the current Action reference when the batch is in progress.
     */
    current : { get : function() { return this._current ? this._current.action : null ; } } ,

    /**
     * Indicates the current countdown loop value.
     */
    currentLoop : { get : function() { return this._currentLoop ; } } ,

    /**
     * Indicates the current numeric position of the chain when is running.
     */
    position : { get: function() { return this._position ; } } ,

    /**
     * @private
     */
    __className__ : { value : 'Chain' , configurable : true }
}) ;

Chain.prototype.constructor = Chain;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
Chain.prototype.clone = function()
{
    return new Chain( this.looping , this.numLoop , this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
}

/**
 * Retrieves the next action reference in the chain with the current position.
 */
Chain.prototype.element = function()
{
    return this.hasNext() ? ( this._actions[ this._position ] ).action : null ;
}

/**
 * Retrieves the next action reference in the chain with the current position.
 */
Chain.prototype.hasNext = function()
{
    return this._position < this._actions.length ;
}

/**
 * Resume the chain.
 */
Chain.prototype.resume = function() /*void*/
{
    if ( this._stopped )
    {
        this._running = true ;
        this._stopped = false ;

        this.notifyResumed() ;

        if ( this._current && this._current.action )
        {
            if ( "resume" in this._current.action )
            {
                this._current.action.resume() ;
            }
        }
        else
        {
            this._next.receive() ;
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
Chain.prototype.run = function() /*void*/
{
    if ( !this._running )
    {
        this.notifyStarted() ;

        this._current     = null  ;
        this._stopped     = false ;
        this._position    = 0 ;
        this._currentLoop = 0 ;

        this._next.receive() ;
    }
}

/**
 * Stops the task group.
 */
Chain.prototype.stop = function() /*void*/
{
    if ( this._running )
    {
        if ( this._current && this._current.action )
        {
            if ( 'stop' in this._current.action && this._current.action instanceof Function )
            {
                this._current.action.stop() ;
                this._running = false ;
                this._stopped = true ;
                this.notifyStopped() ;
            }
        }
    }
}