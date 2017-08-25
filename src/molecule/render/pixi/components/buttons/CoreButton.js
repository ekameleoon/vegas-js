"use strict" ;

import { Signal } from './system/signals/Signal.js' ;

import { ButtonPhase } from '../../../../components/ButtonPhase.js' ;
import { Element } from '../../display/Element.js' ;
import { radio } from './radio.js' ;

/**
 * This class provides a skeletal implementation of the <code>Button</code> interface,
 * to minimize the effort required to implement this interface.
 * @name CoreButton
 * @class
 * @memberof molecule.render.pixi.components.buttons
 * @extends molecule.render.pixi.display.Element
 * @constructor
 * @version 1.0.8
 * @since 1.0.8
 */
export function CoreButton( texture = null )
{
    Object.defineProperties( this ,
    {
        /**
         * Indicates the data value object of the component.
         * @name data
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @instance
         * @type {Object}
         */
        data : { writable : true , value : null },

        /**
         * This signal emit when button is deselected.
         * @name deselect
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        deselect : { value : new Signal() } ,

        /**
         * This signal emit when button is disabled.
         * @name disable
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        disable : { value : new Signal() } ,

        /**
         * This signal emit when button is down.
         * @name down
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        down : { value : new Signal() } ,

        /**
         * This signal emit when button is out.
         * @name out
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        out : { value : new Signal() } ,

        /**
         * This signal emit when button is over.
         * @name over
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        over : { value : new Signal() } ,

        /**
         * The current visual phase of the button.
         * @name phase
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {string}
         * @instance
         * @readonly
         */
        phase : { get : function(){ return this._phase ; } } ,

        /**
         * This signal emit when button is pressed.
         * @name pressed
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        pressed : { value : new Signal() } ,

        /**
         * This signal emit when button is released.
         * @name release
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        release : { value : new Signal() } ,

        /**
         * This signal emit when button is released outside.
         * @name releaseOutside
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        releaseOutside : { value : new Signal() } ,

        /**
         * This signal emit when button is rollout.
         * @name rollOut
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        rollOut : { value : new Signal() } ,

        /**
         * This signal emit when button is rollover.
         * @name rollOver
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        rollOver : { value : new Signal() } ,

        /**
         * This signal emit when button is selected.
         * @name select
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        select : { value : new Signal() } ,

        /**
         * This signal emit when button is unselected.
         * @name select
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        unselect : { value : new Signal() } ,

        /**
         * This signal emit when button is up.
         * @name up
         * @memberof molecule.render.pixi.components.buttons.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        up : { value : new Signal() } ,

        // ------- private

        /**
         * @private
         */
        _isOver : { value : false , writable : true } ,

        /**
         * @private
         */
        _isPress : { value : false, writable : true } ,

        /**
         * @private
         */
        _phase : { value : ButtonPhase.UP , writable : true } ,

        /**
         * @private
         */
        _selected : { value : false , writable : true } ,

        /**
         * @private
         */
        _toggle : { value : false , writable : true } ,

        /**
         * @private
         */
        _useHandCursor : { value : true , writable : true }
    });

    Element.call( this , texture ) ;

    this.interactive = true ;
    this.buttonMode  = this._useHandCursor && this._enabled ;

    this.postScope() ;
}

