"use strict" ;

import { Base } from './Base.js' ;

/**
 * A tile animation frame entity.
 * @summary A basic terrain definition.
 * @name Property
 * @memberof graphics.tmx
 * @extends graphics.tmx.Base
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function Property( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The name of the property.
         * @name name
         * @memberof graphics.tmx.Property
         * @instance
         * @type string
         */
        name : { value : null , writable : true } ,

        /**
         * The type of the property. Can be <code>string</code> (default), <code>int</code>, <code>float</code>, <code>bool</code>, <code>color</code> or <code>file</code> (since 0.16, with color and file added in 0.17).
         * <p>Boolean properties have a value of either <code>true</code> or <code>false</code>.</p>
         * <p>Color properties are stored in the format <code>#AARRGGBB</code>.</p>
         * <p>File properties are stored as paths relative from the location of the map file.</p>
         * @name type
         * @memberof graphics.tmx.Property
         * @instance
         * @type string
         */
        type : { value : 'string' , writable : true } ,

        /**
         * The value of the property.
         * @name value
         * @memberof graphics.tmx.Property
         * @instance
         */
        value : { value : null , writable : true }
    });

    Base.call( this , init ) ;
}

Property.prototype = Object.create( Base.prototype ,
{
    constructor : { writable : true , value : Property } ,

    /**
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     * @memberof graphics.tmx.Property
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new Property( this.toObject() ) ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.Property
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object =
        {
            name  : this.name ,
            type  : this.type ,
            value : this.value
        } ;
        return object ;
    }}
});