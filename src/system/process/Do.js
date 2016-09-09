"use strict" ;

import { Action } from './Action.js' ;

/**
 * A simple command to do something.
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

/**
 * @extends Task
 */
Do.prototype = Object.create( Action.prototype );
Do.prototype.constructor = Do ;

/**
 * Returns a shallow copy of this object.
 * @return a shallow copy of this object.
 */
Do.prototype.clone = function()
{
    return new Do() ;
}

/**
 * The something method to overrides.
 */
Do.prototype.something = function()
{
    // override
}

/**
 * Run the process.
 */
Do.prototype.run = function() /*void*/
{
    this.notifyStarted() ;
    if( 'something' in this && (this.something instanceof Function) )
    {
        this.something() ;
    }
    this.notifyFinished() ;
}

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
Do.prototype.toString = function() /*String*/
{
    return '[Do]' ;
}