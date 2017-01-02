"use strict" ;

import { Identifiable } from './Identifiable.js' ;

/**
 * Defines a value object. The value object are use for example in the models or to exchange datas between a client and a server.
 * @summary Defines a basic value object.
 * @name ValueObject
 * @class
 * @memberof system.data
 * @implements system.data.Identifiable
 * @constructs
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function ValueObject( init = null )
{
    Identifiable.call( this ) ;
    if( init )
    {
        this.setTo( init ) ;
    }
}

ValueObject.prototype = Object.create( Identifiable.prototype ,
{
    constructor : { writable : true , value : ValueObject } ,

    /**
     * Sets the members of the object to the specified values.
     * @param {Object} init - The generic object to initialize the object.
     * @return The current object reference.
     * @memberof system.data.ValueObject
     * @instance
     * @function
     */
    setTo : { writable : true , value : function( init )
    {
        if( init )
        {
            for( var prop in init )
            {
                if( prop in this )
                {
                    this[prop] = init[prop];
                }
            }
        }
        return this ;
    }},

    /**
     * Returns the string representation of this object.
     * @return the string representation of this object.
     * @memberof graphics.tmx.Base
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }}
}) ;