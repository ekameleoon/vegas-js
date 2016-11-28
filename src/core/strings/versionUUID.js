/*jshint bitwise: false*/
"use strict" ;

/**
 * Extracts the version from the UUID, which is (by definition) the M in xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 * @name versionUUID
 * @memberof core.strings
 * @function
 * @instance
 * @param  {String} uuid The uuid expression
 * @return {Number} The version number of the uuid expression.
 * @example
 * trace( versionUUID("c01bfdc3-405c-45a1-9dec-06e6e830bee1") ) ; // 4
 */
export var versionUUID = function (uuid)
{
    return uuid.charAt(14)|0 ;
};