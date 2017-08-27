/*jshint unused: false*/
"use strict" ;

import { clamp } from './core/maths/clamp.js' ;

import { Builder } from './molecule/Builder.js' ;
import { Direction } from './graphics/Direction.js' ;
import { Position } from './graphics/Position.js' ;
import { Rectangle } from './graphics/geom/Rectangle.js' ;
import { ScrollIndicator } from '../bars/ScrollIndicator.js' ;
import { ScrollPolicy } from './molecule/ScrollPolicy.js' ;

/**
 * The Builder interface.
 * @name ScrollPaneBuilder
 * @memberof molecule.renders.pixi.components.panes
 * @extends molecule.builder
 * @class
 * @constructor
 * @param {Object} [target=null] - The target reference of the builder.
 */
export function ScrollPaneBuilder( target = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _area       : { writable : false , value : new Rectangle() } ,
        _container  : { writable : true  , value : null } ,
        _content    : { writable : true  , value : null } ,
        _hScrollbar : { writable : true  , value : null } ,
        _mask       : { writable : true  , value : null } ,
        _scrolling  : { writable : true  , value : false } ,
        _time       : { writable : true  , value : null  } ,
        _vScrollbar : { writable : true  , value : null }
    }) ;
    Builder.call( this , target ) ;
}

