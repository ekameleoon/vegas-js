"use strict" ;

import { Lockable } from "../process/Lockable.js" ;

/**
 *  The Model interface defines all models in the application.
 */
export function Model()
{

}

/**
 * @extends Lockable
 */
Model.prototype = Object.create( Lockable.prototype ,
{
    /**
     * The constructor reference of the instance.
     */
    constructor : { writable : true , value : Model } ,

    /**
     * Returns true if the specific value is valid.
     * @return true if the specific value is valid.
     */
    supports : { writable : true , value : function( value )
    {
        return value === value ;
    }} ,

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { writable : true , value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }},

    /**
     * Evaluates the specified value and throw an Error object if the value is not valid.
     * @throws Error if the value is not valid.
     */
    validate : { writable : true , value : function ( value ) /*void*/
    {
        if ( !this.supports( value ) )
        {
            throw new Error( this + " validate(" + value + ") is mismatch." ) ;
        }
    }}

}) ;