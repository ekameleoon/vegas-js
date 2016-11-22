"use strict" ;

/**
 * This class determinates a basic implementation to creates enumeration objects.
 * @param {number} value The value of the enumeration.
 * @param {string} name The name key of the enumeration.
 * @extends Object
 * @memberof system
 * @class
 */
export function Enum( value , name )
{
    Object.defineProperties( this ,
    {
        _name :
        {
            value        : ((typeof(name) === "string" || name instanceof String )) ? name : "" ,
            enumerable   : false ,
            writable     : true ,
            configurable : true
        },
        _value :
        {
            value        : isNaN(value) ? 0 : value ,
            enumerable   : false ,
            writable     : true ,
            configurable : true
        }
    }) ;
}

Enum.prototype = Object.create( Object.prototype );
Enum.prototype.constructor = Enum;

/**
 * Compares the specified object with this object for equality.
 * @return <code>true</code> if the the specified object is equal with this object.
 * @memberof system.Enum
 * @instance
 */
Enum.prototype.equals = function ( object ) /*Boolean*/
{
    if ( object === this )
    {
        return true ;
    }

    if( object instanceof Enum )
    {
        return (object.toString() === this.toString()) && (object.valueOf() === this.valueOf()) ;
    }

    return false ;
}

/**
 * Returns the String representation of the object.
 * @return the String representation of the object.
 * @memberof system.Enum
 * @instance
 */
Enum.prototype.toString = function() /*String*/
{
    return this._name ;
}

/**
 * Returns the primitive value of the object.
 * @return the primitive value of the object.
 * @memberof system.Enum
 * @instance
 */
Enum.prototype.valueOf = function()
{
    return this._value ;
}