ScrollPaneBuilder.prototype = Object.create( Builder.prototype ,
{
    constructor : { writable : true , value : ScrollPaneBuilder } ,

    /**
     * Returns the horizontal scrollbar display reference.
     * @name hScrollbar
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @instance
     * @readonly
     */
    hScrollbar : { get : function() { return this._hScrollbar ; } } ,

    /**
     * Indicates if the scroll occurs.
     * @name scrolling
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @default false
     * @instance
     * @type boolean
     */
    scrolling : { get : function() { return this._scrolling } },

    /**
     * Determinates the target reference of the component or custom display container to build.
     * @name target
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @default null
     * @instance
     */
    target :
    {
        get : function() { return this._target }  ,
        set : function( value ) { this._target = value ; }
    },

    /**
     * Returns the vertical scrollbar display reference.
     * @name vScrollbar
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @instance
     * @readonly
     */
    vScrollbar : { get : function() { return this._vScrollbar ; } } ,

    /**
     * Clear the view of the component.
     * @name clear
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @instance
     * @function
     */
    clear : { writable : true , value : function()
    {
        if( !this._area.isEmpty() )
        {
            this._area.setTo() ;
        }

        this.initializeContent(null) ;

        if( this._container )
        {
            this._container.mask = null ;
            this._container = null ;
        }

        let comp = this._target ;
        if( comp )
        {
            comp.lock() ;
            if( this._hScrollbar )
            {
                if( comp.contains( this._hScrollbar ) )
                {
                    comp.removeChild( this._hScrollbar ) ;
                }
                this._hScrollbar = null ;
            }

            if( this._vScrollbar )
            {
                if( this._target.contains( this._vScrollbar ) )
                {
                    this._target.removeChild( this._vScrollbar ) ;
                }
                this._vScrollbar = null ;
            }

            if( comp.content )
            {
                comp.content = null ;
            }

            comp.unlock() ;
        }
    }},

    /**
     * Initialize the content reference.
     */
    initializeContent : { value : function( display = null )
    {
        let comp = this._target ;

        if( !comp || !this._container )
        {
            return null ;
        }

        if( this._content )
        {
            if( comp.contains( this._container ) )
            {
                comp.removeChild( this._container ) ;
            }
            if( this._container.contains( this._content ) )
            {
                this._container.removeChild( this._content ) ;
            }
            comp._content = null ;
        }

        this._content = display ;

        if( this._content )
        {
            comp.addChildAt( this._container , 0 ) ;
            this._container.addChild( this._content ) ;
        }

        return this._content ;
    }},

    /**
     * Run the process
     * @name run
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @instance
     * @function
     */
    run : { writable : true , value : function()
    {
        this._container  = new PIXI.Container() ;
        this._mask       = new PIXI.Graphics() ;

        this._hScrollbar = new ScrollIndicator();
        this._vScrollbar = new ScrollIndicator();

        this._hScrollbar.direction = Direction.HORIZONTAL ;
        this._vScrollbar.direction = Direction.VERTICAL ;
    }},

    /**
     * Scroll the content.
     * @name scroll
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @instance
     * @function
     */
    scroll : { value : function()
    {
        this.scrollStart() ;
        this.scrollChange() ;
        this.scrollFinish() ;
    }},

    /**
     * Invoked when the scroll is changing.
     * @name scrollChange
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @instance
     * @function
     */
    scrollChange : { value : function( x = null , y = null )
    {
        let comp = this._target ;
        if( comp )
        {
            let content  = comp._content ;
            let scroller = comp._scroller ;
            let style    = comp._style ;

            if( x !== null && !isNaN(x) )
            {
                scroller.x = x ;
            }

            if( y !== null &&!isNaN(y) )
            {
                scroller.y = y ;
            }

            scroller.x = Math.max( Math.min( scroller.x, comp.maxScrollH ), 0 ) ;
            scroller.y = Math.max( Math.min( scroller.y, comp.maxScrollV ), 0 ) ;

            if( content )
            {
                if ( style.isHorizontal() )
                {
                    content.x = -scroller.x ;
                }
                else if ( style.position === Position.STATIC )
                {
                    content.x = 0 ;
                }

                if ( style.isVertical() )
                {
                    content.y = -scroller.y ;
                }
                else if ( style.position === Position.STATIC )
                {
                    content.y = 0 ;
                }
            }

            this.updateScrollbars() ;

            comp.notifyScroll() ;
        }
    }},

    /**
     * Invoked when the scroll is finished.
     * @name scrollFinish
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @instance
     * @function
     */
    scrollFinish : { value : function()
    {
        if( this._scrolling )
        {
            this._scrolling = false ;
            if( this._target )
            {
                this._target.notifyScrollFinished() ;
            }
        }
    }},

    /**
     * Invoked when the scroll is started.
     * @name scrollStart
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @instance
     * @function
     */
    scrollStart : { value : function()
    {
        if( this._scrolling )
        {
            this._scrolling = false ;
            if( this._target )
            {
                this._target.notifyScrollStarted() ;
            }
        }
    }},

    /**
     * Updates the view of the component.
     * @name update
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneBuilder
     * @instance
     * @function
     */
    update : { writable : true , value : function()
    {
        let comp = this._target ;
        let style = comp.style ;

        if( comp && comp.w > 0 && comp.h > 0 )
        {
            /////////

            comp.buttonMode = style.useHandCursor ;

            /////////

            let content = comp._content ;
            let manager = comp._manager ;
            let padding = style.padding ;

            let $w = comp.w ;
            let $h = comp.h ;

            /////////

            this._area.x      = 0 ;
            this._area.y      = 0 ;
            this._area.width  = $w - padding.horizontal ;
            this._area.height = $h - padding.vertical   ;

            /////////

            if( this._container )
            {
                this._container.x = padding.left ;
                this._container.y = padding.top ;

                if( style.useScrollRect )
                {
                    this._mask.clear() ;
                    this._mask.beginFill(0);
                    this._mask.drawRect(padding.x,padding.y,this._area.width,this._area.height) ;
                    this._mask.endFill() ;
                    comp.addChild( this._mask ) ;
                    this._container.mask = this._mask ;
                }
                else if( this._mask )
                {
                    this._container.mask = null ;
                    comp.removeChild( this._mask ) ;
                }
            }

            ////////

            if( manager )
            {
                manager.stop() ;

                manager.horizontalStrength = style.horizontalStrength ;
                manager.verticalStrength   = style.verticalStrength ;
                manager.scrollDuration     = style.scrollDuration ;
                manager.scrollEasing       = style.scrollEasing ;
                manager.scrollRatio        = style.scrollRatio ;
                manager.smoothing          = style.smoothing ;
            }

            ////////

            this.hideScrollbar() ;

            this._hScrollbar.lock() ;

            this._hScrollbar.w = $w - 2 * style.hScrollBarOffset - style.vScrollBarSize - style.vScrollBarOffset ;
            this._hScrollbar.h = style.hScrollBarSize ;

            this._hScrollbar.style = style.hScrollBarStyle ;

            if( content )
            {
                this._hScrollbar.thumbSize = clamp( $w / content.width * this._hScrollbar.w , style.scrollDragMinSize , style.scrollDragMaxSize ) ;
            }
            else
            {
                this._hScrollbar.thumbSize = this._hScrollbar.w ;
            }

            this._hScrollbar.x = style.hScrollBarOffset ;
            this._hScrollbar.y = style.hScrollbarOnTop ? style.hScrollBarOffset : ($h - this._hScrollbar.h - style.hScrollBarOffset) ;

            if( style.vScrollbarOnLeft )
            {
                this._hScrollbar.x += style.vScrollBarSize + style.vScrollBarOffset ;
            }

            this._hScrollbar.unlock() ;

            ////////

            this._vScrollbar.lock() ;

            this._vScrollbar.w = style.vScrollBarSize ;
            this._vScrollbar.h = $h - 2 * style.vScrollBarOffset - style.hScrollBarSize - style.hScrollBarOffset ;

            this._vScrollbar.style = style.vScrollBarStyle ;

            if( content )
            {
                this._vScrollbar.thumbSize = clamp( $h / content.height * this._vScrollbar.h , style.scrollDragMinSize , style.scrollDragMaxSize ) ;
            }
            else
            {
                this._vScrollbar.thumbSize = this._vScrollbar.h ;
            }

            this._vScrollbar.x = style.vScrollbarOnLeft ? style.vScrollBarOffset + padding.left : ($w - this._vScrollbar.w - style.vScrollBarOffset) ;
            this._vScrollbar.y = style.vScrollBarOffset + padding.top ;
            if( style.hScrollbarOnTop )
            {
                this._vScrollbar.y += style.hScrollBarSize ;
            }

            this._vScrollbar.unlock() ;

            ////////

            this._hScrollbar.update() ;
            this._vScrollbar.update() ;

            ////////

            let scroller = comp._scroller ;

            if( style.maintainPosition )
            {
                scroller.x = ( scroller.x >= comp.maxScrollH ) ? comp.maxScrollH : scroller.x ;
                scroller.y = ( scroller.y >= comp.maxScrollV ) ? comp.maxScrollV : scroller.y ;
            }
            else
            {
                scroller.x = 0 ;
                scroller.y = 0 ;
            }

            if( content )
            {
                if ( style.isHorizontal() )
                {
                    content.x = -scroller.x ;
                }
                else if ( style.position === Position.STATIC )
                {
                    content.x = 0 ;
                }

                if ( style.isVertical() )
                {
                    content.y = -scroller.y ;
                }
                else if ( style.position === Position.STATIC )
                {
                    content.y = 0 ;
                }
            }
        }
        else if( !this._area.isEmpty() )
        {
            this._area.setTo() ;
        }
    }},

    /**
     * @private
     */
    hideScrollbar : { value : function()
    {
        let comp = this._target ;
        if( comp )
        {
            let style = comp.style;

            let hPolicy = style.hScrollbarPolicy ;
            let vPolicy = style.vScrollbarPolicy ;

            if( (vPolicy === ScrollPolicy.OFF || vPolicy === ScrollPolicy.AUTO) && comp.contains( this._vScrollbar ) )
            {
                 comp.removeChild( this._vScrollbar ) ;
            }

            if( (hPolicy === ScrollPolicy.OFF || hPolicy === ScrollPolicy.AUTO) && comp.contains( this._hScrollbar ) )
            {
                comp.removeChild( this._hScrollbar ) ;
            }
        }
    }},

    /**
     * @private
     */
    updateScrollbars : { value : function()
    {
        clearTimeout( this._time ) ;
        let comp = this._target ;
        if( comp )
        {
            let style = comp._style ;
            if( style )
            {
                let hPolicy = style._hScrollbarPolicy ;
                let vPolicy = style._vScrollbarPolicy ;

                let hFlag = (hPolicy === ScrollPolicy.ON) || ( style.isHorizontal() && hPolicy === ScrollPolicy.AUTO && comp.maxScrollH > 0 ) ;
                let vFlag = (vPolicy === ScrollPolicy.ON) || ( style.isVertical() && vPolicy === ScrollPolicy.AUTO && comp.maxScrollV > 0 ) ;

                if( hFlag )
                {
                    this._hScrollbar.maximum  = comp.maxScrollH ;
                    this._hScrollbar.position = comp._scroller.x ;
                    if( !comp.contains( this._hScrollbar ) )
                    {
                        comp.addChild( this._hScrollbar ) ;
                    }
                }
                else if( comp.contains( this._hScrollbar ) )
                {
                    comp.removeChild( this._hScrollbar ) ;
                }

                if( vFlag )
                {
                    this._vScrollbar.maximum  = comp.maxScrollV ;
                    this._vScrollbar.position = comp._scroller.y ;
                    if( !comp.contains(this._vScrollbar) )
                    {
                        comp.addChild( this._vScrollbar ) ;
                    }
                }
                else if( comp.contains( this._vScrollbar ) )
                {
                     comp.removeChild( this._vScrollbar ) ;
                }

                if( (vPolicy === ScrollPolicy.AUTO || hPolicy === ScrollPolicy.AUTO) &&
                    ( comp.contains( this._hScrollbar ) || comp.contains( this._vScrollbar ) ) )
                {
                    this._time = setTimeout( this.hideScrollbar.bind(this) , style.scrollBarDelay ) ;
                }
            }
        }
    }}
});