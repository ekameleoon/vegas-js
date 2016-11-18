"use strict" ;

/**
 * The error throws when methods that have detected concurrent modification of an object when such modification is not permissible.
 * @param message Optional. Human-readable description of the error.
 * @param fileName Optional. Human-readable description of the error.
 * @param lineNumber Optional. Human-readable description of the error.
 */
export function ConcurrencyError( message , fileName , lineNumber )
{
    this.name = 'ConcurrencyError';
    this.message    = message || 'concurrency error' ;
    this.fileName   = fileName ;
    this.lineNumber = lineNumber ;
    this.stack      = (new Error()).stack;
}

/**
 * @extends Error
 */
ConcurrencyError.prototype = Object.create( Error.prototype );
ConcurrencyError.prototype.constructor = ConcurrencyError;