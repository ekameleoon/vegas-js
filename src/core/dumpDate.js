"use strict" ;

/**
 * Dumps a string representation of any Array reference.
 * @param value an Array to dump.
 * @param prettyprint (optional) boolean option to output a pretty printed string
 * @param indent (optional) initial indentation
 * @param indentor (optional) initial string used for the indent
 * @return The dump string representation of any Array reference.
 */
export function dumpDate( date /*Date*/ , timestamp /*Boolean*/  ) /*String*/
{
    timestamp = Boolean( timestamp ) ;
    if ( timestamp )
    {
        return "new Date(" + String( date.valueOf() ) + ")";
    }
    else
    {
        var y    = date.getFullYear();
        var m    = date.getMonth();
        var d    = date.getDate();
        var h    = date.getHours();
        var mn   = date.getMinutes();
        var s    = date.getSeconds();
        var ms   = date.getMilliseconds();
        var data = [ y, m, d, h, mn, s, ms ];
        data.reverse();
        while( data[0] === 0 )
        {
            data.splice( 0, 1 );
        }
        data.reverse() ;
        return "new Date(" + data.join( "," ) + ")";
    }
}