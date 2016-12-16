"use strict" ;

import './polyfill/Object.js' ;

import { Browser } from './screens/Browser.js' ;
import { Os }      from './screens/Os.js' ;

/**
 * The {@link screens} package is .
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace screens
 * @version 1.0.7
 * @since 1.0.7
 */
export var screens = Object.assign
({
    Browser : Browser ,
    Os      : Os
}) ;
