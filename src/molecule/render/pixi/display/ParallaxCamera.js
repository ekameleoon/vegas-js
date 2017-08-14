"use strict" ;

import { Point } from './graphics/geom/Point.js' ;
import { ParallaxLayer } from './ParallaxLayer.js' ;

/**
 * This class defines a parallax Camera.
 * @name ParallaxCamera
 * @class
 * @memberof molecule.render.pixi.display
 * @extends PIXI.Sprite
 * @constructor
 * @param {PIXI.Renderer} renderer - The renderer of the application.
 * @param {PIXI.Container} container - The renderer of the application.
 * @param {Number} [focalLength=300] - The focal length of the camera.
 * @param {Number} [damping=10] - The movement damping value.
 */
export function ParallaxCamera( renderer, root, focalLength = 300 , damping = 10 )
{
    Object.defineProperties( this ,
    {
        /**
         * The bounds value.
         * @name bounds
         * @memberof molecule.render.pixi.display.ParallaxCamera
         * @instance
         */
        bounds : { writable : true , value : null } ,

        /**
         * The damping value.
         * @name damping
         * @memberof molecule.render.pixi.display.ParallaxCamera
         * @instance
         */
        damping : { writable : true , value : damping } ,

        /**
         * The focalLength value.
         * @name focalLength
         * @memberof molecule.render.pixi.display.ParallaxCamera
         * @instance
         */
        focalLength : { writable : true , value : focalLength } ,

        /**
         * The renderer reference.
         * @name renderer
         * @memberof molecule.render.pixi.display.ParallaxCamera
         * @instance
         */
        renderer : { writable : true , value : renderer } ,

        /**
         * The root reference.
         * @name root
         * @memberof molecule.render.pixi.display.ParallaxCamera
         * @instance
         */
        root : { writable : true , value : root } ,

        /**
         * @private
         */
        _baseZoom      : { writable : true  , value : 1    } ,
        _focus         : { writable : false , value : new Point() } ,
        _layers        : { writable : true  , value : []   } ,
        _shakeEndTime  : { writable : true  , value : 0    } ,
        _shakeStrength : { writable : true  , value : 0    } ,
        _target        : { writable : true  , value : null } ,
        _zoom          : { writable : true  , value : 1    }
    });
}

