"use strict" ;

import '../polyfill/Object.js' ;

import { ONE_DAY_MS } from './date/ONE_DAY_MS.js' ;

import { after } from './date/after.js' ;
import { daysInMonth } from './date/daysInMonth.js' ;
import { leapYear } from './date/leapYear.js' ;

/**
 * The {@link core.date} package is a modular <b>JavaScript</b> library that provides extra <code>Date</code> methods.
 * @summary The {@link core.arrays} package is a modular <b>JavaScript</b> library that provides extra <code>Date</code> methods.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.date
 * @memberof core
 */
export var date = Object.assign
({
    ONE_DAY_MS : ONE_DAY_MS ,

    after : after ,
    daysInMonth : daysInMonth ,
    leapYear : leapYear
}) ;