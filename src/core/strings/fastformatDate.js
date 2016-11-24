"use strict" ;

/**
 * Returns the string representation of the specific date with the format "yyyy-mm-dd".
 * @name fastformatDate
 * @memberof core.strings
 * @function
 * @param {Date} [date=null] - The date object to format (default the current Date if the argument is null).
 * @param {string} [separator=-] The default separator of the format expression.
 * @return The string representation of the specific date with the format <code>"yyyy-mm-dd"</code>.
 * @example
 * trace( fastformatDate(new Date(2016,5,12)) ) ; // "2016-06-12"
 * trace( fastformatDate(new Date(2016,5,12),"/") ) ; // "2016/06/12"
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