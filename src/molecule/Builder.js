/*jshint unused: false*/
"use strict" ;

import { Runnable } from '../system/process/Runnable.js' ;

/**
 * The Builder interface.
 * @name Builder
 * @memberof molecule
 * @class
 * @extends system.process.Runnable
 * @param {Object} [target=null] - The target reference of the builder.
 */
export function Builder( target = null )
{
    Runnable.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _target : { value : target , configurable : true , writable : true }
    }) ;
}

Builder.prototype = Object.create( Runnable.prototype ,
{
    constructor : { writable : true , value : Builder } ,

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
        set : function( value ) { this._target = value ; }
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
     * Updates the view of the component.
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