"use strict" ;

import { ButtonPhase } from '../../../../components/ButtonPhase.js' ;
import { CoreButton }  from '../CoreButton.js' ;
import { MOB } from '../../display/MOB.js' ;

/**
 * The SimpleButton class lets you control all basic instances of button in the framework.
 * @name SimpleButton
 * @class
 * @memberof molecule.render.pixi.components.buttons
 * @extends molecule.render.pixi.components.CoreButton
 * @constructor
 * @example
 * var Application = PIXI.Application ;
 * var Body        = molecule.render.dom.display.Body ;
 * var Canvas      = molecule.render.dom.display.Canvas ;
 *
 * var app  = new Application();
 * var body = new molecule.render.dom.display.Body() ;
 * var canvas    = new Canvas( null , app.view ) ;
 * var stage     = app.stage ;
 *
 * // Note : The texture collection contains the disable, down, over and up PIXI.Texture references.
 * texture = PIXI.loader.resources.button.textures ;
 *
 * button = new SimpleButton();
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
 * button.unlock() ;
 *
 * button.update() ; // update one time
 *
 * button.pressed.connect( function()
 * {
 *     console.log( "pressed" ) ;
 * tween.run() ;
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
 */
export function SimpleButton( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _downState     : { writable : true , value : null },
        _disabledState : { writable : true , value : null },
        _overState     : { writable : true , value : null },
        _upState       : { writable : true , value : null }
    });

    CoreButton.call( this , texture ) ;

    this.__update = this.update.bind(this) ;

    this.disable.connect( this.__update ) ;
    this.down.connect( this.__update ) ;
    this.out.connect( this.__update ) ;
    this.over.connect( this.__update ) ;
    this.up.connect( this.__update ) ;

    this.update() ;
}

SimpleButton.prototype = Object.create( CoreButton.prototype ,
{
    constructor : { value : SimpleButton } ,

    /**
     * Specifies a display object that is used as the visual object for the "disabled" state.
     * @name disabledState
     * @memberof molecule.render.pixi.components.buttons.SimpleButton
     * @instance
     * @type {PIXI.Texture}
     */
    disabledState :
    {
        get : function() { return this._disabledState ; } ,
        set : function( texture )
        {
            this._disabledState = (texture instanceof PIXI.Texture) ? texture : null ;
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * Specifies a display object that is used as the visual object for the "down" state.
     * @name downState
     * @memberof molecule.render.pixi.components.buttons.SimpleButton
     * @instance
     * @type {PIXI.Texture}
     */
    downState :
    {
        get : function() { return this._downState ; } ,
        set : function( texture )
        {
            this._downState = (texture instanceof PIXI.Texture) ? texture : null ;
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * Specifies a display object that is used as the visual object for the "over" state — the state that the button is in when the pointer is positioned over the button.
     * @name overState
     * @memberof molecule.render.pixi.components.buttons.SimpleButton
     * @instance
     * @type {PIXI.Texture}
     */
    overState :
    {
        get : function() { return this._overState ; } ,
        set : function( texture )
        {
            this._overState = (texture instanceof PIXI.Texture) ? texture : null ;
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * Specifies a display object or a Texture that is used as the visual object for the "up" state — the state that the button is in when the pointer is not positioned over the button.
     * @name upState
     * @memberof molecule.render.pixi.components.buttons.SimpleButton
     * @instance
     * @type {PIXI.Texture}
     */
    upState :
    {
        get : function() { return this._upState ; } ,
        set : function( texture )
        {
            this._upState = (texture instanceof PIXI.Texture) ? texture : null ;
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * Specifies a display object that is used as the visual object for the "down" state.
     * @name set
     * @memberof molecule.render.pixi.components.buttons.SimpleButton
     * @instance
     * @function
     * @param {PIXI.Texture} up - Specifies a display object or a {PIXI.Texture} that is used as the visual object for the "up" state — the state that the button is in when the pointer is not positioned over the button.
     * @param {PIXI.Texture} over - Specifies a display object or a {PIXI.Texture} that is used as the visual object for the "over" state — the state that the button is in when the pointer is positioned over the button.
     * @param {PIXI.Texture} down - Specifies a display object or a {PIXI.Texture} that is used as the visual object for the "down" state.
     * @param {PIXI.Texture} disable - Specifies a display object or a {PIXI.Texture} that is used as the visual object for the "disabled" state.
     * @example
     * button.set
     * (
     *   texture.up,
     *   texture.over,
     *   texture.down,
     *   texture.disable
     * ) ;
     */
    set : { value : function( up = null , over = null , down = null , disable = null )
    {
        this.lock() ;
        this.upState = up ;
        this.overState = over ;
        this.downState = down ;
        this.disabledState = disable ;
        this.unlock() ;
        this.update() ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @memberof molecule.render.pixi.display.Element
     * @instance
     * @function
     */
    toString : { value : function () { return '[SimpleButton]' ; }} ,

    /**
     * This method is invoked after the draw() method in the update() method.
     * @name viewChanged
     * @memberof molecule.render.pixi.components.buttons.SimpleButton
     * @function
     * @instance
     */
    viewChanged : { writable : true , value : function()
    {
        switch( this._phase )
        {
            case ButtonPhase.DISABLE :
            {
                this.texture = this._disabledState || PIXI.Texture.EMPTY ;
                break ;
            }
            case ButtonPhase.DOWN :
            {
                this.texture = this._downState || PIXI.Texture.EMPTY ;
                break ;
            }
            case ButtonPhase.OVER :
            {
                this.texture = this._overState || PIXI.Texture.EMPTY ;
                break ;
            }
            default :
            case ButtonPhase.UP :
            {
                this.texture = this._upState || PIXI.Texture.EMPTY ;
                break ;
            }
        }
    }}
}) ;
