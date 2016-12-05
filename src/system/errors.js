"use strict" ;

import '../polyfill/Object.js' ;

import { ConcurrencyError }    from './errors/ConcurrencyError.js' ;
import { InvalidChannelError } from './errors/InvalidChannelError.js' ;
import { InvalidFilterError }  from './errors/InvalidFilterError.js' ;
import { NonUniqueKeyError }   from './errors/NonUniqueKeyError.js' ;
import { NoSuchElementError }  from './errors/NoSuchElementError.js' ;

/**
 * The {@link system.errors} package contains error classes that are part of the <strong>VEGAS JS</strong> Application Programming Interface (<strong>API</strong>), rather than part of the Javascript core language. The <strong>Javascript</strong> core language is the part of the language that complies with the <strong>ECMAScript</strong> standard.
 * @summary The {@link system.errors} package contains error classes that are part of the <strong>VEGAS JS</strong> Application Programming Interface (<strong>API</strong>).
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
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