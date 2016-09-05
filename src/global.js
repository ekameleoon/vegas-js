"use strict" ;

/**
 * The VEGAS.js framework - The core.reflect library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var global = global || window || document ;

if( global.hasOwnProperty('vegas') )
{
    global = global.vegas ; // hook to target the vegas global domain
}

export { global } ;