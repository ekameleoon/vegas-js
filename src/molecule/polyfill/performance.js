/* jshint -W079 */
"use strict" ;

import { global } from '../../core/global.js' ;

export var performance = global.performance = {} ;

if( window )
{
    performance.now = performance.now       ||
                      performance.mozNow    ||
                      performance.msNow     ||
                      performance.oNow      ||
                      performance.webkitNow ||
                      Date.now              ||
                      function() { return new Date().getTime(); };
}
else
{
    performance.now = Date.now || function(){ return new Date().getTime(); }
}

