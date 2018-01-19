"use strict" ;

import { clamp } from 'core/maths/clamp.js' ;

import { Align } from 'graphics/Align.js' ;

import { IconPolicy } from 'molecule/IconPolicy.js' ;
import { CoreButton } from 'molecule/render/pixi/components/buttons/CoreButton.js' ;

/**
 * The IconButton class lets you control all basic instances of button in the framework.
 * @name IconButton
 * @class
 * @memberof molecule.render.pixi.components.buttons
 * @extends molecule.render.pixi.components.buttons.CoreButton
 * @constructor
 * @version 1.0.8
 * @since 1.0.8
 * @example
 * var button = new IconButton(baseTexture) ;
 * button.lock() ;
 * button.iconAlign = Align.CENTER ;
 * button.icon = iconTexture ; // Texture or DisplayObject
 *
 * // button.autoSize = true
 * // button.padding = new EdgeMetrics(2,2,2,2) ;
 * // button.iconKeepAspectRatio = false ;
 * // button.iconHorizontalPolicy = IconPolicy.AUTO ;
 * // button.iconVerticalPolicy = IconPolicy.AUTO ;
 *
 * button.unlock() ;
 *
 * button.x = 25 ;
 * button.y = 25 ;
 *
 * button.update() ;
 */
export function IconButton( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * Indicates if the icon auto-update this size with this internal texture.
         * @name autoSize
         * @memberof molecule.render.pixi.components.buttons.IconButton
         * @instance
         * @type boolean
         * @default true
         */
        autoSize : { writable : true , value : true } ,

        /**
         * Indicates if the icon keep this aspect ratio if the horizontal or vertical policy is AUTO.
         * @name iconKeepAspectRatio
         * @memberof molecule.render.pixi.components.buttons.IconButton
         * @instance
         * @type boolean
         * @default true
         */
        iconKeepAspectRatio : { writable : true , value : true } ,

        /**
         * @private
         */
        _icon        : { writable : true , value : null } ,
        _iconAlign   : { writable : true , value : Align.NONE } ,
        _iconHPolicy : { writable : true , value : IconPolicy.NORMAL } ,
        _iconVPolicy : { writable : true , value : IconPolicy.NORMAL }
    });

    CoreButton.call( this , texture ) ;

    this.update() ;
}

Object.defineProperties( IconButton ,
{
    /**
     * The valid alignment collection of the icon.
     * @static
     * @memberof molecule.render.pixi.components.buttons.IconButton
     * @type Array
     */
    iconAlignments :
    {
        writable : false ,
        value    :
        [
            Align.CENTER,
            Align.BOTTOM,
            Align.BOTTOM_LEFT,
            Align.BOTTOM_RIGHT,
            Align.LEFT,
            Align.RIGHT,
            Align.TOP,
            Align.TOP_LEFT,
            Align.TOP_RIGHT
        ]
    }
});

