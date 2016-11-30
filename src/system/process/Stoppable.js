"use strict" ;

/**
 * Indicates if the specific objet is {@link system.process.Stoppable|Stoppable} and contains a <code>stop()</code> method.
 * @name isStoppable
 * @function
 * @instance
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.process.Stoppable|Stoppable}.
 */
export function isStoppable( target )
{
    if( target )
    {
        if( target instanceof Stoppable )
        {
            return true ;
        }
        /*jshint -W069 */
        return Boolean( target['stop'] ) && ( target.stop instanceof Function ) ;
        /*jshint +W069 */
    }
    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be stopped.
 * @name Stoppable
 * @memberof system.process
 * @interface
 */
export function Stoppable() {}

Stoppable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Stoppable } ,

    /**
     * Stops the command process.
     * @name stop
     * @memberof system.process.Stoppable
     * @function
     * @instance
     */
    stop : { writable : true , value : function(){} },

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