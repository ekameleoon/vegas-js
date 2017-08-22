"use strict" ;

import { Element } from './molecule/render/pixi/display/Element.js' ;

/**
 * This display is used to create a background in your application or in an other display of the application.
 * @name Background
 * @class
 * @memberof molecule.render.pixi.display
 * @extends molecule.render.pixi.display.Element
 * @constructor
 */
export function Background( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _autoSize : { writable : true , value : false }
    });

    Element.call( this , texture ) ;
}

Background.prototype = Object.create( Element.prototype ,
{
    constructor : { value : Background }
}) ;
