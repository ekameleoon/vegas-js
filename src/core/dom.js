"use strict" ;

import '../polyfill/Object.js' ;

import { isElement }     from './dom/isElement.js' ;
import { isHTMLElement } from './dom/isHTMLElement.js' ;
import { isSVGElement }  from './dom/isSVGElement.js' ;

/**
 * The {@link core.dom} package is a modular <b>JavaScript</b> library that provides extra <code>W3C DOM</code> methods.
 * @summary The {@link core.dom} package is a modular <b>JavaScript</b> library that provides extra <code>W3C DOM</code> methods.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.dom
 * @memberof core
 */
export var dom = Object.assign
({
    isElement     : isElement ,
    isHTMLElement : isHTMLElement ,
    isSVGElement  : isSVGElement
}) ;