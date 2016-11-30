"use strict" ;

import { Task } from '../process/Task.js' ;

/**
 * The basic implementation of all transitions classes.
 * @name Transition
 * @memberof system.transitions
 * @extends {system.process.Task}
 * @interface
 */
export function Transition ( id = null )
{
    Task.call( this ) ;

    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _id : { value : id , writable : true }
    });
}

Transition.prototype = Object.create( Task.prototype ,
{
    constructor : { value : Transition , writable : true } ,

    /**
     * Indicates the id value of this object.
     * @memberof system.transitions.Transition
     * @default null
     * @type {*}
     * @instance
     */
    id :
    {
        get : function() { return this._id ; } ,
        set : function( value ) { this._id = value ; } ,
    },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     * @memberof system.transitions.Transition
     * @abstract
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Transition( this.id ) ;
    }},

    /**
     * Compares the specified object with this object for equality. This method compares the ids of the objects with the <code>Identifiable.id</code> method.
     * @param {system.transitions.Transition} o - The object to compare.
     * @return a shallow copy of this object.
     * @memberof system.transitions.Transition
     * @instance
     * @function
     */
    equals : { writable : true , value : function( o )
    {
        if ( o === this )
        {
            return true ;
        }
        else if ( o && (o instanceof Transition) )
        {
            return ( o.id === this.id) ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Returns the String representation of the object.
     * @return the String representation of the object.
     * @memberof system.transitions.Transition
     * @instance
     * @function
     */
    toString : { value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});

