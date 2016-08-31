"use strict" ;

import './polyfill.js' ;

/**
 * The VEGAS.js framework - The system library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
import { strings     } from './system/signals/strings.js' ;
import { Receiver    } from './system/signals/Receiver.js' ;
import { SignalEntry } from './system/signals/SignalEntry.js' ;
import { Signaler    } from './system/signals/Signaler.js' ;
import { Signal      } from './system/signals/Signal.js' ;

export var system = Object.assign
({
    signals :
    {
        strings     : strings ,
        Receiver    : Receiver ,
        SignalEntry : SignalEntry ,
        Signaler    : Signaler,
        Signal      : Signal
    }
}) ;