"use strict" ;

import { Builder }     from '../../../Builder.js' ;
import { Direction }   from './graphics/Direction.js' ;
import { EdgeMetrics } from './graphics/geom/EdgeMetrics.js' ;
import { MOB }         from './MOB' ;

/**
 * This class provides a skeletal implementation of all the components, to minimize the effort required to implement this interface.
 * @name Element
 * @class
 * @memberof molecule.render.pixi.display
 * @extends molecule.render.pixi.display.MOB
 * @constructor
 */
export function Element( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _border    : { writable : false , value : new EdgeMetrics() } ,
        _builder   : { writable : true  , value :  null } ,
        _direction : { writable : true  , value :  null } ,
        _group     : { writable : true  , value : false } ,
        _groupName : { writable : true  , value :  null }
    });

    ///////////

    this._builder = this.getBuilderRenderer() ;
    if( this._builder instanceof Builder )
    {
        this._builder.target = this ;
        this._builder.run() ;
    }

    ///////////

    MOB.call( this , texture ) ;
}

Element.prototype = Object.create( MOB.prototype ,
{
    constructor : { value : Element , writable : true } ,

    /**
     * Indicates the thickness, in pixels, of the four edge regions around a visual component.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @type {graphics.geom.EdgeMetrics}
     */
    border :
    {
        get : function()
        {
            return this._border ;
        },
        set : function( em )
        {
            let isEM = em instanceof EdgeMetrics ;
            this._border.bottom = isEM ? em.bottom : 0 ;
            this._border.left   = isEM ? em.left   : 0 ;
            this._border.right  = isEM ? em.right  : 0 ;
            this._border.top    = isEM ? em.top    : 0 ;
            if( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * Defines the {molecule.Builder} reference of this instance.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @type {molecule.Builder}
     */
    builder :
    {
        get : function()
        {
            return this._builder ;
        },
        set : function( builder )
        {
            if (this._builder )
            {
                this._builder.clear() ;
            }

            this._builder = ( builder instanceof Builder ) || this.getBuilderRenderer() ;

            if( this._builder instanceof Builder )
            {
                this._builder.target = this ;
                this._builder.run() ;
            }

            if( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * Indicates the direction value of the background when the display is define with the "fullscreen" mode (default value is null).
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @type {String}
     * @see {graphics.Direction}
     */
    direction :
    {
        get : function()
        {
            return this._direction ;
        },
        set : function( value )
        {
            this._direction = (value === Direction.VERTICAL || value === Direction.HORIZONTAL ) ? value : null ;
            if( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * Returns the {molecule.Builder} instance use to initialize this component.
     * @return the {molecule.Builder} instance use to initialize this component.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @function
     */
    getBuilderRenderer : { writable : true , value : function()
    {
        return null ; // override
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @function
     */
    toString : { value : function () { return '[Element]' ; }}
}) ;
