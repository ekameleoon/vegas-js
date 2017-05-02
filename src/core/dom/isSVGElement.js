"use strict" ;

/**
 * Indicates if a value is an HTMLElement object in the DOM.
 * @name isSVGElement
 * @memberof core.dom
 * @function
 * @instance
 * @param {Object} value - The value to check.
 * @return <code>true</code> if the passed-in value is an HTMLElement object.
 * @example
 * var svg = document.createElementNS( "http://www.w3.org/2000/svg" , "svg" ) ;
 * console.log( isSVGElement( svg ) ) ;
 */
export var isSVGElement = ( value ) =>
{
    if( !value )
    {
        return false ;
    }
    if ( "SVGElement" in window )
    {
        return (value && value instanceof SVGElement);
    }
    return !!( value && typeof(obj) === "object" && ('nodeType' in value) && (value.nodeType === 1) && value.nodeName && value.xmlbase );
}