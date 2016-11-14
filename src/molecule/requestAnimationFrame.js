/* jshint -W079 */
"use strict" ;

import './polyfill/requestAnimationFrame.js' ;
import { global } from '../core/global.js' ;

export var requestAnimationFrame = global.requestAnimationFrame ;