ParallaxCamera.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ParallaxCamera } ,

    /**
     * The baseZoom component value.
     * @name baseZoom
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     */
    baseZoom :
    {
        enumerable : true , configurable : true ,
        get : function() { return this._baseZoom; } ,
        set : function( value )
        {
            this._baseZoom = value ;
            this.zoom = this.zoom ;
        }
    },

    /**
     * The zoom component value.
     * @name zoom
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     */
    zoom :
    {
        enumerable : true , configurable : true ,
        get : function() { return this._zoom; } ,
        set : function( value )
        {
            this._zoom = value;
            this.root.scale.set( value * this._baseZoom , value * this._baseZoom ) ;
        }
    },

    /**
     * The target component value.
     * @name target
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     */
    target :
    {
        enumerable : true , configurable : true ,
        get : function() { return this._target ; } ,
        set : function(value) { this.setTarget(value) ; }
    },

    /**
     * The y component value.
     * @name y
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     */
    x :
    {
        get : function() { return this._focus.x ; } ,
        set : function( value ) { this._focus.x = value ; } ,
    },

    /**
     * The y component value.
     * @name y
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     */
    y :
    {
        get : function() { return this._focus.y ; } ,
        set : function( value ) { this._focus.y = value ; } ,
    },

    /**
     * Adds a new layer in the camera engine.
     * @name addLayer
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     * @function
     */
    addLayer : { value : function (layer)
    {
        if ( !(layer instanceof ParallaxLayer) )
        {
            throw ReferenceError( this + ' addLayer failed, the layer needs to be a ParallaxLayer reference.');
        }
        if (this._layers.indexOf(layer) === -1)
        {
            this._layers.push(layer);
            this.root.addChild(layer);
            this.zsort();
        }
    }} ,

    /**
     * Dispose the camera.
     * @name dispose
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     * @function
     */
    dispose : { value : function ()
    {
        this._layers = null ;
        this._target = null ;
        if( this.root )
        {
            this.root.removeChildren();
            this.root = null;
        }
    }},

    /**
     * Removes a layer in the camera engine.
     * @name removeLayer
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     * @function
     */
    removeLayer : { value : function (layer)
    {
        if ( !(layer instanceof ParallaxLayer) )
        {
            throw ReferenceError( this + ' removeLayer failed, the layer needs to be a ParallaxLayer reference.');
        }
        let index = this._layers.indexOf(layer);
        if (index !== -1)
        {
            this._layers.splice(index, 1);
        }
        if ( layer.parent === this.root )
        {
            this.root.removeChild( layer );
        }
    }},

    /**
     * Set the target position of the camera.
     * @name setTarget
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     * @function
     */
    setTarget : { value : function( target , reposition = true )
    {
        this._target = target;
        if ( target && (reposition === true) )
        {
            this._focus.x = -target.x;
            this._focus.y = -target.y;
        }
    }},

    /**
     * Shake the camera layers.
     * @name shake
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     * @function
     */
    shake : { value : function (strength, duration = 1 )
    {
        this._shakeStrength = strength ;
        this._shakeEndTime  = Date.now() + duration * 1000;
    }},

    /**
     * Stop the shake effect.
     * @name stopShake
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     * @function
     */
    stopShake : { value : function ()
    {
        this._shakeStrength = 0;
    }},

    /**
     * Update the camera.
     * @name update
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     * @function
     */
    update : { value : function()
    {
        if ( !this.root )
        {
            return;
        }

        let sw = this.renderer.width  * 0.5 ;
        let sh = this.renderer.height * 0.5 ;

        let shakeX = 0;
        let shakeY = 0;

        if( this._target )
        {
            if (this.damping === 0)
            {
                this._focus.x = -this._target.x;
                this._focus.y = -this._target.y;
            }
            else
            {
                this._focus.x += (-this._focus.x - this._target.x) / this.damping ;
                this._focus.y += (-this._focus.y - this._target.y) / this.damping ;
            }
        }

        let shakeStrength = this._shakeStrength;
        if (shakeStrength)
        {
            var t = Date.now();
            if (t > this._shakeEndTime)
            {
                this._shakeStrength = 0;
            }
            else
            {
                shakeX = this.randomFloat(-shakeStrength, shakeStrength);
                shakeY = this.randomFloat(-shakeStrength, shakeStrength);
            }
        }

        let bounds = this.bounds;
        if (bounds)
        {
            let zoom = this.zoom;
            if (this._focus.x <= -(bounds.width) * zoom)
            {
                this._focus.x = -(bounds.width) * zoom;
            }
            else if (this._focus.x >= (-bounds.x) * zoom)
            {
                this._focus.x = (-bounds.x) * zoom;
            }
            if (this._focus.y <= -(bounds.height) * zoom)
            {
                this._focus.y = -(bounds.height) * zoom;
            }
            else if (this._focus.y >= (-bounds.y) * zoom)
            {
                this._focus.y = (-bounds.y) * zoom;
            }
            //
            // console.log( this._focus ) ;
        }

        let n = this._layers.length;
        while (--n > -1)
        {
            let layer = this._layers[n];
            let d = this.focalLength / (this.focalLength - layer.pz);
            layer.x = (layer.px + this._focus.x + shakeX) * d;
            layer.y = (layer.py + this._focus.y + shakeY) * d;
            layer.scale.set(d, d);
        }

        let tx = 0, ty = 0;

        if (this._target)
        {
            let p = this.getParallaxParent( this._target.parent );
            if (p)
            {
                tx = p.x * (1 / p.scale.x) ;
                ty = p.y * (1 / p.scale.y) ;
            }
        }

        this.root.x = this._focus.x - tx + shakeX + sw;
        this.root.y = this._focus.y - ty + shakeY + sh;
    }} ,

    /**
     * Z-sorting the layers in the camera engine.
     * @name zsort
     * @memberof molecule.render.pixi.display.ParallaxCamera
     * @instance
     * @function
     */
    zsort : { value : function ()
    {
        this._layers = this._layers.sort( ( a , b ) => a.pz - b.pz );
        let l = this._layers.length ;
        for ( let i = 0 ; i < l ; ++i )
        {
            this.root.addChildAt( this._layers[i] , i);
        }
    }},

    // ------ private

    /**
     * @private
     */
    getParallaxParent : { value : function (p)
    {
        if( p === null )
        {
            return null;
        }

        if( p instanceof ParallaxLayer )
        {
            return p ;
        }

        return this.getParallaxParent(p.parent);
    }},

    /**
     * @private
     */
    randomFloat : { value : (min, max) => Math.random() * (max - min) + min }
}) ;