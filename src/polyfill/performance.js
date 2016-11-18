/* jshint -W079 */
"use strict" ;

import './Date.js' ;

import { global } from '../core/global.js' ;

export var performance = global.performance || {} ;

Object.defineProperty( global, 'performance', { value : performance , configurable : true , writable : true } ) ;

performance.now = performance.now       ||
                  performance.mozNow    ||
                  performance.msNow     ||
                  performance.oNow      ||
                  performance.webkitNow ;

if ( !(global.performance && global.performance.now) )
{
    const startTime = Date.now();
    global.performance.now = () => Date.now() - startTime ;
}
