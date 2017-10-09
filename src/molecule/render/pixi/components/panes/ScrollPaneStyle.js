/*jshint unused: false*/
"use strict" ;

import { expoOut } from './core/easings/expoOut.js' ;
import { replaceNaN } from './core/maths/replaceNaN.js' ;

import { Direction } from './graphics/Direction.js' ;
import { EdgeMetrics } from './graphics/geom/EdgeMetrics.js' ;
import { Position } from './graphics/Position.js' ;

import { ScrollPolicy } from './molecule/ScrollPolicy.js' ;
import { Style } from './molecule/Style.js' ;

/**
 * The Style interface defines a setting object in all component elements.
 * @name ScrollPaneStyle
 * @memberof molecule.render.pixi.components.panes
 * @extends molecule.Style
 * @class
 * @constructs
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function ScrollPaneStyle( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The horizontal strength ratio.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default 1
         */
        horizontalStrength : { writable : true , value : 1 } ,

        /**
         * Indicates the x or y postion of the horizontal scrollbar, in pixels.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @type number
         * @default 4
         */
        hScrollBarOffset : { writable : true , value : 4 } ,

        /**
         * Whether the horizontal scrollbar should appear on the left hand side of the panes content.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @type boolean
         * @default false
         */
        hScrollbarOnTop : { writable : true , value : false } ,

        /**
         * Whether you want the contents of the scroll pane to maintain it's position when you re-initialise it - so it doesn't scroll as you add more content.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @type boolean
         * @default true
         */
        maintainPosition : { writable : true , value : true } ,

        /**
         * Indicates the size of the horizontal scrollbar.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @type number
         * @default 4
         */
        hScrollBarSize : { writable : true , value : 4 } ,

        /**
         * The delay to see the scrollbars when the scroll of the component is changed (in milliseconds).
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @type number
         * @default 500
         */
        scrollBarDelay : { writable : true , value : 500 } ,

        /**
         * The minimum size to allow the drag bars to be (default to 20 px).
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default 20
         * @type number
         */
        scrollDragMinSize : { writable : true , value : 20 } ,

        /**
         * The maximum size to allow the drag bars to be (default to 999999).
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default 99999
         * @type number
         */
        scrollDragMaxSize : { writable : true , value : 99999 } ,

        /**
         * Indicates the scroll duration when the scroll is smoothing.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default 24
         * @type number
         */
        scrollDuration : { writable : true , value : 24 } ,

        /**
         * Indicates the scroll easing function when the scroll is smoothing.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default {core.expoOut}
         * @type Function
         */
        scrollEasing : { writable : true , value : expoOut } ,

        /**
         * Indicates how many pixels constitutes a touch to scroll the content with the finger or the mouse.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default 20
         * @type number
         */
        scrollRatio : { writable : true , value : 20 } ,

        /**
         * Controls whether or not the scrolling is smoothed when scaled.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default true
         * @type boolean
         */
        smoothing : { writable : true , value : true } ,

        /**
         * Indicates if the scrollpane use a mouse cursor when the mouse is down.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default false
         * @type boolean
         */
        useHandCursor : { writable : true , value : false } ,

        /**
         * Indicates if the scrollpane use natural scrolling or reverse scrolling (by default is natural).
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default true
         * @type boolean
         */
        useNaturalScrolling : { writable : true , value : true } ,

        /**
         * Indicates if the scrollpane use the scrollRect property to mask the elements out of the visible area.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default true
         * @type boolean
         */
        useScrollRect : { writable : true , value : true } ,

        /**
         * The vertical strength ratio.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @type number
         * @default 1
         */
        verticalStrength : { writable : true , value : 1 } ,

        /**
         * Gets or sets the x or y postion of the scrollbar, in pixels.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default 4
         * @type number
         */
        vScrollBarOffset : { writable : true , value : 4 } ,

        /**
         * Whether the vertical scrollbar should appear on the left hand side of the panes content.
         * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
         * @instance
         * @default false
         * @type boolean
         */
        vScrollbarOnLeft : { writable : true , value : false } ,

        /**
         * Indicates the size of the vertical scrollbar.
         */
        vScrollBarSize : { writable : true , value : 4 } ,

        /**
         * @private
         */
        _hScrollbarPolicy  : { writable : true  , value : ScrollPolicy.AUTO } ,
        _padding           : { writable : false , value : new EdgeMetrics() } ,
        _position          : { writable : true  , value : Position.STATIC } ,
        _positions         : { writable : false , value : [ Position.FIXED , Position.STATIC ] } , // Position.ABSOLUTE and Position.RELATIVE are not supported yet.
        _scrollDirection   : { writable : true  , value : Direction.VERTICAL } ,
        _scrollDirections  : { writable : false , value : [ Direction.VERTICAL , Direction.HORIZONTAL , Direction.BOTH , Direction.NONE ] },
        _vScrollbarPolicy  : { writable : true  , value : ScrollPolicy.AUTO }
    }) ;

    Style.call( this , init ) ;
}

