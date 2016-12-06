"use strict" ;

/**
 * The <code>global</code> namespace (reference to the global scope of the application), this object can target the <code>window</code> or the <code>document</code> global objects in the browser or an other global reference.
 * @name global
 * @memberof core
 * @const
 * @instance
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