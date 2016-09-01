"use strict" ;

/**
 * Creates a new Priority instance.
 */
export function Priority()
{
    Object.defineProperties( this ,
    {
        /**
         * Determinates the priority value.
         */
        priority :
        {
            get : function()
            {
                return this._priority ;
            } ,
            set : function( value )
            {
                this._priority = (value > 0 || value < 0) ? value : 0 ;
            }
        },
        _priority :
        {
            value        : 0 ,
            enumerable   : false ,
            writable     : true ,
            configurable : false
        }
    }) ;
}

/**
 * @extends Object
 */
Priority.prototype = Object.create( Object.prototype ) ;
Priority.prototype.constructor = Priority ;