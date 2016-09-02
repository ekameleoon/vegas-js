"use strict" ;

import '../polyfill.js' ;

import { ConcurrencyError }    from './errors/ConcurrencyError.js' ;
import { InvalidChannelError } from './errors/InvalidChannelError.js' ;
import { InvalidFilterError }  from './errors/InvalidFilterError.js' ;
import { NonUniqueKeyError }   from './errors/NonUniqueKeyError.js' ;
import { NoSuchElementError }  from './errors/NoSuchElementError.js' ;

/**
 * The VEGAS.js framework - The system.errors library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var errors = Object.assign
({
    ConcurrencyError    : ConcurrencyError,
    InvalidChannelError : InvalidChannelError,
    InvalidFilterError  : InvalidFilterError,
    NonUniqueKeyError   : NonUniqueKeyError,
    NoSuchElementError  : NoSuchElementError
}) ;