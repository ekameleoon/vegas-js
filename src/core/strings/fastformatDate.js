"use strict" ;

/**
 * Returns the string representation of the specific date with the format "yyyy-mm-dd".
 * @param date The date to format (default the current Date if the argument is null).
 * @param separator The default separator of the format expression (by default '-').
 * @return the string representation of the specific date with the format "yyyy-mm-dd".
 */
export function fastformatDate( date = null , separator = '-' )
{
    if( !(date instanceof Date) )
    {
        date = new Date() ;
    }

    var month = date.getMonth() + 1 ;
    var day   = date.getDate() ;

    var exp = date.getFullYear() + separator ;

    if( month < 10 )
    {
       exp += "0" ;
    }

    exp += month + separator ;

    if ( day < 10 )
    {
        exp += "0" ;
    }

    exp += day ;
    return exp ;
}