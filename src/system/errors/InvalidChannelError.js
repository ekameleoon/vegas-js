"use strict" ;

/**
 * Thrown when an invalid channel is find.
 * @summary Thrown when an invalid channel is find.
 * @name InvalidChannelError
 * @class
 * @memberof system.errors
 * @extends Error
 * @param {string} [message] - Human-readable description of the error.
 * @param {string} [fileName] - Human-readable description of the error.
 * @param {string} [lineNumber] - Human-readable description of the error.
 */
export function InvalidChannelError( message , fileName , lineNumber )
{
    this.name = 'InvalidChannelError';
    this.message    = message || 'invalid channel error' ;
    this.fileName   = fileName ;
    this.lineNumber = lineNumber ;
    this.stack      = (new Error()).stack;
}

/**
 * @extends Error
 */
InvalidChannelError.prototype = Object.create( Error.prototype );
InvalidChannelError.prototype.constructor = InvalidChannelError;