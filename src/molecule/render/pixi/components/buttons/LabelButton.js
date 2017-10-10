"use strict" ;

import { Align } from './graphics/Align.js' ;
import { isString } from './core/isString.js' ;
import { SimpleButton } from './SimpleButton.js' ;

/**
 * The LabelButton class lets you control all basic instances of button with a label.
 * @name LabelButton
 * @class
 * @memberof molecule.render.pixi.components.buttons
 * @extends molecule.render.pixi.components.buttons.CoreButton
 * @constructor
 * @example
 * var Application = PIXI.Application ;
 * var Body        = molecule.render.dom.display.Body ;
 * var Canvas      = molecule.render.dom.display.Canvas ;
 *
 * var app    = new Application();
 * var body   = new molecule.render.dom.display.Body() ;
 * var canvas = new Canvas( null , app.view ) ;
 * var stage  = app.stage ;
 *
 * // Note : The texture collection contains the disable, down, over and up PIXI.Texture references.
 * texture = PIXI.loader.resources.button.textures ;
 *
 * button = new LabelButton();
 *
 * button.toggle = true ;
 *
 * button.x = 25 ;
 * button.y = 25 ;
 *
 * button.lock() ;
 * button.disabledState = texture.disable ;
 * button.downState     = texture.down ;
 * button.overState     = texture.over ;
 * button.upState       = texture.up ;
 * button.label         = "hello" ;
 * button.labelAlign    = Align.CENTER ;
 * button.labelStyle    =
 * {
 *     align: 'center',
 *     fill: 0xFFFFFF,
 *     fontFamily: 'Arial',
 *     fontWeight: 'bold',
 *     fontSize: 34
 *  }
 * button.unlock() ;
 *
 * button.update() ; // update one time
 *
 * button.pressed.connect( function()
 * {
 *     console.log( "pressed" ) ;
 *     tween.run() ;
 * });
 *
 * button.select.connect( function()
 * {
 *     console.log( "select" ) ;
 * });
 *
 * button.unselect.connect( function()
 * {
 *     console.log( "unselect" ) ;
 * });
 *
 * stage.addChild( button ) ;
 * @version 1.0.8
 * @since 1.0.8
 */
export function LabelButton( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _labelAlign    : { writable : true , value : Align.CENTER } ,
        _labelChanging : { writable : true , value : false } ,
        _labelStyle    : { writable : true , value : false } ,
        _labelText     : { writable : true , value : null  }
    });

    SimpleButton.call( this , texture ) ;
}

Object.defineProperties( LabelButton ,
{
    /**
     * The valid alignment collection of the label text.
     * @static
     * @memberof molecule.render.pixi.components.buttons.LabelButton
     * @type Array
     */
    labelAlignments :
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

LabelButton.prototype = Object.create( SimpleButton.prototype ,
{
    constructor : { writable : true , value : LabelButton } ,

    /**
     * Specifies the string representation of the label button.
     * @name label
     * @memberof molecule.render.pixi.components.buttons.LabelButton
     * @instance
     * @type {string}
     */
    label :
    {
        get : function() { return this._label ; } ,
        set : function( label )
        {
            if( label === this._label )
            {
                return ;
            }
            this._label = isString(label) && (label.length > 0) ? label : null ;
            this._labelChanging = true ;
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * The alignement of the label text in the component.
     * @name labelAlign
     * @memberof molecule.render.pixi.components.buttons.LabelButton
     * @instance
     * @see {graphics.Align}
     * @default Align.CENTER
     */
    labelAlign :
    {
        get : function() { return this._labelAlign ; } ,
        set : function( value )
        {
            this._labelAlign = LabelButton.labelAlignments.indexOf( value ) > -1 ? value : Align.NONE ;
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * Specifies the label text style parameters.
     * @name label
     * @memberof molecule.render.pixi.components.buttons.LabelButton
     * @instance
     * @type {object|PIXI.TextStyle}
     */
    labelStyle :
    {
        get : function() { return this._labelStyle ; } ,
        set : function( style )
        {
            this._labelStyle = style ;
            this._labelChanging = true ;
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * Returns the text reference who display 'label' of the button.
     * @name labelText
     * @memberof molecule.render.pixi.components.buttons.LabelButton
     * @instance
     * @type {PIXI.Text|null}
     */
    labelText : { get : function() { return this._labelText ; } },

    /**
     * This method is invoked after the draw() method in the update() method.
     * @name viewChanged
     * @memberof molecule.render.pixi.components.buttons.LabelButton
     * @function
     * @instance
     */
    viewChanged : { writable : true , value : function()
    {
        SimpleButton.prototype.viewChanged.call(this) ;

        if( this._labelChanging )
        {
            this._labelChanging = false ;

            if( this._labelText )
            {
                if( this._labelText.parent )
                {
                    this._labelText.parent.removeChild( this._labelText ) ;
                }
                this._labelText.destroy() ;
                this._labelText = null ;
            }

            if( isString(this._label) && this._label.length > 0 )
            {
                this._labelText = new PIXI.Text( this._label , this._labelStyle ) ;
            }
        }

        if( this._labelText && this._labelText instanceof PIXI.Text )
        {
            let area = this.fixArea() ;

            this.addChild( this._labelText );

            if( this._labelAlign !== Align.NONE )
            {
                this._labelText.x = area.x ;
                this._labelText.y = area.y ;
            }

            switch( this._labelAlign )
            {
                case Align.BOTTOM :
                {
                    this._labelText.x += (area.width - this._labelText.width ) * 0.5 ;
                    this._labelText.y += area.height - this._padding.bottom - this._labelText.height ;
                    break ;
                }
                case Align.BOTTOM_LEFT :
                {
                    this._labelText.x += this._padding.left ;
                    this._labelText.y += area.height - this._padding.bottom - this._labelText.height ;
                    break ;
                }
                case Align.BOTTOM_RIGHT :
                {
                    this._labelText.x += area.width - this._padding.right - this._labelText.width ;
                    this._labelText.y += area.height - this._padding.bottom - this._labelText.height ;
                    break ;
                }
                case Align.CENTER :
                {
                    this._labelText.x += (area.width - this._labelText.width  ) * 0.5 ;
                    this._labelText.y += (area.height - this._labelText.height ) * 0.5 ;
                    break ;
                }
                case Align.LEFT :
                {
                    this._labelText.x += this._padding.left ;
                    this._labelText.y += (area.height - this._labelText.height ) * 0.5 ;
                    break ;
                }
                case Align.RIGHT :
                {
                    this._labelText.x += area.width - this._padding.right - this._labelText.width ;
                    this._labelText.y += (area.height - this._labelText.height ) * 0.5 ;
                    break ;
                }
                case Align.TOP :
                {
                    this._labelText.x += (area.width  - this._labelText.width  ) * 0.5 ;
                    this._labelText.y += this._padding.top ;
                    break ;
                }
                case Align.TOP_LEFT :
                {
                    this._labelText.x += this._padding.left ;
                    this._labelText.y += this._padding.top ;
                    break ;
                }
                case Align.TOP_RIGHT :
                {
                    this._labelText.x += area.width - this._padding.right - this._labelText.width ;
                    this._labelText.y += this._padding.top ;
                    break ;
                }
            }
        }
    }}
}) ;