IconButton.prototype = Object.create( CoreButton.prototype ,
{
    constructor : { writable : true , value : IconButton } ,

    /**
     * Indicates the icon reference of this display.
     * If the icon property is a DisplayObject the component attach the visual reference to populate the view of the icon;
     * Note : You can affect a PIXI.Texture or PIXI.DisplayObject to generates the icon.
     * @name icon
     * @memberof molecule.render.pixi.components.buttons.IconButton
     * @instance
     * @type PIXI.DisplayObject
     */
    icon :
    {
        get : function() { return this._icon ; } ,
        set : function( display )
        {
            if( this._icon )
            {
                if( this._icon.parent )
                {
                    this._icon.parent.removeChild( this._icon ) ;
                }
            }
            this._icon = null ;
            switch( true )
            {
                case display instanceof PIXI.DisplayObject :
                {
                    this._icon = display ;
                    break ;
                }
                case display instanceof PIXI.Texture :
                {
                    this._icon = new PIXI.Sprite( display ) ;
                    break ;
                }
                default :
                {
                    this._icon = null ;
                }
            }
            if( this._icon )
            {
                this.addChild( this._icon ) ;
                if( this._icon.interactive )
                {
                    this._icon.buttonMode = false ;
                    this._icon.interactive = false ;
                }
            }
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * The alignement of the icon in the component.
     * @name iconAlign
     * @memberof molecule.render.pixi.components.buttons.IconButton
     * @instance
     * @see {graphics.Align}
     */
    iconAlign :
    {
        get : function() { return this._iconAlign ; } ,
        set : function( value )
        {
            this._iconAlign = IconButton.iconAlignments.indexOf( value ) > -1 ? value : Align.NONE ;
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * The horizontal policy of the icon (default "normal").
     * The vertical icon policy property not must be 'AUTO' if the horizontal property is setting with the AUTO mode.
     * @name iconHorizontalPolicy
     * @memberof molecule.render.pixi.components.buttons.IconButton
     * @instance
     * @see {graphics.Align}
     * @default 'normal'
     */
    iconHorizontalPolicy :
    {
        get : function() { return this._iconHPolicy ; } ,
        set : function( value )
        {
            this._iconHPolicy = value === IconPolicy.AUTO ? IconPolicy.AUTO : IconPolicy.NORMAL ;
            if( this._iconHPolicy === IconPolicy.AUTO && this._iconVPolicy === IconPolicy.AUTO )
            {
                this._iconVPolicy = IconPolicy.NORMAL ;
            }
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * The horizontal policy of the icon (default "normal").
     * The vertical icon policy property not must be 'AUTO' if the horizontal property is setting with the AUTO mode.
     * @name iconHorizontalPolicy
     * @memberof molecule.render.pixi.components.buttons.IconButton
     * @instance
     * @see {graphics.Align}
     * @default 'normal'
     */
    iconVerticalPolicy :
    {
        get : function() { return this._iconVPolicy ; } ,
        set : function( value )
        {
            this._iconVPolicy = value === IconPolicy.AUTO ? IconPolicy.AUTO : IconPolicy.NORMAL ;
            if( this._iconHPolicy === IconPolicy.AUTO && this._iconVPolicy === IconPolicy.AUTO )
            {
                this._iconHPolicy = IconPolicy.NORMAL ;
            }
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * This method is invoked after the draw() method in the update() method.
     * @name viewChanged
     * @memberof molecule.render.pixi.components.buttons.IconButton
     * @function
     * @instance
     */
    viewChanged : { writable : true , value : function()
    {
        if( this.autoSize === true && this.texture )
        {
            this._w = clamp( this.texture.orig.width  , this._minWidth  , this._maxWidth  ) ;
            this._h = clamp( this.texture.orig.height , this._minHeight , this._maxHeight ) ;
        }

        if( this._icon )
        {
            let area = this.fixArea() ;
            if( this._iconHPolicy === IconPolicy.AUTO )
            {
                this._icon.width = area.width - this._padding.horizontal ;
                if( this.iconKeepAspectRatio === true )
                {
                    this._icon.scale.y = this._icon.scale.x ;
                }
            }
            else if( this._iconVPolicy === IconPolicy.AUTO )
            {
                this._icon.height = area.height - this._padding.vertical ;
                if( this.iconKeepAspectRatio === true )
                {
                    this._icon.scale.x = this._icon.scale.y ;
                }
            }

            this._icon.x = area.x ;
            this._icon.y = area.y ;

            switch( this._iconAlign )
            {
                case Align.CENTER :
                {
                    this._icon.x += (area.width  - this._icon.width  ) / 2 ;
                    this._icon.y += (area.height - this._icon.height ) / 2 ;
                    break ;
                }
                case Align.LEFT :
                {
                    this._icon.x += this._padding.left ;
                    this._icon.y += (area.height - this._icon.height ) / 2 ;
                    break ;
                }
                case Align.RIGHT :
                {
                    this._icon.x += area.height - this._padding.right ;
                    this._icon.y += (area.height - this._icon.height ) / 2 ;
                    break ;
                }
                case Align.TOP :
                {
                    this._icon.x += (area.width  - this._icon.width  ) / 2 ;
                    this._icon.y += this._padding.top ;
                    break ;
                }
                case Align.TOP_LEFT :
                {
                    this._icon.x += this._padding.left ;
                    this._icon.y += this._padding.top ;
                    break ;
                }
                case Align.TOP_RIGHT :
                {
                    this._icon.x += area.height - this._padding.right ;
                    this._icon.y += this._padding.top ;
                    break ;
                }
                case Align.BOTTOM :
                {
                    this._icon.x += (area.width  - this._icon.width  ) / 2 ;
                    this._icon.y += area.height - this._padding.bottom ;
                    break ;
                }
                case Align.BOTTOM_LEFT :
                {
                    this._icon.x += this._padding.left ;
                    this._icon.y += area.height - this._padding.bottom ;
                    break ;
                }
                case Align.BOTTOM_RIGHT :
                {
                    this._icon.x += area.width  - this._padding.right ;
                    this._icon.y += area.height - this._padding.bottom ;
                    break ;
                }
            }
        }
    }}
}) ;
