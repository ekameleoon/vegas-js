"use strict" ;

import { LoggerFactory } from './LoggerFactory.js' ;

/**
 * The singleton factory to generates all the <b>loggers</b> in your application.
 * @summary The singleton factory to generates all the <b>loggers</b> in your application.
 * @name Log
 * @memberof system.logging
 * @type system.logging.LoggerFactory
 * @const
 * @instance
 */
export var Log = new LoggerFactory() ;