/*jshint node: true*/
"use strict" ;

/**
 * Indicates if the first date is <b>after</b> the second date.
 * @param {Date} date1 - The first date to evaluates.
 * @param {Date} date2 - The second date to evaluates.
 * @return <code>true</code> if the first date is after the second date.
 * @name after
 * @memberof core.date
 * @function
 * @instance
 * @throws TypeError The two date arguments must be a valid Date object.
 */
export var after = ( date1 , date2 ) =>
{
    return date1.valueOf() > date2.valueOf() ;
}