"use strict"

import { AEntity } from './AEntity.js' ;

/**
 * Creates a new Scene instance.
 * @name Scene
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.AEntity
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 */
export function Scene( init = null )
{
    AEntity.call( this , init , 'a-scene' ) ;
}

Scene.prototype = Object.create( AEntity.prototype ,
{
    constructor : { value : Scene , writable : true },

    /**
     * Enabled the antialias property.
     * @name antialias
     * @memberof molecule.render.aframe.display.Scene
     * @instance
     * @default false
     */
    antialias :
    {
        get : function() { return this._element ? (this._element.getAttribute('antialias') === "true") : false ; },
        set : function( value )
        {
            if( this._element )
            {
                this._element.setAttribute( 'antialias' , value === true ? 'true' : 'false' ) ;
            }
        }
    },

    /**
     * Remove fullscreen styles from the canvas.
     * @name embedded
     * @memberof molecule.render.aframe.display.Scene
     * @instance
     * @default false
     */
    embedded :
    {
        get : function() { return this._element ? (this._element.getAttribute('embedded') === "") : false ; } ,
        set : function( value )
        {
            if( this._element )
            {
                this._element.setAttribute( 'embedded' , value === true ? '' : null ) ;
            }
        }
    },

    /**
     * Enabled the fog.
     * @name fog
     * @memberof molecule.render.aframe.display.Scene
     * @instance
     * @default false
     */
    fog :
    {
        get : function() { return this._element ? (this._element.getAttribute('fog') === "") : false ; } ,
        set : function( value )
        {
            if( this._element )
            {
                this._element.setAttribute( 'fog' , value === true ? '' : null ) ;
            }
        }
    },

    /**
     * isMobile or not environment is detected to be mobile.
     * @name alpha
     * @memberof molecule.render.aframe.display.Scene
     * @instance
     * @readonly
     */
    isMobile : { get : function() { return this._element ? this._element.isMobile : false ; } },

    /**
     * Toggle UI for entering and exiting VR.
     * @name vr-mode-ui
     * @memberof molecule.render.aframe.display.Scene
     * @instance
     * @default false
     */
    vrModeUI :
    {
        get : function() { return this._element ? (this._element.getAttribute('vr-mode-ui', 'enabled') === "true") : false ; } ,
        set : function( value )
        {
            if( this._element )
            {
                this._element.setAttribute( 'vr-mode-ui' , 'enabled' , (value === true) ? 'true' : 'false' ) ;
            }
        }
    },

    /**
     * Switch to stereo render and push content to the headset.
     * Needs to be called within a user-generated event handler like click. the first time a page enters VR.
     * @name enterVR
     * @memberof molecule.render.aframe.display.Scene
     * @instance
     * @function
     */
    enterVR : { value : function()
    {
        if( this._element )
        {
            this._element.enterVR() ;
        }
    }},

    /**
     * User has exited VR and headset stopped presenting content.
     * @name exitVR
     * @memberof molecule.render.aframe.display.Scene
     * @instance
     * @function
     */
    exitVR : { value : function()
    {
        if( this._element )
        {
            this._element.exitVR() ;
        }
    }},

    /**
     * Revert the scene to its original state.
     * @name reload
     * @memberof molecule.render.aframe.display.Scene
     * @instance
     * @function
     */
    reload : { value : function()
    {
        if( this._element )
        {
            this._element.reload() ;
        }
    }}
});
