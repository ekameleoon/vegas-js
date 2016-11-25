"use strict" ;

import { ChainNext } from './ChainNext.js' ;
import { TaskGroup } from './TaskGroup.js' ;

/**
 * Creates a new Chain instance.
 * @name Chain
 * @class
 * @memberof system.process
 * @extends system.process.TaskGroup
 * @constructor
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
 * trace( 'chain   : ' + chain.toString(true) ) ;
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
 * @param {boolean} [looping=false] Specifies whether playback of the clip should continue, or loop (default false).
 * @param {number} [numLoop=0] Specifies the number of the times the presentation should loop during playback.
 * @param {string} [mode=normal] - Specifies the <code>mode</code> of the group. This <code>mode</code> can be <code>"normal"</code> (default), <code>"transient"</code> or <code>"everlasting"</code>.
 * @param {array} [actions=null] An optional array who contains Action references to initialize the chain.
 */
export function Chain( looping = false , numLoop = 0 , mode = 'normal' , actions = null )
{
    TaskGroup.call( this , mode , actions ) ;

    Object.defineProperties( this ,
    {
        /**
         * Indicates if the chain loop when is finished.
         * @memberof system.process.Chain
         * @type {boolean}
         * @instance
         * @default <code>false</code>
         */
        looping : { value : Boolean( looping ) , writable : true } ,

        /**
         * The number of loops.
         * @memberof system.process.Chain
         * @type {number}
         * @instance
         * @default 0
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

Chain.prototype = Object.create( TaskGroup.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { writable : true , value : Chain },

    /**
     * Indicates the current Action reference when the process is in progress.
     * @memberof system.process.Chain
     * @type {system.process.Action}
     * @instance
     * @readonly
     */
    current : { get : function() { return this._current ? this._current.action : null ; } } ,

    /**
     * Indicates the current countdown loop value.
     * @memberof system.process.Chain
     * @type {number}
     * @instance
     * @readonly
     */
    currentLoop : { get : function() { return this._currentLoop ; } } ,

    /**
     * Indicates the current numeric position of the chain when is running.
     * @memberof system.process.Chain
     * @type {number}
     * @instance
     * @readonly
     */
    position : { get: function() { return this._position ; } },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Chain
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Chain( this.looping , this.numLoop , this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
    }},

    /**
     * Retrieves the next action reference in the chain with the current position.
     * @name element
     * @memberof system.process.Chain
     * @function
     * @instance
     */
    element : { writable : true , value : function()
    {
        return this.hasNext() ? ( this._actions[ this._position ] ).action : null ;
    }},

    /**
     * Retrieves the next action reference in the chain with the current position.
     * @name hasNext
     * @memberof system.process.Chain
     * @function
     * @instance
     */
    hasNext : { writable : true , value : function()
    {
        return this._position < this._actions.length ;
    }},

    /**
     * Resume the chain.
     * @name resume
     * @memberof system.process.Chain
     * @function
     * @instance
     */
    resume : { writable : true , value : function()
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
    }},

    /**
     * Launchs the chain process.
     * @name run
     * @memberof system.process.Chain
     * @function
     * @instance
     */
    run : { writable : true , value : function()
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
    }},

    /**
     * Stops the task group.
     * @name stop
     * @memberof system.process.Chain
     * @function
     * @instance
     */
    stop : { writable : true , value : function()
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
    }}
}) ;
