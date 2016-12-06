/*jshint node: true*/
"use strict" ;

/**
 * Indicates if the first date is <b>before</b> the second date.
 * @param {Date} date1 - The first date to evaluates.
 * @param {Date} date2 - The second date to evaluates.
 * @return <code>true</code> if the first date is before the second date.
 * @name after
 * @memberof core.date
 * @function
 * @instance
 * @throws TypeError The two date arguments must be a valid Date object.
 * @example
 * trace( before(new Date(2016,0,1),new Date(2017,0,1)) ) ; // true
 */
export var before = ( date1 , date2 ) =>
{
    if( !(date1 instanceof Date && date2 instanceof Date) )
    {
        throw new TypeError( 'after() failed, the passed-in date arguments must be valid Date objects.' ) ;
    }
    return date1.valueOf() < date2.valueOf() ;
}