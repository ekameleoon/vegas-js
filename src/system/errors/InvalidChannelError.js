"use strict" ;

/**
 * The error throws when an invalid channel is find.
 * @param message Optional. Human-readable description of the error.
 * @param fileName Optional. Human-readable description of the error.
 * @param lineNumber Optional. Human-readable description of the error.
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