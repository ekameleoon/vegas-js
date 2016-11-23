"use strict" ;

import { TaskPhase } from '../process/TaskPhase.js' ;
import { TweenUnit } from './TweenUnit.js' ;

/**
 * The Tween class interpolate in time a value between 0 and 1.
 * @name Tween
 * @memberof system.transitions
 * @class
 * @constructor
 * @extends {system.transitions.Motion}
 * @tutorial system.transitions
 * @example
 * "use strict" ;
 *
 * window.onload = function()
 * {
 *     if( !vegas )
 *     {
 *         throw new Error( "The VEGAS library is not found." ) ;
 *     }
 *
 *     // ----- imports
 *
 *     var global   = vegas.global ; // jshint ignore:line
 *     var trace    = vegas.trace  ; // jshint ignore:line
 *     var core     = vegas.core   ; // jshint ignore:line
 *     var system   = vegas.system ; // jshint ignore:line
 *
 *     var Tween = system.transitions.Tween ;
 *
 *     // ----- behaviors
 *
 *     var change = function( tween )
 *     {
 *         trace( 'progress ' + core.dump(tween.target) ) ;
 *         render() ;
 *     }
 *
 *     var finish = function()
 *     {
 *         trace( 'finish' ) ;
 *         // tween.duration = 120 ;
 *         // tween.from = null ;
 *         // tween.to   = tween.to === to ? from : to ;
 *         // tween.run() ;
 *     }
 *
 *     var start = function()
 *     {
 *         trace( 'start' ) ;
 *     }
 *
 *     // ----- initialize
 *
 *     var canvas  = document.getElementById('canvas') ;
 *     var context = canvas.getContext('2d');
 *
 *     canvas.width  = 800;
 *     canvas.height = 600;
 *
 *     var color   = '#FF0000' ;
 *     var radius  = 25;
 *
 *     var from    = { x : 100 , y : 100 } ;
 *     var to      = { x : 500 , y : 400 } ;
 *     var target  = { x : 0   , y : 0 } ;
 *
 *     var easings = null ;
 *
 *     easings = { x : core.easings.backOut , y : core.easings.sineOut } ;
 *
 *     var tween = new Tween
 *     ({
 *         auto       : false,
 *         duration   : 48 ,
 *         useSeconds : false ,
 *         easing     : core.easings.backOut,
 *         easings    : easings,
 *         from       : from ,
 *         target     : target ,
 *         to         : to
 *     }) ;
 *
 *     //tween.easing = core.easings.cubicOut ;
 *     //tween.easing = core.easings.elasticOut ;
 *     //tween.easing = core.easings.sineOut ;
 *
 *     // tween.fps = 60  ; // use an internal Timer instance or a FrameTimer instance if fps is NaN
 *
 *     tween.looping = true ;
 *
 *     tween.finishIt.connect( finish ) ;
 *     tween.changeIt.connect( change ) ;
 *     tween.startIt.connect( start ) ;
 *
 *     // ----- render
 *
 *     var render = function()
 *     {
 *         var width  = canvas.width ;
 *         var height = canvas.height ;
 *
 *         context.clearRect(0, 0, width, height);
 *
 *         context.fillStyle = '#333333' ;
 *         context.fillRect(0, 0, width, height );
 *
 *         context.beginPath();
 *         context.arc( target.x, target.y, radius, 0, Math.PI * 2, false );
 *         context.closePath();
 *         context.fillStyle = color ;
 *         context.fill();
 *     }
 *
 *     render() ;
 *
 *     tween.run() ;
 * }
 */
export function Tween( init )
{
    TweenUnit.call( this ) ;
    this.position = null ;
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _begin : { writable : true , value : null } ,

        /**
         * @private
         */
        _changed : { writable : true , value : false } ,

        /**
         * @private
         */
        _easings : { writable : true , value : null },

        /**
         * @private
         */
        _from : { writable : true , value : null } ,

        /**
         * @private
         */
        _target: { writable : true , value : null } ,

        /**
         * @private
         */
        _to : { writable : true , value : null }
    });

    if( init )
    {
        for( var prop in init )
        {
            if( prop in this )
            {
                this[prop] = init[prop];
            }
        }
        if ( 'auto' in init && init.auto === true )
        {
            this.run() ;
        }
    }
}

