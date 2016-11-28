"use strict" ;

import { versionUUID } from './versionUUID.js' ;

/**
 * Determines whether the uuid is valid, converting it from a buffer if necessary.
 * @name validateUUID
 * @memberof core.strings
 * @function
 * @instance
 * @param {String} uuid - The uuid expression to validate.
 * @param {Number} vers - The optional version of the uuid to validate.
 * @return {Boolean} <code>true</code> if the uuid expression is valid.
 * @example
 * trace( validateUUID("c01bfdc3-405c-45a1-9dec-06e6e830bee1") ) ; // true
 */
export function validateUUID( source , version = null )
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return false ;
    }

    source = source.toLowerCase() ;

    if ( !pattern.test(source) )
    {
        return false ;
    }

    if ( !version )
    {
        version = versionUUID(source) ;
    }
    else if (versionUUID(source) !== version )
    {
        return false ;
    }

    switch (version)
    {
        case 1:
        case 2:
        {
            return true;
        }
        case 3 :
        case 4 :
        {
            return ['8', '9', 'a', 'b'].indexOf(source.charAt(19)) !== -1;
        }
        default :
        {
            throw new Error('Invalid version provided.');
        }
    }
}

/**
 * Regular expression used for basic parsing of the uuid.
 */
var pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;