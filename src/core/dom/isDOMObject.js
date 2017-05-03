"use strict" ;

/**
 * Indicates if a value is a DOM object.
 * @name isDomObject
 * @memberof core.dom
 * @function
 * @instance
 * @param {Object} value - The value to check.
 * @return <code>true</code> if the passed-in value is a DOM object and inherits the native EventTarget class.
 * @example
 * var div = document.createElement('div') ;
 * console.log( isDOMObject( div ) ) ;
 */
export var isDOMObject = ( value ) =>
{
    if( !value )
    {
        return false ;
    }
    try
    {
        return value instanceof EventTarget ;
    }
    catch (e)
    {
        return false ;
    }

}