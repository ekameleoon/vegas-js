"use strict" ;

import { Signal } from './system/signals/Signal.js' ;

import { ButtonPhase } from '../../../components/ButtonPhase.js' ;
import { Element } from '../display/Element.js' ;

/**
 * This class provides a skeletal implementation of the <code class="prettyprint">Button</code> interface,
 * to minimize the effort required to implement this interface.
 * @name CoreButton
 * @class
 * @memberof molecule.render.pixi.components
 * @extends molecule.render.pixi.display.Element
 * @constructor
 */
export function CoreButton( texture = null )
{
    Object.defineProperties( this ,
    {
        // ------- public

        /**
         * This signal emit when button is deselected.
         * @name deselect
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        deselect : { value : new Signal() } ,

        /**
         * This signal emit when button is disabled.
         * @name disable
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        disable : { value : new Signal() } ,

        /**
         * This signal emit when button is down.
         * @name down
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        down : { value : new Signal() } ,

        /**
         * This signal emit when button is out.
         * @name out
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        out : { value : new Signal() } ,

        /**
         * This signal emit when button is over.
         * @name over
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        over : { value : new Signal() } ,

        /**
         * The current visual phase of the button.
         * @name phase
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {string}
         * @instance
         * @readonly
         */
        phase : { get : function(){ return this._phase ; } } ,

        /**
         * This signal emit when button is pressed.
         * @name pressed
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        pressed : { value : new Signal() } ,

        /**
         * This signal emit when button is released.
         * @name release
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        release : { value : new Signal() } ,

        /**
         * This signal emit when button is released outside.
         * @name releaseOutside
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        releaseOutside : { value : new Signal() } ,

        /**
         * This signal emit when button is rollout.
         * @name rollOut
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        rollOut : { value : new Signal() } ,

        /**
         * This signal emit when button is rollover.
         * @name rollOver
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        rollOver : { value : new Signal() } ,

        /**
         * This signal emit when button is selected.
         * @name select
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        select : { value : new Signal() } ,

        /**
         * This signal emit when button is unselected.
         * @name select
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        unselect : { value : new Signal() } ,

        /**
         * This signal emit when button is up.
         * @name up
         * @memberof molecule.render.pixi.components.CoreButton
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        up : { value : new Signal() } ,

        // ------- private

        /**
         * @private
         */
        _phase : { value : ButtonPhase.UP , writable : true } ,

        /**
         * @private
         */
        _toggle : { value : false , writable : true } ,

        /**
         * @private
         */
        _selected : { value : false , writable : true }
    });

    Element.call( this , texture ) ;

    this.interactive = true ;
    this.buttonMode  = true ;

    this.pointerdown = this._down ;
}

CoreButton.prototype = Object.create( Element.prototype ,
{
    constructor : { value : CoreButton } ,

    /**
     * A flag that indicates whether this control is selected.
     * @name selected
     * @memberof molecule.render.pixi.components.CoreButton
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
     * @memberof molecule.render.pixi.components.CoreButton
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
     * Sets a boolean value indicating whether the button is selected (true) or not (false).
     * @param {boolean} value - The selected flag value.
     * @param {string} options - The optional flag to control the method (default null).
     * - Use the "true" value to disabled the "select" or "unselect" signals propagation.
     * - Use the value "deselect" to enforce the propagation of the 'deselect' signal.
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
     * Notify when the button is down.
     * @name notifyDown
     * @memberof molecule.render.pixi.components.CoreButton
     * @function
     * @instance
     */
    notifyDown : { writable : true , value : function()
    {
        this.down.emit( this ) ;
    }},

    _down : { value : function()
    {
        this.notifyDown() ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return {string} the string representation of this instance.
     * @memberof molecule.render.pixi.components.CoreButton
     * @instance
     * @function
     */
    toString : { value : function () { return '[CoreButton]' ; }}
}) ;
