"use strict" ;

/**
 * Dumps a string representation of any Date reference.
 * @name dumpDate
 * @memberof core
 * @function
 * @instance
 * @param {Date} value - A Date object to dump.
 * @param {boolean} [timestamp=false] - The optional timestamp flag.
 * @return The string representation of any Date reference.
 */
export function dumpDate( date /*Date*/ , timestamp = false  ) /*String*/
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