CoreButton.prototype = Object.create( Element.prototype ,
{
    constructor : { writable : true , value : CoreButton } ,

    /**
     * A flag that indicates whether this control is selected.
     * @name selected
     * @memberof molecule.render.pixi.components.buttons.CoreButton
     * @instance
     * @type {boolean}
     */
    selected :
    {
        get : function() {return this._selected ; } ,
        set : function( value )
        {
            this.setSelected( value === true ) ;
        }
    },

    /**
     * Indicates a boolean value indicating whether the button behaves as a toggle switch (true) or not (false).
     * @name toggle
     * @memberof molecule.render.pixi.components.buttons.CoreButton
     * @instance
     * @type {boolean}
     */
    toggle :
    {
        get : function() { return this._toggle ; } ,
        set : function( value )
        {
            this._toggle = value === true ;
            this.setSelected( false , true ) ;
        }
    },

    /**
     * A flag that indicates whether this control is selected.
     * @name selected
     * @memberof molecule.render.pixi.components.buttons.CoreButton
     * @instance
     * @type {boolean}
     */
    useHandCursor :
    {
        get : function() {return this._useHandCursor ; } ,
        set : function( value )
        {
            this._useHandCursor = value === true ;
            this.buttonMode  = this._useHandCursor && this._enabled ;
        }
    },

    /**
     * Invoked when the group property or the groupName property changed.
     * @memberof molecule.render.pixi.components.buttons.CoreButton
     * @instance
     * @function
     */
    groupPolicyChanged : { writable : true , value : function()
    {
        if ( this._group === true )
        {
            this.down.connect( radio ) ;
        }
        else
        {
            this.down.disconnect( radio ) ;
        }
    }},

    /**
     * Sets a boolean value indicating whether the button is selected (true) or not (false).
     * @memberof molecule.render.pixi.components.buttons.CoreButton
     * @instance
     * @function
     * @param {boolean} value - The selected flag value.
     * @param {string} options - The optional flag to control the method (default null).
     * Use the "true" value to disabled the "select" or "unselect" signals propagation.
     * Use the value "deselect" to enforce the propagation of the 'deselect' signal.
     */
    setSelected : { value : function( value , options = null )
    {
        this._selected = this._toggle && (value === true) ;
        if ( this._enabled )
        {
            if( this._selected )
            {
                this._phase = ButtonPhase.DOWN ;
                if( this.down.connected() )
                {
                    this.down.emit( this ) ;
                }
            }
            else
            {
                this._phase = ButtonPhase.UP ;
                if( this.up.connected() )
                {
                    this.up.emit( this ) ;
                }
            }
        }

        if ( options === null )
        {
            if( this._selected )
            {
                if( this.select.connected() )
                {
                    this.select.emit( this ) ;
                }
            }
            else
            {
                if( this.unselect.connected() )
                {
                    this.unselect.emit( this ) ;
                }
            }
        }
        else if ( options === "deselect" )
        {
            if( this.deselect.connected() )
            {
                this.deselect.emit( this ) ;
            }
        }
    }},

    /**
     * Invoked when the enabled property of the component change.
     * @name viewEnabled
     * @memberof molecule.render.pixi.components.buttons.CoreButton
     * @function
     * @instance
     */
    viewEnabled : { writable : true , value : function()
    {
        this.buttonMode  = this._useHandCursor && this._enabled ;
        if ( this._enabled )
        {
            this.interactive = true ;
            if ( this._toggle && this._selected )
            {
                this._phase = ButtonPhase.DOWN ;
                if( this.down.connected() )
                {
                    this.down.emit( this ) ;
                }
            }
            else
            {
                this._phase = ButtonPhase.UP ;
                if( this.up.connected() )
                {
                    this.up.emit( this ) ;
                }
            }
        }
        else
        {
            this.interactive = false ;
            if( this._isOver )
            {
                this._isOver = false ;
            }
            this._isPress = false ;
            this._phase = ButtonPhase.DISABLE ;
            if( this.disable.connected() )
            {
                this.disable.emit( this ) ;
            }
        }
    }},

    // ----- private

    /**
     * Invoked after the scope of the element is changed.
     * @private
     */
    checkScope : { writable : true , value : function( target )
    {
        return target || this ;
    }} ,

    /**
     * Invoked after the scope of the element is changed.
     * @private
     */
    postScope : { writable : true , value : function()
    {
        if( this._scope )
        {
            this._scope.mousedown      = this.____down.bind(this) ;
            this._scope.mouseout       = this.____out.bind(this) ;
            this._scope.mouseover      = this.____over.bind(this) ;
            this._scope.mouseup        = this.____up.bind(this) ;
            this._scope.mouseupoutside = this.____upOutside.bind(this) ;
        }
    }} ,

    /**
     * Invoked before the scope of the element is changed.
     * @private
     */
    preScope  : { writable : true , value : function()
    {
        if( this._scope )
        {
            this._scope.mousedown =
            this._scope.mouseout =
            this._scope.mouseover =
            this._scope.mouseup =
            this._scope.mouseupoutside = null ;
        }
    }},

    // ----- behaviors

    /**
     * @private
     */
    ____down : { value : function()
    {
        if( this._isOver )
        {
            this._isOver = false ;
        }

        this._isPress = true ;

        if ( this._toggle )
        {
            this.selected = !this._selected ;
        }
        else
        {
            this._phase = ButtonPhase.DOWN ;
            if( this.down.connected() )
            {
                this.down.emit( this ) ;
            }
        }

        if( this.pressed.connected() )
        {
            this.pressed.emit( this ) ;
        }
    }},

    /**
     * @private
     */
    ____out : { value : function()
    {
        this._isOver = false ;
        this._phase = (this._toggle && this._selected) ? ButtonPhase.DOWN : ButtonPhase.UP ;
        if( this.out.connected() )
        {
            this.out.emit( this ) ;
        }
        if( this.rollOut.connected() )
        {
            this.rollOut.emit( this ) ;
        }
    }},

    /**
     * @private
     */
    ____over : { value : function()
    {
        if( !this._isPress && !this._isOver )
        {
            this._isOver = true ;
            if ( !this._toggle || !this._selected )
            {
                this._phase = ButtonPhase.OVER ;
                if( this.over.connected() )
                {
                    this.over.emit( this ) ;
                }
                if( this.rollOver.connected() )
                {
                    this.rollOver.emit( this ) ;
                }
            }
        }
    }},

    /**
     * @private
     */
    ____up : { value : function()
    {
        if( this._isOver )
        {
            this._isOver = false ;
        }
        this._isPress = false ;
        if ( !this._toggle && this._enabled )
        {
            this._phase = ButtonPhase.UP ;
            if( this.up.connected() )
            {
                this.up.emit( this ) ;
            }
        }
        if( this.release.connected() )
        {
            this.release.emit( this ) ;
        }
    }},

    /**
     * @private
     */
    ____upOutside : { value : function()
    {
        if( this._isOver )
        {
            this._isOver = false ;
        }
        this._isPress = false ;
        if ( !this._toggle && this.enabled )
        {
            this._phase = ButtonPhase.UP ;
            if( this.up.connected() )
            {
                this.up.emit( this ) ;
            }
        }
        if( this.releaseOutside.connected() )
        {
            this.releaseOutside.emit( this ) ;
        }
    }}
}) ;
