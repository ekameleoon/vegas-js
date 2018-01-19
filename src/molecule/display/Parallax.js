"use strict" ;

import { normalize } from '../../core/maths/normalize.js' ;

import { ArrayMap } from '../../system/data/maps/ArrayMap.js' ;
import { Point } from '../../graphics/geom/Point.js' ;
import { Rectangle } from '../../graphics/geom/Rectangle.js' ;

import { ParallaxLayer } from './ParallaxLayer.js' ;

/**
 * This class defines a layer in the Parallaxe container.
 * @name Parallax
 * @class
 * @memberof molecule.display
 * @constructor
 * @param {graphics.geom.Rectangle} area - The Rectangle to set the visual viewport of the parallax display.
 */
export function Parallax( area )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _area   : { writable : false , value : new Rectangle() } ,
        _bounds : { writable : true  , value : null } ,
        _focus  : { writable : false , value : new Point() } ,
        _layer  : { writable : true  , value : null } ,
        _layers : { writable : false , value : new ArrayMap() } ,
        _scale  : { writable : true  , value : 1 } ,

        /**
         * The smoothing value of the parallaxe.
         * @name smoothing
         * @memberof molecule.display.Parallax
         * @instance
         * @type number
        */
        smoothing : { writable : true , value : 10 }
    });

    if( area instanceof Rectangle )
    {
        this.area = area ;
    }
}

