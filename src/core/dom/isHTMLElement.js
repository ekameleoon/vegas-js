"use strict" ;

/**
 * Indicates if a value is an HTMLElement object in the DOM.
 * @name isHTMLElement
 * @memberof core.dom
 * @function
 * @instance
 * @param {Object} value - The value to check.
 * @return <code>true</code> if the passed-in value is an HTMLElement object.
 * @example
 * var div = document.createElement('div') ;
 * console.log( isHTMLElement( div ) ) ;
 */
export var isHTMLElement = ( value ) =>
{
    if( !value )
    {
        return false ;
    }
    if ( "HTMLElement" in window )
    {
        return (value && value instanceof HTMLElement);
    }
    return !!( value && typeof(obj) === "object" && ('nodeType' in value) && (value.nodeType === 1) && value.nodeName );
}