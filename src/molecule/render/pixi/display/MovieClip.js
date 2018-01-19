"use strict" ;

import { pad } from 'core/strings/pad.js' ;

/**
 * The MovieClip class to display spritesheet animations.
 * @name MovieClip
 * @memberof molecule.render.pixi.display
 * @class
 * @constructor
 */
export function MovieClip( frameName = null , frameCount = 1 , suffix = '' , autoUpdate = true )
{
    let frames = [] ;

    for ( let i = 0 ; i < frameCount ; i++ )
    {
        frames.push( PIXI.Texture.fromFrame( frameName + pad( i + '' , 4 , '0' ) + suffix ) );
    }

    PIXI.extras.AnimatedSprite.call( this , frames , autoUpdate ) ;
}

MovieClip.prototype = Object.create( PIXI.extras.AnimatedSprite.prototype ,
{
    constructor : { value : MovieClip }
});