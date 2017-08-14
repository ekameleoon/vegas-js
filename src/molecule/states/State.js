"use strict" ;

import { ValueObject } from './system/data/ValueObject.js' ;

/**
 * A State value object.
 * @summary Defines a basic state object.
 * @name State
 * @class
 * @memberof molecule.states
 * @implements system.data.ValueObject
 * @constructs
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function State( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The parent owner container of this state. It can be a Screen reference or a String identifier to get the reference in a IoC factory.
         * @name owner
         * @memberof molecule.states.State
         * @instance
         */
        owner : { value : null  , writable : true } ,

        /**
         * The view reference of the state. It can be a View object or a String identifier to get the reference in a IoC factory.
         * @name view
         * @memberof molecule.states.State
         * @instance
         */
        view : { value : null  , writable : true }
    }) ;

    ValueObject.call( this , init ) ;
}

State.prototype = Object.create( ValueObject.prototype ,
{
    constructor : { writable : true , value : State } ,

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @name toString
     * @memberof molecule.states.State
     * @function
     * @instance
     */
    toString : { writable : true , value : function ()
    {
        return this.formatToString( null , "id" );
    }}
}) ;