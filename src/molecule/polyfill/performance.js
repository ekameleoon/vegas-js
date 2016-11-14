/* jshint -W079 */
"use strict" ;

import { global } from '../../core/global.js' ;

if (!(Date.now && Date.prototype.getTime))
{
    Date.now = function now()
    {
        return new Date().getTime();
    };
}

export var performance = global.performance = {} ;

performance.now = performance.now       ||
                  performance.mozNow    ||
                  performance.msNow     ||
                  performance.oNow      ||
                  performance.webkitNow

if ( !(global.performance && global.performance.now) )
{
    const startTime = Date.now();
    global.performance.now = () => Date.now() - startTime;
}