"use strict"

import { Material } from './Material.js' ;

import { Text } from './Text.js' ;

/**
 * Creates a new Button instance.
 * @name Button
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.aframe.display.AEntity
 * @param {Object} [init] - The optional generic object to populates and initialize the current screen.
 * @example
 * let scene = new Scene() ;
 * let text = new Button
 * ({
 *     color : '#EF2D5E' ,
 *     value : 'Hello world' ,
 *     width : 10 ,
 *     x     : -0.5 ,
 *     y     : 1 ,
 *     z     : 2
 * }) ;
 *
 * scene.addChild( text ) ;
 */
export function Button( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The backgroundColor component of the text element.
         * @name backgroundColor
         * @memberof molecule.render.aframe.display.Button
         * @instance
         * @default white
         */
        backgroundColor : { writable : true , value : "#00FFFF" } ,

        /**
         * Height in meter.
         * @name height
         * @memberof molecule.render.aframe.display.Button
         * @instance
         * @default 1
         */
        height : { writable : true , value : 1 } ,

        /**
         * Radius in meter.
         * @name radius
         * @memberof molecule.render.aframe.display.Button
         * @instance
         * @default 0
         */
        radius : { writable : true , value : 0 } ,

        /**
         * Width in meter.
         * @name width
         * @memberof molecule.render.aframe.display.Button
         * @instance
         * @default 1
         */
        width : { writable : true , value : 1 } ,

        /**
         * @private
         */
         _geometry : { writable : true , value : null } ,
         _loaded   : { writable : true , value : null } ,
         _material : { writable : true , value : null } ,
         _mesh     : { writable : true , value : null } ,
         _text     : { writable : true , value : null }
    }) ;

    Material.call( this , init , 'a-entity' ) ;

    this._text = new Text() ;

    this.addChild( this._text ) ;

    this._loaded = this.loaded.bind( this ) ;
    this._element.addEventListener( "loaded" , this._loaded ) ;
}

