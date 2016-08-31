"use strict" ;

/**
 * Replace the passed-in Number value, if the value is NaN the return value is the default value in second argument.
 * @param value The Number value to replace, if this value is NaN the value is changed.
 * @param defaultValue The default value to apply over the specified value if this value is NaN (default 0).
 * @return The replaced Number value.
 */
export var replaceNaN = ( value , defaultValue ) =>
{
    if ( isNaN(defaultValue) )
    {
        defaultValue = 0 ;
    }
    return isNaN( value ) ? defaultValue : value ;
}
