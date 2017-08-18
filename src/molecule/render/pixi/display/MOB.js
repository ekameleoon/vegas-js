"use strict" ;

import { clamp } from './core/maths/clamp.js' ;
import { Align } from './graphics/Align.js' ;
import { Layout } from './graphics/Layout.js' ;
import { Rectangle } from './graphics/geom/Rectangle.js' ;
import { Signal } from './system/signals/Signal.js' ;

/**
 * The Movable Object Block (MOB) defines an advanced Sprite object.
 * @name MOB
 * @class
 * @memberof molecule.render.pixi.display
 * @extends PIXI.Sprite
 * @constructor
 */
export function MOB( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * This signal emit when the sprite is changed.
         * @name changed
         * @memberof molecule.render.pixi.display.MOB
         * @instance
         */
        changed : { value : new Signal() } ,

        /**
         * This signal emit before the rendering is started.
         * @name renderer
         * @memberof molecule.render.pixi.display.MOB
         * @function
         * @instance
         */
        renderer : { value : new Signal() } ,

        /**
         * This signal emit when the sprite is resized.
         * @name resized
         * @memberof molecule.render.pixi.display.MOB
         * @function
         * @instance
         */
        resized : { value : new Signal() } ,

        /**
         * This signal emit after the rendering is finished.
         * @name updater
         * @memberof molecule.render.pixi.display.MOB
         * @function
         * @instance
         */
        updater : { value : new Signal() } ,

        /**
         * @private
         */
         _align    : { writable :  true , value :   10 } , // top left
         _enabled  : { writable :  true , value :    0 } ,
        _h         : { writable :  true , value :    0 } ,
        _layout    : { writable :  true , value : null } ,
        _locked    : { writable :  true , value :    0 } ,
        _maxHeight : { writable :  true , value : null } ,
        _maxWidth  : { writable :  true , value : null } ,
        _minHeight : { writable :  true , value :    0 } ,
        _minWidth  : { writable :  true , value :    0 } ,
        _real      : { writable : false , value : new Rectangle() } ,
        _scope     : { writable :  true , value : this } ,
        _w         : { writable :  true , value :    0 }
    });

    PIXI.Sprite.call( this , texture ) ;
}

