"use strict"

import { logger } from './vr/logging/logger.js' ;
import { Node }   from './molecule/render/dom/display/Node.js' ;

/**
 * Creates a new Assets instance.
 * @name Assets
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.dom.display.Node
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 */
export function Assets( init = null )
{
    Node.call( this , init , 'a-assets' ) ;
    if( this.element )
    {
        this.element.addEventListener( 'error'  , this._error.bind(this) ) ;
        this.element.addEventListener( 'loaded' , this._loaded.bind(this) ) ;
    }
}

Assets.prototype = Object.create( Node.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Assets , writable : true } ,

    /**
     * @private
     */
    _error : { value : function( event )
    {
        logger.error( this + " error, " + event ) ;
    }},

    /**
     * @private
     */
    _loaded : { value : function( event )
    {
        logger.debug( this + " loaded, " + event ) ;
    }}
}) ;
