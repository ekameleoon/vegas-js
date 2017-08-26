/*jshint unused: false*/
"use strict" ;

import { Element } from '../../display/Element.js' ;
import { Point }   from './graphics/geom/Point.js' ;
import { Signal }  from './system/signals/Signal.js' ;

import { ScrollPaneBuilder } from './ScrollPaneBuilder.js' ;
import { ScrollPaneManager } from './ScrollPaneManager.js' ;
import { ScrollPaneStyle } from './ScrollPaneStyle.js' ;

/**
 * The scrollpane component.
 * @name ScrollPane
 * @memberof molecule.render.pixi.components.panes
 * @extends molecule.render.pixi.display.Element
 * @class
 * @constructor
 * @param {PIXI.Texture} [texture=null] - The texture for this sprite.
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 * @param {Boolean} [locked=false] - The flag to lock the new current object when is created.
 * @version 1.0.8
 * @since 1.0.8
 */
export function ScrollPane( init = null , locked = false )
{
    Object.defineProperties( this ,
    {
        /**
         * Emits when scrolling is finished.
         * @memberof molecule.render.pixi.components.panes.ScrollPane
         * @type {system.signals.Signal}
         * @instance
         */
        scroll : { writable : true , value : new Signal() } ,

        /**
         * Emits when scrolling is finished.
         * @memberof molecule.render.pixi.components.panes.ScrollPane
         * @type {system.signals.Signal}
         * @instance
         */
        scrollFinished : { writable : true , value : new Signal() } ,

        /**
         * Emits when scrolling is started.
         * @memberof molecule.render.pixi.components.panes.ScrollPane
         * @type {system.signals.Signal}
         * @instance
         */
        scrollStarted : { writable : true , value : new Signal() } ,

        /**
         * @private
         */
        _content  : { writable : true  , value : null } ,
        _manager  : { writable : false , value : new ScrollPaneManager() } ,
        _scroller : { writable : false , value : new Point() }
    }) ;

    this._manager.target = this ;

    Element.call( this , null , init , locked ) ;
}

ScrollPane.prototype = Object.create( Element.prototype ,
{
    constructor : { writable : true , value : ScrollPane } ,

    /**
     * Determinates the ScrollPane content view as a {molecule.render.pixi.display.MOB|MOB}.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @type {molecule.render.pixi.display.MOB}
     * @instance
     */
    content :
    {
        get : function() { return this._content } ,
        set : function( display )
        {
            this._content = this._builder.initializeContent( display ) ;
            if( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * Returns the horizontal scrollbar display reference.
     * @name hScrollbar
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @instance
     * @readonly
     */
    hScrollbar : { get : function() { return this._builder._hScrollbar ; } } ,

    /**
     * The maximum horizontal scroll position.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @readonly
     * @instance
     */
    maxScrollH : { get : function()
    {
        if( this._content )
        {
            return Math.max( this._content.getBounds(null).width * this._content.scale.x + this._style.padding.horizontal - this.w , 0 ) ;
        }
        else
        {
            return 0 ;
        }
    }},

    /**
     * The maximum vertical scroll position.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @readonly
     * @instance
     */
    maxScrollV : { get : function()
    {
        if( this._content )
        {
            return Math.max( this._content.getBounds(null).height * this._content.scale.y + this._style.padding.vertical - this.h , 0 ) ;
        }
        else
        {
            return 0 ;
        }
    }},

    /**
     * Indicates the position of the content item given a pixel value.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @type {graphics.geom.Point}
     * @instance
     */
    position :
    {
        get : function() { return this._scroller } ,
        set : function( position )
        {
            this._scroller.x = position.x ;
            this._scroller.y = position.y ;
            if( this._builder )
            {
                this._builder.scroll() ;
            }
        }
    },

    /**
     * The current horizontal scrolling position. Sets the x position of the content item given a pixel value.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @type {number}
     * @instance
     */
    scrollH :
    {
        get : function() { return this._scroller.x } ,
        set : function( value )
        {
            this._scroller.x = value ;
            if( this._builder )
            {
                this._builder.scroll() ;
            }
        }
    },

    /**
     * The current vertical scrolling position. Sets the y position of the content item given a pixel value.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @type {number}
     * @instance
     */
    scrollV :
    {
        get : function() { return this._scroller.y } ,
        set : function( value )
        {
            this._scroller.y = value ;
            if( this._builder )
            {
                this._builder.scroll() ;
            }
        }
    },

    /**
     * Indicates if the component is touching.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @type {boolean}
     * @instance
     * @readonly
     */
    touching : { get : function() { return this._manager.touching ; } },

    /**
     * Returns the vertical scrollbar display reference.
     * @name vScrollbar
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @instance
     * @readonly
     */
    vScrollbar : { get : function() { return this._builder._vScrollbar ; } } ,

    /**
     * Returns the {molecule.Builder} instance use to initialize this component.
     * @return the {molecule.Builder} instance use to initialize this component.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @instance
     * @function
     */
    getBuilderRenderer : { writable : true , value : function()
    {
        return new ScrollPaneBuilder( this ) ;
    }},

    /**
     * Returns the {molecule.Style} instance use to initialize this component.
     * @return the {molecule.Style} instance use to initialize this component.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @instance
     * @function
     */
    getStyleRenderer : { writable : true , value : function()
    {
        return new ScrollPaneStyle() ;
    }},

    /**
     * Notify a message when the scroll is changing.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @instance
     * @function
     */
    notifyScroll : { writable : true , value : function()
    {
        if( this._locked === 0 && this.scroll.connected() )
        {
            this.scroll.emit( this ) ;
        }
    }},

    /**
     * Notify a message when the scroll is finished.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @instance
     * @function
     */
    notifyScrollFinished : { writable : true , value : function()
    {
        if( this._locked === 0 && this.scrollFinished.connected() )
        {
            this.scrollFinished.emit( this ) ;
        }
    }},

    /**
     * Notify a message when the scroll is started.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @instance
     * @function
     */
    notifyScrollStarted : { writable : true , value : function()
    {
        if( this._locked === 0 && this.scrollStarted.connected() )
        {
            this.scrollStarted.emit( this ) ;
        }
    }},

    /**
     * Sets the position of the progress bar.
     * @memberof molecule.render.pixi.components.panes.ScrollPane
     * @method
     * @param {number} value - the position value of the progress bar.
     * @param {boolean} [noEvent=false] - This flag disabled the events of this method if this argument is <code>true</code>
     * @param {boolean} [flag=false] -An optional boolean flag use in the method.
     */
    setPosition : { value : function( x , y )
    {
        this._scroller.x = x ;
        this._scroller.y = y ;
        if( this._locked === 0 && this._builder )
        {
            this._builder.scroll() ;
        }
    }}
});