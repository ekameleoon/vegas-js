/*jslint bitwise: true */
"use strict" ;

/**
 * Generates a variant 2, version 4 (randomly generated number) UUID as per RFC 4122.
 */
export function generateUUID() /*String*/
{
    function S4()
    {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}