MOB.prototype = Object.create( PIXI.Sprite.prototype ,
{
    constructor : { value : MOB , writable : true  } ,

    /**
     * The alignment of the display element.
     * @name align
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     */
    align :
    {
        get : function() { return this._align } ,
        set : function( value )
        {
            this._align = value ;
            if ( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * Indicates the enabled state of the object.
     * @name enabled
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     * @type Boolean
     */
    enabled :
    {
        get : function()
        {
            return this._enabled ;
        },
        set : function ( value )
        {
            this._enabled = value ;
            if ( this._locked === 0 )
            {
                this.viewEnabled() ;
            }
        }
    },

    /**
     * Determinates the virtual height value of this component.
     * @name h
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     */
    h :
    {
        get : function()
        {
            return clamp( this._h , this._minHeight , this._maxHeight ) ;
        } ,
        set : function(value)
        {
            this._h = clamp( value , this._minHeight , this._maxHeight ) ;
            if ( this._locked === 0 )
            {
                this.update() ;
            }
            this.notifyResized() ;
        }
    },

    /**
     * Determinates the layout reference of this container.
     * @name layout
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     */
    layout :
    {
        get : function()
        {
            return this._layout ;
        },
        set : function( layout )
        {
            if ( this._layout )
            {
                this._layout.unlock() ;
                this._layout.renderer.disconnect( this.renderLayout ) ;
                this._layout.updater.disconnect( this.updateLayout ) ;
            }
            this._layout = layout instanceof Layout ? layout : null ;
            if ( this._layout )
            {
                this._layout.renderer.connect( this.renderLayout ) ;
                this._layout.updater.connect( this.updateLayout ) ;
                this._layout.container = this._scope ;
                if ( this.isLocked() )
                {
                    this._layout.lock() ;
                }
                else
                {
                    this._layout.unlock() ;
                }
            }
            if ( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * This property defined the maximum height of this display.
     * @name maxHeight
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     */
    maxHeight :
    {
        get : function() { return this._maxHeight ; } ,
        set : function(value)
        {
            this._maxHeight = value ;
            if( this._maxHeight < this._minHeight )
            {
                this._maxHeight = this._minHeight ;
            }
            if ( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * This property defined the maximum width of this display.
     * @name maxWidth
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     */
    maxWidth :
    {
        get : function() { return this._maxWidth ; } ,
        set : function(value)
        {
            this._maxWidth = value ;
            if( this._maxWidth < this._minWidth )
            {
                this._maxWidth = this._minWidth ;
            }
            if ( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * This property defined the minimum height of this display.
     * @name minHeight
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     */
    minHeight :
    {
        get : function() { return this._minHeight ; } ,
        set : function(value)
        {
            this._minHeight = value > 0 ? value : 0 ;
            if( this._minHeight > this._maxHeight )
            {
                this._minHeight = this._maxHeight ;
            }
            if ( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * This property defined the minimum width of this display.
     * @name minWidth
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     */
    minWidth :
    {
        get : function() { return this._minWidth ; } ,
        set : function(value)
        {
            this._minWidth = value > 0 ? value : 0 ;
            if( this._minWidth > this._maxWidth )
            {
                this._minWidth = this._maxWidth ;
            }
            if ( this._locked === 0 )
            {
                this.update() ;
            }
        }
    },

    /**
     * Determinates the scope of the container. By default the scope is the container itself but can target any other DisplayObject reference.
     * @name scope
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     */
    scope :
    {
        get : function()
        {
            return this._scope ;
        },
        set : function( scope )
        {
            if( scope )
            {
                this._scope = scope ;
            }
            else
            {
                this._scope = this ;
            }
            if ( this._layout )
            {
                this._layout.container = this._scope ;
            }
        }
    },

    /**
     * Determinates the virtual width value of this component.
     * @name w
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    w :
    {
        get : function()
        {
            return clamp( this._w , this._minWidth , this._maxWidth ) ;
        } ,
        set : function(value)
        {
            this._w = clamp( value , this._minWidth , this._maxWidth ) ;
            if ( this._locked === 0 )
            {
                this.update() ;
            }
            this.notifyResized() ;
        }
    },

    /**
     * Refresh the real area Rectangle of the background with the current alignement.
     * @name fixArea
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     * @function
     */
    fixArea : { value : function()
    {
        // initialize

        this._real.width  = this.w ;
        this._real.height = this.h ;
        this._real.x      = 0 ;
        this._real.y      = 0 ;

        // update

        if( this._align === Align.BOTTOM )
        {
            this._real.x -= this._real.width / 2 ;
            this._real.y -= this._real.height ;
        }
        else if ( this._align === Align.BOTTOM_LEFT )
        {
            this._real.y -= this._real.height ;
        }
        else if ( this._align === Align.BOTTOM_RIGHT )
        {
            this._real.x -= this._real.width ;
            this._real.y -= this._real.height ;
        }
        else if ( this._align === Align.CENTER )
        {
            this._real.x -= this._real.width / 2 ;
            this._real.y -= this._real.height / 2 ;
        }
        else if ( this._align === Align.LEFT )
        {
            this._real.y -= this._real.height / 2 ;
        }
        else if ( this._align === Align.RIGHT )
        {
            this._real.x -= this._real.width ;
            this._real.y -= this._real.height / 2 ;
        }
        else if ( this._align === Align.TOP )
        {
            this._real.x -= this._real.width / 2 ;
        }
        else if ( this._align === Align.TOP_RIGHT )
        {
            this._real.x -= this._real.width ;
        }

        // result

        return this._real ;
    }},

    /**
     * Indicates if the object is locked.
     * @name isLocked
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    isLocked : { value : function()
    {
        return this._locked > 0 ;
    }} ,

    /**
     * Locks the object.
     * @name locks
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    lock : { value : function()
    {
        this._locked ++ ;
        if ( this._layout )
        {
            this._layout.lock() ;
        }
    }},

    /**
     * Moves the canvas object..
     * @param x The x position of the component.
     * @param y The y position of the component.
     * @name move
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    move : { value : function( x = NaN , y = NaN )
    {
        if ( !isNaN(x) )
        {
            this.x = x ;
        }
        if ( !isNaN(y) )
        {
            this.y = y ;
        }
    }},

    /**
     * Notify an event when you resize the component.
     * @name notifyResized
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    notifyResized : { writable : true , value : function()
    {
        this.viewResize() ;
        this.resized.emit( this ) ;
    }},

    /**
     * Receives a message when the layout emit when is rendered.
     * @name renderLayout
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    renderLayout : { writable : true , value : function( /* layout = null */ )
    {
        //
    }},

    /**
     * Reset the lock security of the object.
     * @name resetLock
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    resetLock : { value : function() { this._locked = 0 ; } } ,

    /**
     * Sets the preferred width (w) and height (h) values of the display.
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     * @function
     */
    setPreferredSize : { value : function( w, h )
    {
        this._w = isNaN(w) ? 0 : clamp( w , this._minWidth , this._maxWidth) ;
        this._h = isNaN(h) ? 0 : clamp( h , this._minHeight, this._maxHeight) ;
        if ( this._locked === 0 )
        {
            this.update() ;
        }
        this.notifyResized() ;
    }},

    /**
     * Sets the width and height values of the display.
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     * @function
     */
    setSize : { value : function( w, h )
    {
        this.width  = isNaN(w) ? 0 : clamp( w , this._minWidth , this._maxWidth) ;
        this.height = isNaN(h) ? 0 : clamp( h , this._minHeight, this._maxHeight) ;
        if ( this._locked === 0 )
        {
            this.update() ;
        }
        this.notifyResized() ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     * @function
     */
    toString : { value : function () { return '[MOB]' ; }} ,

    /**
     * Unlocks the display.
     * @name unlock
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     * @function
     */
    unlock : { value : function()
    {
        this._locked = (--this._locked > 0 ) ? this._locked : 0 ;
        if ( this._layout )
        {
            this._layout.unlock() ;
        }
    }},

    /**
     * Update the display.
     * @memberof molecule.render.pixi.display.MOB
     * @instance
     * @function
     */
    update : { writable : true , value : function()
    {
        if ( this._locked > 0 )
        {
            return ;
        }

        this.renderer.emit(this) ;

        if ( this._layout )
        {
            this._layout.run() ;
        }

        this.draw() ;

        this.viewChanged() ;

        this.altered = false ;

        this.updater.emit(this) ;
    }},

    /**
     * This method is invoked after the draw() method in the update() method.
     * @name viewResize
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    viewChanged : { value : function()
    {
        // override
    }},

    /**
     * Invoked when the enabled property of the component change.
     * @name viewEnabled
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    viewEnabled : { value : function()
    {
        // override
    }},

    /**
     * Invoked when the component is resized.
     * @name viewResize
     * @memberof molecule.render.pixi.display.MOB
     * @function
     * @instance
     */
    viewResize : { value : function()
    {
        // override
    }}
}) ;
