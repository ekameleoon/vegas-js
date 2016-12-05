"use strict" ;

import '../polyfill/Object.js' ;

import { forEach } from './objects/forEach.js' ;
import { fuse }    from './objects/fuse.js' ;
import { members } from './objects/members.js' ;
import { merge }   from './objects/merge.js' ;

/**
 * The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra <code>Object</code> methods and implementations.
 * @summary The {@link core.objects} package is a modular <b>JavaScript</b> library that provides extra <code>Object</code> methods and implementations.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.objects
 * @memberof core
 */
export var objects = Object.assign
({
    forEach : forEach,
    fuse    : fuse,
    members : members,
    merge   : merge
}) ;