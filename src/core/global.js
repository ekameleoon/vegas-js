"use strict" ;

/**
 * The VEGAS.js framework - The core.global library.
 * @name global
 * @global
 * @module global
 * @instance
 * @memberof core
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
var global = global || null ;

if( !global )
{
    try
    {
        global = window ;
    }
    catch( e )
    {

    }
}

if( !global )
{
    try
    {
        global = document ;
    }
    catch( e )
    {

    }
}

if( !global )
{
    global = {} ;
}

export { global } ;