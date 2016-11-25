"use strict" ;

/**
 * Thrown when an invalid filter is find.
 * @summary Thrown when an invalid filter is find.
 * @name InvalidFilterError
 * @class
 * @memberof system.errors
 * @extends Error
 * @param {string} [message] - Human-readable description of the error.
 * @param {string} [fileName] - Human-readable description of the error.
 * @param {string} [lineNumber] - Human-readable description of the error.
 */
export function InvalidFilterError( message , fileName , lineNumber )
{
    this.name = 'InvalidFilterError';
    this.message    = message || 'invalid filter error' ;
    this.fileName   = fileName ;
    this.lineNumber = lineNumber ;
    this.stack      = (new Error()).stack;
}

/**
 * @extends Error
 */
InvalidFilterError.prototype = Object.create( Error.prototype );
InvalidFilterError.prototype.constructor = InvalidFilterError;