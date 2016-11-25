"use strict" ;

import { Action } from './Action.js' ;

/**
 * A simple command to do something. Very usefull to test something in a complex process.
 * @name Do
 * @class
 * @memberof system.process
 * @extends system.process.Action
 * @augments system.process.Action
 * @example
 * var action = new system.process.Do() ;
 *
 * action.something = function()
 * {
 *     trace( "do something" ) ;
 * }
 *
 * var finish = function( action )
 * {
 *     var message = "finish: " + action.toString() ;
 *     trace( message ) ;
 * };
 *
 * var start = function( action )
 * {
 *     var message = "start: " + action.toString() ;
 *     trace( message ) ;
 * };
 *
 * action.finishIt.connect(finish) ;
 * action.startIt.connect(start) ;
 *
 * action.run() ;
 */
export function Do ()
{
    Action.call( this ) ;
}

Do.prototype = Object.create( Action.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { writable : true , value : Do },

    /**
     * Creates a copy of the object.
     * @return a shallow copy of this object.
     * @name clone
     * @memberof system.process.Do
     * @function
     * @instance
     */
    clone : { writable : true , value : function()
    {
        return new Do() ;
    }},

    /**
     * Do something in this method (override it).
     */
    something : { enumerable : true , writable : true , value : function()
    {
        //
    }},

    /**
     * Run the process.
     * @memberof system.process.Lock
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        this.notifyStarted() ;
        if( 'something' in this && (this.something instanceof Function) )
        {
            this.something() ;
        }
        this.notifyFinished() ;
    }}
});