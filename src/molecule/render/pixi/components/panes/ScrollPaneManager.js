/*jshint unused: false*/
"use strict" ;

import { dump } from './core/dump.js' ;

import { expoOut } from './core/easings/expoOut.js' ;
import { supportsPointerEvents } from './molecule/render/dom/events/supportsPointerEvents.js' ;
import { supportsTouchEvents } from './molecule/render/dom/events/supportsTouchEvents.js' ;

import { InteractiveMode } from './molecule/InteractiveMode.js' ;
import { MOB } from './molecule/render/pixi/display/MOB.js' ;
import { Point } from './graphics/geom/Point.js' ;
import { ScrollPane } from './ScrollPane.js' ;
import { Tween } from './system/transitions/Tween.js' ;

/**
 * The Builder interface.
 * @name ScrollPaneManager
 * @memberof molecule.renders.pixi.components.panes
 * @class
 * @constructor
 * @param {Object} [target=null] - The target reference of the manager.
 */
export function ScrollPaneManager( target = null )
{
    Object.defineProperties( this ,
    {
        /**
         * Indicates how many pixels constitutes a touch to scroll the content with the finger or the mouse (minimum and default 10px).
         * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
         * @instance
         * @type number
         * @default 10
         */
        scrollRatio : { writable : true , value : 10 } ,

        /**
         * @private
         */
        _currentX            : { writable : true  , value : 0 } ,
        _currentY            : { writable : true  , value : 0 } ,
        _diffX               : { writable : true  , value : 0 } ,
        _diffY               : { writable : true  , value : 0 } ,
        _horizontalStrength  : { writable : true  , value : 1 } ,
        _inertiaX            : { writable : true  , value : 0 } ,
        _inertiaY            : { writable : true  , value : 0 } ,
        _isDown              : { writable : true  , value : false } ,
        _lastX               : { writable : true  , value : 0 } ,
        _lastY               : { writable : true  , value : 0 } ,
        _pos                 : { writable : false , value : new Point() } ,
        _startH              : { writable : true  , value : 0 } ,
        _startV              : { writable : true  , value : 0 } ,
        _startX              : { writable : true  , value : 0 } ,
        _startY              : { writable : true  , value : 0 } ,
        _smoothing           : { writable : true  , value : true } ,
        _target              : { writable : true  , value : null } ,
        _touching            : { writable : true  , value : false } ,
        _tween               : { writable : false , value : new Tween( { easing : expoOut , duration : 24 } ) } ,
        _useNaturalScrolling : { writable : true  , value : true } ,
        _verticalStrength    : { writable : true  , value : 1 }
    }) ;

    ///////

    this._tween.changeIt.connect( this.scrollChange ) ;
    this._tween.finishIt.connect( this.scrollFinish ) ;
    this._tween.stopIt.connect( this.scrollFinish ) ;

    ///////

    this.target = target ;
}

