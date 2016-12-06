"use strict" ;

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] ;

/**
 * Indicates if the specified date is a <b>leap year</b> (also known as an intercalary year or a bissextile year) .
 * @param {Date|number} date - The date to evaluates or a number representing the year integer value representing the year (Value from 0 to 99 map to the years 1900 to 1999).
 * @return <code>true</code> if the specified date is a <b>leap year</b> .
 * @name leapYear
 * @memberof core.date
 * @function
 * @instance
 * @throws TypeError The date argument must be a valid Date object.
 */
export var leapYear = ( date ) =>
{
    let year ;
    if( date instanceof Date )
    {
        year = date.getFullYear() ;
    }
    else if( date instanceof Number || typeof(date) === 'number' )
    {
        year = date ;
    }
    else
    {
        throw new TypeError( 'leapYear failed, the passed-in date argument must be a valid Date object or an integer representing the year to evaluates.' ) ;
    }
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}
