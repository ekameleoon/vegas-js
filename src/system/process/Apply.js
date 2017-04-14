"use strict" ;

import { Action } from './Action.js' ;

/**
 * Calls a function with a given this value and arguments provided as an array (or an array-like object).
 * @summary Calls a function with a given this value and arguments provided as an array (or an array-like object).
 * @name Apply
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @param {Function} [func=null] The function to call.
 * @param {Array} [args=null] An array-like object, specifying the arguments with which fun should be called, or null or undefined.
 * @param {Object} [scope=null] The value of this provided for the call to a function.
 * @example
 * let va = 0 ;
 * let vb = 0 ;
 * let vc = 0 ;
 *
 * let scope =
 * {
 *     a : 1 , b : 1 , c : 1 ,
 *     toString : function() { return 'scope' }
 * };
 *
 * let func = function( a , b , c )
 * {
 *     va = this.a + a ;
 *     vb = this.b + b ;
 *     vc = this.c + c ;
 * } ;
 *
 * let finish = function( action )
 * {
*     trace( 'finish va:' + va + ' vb:' + vb + ' vc:' + vc ) ;
 * };
 *
 * let start = function( action )
 * {
 *     trace( 'start va:' + va + ' vb:' + vb + ' vc:' + vc ) ;
 * };
 *
 * let action = new Apply( func , [1,2,3] , scope ) ;
 *
 * action.finishIt.connect(finish) ;
 * action.startIt.connect(start) ;
 *
 * action.run() ;
 */
export function Apply ( func = null , args = null , scope = null )
{
    Action.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * An array-like object, specifying the arguments with which fun should be called, or null or undefined.
         * @memberof system.process.Call
         * @type {Array}
         * @instance
         * @default <code>null</code>
         */
        args : { value : (args instanceof Array) ? args : null , writable : true } ,

        /**
         * The function to call.
         * @memberof system.process.Call
         * @type {Function}
         * @instance
         * @default <code>null</code>
         */
        func : { value : func instanceof Function ? func : null , writable : true } ,

        /**
         * The value of this provided for the call to a function.
         * @memberof system.process.Call
         * @type {Object}
         * @instance
         * @default <code>null</code>
         */
        scope : { value : scope , writable : true }
    }) ;
}

Apply.prototype = Object.create( Action.prototype ,
{
    constructor : { writable : true , value : Apply },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Apply
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Apply( this.func , this.args , this.scope ) ;
    }},

    /**
     * Run the process.
     * @memberof system.process.Apply
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        if( this.func instanceof Function )
        {
            if( this.args && this.args.length > 0 )
            {
                this.func.apply( this.scope , this.args ) ;
            }
            else
            {
                this.func.apply( this.scope ) ;
            }
        }
        else
        {
            throw new TypeError( '[Apply] run failed, the \'func\' property must be a Function.' ) ;
        }
        this.notifyFinished() ;
    }}
});