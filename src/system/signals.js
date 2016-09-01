"use strict" ;

import '../polyfill.js' ;

import { strings     } from './signals/strings.js' ;
import { Receiver    } from './signals/Receiver.js' ;
import { SignalEntry } from './signals/SignalEntry.js' ;
import { Signaler    } from './signals/Signaler.js' ;
import { Signal      } from './signals/Signal.js' ;

/**
 * The VEGAS.js framework - The system.signals library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var signals = Object.assign
({
    strings     : strings ,
    Receiver    : Receiver ,
    SignalEntry : SignalEntry ,
    Signaler    : Signaler,
    Signal      : Signal
}) ;