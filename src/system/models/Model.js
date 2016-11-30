"use strict" ;

import { Lockable } from "../process/Lockable.js" ;

/**
 * The Model interface defines all models in the application.
 * @name Model
 * @memberof system.models
 * @interface
 * @extends system.process.Lockable
 * @extends system.data.Validator
 */
export function Model() {}

Model.prototype = Object.create( Lockable.prototype ,
{
    constructor : { writable : true , value : Model } ,

    /**
     * Returns <code>true</code> if the specific value is valid.
     * @param {*} value - The value to check.
     * @return <code>true</code> if the specific value is valid.
     * @name supports
     * @memberof system.models.Model
     * @function
     * @instance
     */
    supports : { writable : true , value : function( value )
    {
        return value === value ;
    }} ,

    /**
     * Returns the string representation of this instance.
     * @return The string representation of this instance.
     * @name toString
     * @memberof system.models.Model
     * @function
     * @instance
     */
    toString : { writable : true , value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }},

    /**
     * Evaluates the specified value and throw an Error object if the value is not valid.
     * @throws Error if the value is not valid.
     * @name validate
     * @memberof system.models.Model
     * @function
     * @instance
     */
    validate : { writable : true , value : function ( value ) /*void*/
    {
        if ( !this.supports( value ) )
        {
            throw new Error( this + " validate(" + value + ") is mismatch." ) ;
        }
    }}

}) ;