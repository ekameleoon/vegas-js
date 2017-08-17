"use strict" ;

import { Log } from './system/logging/Log.js' ;

/**
 * The molecule logger singleton constant.
 * @name logger
 * @memberof molecule.logging
 * @const
 */
export const logger = Log.getLogger( 'molecule.logging.logger' ) ;