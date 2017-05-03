"use strict" ;

/**
 * Indicates if a value is a <code>Node</code> DOM object.
 * @name isDOMElement
 * @memberof core.dom
 * @function
 * @instance
 * @param {Object} value - The value to check.
 * @return <code>true</code> if the passed-in value is a <code>Node</code> DOM object.
 * @example
 * var div = document.createElement('div') ;
 * console.log( isDOMElement( div ) ) ;
 */
export var isDOMElement = ( value ) =>
{
    if( !value )
    {
        return false ;
    }
    try
    {
        return value instanceof Node ;
    }
    catch (e)
    {
        return false ;
    }

}