"use strict" ;

/**
 * Indicates if the specific objet is {@link system.process.Resetable|Resetable} and contains a <code>reset()</code> method.
 * @name isResetable
 * @function
 * @instance
 * @memberof system.process
 * @param {object} target - The object to evaluate.
 * @return <code>true</code> if the object is {@link system.process.Resetable|Resetable}.
 */
export function isResetable( target )
{
    if( target )
    {
        if( target instanceof Resetable )
        {
            return true ;
        }
        /*jshint -W069 */
        return Boolean( target['reset'] ) && ( target.reset instanceof Function )  ;
        /*jshint +W069 */
    }
    return false ;
}

/**
 * This interface should be implemented by any class whose instances are intended to be reseted.
 * @name Resetable
 * @memberof system.process
 * @interface
 */
export function Resetable(){}

Resetable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Resetable } ,

    /**
     * Resets the command process.
     * @name reset
     * @memberof system.process.Resetable
     * @function
     * @instance
     */
    reset : { writable : true , value : function(){} },

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