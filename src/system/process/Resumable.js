"use strict" ;

/**
 * Indicates if the specific objet is {@link system.process.Resumable|Resumable} and contains a <code>resume()</code> method.
 * @name isResumable
 * @function
 * @instance
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.process.Resumable|Resumable}.
 */
export function isResumable( target )
{
    if( target )
    {
        if( target instanceof Resumable )
        {
            return true ;
        }
        /*jshint -W069 */
        return Boolean( target['resume'] ) && ( target.resume instanceof Function ) ;
        /*jshint +W069 */
    }
    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be resumed.
 * @name Resumable
 * @memberof system.process
 * @interface
 */
export function Resumable() {}

Resumable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Resumable } ,

    /**
     * Resumes the command process.
     * @name resume
     * @memberof system.process.Resumable
     * @function
     * @instance
     */
    resume : { writable : true , value : function(){} },

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