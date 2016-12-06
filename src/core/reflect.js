"use strict" ;

import '../polyfill/Object.js' ;

import { getDefinitionByName } from './reflect/getDefinitionByName.js' ;
import { invoke } from './reflect/invoke.js' ;

/**
 * The {@link core.reflect} package is a modular <b>JavaScript</b> library that provides extra methods to to obtain information about loaded objects or generate it.
 * @summary The {@link core.reflect} package is a modular <b>JavaScript</b> library that provides extra methods to to obtain information about loaded objects or generate it.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.reflect
 * @memberof core
 */
export var reflect = Object.assign
({
    getDefinitionByName : getDefinitionByName ,
    invoke              : invoke
}) ;