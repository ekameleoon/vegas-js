"use strict" ;

/**
 * Indicates if the specific objet is {@link system.process.Runnable|Runnable} and contains a <code>run()</code> method.
 * @name isRunnable
 * @function
 * @instance
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.process.Runnable|Runnable}.
 */
export function isRunnable( target )
{
    if( target )
    {
        if( target instanceof Runnable )
        {
            return true ;
        }
        /*jshint -W069 */
        return Boolean(target['run']) && ( target.run instanceof Function )  ;
        /*jshint +W069 */
    }
    return false ;
}

/**
 * The base interface for all <b>commands</b> in your applications. If only this interface is implemented by a command, it is treated as a synchronous command. For additional features like asynchronous execution, cancellation or suspension, several subinterfaces are available.
 * <p>In object-oriented programming, the command pattern is a behavioral design pattern in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time.</p>
 * This interface is used by all internal command executors and builders.
 * @name Runnable
 * @memberof system.process
 * @interface
 */
export function Runnable() {}

Runnable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Runnable },

    /**
     * Run the command.
     * @name run
     * @memberof system.process.Runnable
     * @function
     * @instance
     */
    run : { writable : true , value : function()
    {
        // override
    }},

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