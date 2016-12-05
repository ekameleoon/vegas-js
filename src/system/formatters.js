"use strict" ;

import '../polyfill/Object.js' ;

import { ExpressionFormatter } from './formatters/ExpressionFormatter.js' ;

/**
 * The {@link system.formatters} library contains classes to format objects to a specific string expression.
 * @summary The {@link system.formatters} library contains classes to format objects to a specific string expression.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.formatters
 * @memberof system
 */
export var formatters = Object.assign
({
    ExpressionFormatter : ExpressionFormatter
}) ;