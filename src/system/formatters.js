"use strict" ;

import '../polyfill.js' ;

import { ExpressionFormatter } from './formatters/ExpressionFormatter.js' ;

/**
 * The VEGAS.js framework - The system.formatters library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.formatters
 * @memberof system
 */
export var formatters = Object.assign
({
    ExpressionFormatter : ExpressionFormatter
}) ;