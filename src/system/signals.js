"use strict" ;

import '../polyfill.js' ;

import { strings     } from './signals/strings.js' ;
import { Receiver    } from './signals/Receiver.js' ;
import { SignalEntry } from './signals/SignalEntry.js' ;
import { Signaler    } from './signals/Signaler.js' ;
import { Signal      } from './signals/Signal.js' ;

/**
 * The {@link system.signals} library is light-weight, strongly-typed messaging tools. Wire your application with better APIs and less boilerplate than W3C DOMEvents..
 * <p><b>Concept: </b>
 * <ul>
 * <li>A Signal is essentially a minimal emiter specific to one event, with its own <code>array</code> of receivers/slots ({@link system.signals.Receiver|Receiver} or <code>Function</code>).</li>
 * <li>A Signal gives an event a concrete membership in a class.</li>
 * <li>Receivers subscribe to real objects, not to string-based channels.</li>
 * <li>Event string constants are no longer needed.</li>
 * <li>Signals are inspired by {@link https://en.wikipedia.org/wiki/Signals_and_slots|signals/slots in Qt}.</li>
 * <ul>
 * @summary The {@link system.signals} library is light-weight, strongly-typed messaging tools.
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