"use strict" ;

import { Action } from './Action.js' ;

/**
 * Calls a function with a given this value and arguments provided individually.
 * @summary Calls a function with a given this value and arguments provided individually.
 * @name Call
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @param {Function} [func=null] The function to call.
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
 * let action = new Call( func , scope ) ;
 *
 * action.finishIt.connect(finish) ;
 * action.startIt.connect(start) ;
 *
 * action.run(1,2,3) ;
 */
export function Call ( func = null , scope = null )
{
    Action.call( this ) ;

    Object.defineProperties( this ,
    {
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

Call.prototype = Object.create( Action.prototype ,
{
    constructor : { writable : true , value : Call },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Call
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Call( this.func , this.scope ) ;
    }},

    /**
     * Run the process.
     * @memberof system.process.Call
     * @function
     * @instance
     */
    run : { writable : true , value : function( ...args )
    {
        this.notifyStarted() ;
        if( this.func instanceof Function )
        {
            if( args && args.length > 0 )
            {
                this.func.apply( this.scope , args ) ;
            }
            else
            {
                this.func.call( this.scope ) ;
            }
        }
        else
        {
            throw new TypeError( '[Call] run failed, the \'func\' property must be a Function.' ) ;
        }
        this.notifyFinished() ;
    }}
});