/**
 * @extends TweenUnit
 */
Tween.prototype = Object.create( TweenUnit.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { value : TweenUnit , writable : true } ,

    /**
     * Determinates the generic object with all custom easing functions to interpolate the transition of the specific component in time.
     * If this object is null, the default numeric attributes of the target are used.
     * @name easings
     * @memberof system.transitions.Tween
     * @type {Object}
     * @instance
     */
    easings :
    {
        get : function()
        {
            return this._easings ;
        },
        set : function( value )
        {
            this._easings = value ;
        }
    },

    /**
     * Determinates the generic object with all numeric attributes to start the transition.
     * If this object is null, the default numeric attributes of the target are used.
     * @name from
     * @memberof system.transitions.Tween
     * @type {Object}
     * @instance
     */
    from :
    {
        get : function()
        {
            return this._from ;
        },
        set : function( value )
        {
            this._from = value ;
            this._changed = true ;
        }
    },

    /**
     * Indicates the target reference of the object contrains by the Motion effect.
     * @name target
     * @memberof system.transitions.Tween
     * @type {Object}
     * @instance
     */
    target :
    {
        get : function()
        {
            return this._target ;
        },
        set : function( value )
        {
            this._target  = value ;
            this._changed = true ;
        }
    },

    /**
     * Determinates the generic object with all properties to change inside.
     * @name to
     * @memberof system.transitions.Tween
     * @type {Object}
     * @instance
     */
    to :
    {
        get : function()
        {
            return this._to ;
        },
        set : function( value )
        {
            this._to      = value ;
            this._changed = true ;
        }
    },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.transitions.Tween
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Tween
        ({
            duration   : this.duration,
            easing     : this.easing,
            easings    : this.easings,
            from       : this.from,
            target     : this.target,
            to         : this.to,
            useSeconds : this.useSeconds
        }) ;
    }},

    /**
     * Notify when the process is finished.
     * @name notifyFinished
     * @memberof system.transitions.Tween
     * @instance
     * @function
     */
    notifyFinished : { value : function()
    {
        this._changed = true ;
        this._running = false ;
        this._phase = TaskPhase.FINISHED ;
        this.finishIt.emit( this ) ;
        this._phase = TaskPhase.INACTIVE ;
    }},

    /**
     * Runs the process
     * @name run
     * @memberof system.transitions.Tween
     * @instance
     * @function
     */
    run : { writable : true , value : function( to = null )
    {
        if ( to )
        {
            this.to = to ;
        }
        this._changed  = true ;
        this._stopped  = false ;
        this.position  = null ;
        this.notifyStarted() ;
        this.rewind() ;
        this.startInterval() ;
    }},

    /**
      * Update the current object.
     * @name update
     * @memberof system.transitions.Tween
     * @instance
     * @function
      */
    update : { writable : true , value : function()
    {
        if ( this._changed )
        {
            this._changed = false ;
            if ( !this._target )
            {
                throw new Error( this + " update failed, the 'target' property not must be null.") ;
            }
            if( !this._to )
            {
                throw new Error( this + " update failed, the 'to' property not must be null.") ;
            }
            if ( this._from )
            {
                this._begin = this._from ;
            }
            else
            {
                this._begin = {} ;

                for( let prop in this._to )
                {
                    if( prop in this._target )
                    {
                        this._begin[prop] = this._target[prop] ;
                    }
                }
            }
        }

        this.position = {} ;

        for ( let prop in this._to )
        {
            if( prop in this._target )
            {
                let e = (this._easings && (prop in this._easings) && this.easings[prop] instanceof Function) ? this.easings[prop] : this._easing ;
                this._target[prop] = this.position[prop] = e( this._time, this._begin[prop] , this._to[prop] - this._begin[prop] , this._duration ) ;
            }
        }

        this.notifyChanged() ;
    }}
});