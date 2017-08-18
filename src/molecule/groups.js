"use strict" ;

import './polyfill/Object.js' ;

import { CoreGroup } from './groups/CoreGroup.js' ;
import { RadioButtonGroup } from './groups/RadioButtonGroup.js' ;

/**
 * The {@link molecule.groups} library contains the core groups helpers.
 * @summary The {@link molecule.groups} library contains the groups helpers.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.groups
 * @memberof molecule
 */
export var groups = Object.assign
({
    CoreGroup : CoreGroup,
    RadioButtonGroup : RadioButtonGroup
}) ;