/*jshint laxbreak: true*/
"use strict" ;

import { Logger } from './Logger.js' ;

/**
 * Indicates if the specific objet is Loggable.
 * @name isLoggable
 * @memberof system.logging
 * @function
 * @instance
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is <code>Loggable</code>.
 */
export function isLoggable( target )
{
    if( target )
    {
        return target instanceof Loggable ||
               (( 'logger' in target ) && ((target.logger === null ) || ( target.logger instanceof Logger )) )  ;
    }
    return false ;
}

/**
 * Implementing this interface allows an object who use a <code>Logger</code> object.
 * @name Loggable
 * @memberof system.logging
 * @interface
 */
export function Loggable()
{
    Object.defineProperties( this ,
    {
        _logger : { value : null , writable : true }
    }) ;
}

Loggable.prototype = Object.create( Object.prototype ,
{
    constructor : { value : Loggable } ,

    /**
     * Determinates the internal <code>Logger</code> reference of this <code>Loggable</code> object.
     * @name logger
     * @memberof system.logging.Loggable
     * @type system.logging.Logger
     * @instance
     */
    logger :
    {
        get : function()
        {
            return this._logger ;
        },
        set : function( logger )
        {
            this._logger = (logger instanceof Logger) ? logger : null ;
        }
    }
});