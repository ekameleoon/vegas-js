"use strict" ;

import '../polyfill.js' ;

import { forEach } from './objects/forEach.js' ;
import { fuse }    from './objects/fuse.js' ;
import { members } from './objects/members.js' ;
import { merge }   from './objects/merge.js' ;

/**
 * The VEGAS.js framework - The core.objects library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var objects = Object.assign
({
    forEach : forEach,
    fuse    : fuse,
    members : members,
    merge   : merge
}) ;