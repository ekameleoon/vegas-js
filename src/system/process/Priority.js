"use strict" ;

/**
 * Creates a new Priority instance and contains a <code>priority</code> property.
 * @name Priority
 * @memberof system.process
 * @interface
 */
export function Priority()
{
    Object.defineProperties( this ,
    {
        /**
         * Determinates the priority value.
         * @memberof system.process.Priority
         * @type {number}
         * @instance
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
        /**
         * @private
         */
        _priority : { value : 0 , writable : true }
    }) ;
}

Priority.prototype = Object.create( Object.prototype ) ;
Priority.prototype.constructor = Priority ;