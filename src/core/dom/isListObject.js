"use strict" ;

/**
 * Indicates if a value is a NodeList object.
 * @name isListObject
 * @memberof core.dom
 * @function
 * @instance
 * @param {Object} value - The value to check.
 * @return <code>true</code> if the passed-in value is a <code>NodeList</code> object.
 * @example
 * var list = document.getElementsByTagName("p") ;
 * for ( var i = 0; i < list.length; i++)
 * {
 *     console.log( isListObject( list[i] ) ) ;
 * }
 */
export var isListObject = ( value ) =>
{
    if( !value )
    {
        return false ;
    }
    try
    {
        return value instanceof NodeList ;
    }
    catch (e)
    {
        return false ;
    }
}