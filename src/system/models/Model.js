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
export function Model()
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        __lock__ : { writable : true  , value : false }
    }) ;
}

Model.prototype = Object.create( Lockable.prototype ,
{
    constructor : { writable : true , value : Model } ,

    /**
     * Returns <code>true</code> if the object is locked.
     * @return <code>true</code> if the object is locked.
     * @name isLocked
     * @memberof system.models.Model
     * @function
     * @instance
     */
    isLocked : { writable : true , value : function()
    {
        return this.__lock__ ;
    }},

    /**
     * Locks the object.
     * @name lock
     * @memberof system.models.Model
     * @function
     * @instance
     */
    lock : { writable : true , value : function()
    {
        this.__lock__ = true ;
    }},

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
    }},

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
     * Unlocks the object.
     * @name unlock
     * @memberof system.models.Model
     * @function
     * @instance
     */
    unlock : { writable : true , value : function()
    {
        this.__lock__ = false ;
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