ScrollPaneManager.prototype = Object.create( Object.prototype ,
{
    // ------------

    constructor : { writable : true , value : ScrollPaneManager } ,

    // ------------

    /**
     * The horizontal strength ratio.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type number
     * @default 1
     */
    horizontalStrength :
    {
        get : function() { return this._horizontalStrength } ,
        set : function( value ) { this._horizontalStrength = value; }
    },

    /**
     * Indicates the scroll duration when the scroll is smoothing.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type number
     */
    scrollDuration :
    {
        get : function() { return this._tween.duration ; } ,
        set : function( value ) { this._tween.duration = value ; }
    },

    /**
     * Indicates the scroll easing function when the scroll is smoothing.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type Function
     * @see {core.easings}
     */
    scrollEasing :
    {
        get : function() { return this._tween.easing ; } ,
        set : function( value )
        {
            this._tween.easing = value instanceof Function ? value : expoOut ;
        }
    },

    /**
     * Controls whether or not the scrolling is smoothed when scaled.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type boolean
     */
    smoothing :
    {
        get : function() { return this._smoothing ; } ,
        set : function( value )
        {
            if( this._smoothing === value )
            {
                return ;
            }
            this._smoothing = value === true ;
            if( !this._smoothing )
            {
                this.stop() ;
            }
        }
    },

    /**
     * Determinates the target reference of the component or custom display container to build.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     */
    target :
    {
        get : function() { return this._target ; } ,
        set : function( target )
        {
            if( this._target )
            {
                this.unregisterTarget() ;
            }
            this._target = target instanceof ScrollPane ? target : null ;
            if( this._target )
            {
                this.registerTarget() ;
            }
        }
    },

    /**
     * Indicates if the target is touching.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type boolean
     * @default false
     */
    touching : { value : function() { return this._touching ; } } ,

    /**
     * The vertical strength ratio.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @type number
     * @default 1
     */
    verticalStrength :
    {
        get : function() { return this._verticalStrength } ,
        set : function( value ) { this._verticalStrength = value; }
    },

    // ------------

    /**
     * Stop the smoothing scroll.
     * @memberof molecule.renders.pixi.components.panes.ScrollPaneManager
     * @instance
     * @function
     */
    stop : { value : function()
    {
        if( this._tween.running )
        {
            this._tween.stop() ;
        }
        this._touching = false ;
        this._inertiaX = this._inertiaY = 0 ;
        this._diffX    = this._diffY = 0 ;
        this._lastX    = this._lastY = 0 ;
    }},

    // ------------

    /**
     * Determines whether the specified point is contained within the bounds of the tap target.
     * @private
     */
    contains : { value : function( x, y )
    {
        const bounds = (this._target instanceof MOB) ? this._target.fixArea() : this._target.getBounds() ;
        return ( x >= bounds.x && x <= bounds.x + bounds.width ) && ( y >= bounds.y && y <= bounds.y + bounds.height );
    }},

    /**
     * @private
     */
    registerTarget : { value : function()
    {
        let target = this._target ;
        if( target )
        {
            target.interactive = true ;

            if( supportsPointerEvents && (target._interactiveMode === InteractiveMode.AUTO || target._interactiveMode === InteractiveMode.POINTER ) )
            {
                target.pointerdown = this.____down.bind(this) ;
                target.pointermove = this.____move.bind(this) ;
                target.pointerup = target.pointeroutside = this.____up.bind(this) ;
            }
            else if( (target._interactiveMode === InteractiveMode.AUTO || target._interactiveMode === InteractiveMode.MOUSE ) )
            {
                target.mousedown = this.____down.bind(this) ;
                target.mousemove = this.____move.bind(this) ;
                target.mouseup = target.mouseupoutside = this.____up.bind(this) ;
            }
            if( supportsTouchEvents && (target._interactiveMode === InteractiveMode.AUTO || target._interactiveMode === InteractiveMode.TOUCH) )
            {
                target.touchstart = this.____down.bind(this) ;
                target.touchmove = this.____move.bind(this) ;
                target.touchend = target.touchendoutside = this.____up.bind(this) ;
            }
        }
    }},

    /**
     * @private
     */
    unregisterTarget : { value : function()
    {
        let target = this._target ;
        if( target )
        {
            target.interactive = false ;
            target.mousedown = target.mousemove = target.mouseup = target.mouseupoutside = null ;
            target.pointerdown = target.pointermove = target.pointerup = target.pointeroutside = null ;
            target.touchstart = target.touchmove = target.touchendoutside = target.touchendoutside = null ;
        }
    }},

    /**
     * Invoked when the scroll with the tween change.
     * @private
     */
    scrollChange : { value : function( action )
    {
        if( this._target && this._target._builder )
        {
            this._target._builder.scrollChange() ;
        }
    }},

    /**
     * Invoked when the scroll with the tween is finished.
     * @private
     */
    scrollFinish : { value : function( action )
    {
        this._inertiaX = 0 ;
        this._inertiaY = 0 ;
        if( this._target && this._target._builder )
        {
            this._target._builder.scrollFinish() ;
        }
    }},

    // ----- behaviors

    /**
     * @private
     */
    ____down : { value : function( event )
    {
        this._isDown = true ;

        if( !this._target || !this._target.enabled )
        {
            return ;
        }

        // TODO can use a property to register the position and not create a new Point
        let pos = event.data.getLocalPosition( this._target ) ;

        this._pos.x = pos.x ;
        this._pos.y = pos.y ;

        this._touching = false ;
        this._inertiaX = 0 ;
        this._inertiaY = 0 ;

        if( this._tween.running )
        {
            this._tween.stop() ;
        }

        if( this._target  )
        {
            if( this.contains( this._pos.x , this._pos.y ) )
            {
                this._startH = this._target._scroller.x ;
                this._startV = this._target._scroller.y ;

                this._lastX = this._startX = this._pos.x ;
                this._lastY = this._startY = this._pos.y ;

                if( this._target._builder )
                {
                    this._target._builder.scrollStart() ;
                }

                this._useNaturalScrolling = this._target._style.useNaturalScrolling ;
            }
        }
    }},

    /**
     * @private
     */
    ____move : { value : function( event )
    {
        if( !this._isDown || !this._target || !this._target.enabled )
        {
            return ;
        }

        let pos = event.data.getLocalPosition( this._target ) ; // TODO can use a property to register the position and not create a new Point

        this._pos.x = pos.x ;
        this._pos.y = pos.y ;

        if( this._target && this.contains( this._pos.x , this._pos.y ) )
        {
            this._currentX = this._pos.x - this._startX ;
            this._currentY = this._pos.y - this._startY ;

            this._touching = (Math.abs(this._currentX) > this.scrollRatio) || (Math.abs(this._currentY) > this.scrollRatio) ;

            if( this._touching )
            {
                this._diffX = this._useNaturalScrolling ? (this._lastX - this._pos.x) : (this._pos.x - this._lastX) ;
                this._lastX = this._pos.x ;

                this._diffY = this._useNaturalScrolling ? (this._lastY - this._pos.y) : (this._pos.y - this._lastY) ;
                this._lastY = this._pos.y ;

                this._currentX = this._useNaturalScrolling ? this._startH - this._currentX : this._startH + this._currentX ;
                this._currentY = this._useNaturalScrolling ? this._startV - this._currentY : this._startV + this._currentY ;

                if( this._target._builder )
                {
                    this._target._builder.scrollChange( this._currentX , this._currentY ) ;
                }
            }
        }
    }},

    /**
     * @private
     */
    ____up : { value : function( event )
    {
        this._isDown = false ;

        if( !this._target || !this._target.enabled )
        {
            return ;
        }

        // TODO can use a property to register the position and not create a new Point
        let pos = event.data.getLocalPosition( this._target ) ;

        this._pos.x = pos.x ;
        this._pos.y = pos.y ;

        if( this._smoothing && this._touching && this._target._content )
        {
            this._inertiaX = this._diffX ;
            this._inertiaY = this._diffY ;

            if( this._inertiaX !== 0 || this._inertiaY !== 0 )
            {
                this._tween.target = this._target._scroller ;

                let to = {} ;

                if( this._inertiaX !== 0 )
                {
                    to.x = this._target._scroller.x +
                       ( ( this._inertiaX * this._horizontalStrength ) * this._target._content.width / this._target.w ) ;
                }

                if( this._inertiaY !== 0 )
                {
                    to.y = this._target._scroller.y +
                       ( ( this._inertiaY * this._verticalStrength ) * this._target._content.height / this._target.h ) ;
                }

                this._tween.from = { x : this._target._scroller.x , y : this._target._scroller.y };
                this._tween.to = to ;

                if( !this._tween.running )
                {
                    this._tween.run() ;
                }

                return ;
            }
        }

        //_target.mode = ScrollPane.NORMAL ;
        if( this._target._builder )
        {
            this._target._builder.scrollFinish() ;
        }

        this._diffX = this._diffY = 0 ;
        this._lastX = this._lastY = 0 ;
    }}
});