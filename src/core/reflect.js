"use strict" ;

import '../polyfill.js' ;

import { getDefinitionByName } from './reflect/getDefinitionByName.js' ;
import { invoke } from './reflect/invoke.js' ;

/**
 * The VEGAS.js framework - The core.reflect library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var reflect = Object.assign
({
    getDefinitionByName : getDefinitionByName ,
    invoke              : invoke
}) ;