ScrollPaneStyle.prototype = Object.create( Style.prototype ,
{
    constructor : { writable : true , value : ScrollPaneStyle } ,

    /**
     * Defines the policy of the horizontal scrollbar : "auto" (default), "on", "off".
     * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
     * @instance
     * @see {molecule.ScrollPolicy}
     */
    hScrollbarPolicy :
    {
        get : function() { return this._hScrollbarPolicy ; } ,
        set : function( value )
        {
            this._hScrollbarPolicy = ( value === ScrollPolicy.OFF || value === ScrollPolicy.ON ) ? value : ScrollPolicy.AUTO ;
        }
    },

    /**
     * Specifies the thickness, in pixels, of the four edge regions around the element.
     * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
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
     * Defines what the position of the content should be.
     * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
     * @instance
     */
    position :
    {
        get : function() { return this._position ; } ,
        set : function( value )
        {
            this._position = this._positions.indexOf(value) > -1 ? value : Position.STATIC ;
        }
    },

    /**
     * Sets a String representing the scroll direction of the scroll pane.
     * <p>This property value can be :</p>
     * <ul>
     * <li>Direction.NONE (no scroll),</li>
     * <li>Direction.VERTICAL (only vertical scroll,</li>
     * <li>Direction.HORIZONTAL (only horizontal scroll),</li>
     * <li>Direction.BOTH (horizontal and vertical scrolling)</li>
     * </ul>
     * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
     * @instance
     * @see {graphics.Direction}
     */
    scrollDirection :
    {
        get : function() { return this._scrollDirection ; } ,
        set : function( value )
        {
            this._scrollDirection = this._scrollDirections.indexOf(value) > -1 ? value : Direction.NONE ;
        }
    },

    /**
     * Defines the policy of the vertical scrollbar : "auto" (default), "on", "off".
     * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
     * @instance
     * @see {molecule.ScrollPolicy}
     */
    vScrollbarPolicy :
    {
        get : function() { return this._vScrollbarPolicy ; } ,
        set : function( value )
        {
            this._vScrollbarPolicy = ( value === ScrollPolicy.OFF || value === ScrollPolicy.ON ) ? value : ScrollPolicy.AUTO ;
        }
    },

    /**
     * Indicates if the scroll can be horizontal.
     * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
     * @instance
     * @function
     */
    isHorizontal : { value : function()
    {
        return this._scrollDirection === Direction.BOTH || this._scrollDirection === Direction.HORIZONTAL ;
    }},

    /**
     * Indicates if the scroll can be vertical.
     * @memberof molecule.render.pixi.components.panes.ScrollPaneStyle
     * @instance
     * @function
     */
    isVertical : { value : function()
    {
        return this._scrollDirection === Direction.BOTH || this._scrollDirection === Direction.VERTICAL ;
    }}
});