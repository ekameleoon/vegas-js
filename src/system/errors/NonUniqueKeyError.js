"use strict" ;

import { fastformat } from '../../core/strings/fastformat.js' ;

/**
 * Thrown when a key is non unique.
 * @summary Thrown when a key is non unique.
 * @name NonUniqueKeyError
 * @class
 * @memberof system.errors
 * @extends Error
 * @param {string} [message] - Human-readable description of the error.
 * @param {string} [fileName] - Human-readable description of the error.
 * @param {string} [lineNumber] - Human-readable description of the error.
 */
export function NonUniqueKeyError( key , pattern , fileName , lineNumber )
{
    this.name = 'NonUniqueKeyError';
    this.key        = key ;
    this.pattern    = pattern || NonUniqueKeyError.PATTERN ;
    this.message    = fastformat( this.pattern , key )  ;
    this.fileName   = fileName ;
    this.lineNumber = lineNumber ;
    this.stack      = (new Error()).stack;
}

/**
 * The localizable or changeable expression to defines the pattern of the error message.
 */
NonUniqueKeyError.PATTERN = "attempting to insert the key '{0}'" ;

NonUniqueKeyError.prototype = Object.create( Error.prototype );
NonUniqueKeyError.prototype.constructor = NonUniqueKeyError;
