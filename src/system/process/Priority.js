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
        /*jshint -W069 */
        return (target instanceof Priority) || ( Boolean(target['priority']) && !(target.priority instanceof Function) ) ;
        /*jshint +W069 */
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
         * @default 0
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
        _priority : { writable : true , value : 0 }
    }) ;
}

Priority.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Priority } ,

    /**
     * The <code>toString()</code> method returns a string representing the object
     * @return A string representing the object.
     * @memberof system.transitions.Transition
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});