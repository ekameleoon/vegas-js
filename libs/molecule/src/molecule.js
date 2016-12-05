"use strict" ;

import { hello } from './molecule/hello.js' ;

/**
 * The {@link molecule} library is the root package for the <strong>MOLECULE JS</strong> library.
 * @summary The {@link molecule} library is the root package for the <strong>MOLECULE JS</strong> library.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule
 * @version 1.0.0
 * @since 1.0.0
 */
export var molecule = Object.assign
({
    hello : hello
}) ;