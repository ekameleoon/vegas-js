/*jshint laxbreak: true*/
"use strict" ;

import { Logger } from './Logger.js' ;

/**
 * Indicates if the specific objet is Loggable.
 */
export function isLoggable( target )
{
    if( target )
    {
        return ( 'logger' in target )
            && ((target.logger === null ) || ( target.logger instanceof Logger ))  ;
    }
    return false ;
}

/**
 * Implementing this interface allows an object who use a <code class="prettyprint">Logger</code> object.
 */
export function Loggable()
{
    Object.defineProperties( this ,
    {
        _logger : { value : null , writable : true }
    }) ;
}

/**
 * @extends Object
 */
Loggable.prototype = Object.create( Object.prototype ,
{
    constructor : { value : Loggable } ,

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     */
    toString : { value : function() { return '[Loggable]' ; } } ,

    /**
     * Determinates the internal <code>Logger</code> reference of this <code>Loggable</code> object.
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