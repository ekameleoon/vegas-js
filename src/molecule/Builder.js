/*jshint unused: false*/
"use strict" ;

import { Runnable } from '../system/process/Runnable.js' ;

/**
 * The Builder interface.
 * @name Builder
 * @memberof molecule
 * @interface
 */
export function Builder( target = null )
{
    Runnable.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * A flag that indicates whether this control is selected.
         * @name selected
         * @memberof molecule.Focusable
         * @default false
         * @type {boolean}
         * @instance
         */
        _target : { value : target , configurable : true , writable : true }
    }) ;
}

Builder.prototype = Object.create( Runnable.prototype ,
{
    constructor : { value : Builder , writable : true } ,

    /**
     * Determinates the target reference of the component or custom display container to build.
     * @name target
     * @memberof molecule.Builder
     * @default null
     * @instance
     */
    target :
    {
        get : function() { return this._target }  ,
        set : function( value )
        {
            this._target = value ;
        }
    },

    /**
     * Clear the view of the component.
     * @name clear
     * @memberof molecule.Builder
     * @instance
     * @function
     */
    clear : { writable : true , value : function()
    {
        // override
    }},

    /**
     * Update the view of the component.
     * @name update
     * @memberof molecule.Builder
     * @instance
     * @function
     */
    update : { writable : true , value : function()
    {
        // override
    }}
});