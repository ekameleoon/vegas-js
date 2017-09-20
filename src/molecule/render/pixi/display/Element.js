"use strict" ;

import { isString } from './core/isString.js' ;
import { replaceNaN } from './core/maths/replaceNaN.js' ;

import { Direction }   from './graphics/Direction.js' ;
import { EdgeMetrics } from './graphics/geom/EdgeMetrics.js' ;

import { Builder } from '../../../Builder.js' ;
import { Style }   from '../../../Style.js' ;
import { MOB }     from './MOB' ;

/**
 * This class provides a skeletal implementation of all the components, to minimize the effort required to implement this interface.
 * @name Element
 * @class
 * @memberof molecule.render.pixi.display
 * @extends molecule.render.pixi.display.MOB
 * @constructor
 * @param {PIXI.Texture} [texture=null] - The texture for this sprite.
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 * @param {Boolean} [locked=false] - The flag to lock the new current object when is created.
 */
export function Element( texture = null , init = null , locked = false )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _border           : { writable : false , value : new EdgeMetrics() } ,
        _builder          : { writable : true  , value :  null } ,
        _direction        : { writable : true  , value :  null } ,
        _group            : { writable : true  , value : false } ,
        _groupName        : { writable : true  , value :  null } ,
        _invalides        : { writable : false , value :  {}   } ,
        _oldGroupName     : { writable : true  , value :  null } ,
        _padding          : { writable : false , value : new EdgeMetrics() } ,
        _margin           : { writable : false , value : new EdgeMetrics() } ,
        _style            : { writable : true  , value :  null } ,
        _viewStyleChanged : { writable : true  , value :  null }
    });

    ///////////

    this._builder = this.getBuilderRenderer() ;
    if( this._builder instanceof Builder )
    {
        this._builder.target = this ;
        this._builder.run() ;
    }

    ///////////

    this._style = this.getStyleRenderer() ;
    if( this._style instanceof Style )
    {
        this._viewStyleChanged = this.viewStyleChanged.bind( this ) ;
        this._style.changed.connect( this._viewStyleChanged ) ;
    }

    ///////////

    MOB.call( this , texture , init , locked ) ;
}

