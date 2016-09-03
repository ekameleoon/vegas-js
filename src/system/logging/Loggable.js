"use strict" ;

import { Logger } from './Logger.js' ;

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
Loggable.prototype.constructor = Loggable;

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 */
Loggable.prototype.toString = function() /*String*/
{
    return '[Loggable]' ;
}