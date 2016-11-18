"use strict" ;

/**
 * The error throws when an invalid filter is find.
 * @param message Optional. Human-readable description of the error.
 * @param fileName Optional. Human-readable description of the error.
 * @param lineNumber Optional. Human-readable description of the error.
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