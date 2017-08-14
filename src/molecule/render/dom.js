"use strict" ;

import '../../polyfill/Object.js' ;

import { Anchor } from './dom/display/Anchor.js' ;
import { Body } from './dom/display/Body.js' ;
import { Button } from './dom/display/Button.js' ;
import { Div } from './dom/display/Div.js' ;
import { G } from './dom/display/G.js' ;
import { Img } from './dom/display/Img.js' ;
import { Node } from './dom/display/Node.js' ;
import { Paragraph } from './dom/display/Paragraph.js' ;
import { Path } from './dom/display/Path.js' ;
import { Stage } from './dom/display/Stage.js' ;
import { Svg } from './dom/display/Svg.js' ;

import { createEntity } from './dom/entities/createEntity.js' ;
import { createImg } from './dom/entities/createImg.js' ;
import { createVideo } from './dom/entities/createVideo.js' ;

import { Audio } from './dom/medias/Audio.js' ;
import { Video } from './dom/medias/Video.js' ;

/**
 * The {@link molecule.render.dom} library contains the rendering classes that the application uses to build DOM elements.
 * @summary The {@link molecule.render.dom} library contains the rendering classes that the application uses to build DOM elements.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace molecule.render.dom
 * @memberof molecule.render
 */
export var dom = Object.assign
({
    /**
     * This package contains a set of display elements based on the DOM API.
     * @summary This package contains a set of display elements based on the DOM API.
     * @namespace molecule.render.dom.display
     * @memberof molecule.render.dom
     */
    display :
    {
        Anchor : Anchor,
        Body : Body,
        Button : Button,
        Div : Div,
        G : G,
        Img : Img,
        Node : Node,
        Paragraph : Paragraph,
        Path : Path,
        Stage : Stage,
        Svg : Svg
    },

    /**
     * This package contains helpers to create DOM elements.
     * @summary This package contains helpers to create DOM elements.
     * @namespace molecule.render.dom.entities
     * @memberof molecule.render.dom
     */
    entities :
    {
        createEntity : createEntity,
        createImg    : createImg,
        createVideo  : createVideo
    },

    /**
     * This package contains helpers to create DOM Media Elements.
     * @summary This package contains helpers to create DOM Media Elements.
     * @namespace molecule.render.dom.medias
     * @memberof molecule.render.dom
     */
    medias :
    {
        Audio : Audio,
        Video : Video
    },
}) ;