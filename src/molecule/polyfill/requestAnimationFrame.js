/* jshint -W079 */
"use strict" ;

import { global }      from '../../core/global.js' ;
import { performance } from './performance.js' ;

const ONE_FRAME_TIME = 16;

let lastTime = Date.now();

const vendors = ['ms', 'moz', 'webkit', 'o'] ;

let len = vendors.length ;
for ( let x = 0 ; x < len && !global.requestAnimationFrame ; ++x )
{
    const p = vendors[x];

    global.requestAnimationFrame = global[`${p}RequestAnimationFrame`];
    global.cancelAnimationFrame  = global[`${p}CancelAnimationFrame`] || global[`${p}CancelRequestAnimationFrame`];
}

if (!global.requestAnimationFrame)
{
    global.requestAnimationFrame = ( callback ) =>
    {
        if ( typeof callback !== 'function' )
        {
            throw new TypeError(`${callback}is not a function`) ;
        }

        const currentTime = Date.now();

        let delay = ONE_FRAME_TIME + lastTime - currentTime;

        if ( delay < 0 )
        {
            delay = 0;
        }

        lastTime = currentTime;

        return setTimeout(() =>
        {
            lastTime = Date.now();
            callback( performance.now() );
        }, delay);
    };
}

if (!global.cancelAnimationFrame)
{
    global.cancelAnimationFrame = (id) => clearTimeout(id);
}