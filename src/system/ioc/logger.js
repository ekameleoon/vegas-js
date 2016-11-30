"use strict" ;

import { Log } from '../logging/Log.js' ;

/**
 * The {@link system.ioc} internal logger singleton with the channel <code>"system.ioc.logger"</code>.
 * @name logger
 * @memberof system.ioc
 * @type system.logging.Logger
 */
export var logger = Log.getLogger( "system.ioc.logger" ) ;