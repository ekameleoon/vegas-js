"use strict" ;

/**
 * The <code>global</code> namespace (reference to the global scope of the application).
 * @name global
 * @memberof core
 * @const
 * @instance
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
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