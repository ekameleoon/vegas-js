"use strict" ;

import { Task } from '../process/Task.js' ;

/**
 * A simple Transition object.
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

/**
 * @extends Task
 */
Transition.prototype = Object.create( Task.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { value : Transition , writable : true } ,

    /**
     * Indicates the id value of this object.
     */
    id :
    {
        get : function() { return this._id ; } ,
        set : function( value ) { this._id = value ; } ,
    },

    /**
     * Returns a shallow copy of this object.
     * @return a shallow copy of this object.
     */
    clone : { writable : true , value : function()
    {
        return new Transition( this.id ) ;
    }},

    /**
     * Compares the specified object with this object for equality. This method compares the ids of the objects with the <code>Identifiable.id</code> method.
     * @return a shallow copy of this object.
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
     */
    toString : { value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});