Button.prototype = Object.create( Material.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Button , writable : true } ,

    /**
     * The align of the text element (left, right or center).
     * @name align
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @default left
     */
    align :
    {
        get : function() { return this._text.align ; },
        set : function( value ) { this._text.align = value ; }
    },

    /**
     * Discard text pixels if alpha is less than this value.
     * @name alphaTest
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @default 0.5
     */
    alphaTest :
    {
        get : function() { return this._text.alphaTest ; },
        set : function( value ) { this._text.alphaTest = value ; }
    },

    /**
     * Horizontal positioning (left, center, right, align).
     * @name anchor
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @default center
     */
    anchor :
    {
        get : function() { return this._text.anchor ; },
        set : function( value ) { this._text.anchor = value ; }
    },

    /**
     * Vertical positioning (top, center, bottom).
     * @name baseline
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @default center
     */
    baseline :
    {
        get : function() { return this._text.baseline ; },
        set : function( value ) { this._text.baseline = value ; }
    },

    /**
     * The color component of the text element.
     * @name color
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @default white
     */
    color :
    {
        get : function() { return this._text.color ; },
        set : function( value ) { this._text.color = value ; }
    },

    /**
     * Font to render text, either the name of one of A-Frame’s stock fonts or a URL to a font file
     * @name font
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @see https://aframe.io/docs/0.5.0/components/text.html#stock-fonts
     */
    font :
    {
        get : function() { return this._text.font ; },
        set : function( value ) { this._text.font = value ; }
    },

    /**
     * 	Font image texture path to render text. Defaults to the font‘s name with extension replaced to .png. Don’t need to specify if using a stock font.
     * @name fontImage
     * @memberof molecule.render.aframe.display.Button
     * @instance
     */
    fontImage :
    {
        get : function() { return this._text.fontImage ; },
        set : function( value ) { this._text.fontImage = value ; }
    },

    /**
     * Letter spacing in pixels.
     * @name width
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @default 0
     */
    letterSpacing :
    {
        get : function() { return this._text.letterSpacing ; } ,
        set : function( value ) { this._text.letterSpacing = value ; }
    },

    /**
     * Letter height in pixels.
     * @name letterHeight
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @default 0
     */
    letterHeight :
    {
        get : function() { return this._text.letterHeight ; } ,
        set : function( value ) { this._text.letterHeight = value ; }
    },

    /**
     * Shader used to render text.
     * @name shader
     * @memberof molecule.render.aframe.display.Button
     * @instance
     */
    shader :
    {
        get : function() { return this.getAttribute( 'shader' ) ; } ,
        set : function( value ) { this.setAttribute( 'shader' , value ) ; }
    },

    /**
     * The side to render. (front, back, double)
     * @name side
     * @memberof molecule.render.aframe.display.Button
     * @instance
     */
    side :
    {
        get : function() { return this.getAttribute( 'side' ) ; } ,
        set : function( value ) { this.setAttribute( 'side' , value ) ; }
    },

    /**
     * Tab size in spaces.
     * @name side
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @default 4
     */
    tabSize :
    {
        get : function() { return this._text.tabSize ; } ,
        set : function( value ) { this._text.tabSize = value ; }
    },

    /**
     * The value component reference of the text element.
     * @name value
     * @memberof molecule.render.aframe.display.Button
     * @instance
     */
    value :
    {
        get : function() { return this._text.value ; } ,
        set : function( value ) { this._text.value = value ; }
    },

    /**
     * How whitespace should be handled (i.e., normal, pre, nowrap).
     * @name wrapPixels
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @default normal
     */
    whitespace :
    {
        get : function() { return this._text.whitespace ; } ,
        set : function( value ) { this._text.whitespace = value ; }
    },

    /**
     * The wrapCount component reference of the text element.
     * @name wrapCount
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @default 40
     */
    wrapCount :
    {
        get : function() { return this._text.wrapCount ; } ,
        set : function( value ) { this._text.wrapCount = value ; }
    },

    /**
     * The wrapPixels component reference of the text element.
     * @name wrapPixels
     * @memberof molecule.render.aframe.display.Button
     * @instance
     */
    wrapPixels :
    {
        get : function() { return this._text.wrapPixels ; } ,
        set : function( value ) { this._text.wrapPixels = value ; }
    },

    /**
     * The zOffset component of the text element.
     * @name zOffset
     * @memberof molecule.render.aframe.display.Button
     * @instance
     */
    zOffset :
    {
        get : function() { return this._text.zOffset ; },
        set : function( value ) { this._text.zOffset = value ; }
    },

    /**
     * Invoked when the element is loaded.
     * @name loaded
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @function
     */
    loaded : { value : function()
    {
        this._element.removeEventListener( 'loaded' , this._loaded ) ;
        this._loaded = null ;

        this.render() ;
    }},

    /**
     * The render method to draw and display the element.
     * @name render
     * @memberof molecule.render.aframe.display.Button
     * @instance
     * @function
     */
    render : { value : function()
    {
        let h      = this.height ;
        let radius = this.radius ;
        let w      = this.width ;
        let x      = 0;
        let y      = 0;

        ////// ---- three shape

        let round = new THREE.Shape() ;

        round.moveTo( x, y + radius );
        round.lineTo( x, y + h - radius );
        round.quadraticCurveTo( x, y + h, x + radius, y + h );
        round.lineTo( x + w - radius, y + h );
        round.quadraticCurveTo( x + w, y + h, x + w, y + h - radius );
        round.lineTo( x + w, y + radius );
        round.quadraticCurveTo( x + w, y, x + w - radius, y );
        round.lineTo( x + radius, y );
        round.quadraticCurveTo( x, y, x, y + radius );

        this._geometry = new THREE.ShapeGeometry( round );

        this._material = new THREE.MeshBasicMaterial( { color : this.backgroundColor ,shading: THREE.FlatShading } ) ;

        this._mesh = new THREE.Mesh( this._geometry , this._material ) ;

        // fix position
        this._mesh.position.x = -(w / 2);
        this._mesh.position.y = -(h / 2);

        this._element.setObject3D( 'mesh' , this._mesh ) ;

        this._geometry = null ;
        this._material = null ;
        this._mesh     = null ;
    }}
}) ;
