"use strict" ;

import '../polyfill/Object.js' ;

import { ONE_DAY_MS } from './date/ONE_DAY_MS.js' ;

import { after } from './date/after.js' ;
import { before } from './date/before.js' ;
import { daysInMonth } from './date/daysInMonth.js' ;
import { leapYear } from './date/leapYear.js' ;
import { yesterday } from './date/yesterday.js' ;

/**
 * The {@link core.date} package is a modular <b>JavaScript</b> library that provides extra <code>Date</code> methods.
 * @summary The {@link core.date} package is a modular <b>JavaScript</b> library that provides extra <code>Date</code> methods.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.date
 * @memberof core
 */
export var date = Object.assign
({
    ONE_DAY_MS : ONE_DAY_MS ,

    after : after ,
    before : before ,
    daysInMonth : daysInMonth ,
    leapYear : leapYear,
    yesterday : yesterday
}) ;