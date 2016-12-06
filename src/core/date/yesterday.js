"use strict" ;

import { ONE_DAY_MS } from './ONE_DAY_MS.js' ;

/**
 * The <code>yesterday</code> new Date object.
 * @param {Date} [date] - The date to evaluates. If this argument is ommited the current Date is used.
 * @return The <code>yesterday</code> new Date object.
 * @name yesterday
 * @memberof core.date
 * @function
 * @instance
 * @example
 * trace( yesterday(new Date(2016,1,2)) ) ;
 */
export var yesterday = ( date = null ) =>
{
    date = (date instanceof Date) ? date : new Date() ;
    return new Date( date.valueOf() - ONE_DAY_MS ) ;
}