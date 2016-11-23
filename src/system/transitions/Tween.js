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
     * Runs the object.
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