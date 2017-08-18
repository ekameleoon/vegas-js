"use strict" ;

import './polyfill/Object.js' ;

import { Builder } from './molecule/Builder.js' ;
import { Deployment } from './molecule/Deployment.js' ;
import { Focusable } from './molecule/Focusable.js' ;
import { Groupable } from './molecule/Groupable.js' ;
import { Iconifiable } from './molecule/Iconifiable.js' ;
import { LabelPolicy } from './molecule/LabelPolicy.js' ;
import { ScrollPolicy } from './molecule/ScrollPolicy.js' ;

import { components } from './molecule/components.js' ;
import { display } from './molecule/display.js' ;
import { groups } from './molecule/groups.js' ;
import { logger } from './molecule/logging/logger.js' ;
import { render } from './molecule/render.js' ;
import { states } from './molecule/states.js' ;

/**
 * The {@link molecule} package is a library for develop crossplatform Rich Internet Applications and Games.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule
 * @version 1.0.8
 * @since 1.0.8
 */
export var molecule = Object.assign
({
    // ----- Singletons

    logger,

    // ----- Classes and enumerations

    Builder      : Builder ,
    Deployment   : Deployment ,
    Focusable    : Focusable ,
    Groupable    : Groupable ,
    Iconifiable  : Iconifiable ,
    LabelPolicy  : LabelPolicy ,
    ScrollPolicy : ScrollPolicy,

    // ----- packages

    components : components,
    display    : display,
    groups     : groups,
    render     : render,
    states     : states
}) ;