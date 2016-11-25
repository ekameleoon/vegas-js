"use strict" ;

/**
 * Thrown when methods that have detected concurrent modification of an object when such modification is not permissible.
 * @summary Thrown when methods that have detected concurrent modification of an object when such modification is not permissible.
 * @name ConcurrencyError
 * @class
 * @memberof system.errors
 * @extends Error
 * @param {string} [message] - Human-readable description of the error.
 * @param {string} [fileName] - Human-readable description of the error.
 * @param {string} [lineNumber] - Human-readable description of the error.
 */
export function ConcurrencyError( message , fileName , lineNumber )
{
    this.name = 'ConcurrencyError';
    this.message    = message || 'concurrency error' ;
    this.fileName   = fileName ;
    this.lineNumber = lineNumber ;
    this.stack      = (new Error()).stack;
}

ConcurrencyError.prototype = Object.create( Error.prototype );
ConcurrencyError.prototype.constructor = ConcurrencyError;