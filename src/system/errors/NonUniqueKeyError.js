"use strict" ;

import '../../polyfill.js' ;
import { fastformat } from '../../core/strings/fastformat.js' ;

/**
 * The error throws when a key is non unique.
 * @param message Optional. Human-readable description of the error.
 * @param fileName Optional. Human-readable description of the error.
 * @param lineNumber Optional. Human-readable description of the error.
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

/**
 * @extends Error
 */
NonUniqueKeyError.prototype = Object.create( Error.prototype );
NonUniqueKeyError.prototype.constructor = NonUniqueKeyError;
