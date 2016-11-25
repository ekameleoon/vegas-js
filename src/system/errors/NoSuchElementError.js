"use strict" ;

/**
 * Thrown by an Enumeration to indicate that there are no more elements in the enumeration.
 * @summary Thrown by an Enumeration to indicate that there are no more elements in the enumeration.
 * @name NoSuchElementError
 * @class
 * @memberof system.errors
 * @extends Error
 * @param {string} [message] - Human-readable description of the error.
 * @param {string} [fileName] - Human-readable description of the error.
 * @param {string} [lineNumber] - Human-readable description of the error.
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