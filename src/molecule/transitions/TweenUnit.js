"use strict" ;

import { linear } from '../easings/linear.js' ;
import { Motion } from './Motion.js' ;

/**
 * The TweenUnit class interpolate in time a value between 0 and 1.
 */
export function TweenUnit( easing = null , duration = 0 , useSeconds = false , auto = false , id = null )
{
    Motion.call( this , id ) ;

    Object.defineProperties( this ,
    {
        /**
         * The current position of this tween.
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

/**
 * @extends Motion
 */
TweenUnit.prototype = Object.create( Motion.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { value : TweenUnit , writable : true } ,

    /**
     * Defines the easing method reference of this entry.
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
     */
    clone : { writable : true , value : function()
    {
        return new TweenUnit( this.easing, this.duration, this.useSeconds ) ;
    }},

    /**
     * Set the TweenUnit properties.
     * @param easing the easing function of the tween entry.
     * @param duration A number indicating the length of time or number of frames for the tween motion.
     * @param useSeconds Indicates if the duration is in seconds.
     */
    set : { value : function( easing , duration = 0 , useSeconds = false )
    {
        this.duration   = duration   ;
        this.useSeconds = useSeconds ;
        this.easing     = easing     ;
    }},

    /**
      * Update the current object.
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