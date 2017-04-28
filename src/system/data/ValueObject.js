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
    Object.defineProperties( this ,
    {
        _constructorName : { writable : true , value : null }
    });
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
     * A utility function for implementing the <code>toString()</code> method in custom classes. Overriding the <code>toString()</code> method is recommended, but not required.
     * @name formatToString
     * @memberof system.data.ValueObject
     * @instance
     * @function
     * @param {string} className - The class name to passed-in the string expression.
     * @param {...string} [rest] - rest The properties of the class and the properties that you add in your custom class.
     * @example
     * class Thing extends ValueObject
     * {
     *     constructor( name )
     *     {
     *         this.name = name;
     *     }
     *
     *     toString()
     *     {
     *         return this.formatToString( this.constructor.name , "name" );
     *     }
     * }
     */
    formatToString : { value : function( className , ...rest )
    {
        if( !className )
        {
            if( !this._constructorName )
            {
                this._constructorName = this.constructor.name ;
            }
            className = this._constructorName ;
        }
        let ar = [ className ] ;
        let len = rest.length ;
        for ( let i = 0; i < len ; ++i )
        {
            if( rest[i] in this )
            {
                ar.push( rest[i] + ":" + this[rest[i]] ) ;
            }
        }
        return "[" + ar.join(' ') + "]" ;
    }},

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
        return this.formatToString( null ) ;
    }}
}) ;