"use strict" ;

/**
 * Thrown by an Enumeration to indicate that there are no more elements in the enumeration.
 * @param message Optional. Human-readable description of the error.
 * @param fileName Optional. Human-readable description of the error.
 * @param lineNumber Optional. Human-readable description of the error.
 */
export function NoSuchElementError( message , fileName , lineNumber )
{
    this.name = 'NoSuchElementError';
    this.message    = message || 'no such element error' ;
    this.fileName   = fileName ;
    this.lineNumber = lineNumber ;
    this.stack      = (new Error()).stack;
}

/**
 * @extends Error
 */
NoSuchElementError.prototype = Object.create( Error.prototype );
NoSuchElementError.prototype.constructor = NoSuchElementError;