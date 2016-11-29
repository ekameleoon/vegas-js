"use strict" ;

/**
 * Indicates if the specific objet implements the {@link system.process.Priority|Priority} interface or contains a <code>priority</code> attribute.
 * @name isPrioritizable
 * @function
 * @instance
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object implements the {@link system.process.Priority|Priority} interface.
 */
export function isPrioritizable( target )
{
    if( target )
    {
        return (target instanceof Priority) || ('priority' in target) ;
    }
    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be prioritizable (Capable of being prioritized).
 * @summary This interface should be implemented by any class whose instances are intended to be prioritizable (Capable of being prioritized).
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