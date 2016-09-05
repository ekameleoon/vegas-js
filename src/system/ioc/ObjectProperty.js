"use strict" ;

import { ObjectAttribute } from './ObjectAttribute.js' ;

/**
 * This object defines a property definition in the object definitions.
 * @param name The name of the property.
 * @param value The value of the property.
 * @param policy The policy of the property ( ObjectAttribute.REFERENCE, ObjectAttribute.CONFIG, ObjectAttribute.LOCALE or by default ObjectAttribute.VALUE )
 * @param evaluators The Array representation of all evaluators who evaluate the value of the property.
 */
export function ObjectProperty( name /*String*/ , value , policy /*String*/ = "value" , evaluators /*Array*/ = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The optional Array representation of all evaluators to transform the value of this object.
         */
        evaluators : { value : evaluators , writable : true } ,

        /**
         * The name of the property.
         */
        name : { value : name , writable : true } ,

        /**
         * Determinates the order of the receiver registration ('after' or by default 'before').
         */
        policy :
        {
            get : function() { return this._policy ; } ,
            set : function( str )
            {
                switch( str )
                {
                    case ObjectAttribute.ARGUMENTS :
                    case ObjectAttribute.REFERENCE :
                    case ObjectAttribute.CONFIG    :
                    case ObjectAttribute.LOCALE    :
                    {
                        this._policy = str ;
                        break ;
                    }
                    default :
                    {
                        this._policy = ObjectAttribute.VALUE ;
                    }
                }
            }
        },

        /**
         * The value of the property.
         */
        value : { value : value , writable : true } ,

        /**
         * @private
         */
        _policy : { value : null , writable : true }
    }) ;

    this.policy = policy ;
}

/**
 * @extends Object
 */
ObjectProperty.prototype = Object.create( Object.prototype ,
{
    /**
     * Returns a reference to the Object function that created the instance's prototype.
     */
    constructor : { value : ObjectProperty },

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function () { return '[ObjectProperty]' ; }}
}) ;