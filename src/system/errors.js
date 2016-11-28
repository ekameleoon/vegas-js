"use strict" ;

import '../polyfill.js' ;

import { ConcurrencyError }    from './errors/ConcurrencyError.js' ;
import { InvalidChannelError } from './errors/InvalidChannelError.js' ;
import { InvalidFilterError }  from './errors/InvalidFilterError.js' ;
import { NonUniqueKeyError }   from './errors/NonUniqueKeyError.js' ;
import { NoSuchElementError }  from './errors/NoSuchElementError.js' ;

/**
 * The {@link system.errors} package contains error classes that are part of the <strong>VEGAS JS</strong> Application Programming Interface (<strong>API</strong>), rather than part of the Javascript core language. The <strong>Javascript</strong> core language is the part of the language that complies with the <strong>ECMAScript</strong> standard.
 * @summary The {@link system.errors} package contains error classes that are part of the <strong>VEGAS JS</strong> Application Programming Interface (<strong>API</strong>).
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.errors
 * @memberof system
 */
export var errors = Object.assign
({
    ConcurrencyError    : ConcurrencyError,
    InvalidChannelError : InvalidChannelError,
    InvalidFilterError  : InvalidFilterError,
    NonUniqueKeyError   : NonUniqueKeyError,
    NoSuchElementError  : NoSuchElementError
}) ;