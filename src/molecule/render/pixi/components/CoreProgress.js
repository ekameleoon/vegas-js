/*jshint unused: false*/
"use strict" ;

import { clamp } from './core/maths/clamp.js' ;
import { map }   from './core/maths/map.js' ;

import { Element } from '../display/Element.js' ;

/**
 * This class provides a skeletal implementation of all the <code>Progress</code> display components, to minimize the effort required to implement this interface.
 * @name CoreProgress
 * @memberof molecule.render.pixi.components
 * @extends molecule.render.pixi.display.Element
 * @class
 * @constructor
 * @param {PIXI.Texture} [texture=null] - The texture for this sprite.
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 * @param {Boolean} [locked=false] - The flag to lock the new current object when is created.
 * @version 1.0.8
 * @since 1.0.8
 */
export function CoreProgress( texture = null , init = null , locked = false )
{
    Object.defineProperties( this ,
    {
        /**
         * This flag indicates of the position is auto reset.
         * @memberof molecule.render.pixi.components.CoreProgress
         * @type {boolean}
         * @instance
         * @default false
         */
        autoResetPosition : { writable : true , value : false } ,

        /**
         * @private
         */
        _max      : { value : 100 , configurable : true , writable : true } ,
        _min      : { value :   0 , configurable : true , writable : true } ,
        _position : { value :   0 , configurable : true , writable : true }
    }) ;

    Element.call( this , texture , init , locked ) ;
}

CoreProgress.prototype = Object.create( Element.prototype ,
{
    constructor : { writable : true , value : CoreProgress } ,

    /**
     * The maximum value of the progress.
     * @memberof molecule.render.pixi.components.CoreProgress
     * @type {number}
     * @instance
     */
    maximum :
    {
        get : function() { return this._max ; } ,
        set : function( value )
        {
            let tmp = this._max ;
            this._max = value ;
            this.setPosition( map( this._position , this._min, tmp, this._min, this._max ) ) ;
        }
    },

    /**
     * The minimum value of the progress.
     * @memberof molecule.render.pixi.components.CoreProgress
     * @type {number}
     * @instance
     */
    minimum :
    {
        get : function() { return this._min ; } ,
        set : function( value )
        {
            let tmp = this._min ;
            this._min = value ;
            this.setPosition( map( this._position , this._max, tmp, this._min, this._max ) ) ;
        }
    },

    /**
     * Indicates the position of the progress bar.
     * @memberof molecule.render.pixi.components.CoreProgress
     * @type {number}
     * @instance
     */
    position :
    {
        get : function() { return isNaN(this._position) ? 0 : this._position ; } ,
        set : function( value )
        {
            this.setPosition( value ) ;
        }
    },

    /**
     * Sets the position of the progress bar.
     * @memberof molecule.CoreProgress
     * @method
     * @param {number} value - the position value of the progress bar.
     * @param {boolean} [noEvent=false] - This flag disabled the events of this method if this argument is <code>true</code>
     * @param {boolean} [flag=false] -An optional boolean flag use in the method.
     */
    setPosition : { value : function( value, noEvent = false , flag = false )
    {
        let old = this._position ;
        this._position = clamp( isNaN(value) ? 0 : value, this._min , this._max ) ;
        this.viewPositionChanged( flag ) ;
        if ( ( this._position !== old )  && !noEvent )
        {
            this.notifyChanged() ;
        }
    }},

    /**
     * Invoked when the view of the display is changed.
     * @memberof molecule.CoreProgress
     */
    viewChanged : { writable : true , value : function()
    {
        this.setPosition( ( this.autoResetPosition ? 0 : this.position ) , true, true) ;
    }},

    /**
     * Invoked when the position of the bar is changed.
     * @param {boolean} [flag=false] - An optional boolean. By default this flag is passed-in the setPosition method.
     * @memberof molecule.CoreProgress
     */
    viewPositionChanged : { writable : true , value : function( /* flag = false */ )
    {
        // overrides.
    }}
});