Object.defineProperties( Element ,
{
    /**
     * The "builder" invalidate type.
     * @name BUILDER
     * @memberof molecule.render.pixi.display.Element
     * @static
     * @type {String}
     * @default "builder"
     */
    BUILDER : { value : "builder" } ,

    /**
     * The "draw" invalidate type.
     * @name DRAW
     * @memberof molecule.render.pixi.display.Element
     * @static
     * @type {String}
     * @default "draw"
     */
    DRAW : { value : "draw" } ,

    /**
     * The "layout" invalidate type.
     * @name LAYOUT
     * @memberof molecule.render.pixi.display.Element
     * @static
     * @type {String}
     * @default "layout"
     */
    LAYOUT : { value : "draw" } ,

    /**
     * The "view_changed" invalidate type.
     * @name VIEW_CHANGED
     * @memberof molecule.render.pixi.display.Element
     * @static
     * @type {String}
     * @default "draw"
     */
    VIEW_CHANGED : { value : "view_changed" }
});

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
        get : function() { return this._border ; },
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
        get : function() { return this._builder ; },
        set : function( builder )
        {
            if (this._builder )
            {
                this._builder.clear() ;
            }

            this._builder = ( builder instanceof Builder ) ? builder : this.getBuilderRenderer() ;

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
        get : function() { return this._direction ; },
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
     * Indicates with a boolean if this object is grouped.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @type {Boolean}
     * @default false
     */
    group :
    {
        get : function() { return this._group ; },
        set : function( value )
        {
            this._group = value === true ;
            this.groupPolicyChanged() ;
        }
    },

    /**
     * Indicates the name of the group of this object.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @type {String}
     */
    groupName :
    {
        get : function() { return this._groupName ; },
        set : function( value )
        {
            this._oldGroupName = this._groupName ;
            this._groupName    = isString(value) ? value : null ;
            this._group        = isString(value) && value.length > 0 ;
            this.groupPolicyChanged() ;
            this._oldGroupName = null ;
        }
    },

    /**
     * Specifies the margin, in pixels around the element.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @see {graphics.geom.EdgeMetrics}
     */
    margin :
    {
        get : function() { return this._margin ; } ,
        set : function( em )
        {
            if( em instanceof EdgeMetrics )
            {
                this._margin.left   = em ? replaceNaN(em.left)   : 0 ;
                this._margin.top    = em ? replaceNaN(em.top)    : 0 ;
                this._margin.right  = em ? replaceNaN(em.right)  : 0 ;
                this._margin.bottom = em ? replaceNaN(em.bottom) : 0 ;
            }
        }
    },

    /**
     * Specifies the thickness, in pixels, of the four edge regions around the element.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @see {graphics.geom.EdgeMetrics}
     */
    padding :
    {
        get : function() { return this._padding ; } ,
        set : function( em )
        {
            if( em instanceof EdgeMetrics )
            {
                this._padding.left   = em ? replaceNaN(em.left)   : 0 ;
                this._padding.top    = em ? replaceNaN(em.top)    : 0 ;
                this._padding.right  = em ? replaceNaN(em.right)  : 0 ;
                this._padding.bottom = em ? replaceNaN(em.bottom) : 0 ;
            }
        }
    },

    /**
     * Defines the {molecule.Style} reference of this instance.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @type {molecule.Style}
     */
    style :
    {
        get : function() { return this._style ; },
        set : function( style )
        {
            if( this._style )
            {
                this._style.changed.disconnect(this._viewStyleChanged) ;
                this._viewStyleChanged = null ;
            }

            this._style = ( style instanceof Style ) ? style : this.getStyleRenderer() ;

            if( this._style instanceof Style )
            {
                this._viewStyleChanged = this.viewStyleChanged.bind( this ) ;
                this._style.changed.connect( this._viewStyleChanged ) ;
            }

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
        return null ; // override and return a Builder instance.
    }},

    /**
     * Returns the {molecule.Style} instance use to initialize this component.
     * @return the {molecule.Style} instance use to initialize this component.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @function
     */
    getStyleRenderer : { writable : true , value : function()
    {
        return null ; // override and returns a Style instance.
    }},

    /**
     * Invoked when the group property or the groupName property changed.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @function
     */
    groupPolicyChanged : { writable : true , value : function()
    {
        // override
    }},

    /**
     * Update the display.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @function
     */
    update : { writable : true , value : function()
    {
        if ( this._locked > 0 )
        {
            return ;
        }

        let cached = this.cacheAsBitmap === true ;

        if( cached )
        {
            this.cacheAsBitmap = false ;
        }

        this.renderer.emit(this) ;

        ////// layout

        if( this._invalides[ Element.LAYOUT ] )
        {
            this._invalides[ Element.LAYOUT ] = undefined ;
        }
        else if( this._layout )
        {
            this._layout.run() ;
        }

        ////// builder

        if ( this._invalides[ Element.BUILDER ] )
        {
            this._invalides[ Element.BUILDER ] = undefined ;
        }
        else if( this._builder )
        {
            this._builder.update() ;
        }

        ////// drawing

        if( this._invalides[ Element.DRAW ] )
        {
            this._invalides[ Element.DRAW ] = undefined ;
        }
        else
        {
            this.draw() ;
        }

        ////// view_changed

        if( this._invalides[ Element.VIEW_CHANGED ] )
        {
            this._invalides[ Element.VIEW_CHANGED ] = undefined ;
        }
        else
        {
            this.viewChanged() ;
        }

        this.altered = false ;

        if( cached )
        {
            this.cacheAsBitmap = true ;
        }

        this.updater.emit(this) ;
    }},

    /**
     * Invoked when the component Style is changed.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @function
     */
    viewStyleChanged : { writable : true , value : function( /* style = null */ )
    {
        this.update() ;
    }},

    /**
     * Invalidates a specific process.
     * @private
     */
    invalidate : { value : function ( type )
    {
        if( isString(type) && type !== "" )
        {
            this._invalides[ type ] = true ;
        }
    }},

    /**
     * Invalidates the builder in the update method of the component.
     * @private
     */
    invalidateBuilder : { value : function()
    {
        this._invalides[ Element.BUILDER ] = true ;
    }},

    /**
     * Invalidates the drawing command in the update method of the component.
     * @private
     */
    invalidateDraw : { value : function()
    {
        this._invalides[ Element.DRAW ] = true ;
    }},

    /**
     * Invalidates the layout in the update method of the component.
     * @private
     */
    invalidateLayout : { value : function()
    {
        this._invalides[ Element.LAYOUT ] = true ;
    }},

    /**
     * Invalidates the viewChanged callback invokation in the update method of the component.
     * @private
     */
    invalidateViewChanged : { value : function()
    {
        this._invalides[ Element.VIEW_CHANGED ] = true ;
    }},

    /**
     * Validates all the commands in the component.
     * @private
     */
    validate : { value : function()
    {
        for( var prop in this._invalides )
        {
            if( prop in this._invalides )
            {
                delete this._invalides[prop] ;
            }
        }
    }}
}) ;
