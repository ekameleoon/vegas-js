"use strict" ;

import { linear } from '../../core/easings/linear.js' ;
import { Motion } from './Motion.js' ;

/**
 * The TweenUnit class interpolate in time a value between <code>0</code> and <code>1</code>.
 * @name TweenUnit
 * @memberof system.transitions
 * @class
 * @constructor
 * @extends {system.transitions.Motion}
 * @tutorial system.transitions
 */
export function TweenUnit( easing = null , duration = 0 , useSeconds = false , auto = false , id = null )
{
    Motion.call( this , id ) ;

    Object.defineProperties( this ,
    {
        /**
         * The current position of this tween.
         * @memberof system.transitions.TweenUnit
         * @default 0
         * @type {number}
         * @instance
         */
        position : { writable : true , value : 0 },

        /**
         * @private
         */
        _change: { writable : true , value : 1 } , // max - min

        /**
         * @private
         */
        _easing : { writable : true , value : (easing instanceof Function) ? easing : linear }
    });

    this.duration   = duration ;
    this.useSeconds = useSeconds ;

    if ( auto )
    {
        this.run() ;
    }
}

TweenUnit.prototype = Object.create( Motion.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { value : TweenUnit , writable : true } ,

    /**
     * Defines the easing method reference of this entry.
     * @memberof system.transitions.TweenUnit
     * @type {Function}
     * @instance
     * @see {core.easings}
     */
    easing :
    {
        get : function()
        {
            return this._easing ;
        },
        set : function( value )
        {
            this._easing = value instanceof Function ? value : linear ;
        }
    },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @memberof system.transitions.TweenUnit
     * @type {Function}
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new TweenUnit( this.easing, this.duration, this.useSeconds ) ;
    }},

    /**
     * Set the TweenUnit properties.
     * @param {Function} easing - The easing function of the tween entry.
     * @param {number} [duration=0] - The length of time or number of frames for the tween motion.
     * @param {boolean} [useSeconds=false] - Indicates if the duration is in seconds.
     * @memberof system.transitions.TweenUnit
     * @type {Function}
     * @instance
     * @see {core.easings}
     */
    set : { value : function( easing , duration = 0 , useSeconds = false )
    {
        this.duration   = duration   ;
        this.useSeconds = useSeconds ;
        this.easing     = easing     ;
    }},

    /**
     * Update the current tween.
     * @memberof system.transitions.TweenUnit
     * @type {Function}
     * @instance
     */
    update : { writable : true , value : function()
    {
        if( this._easing )
        {
            this.position = this._easing( this._time, 0, this._change , this._duration ) ;
            this.notifyChanged() ;
        }
        else
        {
            this.position = null ;
        }
    }}
});