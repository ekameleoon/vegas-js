"use strict" ;

import '../polyfill.js' ;

import { Event } from './events/Event.js' ;
import { EventDispatcher } from './events/EventDispatcher.js' ;
import { EventPhase } from './events/EventPhase.js' ;
import { IEventDispatcher } from './events/IEventDispatcher.js' ;

/**
 * The {@link system.events} package provides a W3C Event Model implementation.
 * @summary The {@link system.events} package provides an W3C Event Model library.
 * @license {@link https://www.mozilla.org/en-US/MPL/1.1/|MPL 1.1} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.events
 * @memberof system
 * @example
 * var click = function( event )
 * {
 *     trace( "click: " + event ) ;
 * };
 *
 * var dispatcher = new EventDispatcher() ;
 *
 * dispatcher.addEventListener( Event.CLICK , click ) ;
 *
 * dispatcher.dispatchEvent( new Event( Event.CLICK ) ) ;
 */
export var events = Object.assign
({
    Event,
    EventDispatcher,
    EventPhase,
    IEventDispatcher
}) ;