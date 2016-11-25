"use strict" ;

import '../polyfill.js' ;

import { strings     } from './signals/strings.js' ;
import { Receiver    } from './signals/Receiver.js' ;
import { SignalEntry } from './signals/SignalEntry.js' ;
import { Signaler    } from './signals/Signaler.js' ;
import { Signal      } from './signals/Signal.js' ;

/**
 * The {@link system.signals} library is the root package for the <strong>VEGAS JS</strong> application framework. It is the starting point of the RIA framework structure.
 * <p><b>Depencies :</b> The {@link system.signals}, reuse the module and building blocks of the {@link system.core} library.</p>
 * @summary The {@link system.signals} library is the root package for the <strong>VEGAS JS</strong> application framework.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace system.signals
 * @memberof system
 * @example
 * function Slot( name )
 * {
 *     this.name = name ;
 * }
 *
 * Slot.prototype = Object.create( system.signals.Receiver.prototype );
 * Slot.prototype.constructor = Slot;
 *
 * Slot.prototype.receive = function ( message )
 * {
 *     trace( this + " : " + message ) ;
 * }
 *
 * Slot.prototype.toString = function ()
 * {
 *     return "[Slot name:" + this.name + "]" ;
 * }
 *
 * var slot1 = new Slot("slot1") ;
 *
 * var slot2 = function( message )
 * {
 *     trace( this + " : " + message ) ;
 * }
 *
 * var signal = new system.signals.Signal() ;
 *
 * //signal.proxy = slot1 ;
 *
 * signal.connect( slot1 , 0 ) ;
 * signal.connect( slot2 , 2 ) ;
 *
 * signal.emit( "hello world" ) ;
 */
export var signals = Object.assign
({
    strings     : strings ,
    Receiver    : Receiver ,
    SignalEntry : SignalEntry ,
    Signaler    : Signaler,
    Signal      : Signal
}) ;