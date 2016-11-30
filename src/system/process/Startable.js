"use strict" ;

/**
 * Indicates if the specific objet is {@link system.process.Startable|Startable} and contains a <code>start()</code> method.
 * @name isStartable
 * @function
 * @instance
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.process.Startable|Startable}.
 */
export function isStartable( target )
{
    if( target )
    {
        if( target instanceof Startable )
        {
            return true ;
        }
        /*jshint -W069 */
        return Boolean( target['start'] ) && ( target.start instanceof Function ) ;
        /*jshint +W069 */
    }
    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be started.
 * @name Startable
 * @memberof system.process
 * @interface
 */
export function Startable() {}

Startable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Startable } ,

    /**
     * Starts the command process.
     * @name start
     * @memberof system.process.Startable
     * @function
     * @instance
     */
    start : { writable : true , value : function(){} },

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