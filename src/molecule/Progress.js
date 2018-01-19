/*jshint unused: false*/
"use strict" ;

import { clamp } from '../core/maths/clamp.js' ;
import { map } from '../core/maths/map.js' ;

/**
 * This interface defined the methods to implement a progress display component.
 * @name Progress
 * @memberof molecule
 * @interface
 */
export function Progress()
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _max : { value : 0 , configurable : true , writable : true } ,

        /**
         * @private
         */
        _min : { value : 0 , configurable : true , writable : true } ,

        /**
         * @private
         */
        _position : { value : 0 , configurable : true , writable : true }
    }) ;
}

Progress.prototype = Object.create( Object.prototype ,
{
    constructor : { value : Progress , writable : true } ,

    /**
     * The maximum value of the progress.
     * @memberof molecule.Progress
     * @default 0
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
     * Sets the position of the progress bar.
     * @memberof molecule.Progress
     * @method
     * @param value the position value of the progress bar.
     * @param noEvent (optional) this flag disabled the events of this method if this argument is <code>true</code>
     * @param flag (optional) An optional boolean flag use in the method.
     */
    setPosition : { value : function( value, noEvent = false , flag = false )
    {
        let old = this._position ;
        this._position = clamp( isNaN(value) ? 0 : value, this._min , this._max ) ;
        this.viewPositionChanged( flag ) ;
        if (old !== this._position && (noEvent === true) )
        {
            this.notifyChanged() ;
        }
    }}
});