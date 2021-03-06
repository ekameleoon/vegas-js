"use strict" ;

/**
 * Indicates if a value is an Element object in the DOM.
 * @name isElement
 * @memberof core.dom
 * @function
 * @instance
 * @param {Object} value - The value to check.
 * @return <code>true</code> if the passed-in value is an HTMLElement object.
 * @example
 * var div = document.createElement('div') ;
 * console.log( isElement( div ) ) ;
 */
export var isElement = ( value ) =>
{
    if( !value )
    {
        return false ;
    }
    try
    {
        return value instanceof Element;
    }
    catch (e)
    {
        return !!( value && typeof(obj) === "object" && ('nodeType' in value) && (value.nodeType === 1) && value.nodeName );
    }

}