"use strict" ;

import { logger } from './molecule/logging/logger.js' ;

/**
 * The internal warning method.
 * @private
 */
export function warn( message , verbose = false , enableErrorChecking = false )
{
    if ( enableErrorChecking === true )
    {
        throw new Error( message ) ;
    }
    else if ( verbose === true )
    {
        logger.warning( message ) ;
    }
}
