/*jslint bitwise: true */
"use strict" ;

/**
 * Generates a version 4 (randomly generated number) UUID as per RFC 4122.
 * @name generateUUID
 * @memberof core.random
 * @function
 * @instance
 * @return The String expression of the UUID version 4.
 * @example
 * trace( generateUUID() ) ; // 1ba7bbbd-783c-44db-9fc7-3ca772c6a8d2
 */
export function generateUUID()
{
    let d = new Date().getTime();
    return pattern.replace(/[xy]/g, (c) =>
    {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor( d / 16 ) ;
        return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
    });
}

/**
 * The uuid pattern.
 * @private
 */
const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' ;