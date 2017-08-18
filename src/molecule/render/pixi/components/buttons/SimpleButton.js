"use strict" ;

import { ButtonPhase } from '../../../../components/ButtonPhase.js' ;
import { CoreButton }  from '../CoreButton.js' ;

/**
 * The SimpleButton class lets you control all basic instances of button in the framework.
 * @name SimpleButton
 * @class
 * @memberof molecule.render.pixi.components.buttons
 * @extends molecule.render.pixi.components.CoreButton
 * @constructor
 */
export function SimpleButton( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _current       : { writable : true , value : null },
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
     * @type {PIXI.DisplayObject}
     */
    disabledState :
    {
        get : function() { return this._disabledState ; } ,
        set : function( display )
        {
            this._disabledState = display instanceof PIXI.DisplayObject ? display : null ;
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
     * @type {PIXI.DisplayObject}
     */
    downState :
    {
        get : function() { return this._downState ; } ,
        set : function( display )
        {
            this._downState = display instanceof PIXI.DisplayObject ? display : null ;
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
     * @type {PIXI.DisplayObject}
     */
    overState :
    {
        get : function() { return this._overState ; } ,
        set : function( display )
        {
            this._overState = display instanceof PIXI.DisplayObject ? display : null ;
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

    /**
     * Specifies a display object that is used as the visual object for the "up" state — the state that the button is in when the pointer is not positioned over the button.
     * @name upState
     * @memberof molecule.render.pixi.components.buttons.SimpleButton
     * @instance
     * @type {PIXI.DisplayObject}
     */
    upState :
    {
        get : function() { return this._upState ; } ,
        set : function( display )
        {
            this._upState = display instanceof PIXI.DisplayObject ? display : null ;
            if( !this.isLocked() )
            {
                this.update() ;
            }
        }
    },

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
        if( this._current )
        {
            if( this.children.indexOf( this._current ) > -1 )
            {
                this.removeChild( this._current ) ;
            }
            this._current = null ;
        }

        switch( this._phase )
        {
            case ButtonPhase.DISABLE :
            {
                this._current = this._disabledState ;
                break ;
            }
            case ButtonPhase.DOWN :
            {
                this._current = this._downState ;
                break ;
            }
            case ButtonPhase.OVER :
            {
                this._current = this._overState ;
                break ;
            }
            default :
            case ButtonPhase.UP :
            {
                this._current = this._upState ;
                break ;
            }
        }

        if( this._current && ( this.children.indexOf(this._current) < 0 ) )
        {
            if( this.children.length > 0 )
            {
                this.addChildAt( this._current , 0 ) ;
            }
            else
            {
                this.addChild( this._current ) ;
            }
        }
    }}
}) ;