Parallax.prototype = Object.create( Object.prototype ,
{
    constructor : { value : Parallax } ,

    /**
     * The area Rectangle to defines the limits of the parallaxe effect.
     * @name area
     * @memberof molecule.display.Parallax
     * @instance
     * @type graphics.geom.Rectangle
     */
    area :
    {
        get : function() { return this._area ; } ,
        set : function( rec )
        {
            if( rec instanceof Rectangle )
            {
                this._area.copyFrom( rec )
            }
            else
            {
                this._area.setTo() ; // clear
            }
        }
    },

    /**
     * The optional Rectange to defines the bounds of the parallaxe effect.
     * @name bounds
     * @memberof molecule.display.Parallax
     * @instance
     * @type graphics.geom.Rectangle
     */
    bounds :
    {
        get : function() { return this._bounds ; } ,
        set : function( rec )
        {
            if( rec instanceof Rectangle )
            {
                this._bounds = rec.clone() ;
            }
            else
            {
                this._bounds = null ;
            }
        }
    },

    /**
     * Indicates the focus position of the parallaxe.
     * @name focus
     * @memberof molecule.display.Parallax
     * @instance
     * @type graphics.geom.Point
     */
    focus :
    {
        get : function() { return this._focus ; } ,
        set : function( pos )
        {
            if( pos instanceof Point )
            {
                this._focus.x = pos.x ;
                this._focus.y = pos.y ;
            }
            else
            {
                this._focus.x = 0 ;
                this._focus.y = 0 ;
            }
        }
    },

    /**
     * Indicates the number of layers register in the parallax manager.
     * @name main
     * @memberof molecule.display.Parallax
     * @instance
     */
    length : { get : function() { return this._layers.length ; } },

    /**
     * Indicates the main DisplayObject of the parallaxe, this DisplayObject must be registered in the model.
     * @name main
     * @memberof molecule.display.Parallax
     * @instance
     */
    main :
    {
        get : function() { return this._layer ; } ,
        set : function( display )
        {
            this._layer = this._layers.get( display ) ;
        }
    },

    /**
     * The scale value of the parallaxe area.
     * @name scale
     * @memberof molecule.display.Parallax
     * @instance
     * @type number
     * @default 1
     */
    scale :
    {
        get : function() { return this._scale ; } ,
        set : function( value )
        {
            this._scale = isNaN(value) ? 1 : value ;
        }
    },

    /**
     * Inserts a new layer in the parallax area manager.
     * @name add
     * @memberof molecule.display.Parallax
     * @instance
     * @function
     * @return <code>true</code> if the specific layer is added.
     */
    add : { value : function( target , main = false, dimension = null , offset = null , scaling = false )
    {
        if ( target === null )
        {
            throw new ReferenceError( this + " add() failed, the target argument not must be null.");
        }

        let layer = new ParallaxLayer( target , dimension , offset , scaling ) ;
        let bool  = this._layers.set( target , layer ) === null ;

        if ( main )
        {
            this._layer = this._layers.get( target ) ;
        }

        return bool ;
    }},

    /**
     * Removes all layers in the parallaxe tool.
     * @name clear
     * @memberof molecule.display.Parallax
     * @instance
     * @function
     */
    clear : { value : function()
    {
        this._layers.clear() ;
    }},

    /**
     * Removes the specified DisplayObject registered in the parallaxe tool (remove this layer).
     * @name delete
     * @memberof molecule.display.Parallax
     * @instance
     * @function
     * @return <code>true</code> if the specific layer is removed.
     */
    delete : { value : function( target )
    {
        return this._layers.delete(target) ;
    }},

    /**
     * Interpolates the parallaxe effect and update all layers (equals update(false)).
     * @name interpolate
     * @memberof molecule.display.Parallax
     * @instance
     * @function
     */
    interpolate : { value : function()
    {
        this.update(false) ;
    }},

    /**
     * Returns <code>true</code> if this parallaxe model is empty.
     * @name isEmpty
     * @memberof molecule.display.Parallax
     * @instance
     * @function
     * @return <code>true</code> if this parallaxe model is empty.
     */
    isEmpty : { value : function()
    {
        this._layers.isEmpty() ;
    }},

    /**
     * Updates all the layers.
     * @param {boolean} [now=true] - Indicates if the update is instant or if use interpolation with the smoothing value.
     * @name update
     * @memberof molecule.display.Parallax
     * @instance
     * @function
     */
    update : { value : function( now = true )
    {
        if ( (this._layer === null) || (this.length === 0) )
        {
            return ; // do nothing
        }

        let layers = this._layers.values() ;

        // initialize the layer controller
        this._layer.tx = this._focus.x ;
        this._layer.ty = this._focus.y ;

        if ( this._bounds )
        {
            if( (this._layer.tx + this._bounds.left) > this._area.left )
            {
                this._layer.tx = -this._bounds.left + this._area.left ;
            }
            if( (this._layer.tx + this._bounds.right) < this._area.right )
            {
                this._layer.tx = -this._bounds.right + this._area.right ;
            }
            if( (this._layer.ty + this._bounds.top) > this._area.top )
            {
                this._layer.ty = -this._bounds.top + this._area.top ;
            }
            if( (this._layer.ty + this._bounds.bottom) < this._area.bottom )
            {
                this._layer.ty = -this._bounds.bottom + this._area.bottom ;
            }
        }
        else
        {
            if ( this._layer.tx < this._area.left )
            {
                this._layer.tx = this._area.left ;
            }
            if ( this._layer.tx > this._area.right )
            {
                this._layer.tx = this._area.right ;
            }
            if ( this._layer.ty < this._area.top )
            {
                this._layer.ty = this._area.top ;
            }
            if ( this._layer.ty > this._area.bottom )
            {
                this._layer.ty = this._area.bottom ;
            }
        }

        var dx = normalize( this._layer.tx , this._area.left , this._area.right  ) ;
        var dy = normalize( this._layer.ty , this._area.top  , this._area.bottom ) ;

        var smooth = now ? 1 : this.smoothing ;

        layers.forEach( ( layer ) =>
        {
            if ( layer.scaling )
            {
                layer.target.scaleX = this._scale ;
                layer.target.scaleY = this._scale ;
            }

            let dim = layer.dimension ;
            let tar = layer.target ;

            layer.tx = (-dx * ( dim.width  - this._area.width ) + this._area.x ) - dim.x ;
            layer.ty = (-dy * ( dim.height - this._area.height) + this._area.y ) - dim.y ;

            tar.x += parseInt( ( layer.tx - tar.x  ) / smooth ) ;
            tar.y += parseInt( ( layer.ty - tar.y  ) / smooth ) ;
        }) ;
    }},

    /**
     * Returns the string representation of this instance.
     * @name toString
     * @return {string} The string representation of this instance.
     * @name toString
     * @memberof molecule.display.Parallax
     * @instance
     * @function
     */
    toString : { value : function () { return '[Parallax]' ; }}
});
