"use strict" ;

import { global } from '../core/global.js' ;

/**
 * Low-budget Float32Array knock-off, suitable for use with P2.js in IE9
 * Source: http://www.html5gamedevs.com/topic/5988-phaser-12-ie9/
 * Cameron Foale (http://www.kibibu.com)
 */
if ( global && typeof( global.Uint32Array ) !== "function" && typeof(global.Uint32Array) !== "object")
{
    var CheapArray = function(type)
    {
        var proto = [] ; // jshint ignore:line

        global[type] = function( arg )
        {
            var i ;

            if (typeof(arg) === "number")
            {
                Array.call(this, arg);

                this.length = arg;

                for ( i = 0 ; i < this.length; i++)
                {
                    this[i] = 0;
                }
            }
            else
            {
                Array.call( this , arg.length );

                this.length = arg.length;

                for ( i = 0; i < this.length ; i++ )
                {
                    this[i] = arg[i];
                }
            }
        };

        global[type].prototype = proto;
        global[type].constructor = global[type];
    };

    CheapArray('Float32Array'); // jshint ignore:line
    CheapArray('Uint32Array'); // jshint ignore:line
    CheapArray('Uint16Array'); // jshint ignore:line
    CheapArray('Int16Array'); // jshint ignore:line
    CheapArray('ArrayBuffer'); // jshint ignore:line
}