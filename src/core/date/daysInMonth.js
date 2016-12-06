"use strict" ;

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] ;

/**
 * Returns the numbers of days in a specified month.
 * @return The numbers of days in a specified month.
 * @name daysInMonth
 * @memberof core.date
 * @function
 * @instance
 * @param {Date} [date] - The date (or now) to search the number of days in a month.
 */
export var daysInMonth = ( date = null ) =>
{
    if( !(date instanceof Date) )
    {
        date = new Date() ;
    }

    let y = date.getFullYear() ;
    let m = date.getMonth() ;

    if ( ( ( y%4 === 0 && y%100 !== 0 ) || y%400 === 0 ) && m === 1 )
    {
    	return 29 ;
    }

    return monthDays[m] ;
}
