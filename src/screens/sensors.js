"use strict" ;

import '../polyfill/Object.js' ;

import { Accelerometer } from './sensors/Accelerometer.js' ;

/**
 * The {@link screens.sensors} package contains classes for working mobile devices that support GPS and respond to motion.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @author Benoit Pouzet <bpouzet@gmail.com>
 * @namespace screens.sensors
 * @version 1.0.7
 * @since 1.0.7
 */
export var sensors = Object.assign
({
    Accelerometer : Accelerometer
}) ;
