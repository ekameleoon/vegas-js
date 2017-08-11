"use strict" ;

import { Node }  from '../display/Node.js' ;
import { clamp } from './core/maths/clamp.js' ;

/**
 * Creates a new Video instance.
 * @name Video
 * @class
 * @memberof molecule.render.dom.medias
 * @extends molecule.render.dom.display.Node
 */
export function Video ()
{
    Node.call( this , null , 'video' ) ;
}

Video.prototype = Object.create( Node.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : Video , writable : true } ,

    /**
     * The autoplay of the element.
     * @name autoplay
     * @memberof molecule.render.dom.medias.Video
     * @instance
     */
    autoplay :
    {
        get : function() { return this.getAttribute('autoplay') ; },
        set : function( value )
        {
            if( value === true )
            {
                this.setAttribute( 'autoplay' , '' ) ;
            }
            else
            {
                this.removeAttribute( 'autoplay' );
            }
        }
    },

    /**
     * The controls of the element.
     * @name controls
     * @memberof molecule.render.dom.medias.Video
     * @instance
     */
    controls :
    {
        get : function() { return this.getAttribute('controls') ; },
        set : function( value )
        {
            if( value === true )
            {
                this.setAttribute( 'controls' , '' ) ;
            }
            else
            {
                this.removeAttribute( 'controls' );
            }
        }
    },

    /**
     * The controls of the element.
     * @name controls
     * @memberof molecule.render.dom.medias.Video
     * @instance
     */
    crossorigin :
    {
        get : function() { return this.getAttribute('crossOrigin') ; },
        set : function( value )
        {
            this.setAttribute( 'crossOrigin' , value ) ;
        }
    },

    /**
     * The id of the element.
     * @name id
     * @memberof molecule.render.dom.medias.Video
     * @instance
     */
    id :
    {
        get : function() { return this.element.id ; },
        set : function( value )
        {
            this.element.id = value;
        }
    },

    /**
     * The loop of the element.
     * @name loop
     * @memberof molecule.render.dom.medias.Video
     * @instance
     */
    loop :
    {
        get : function() { return this.getAttribute('loop') ; },
        set : function( value )
        {
            this.setAttribute( 'loop' , value ) ;
        }
    },

    /**
     * The muted of the element.
     * @name muted
     * @memberof molecule.render.dom.medias.Video
     * @instance
     */
    muted :
    {
        get : function() { return this.getAttribute('muted') ; },
        set : function( value )
        {
            this.setAttribute( 'muted' , value ) ;
        }
    },

    /**
     * The poster of the element.
     * @name poster
     * @memberof molecule.render.dom.medias.Video
     * @instance
     */
    poster :
    {
        get : function() { return this.getAttribute('poster') ; },
        set : function( value )
        {
            this.setAttribute( 'poster' , value ) ;
        }
    },

    /**
     * The preload of the element.
     * @name preload
     * @memberof molecule.render.dom.medias.Video
     * @instance
     */
    preload :
    {
        get : function() { return this.getAttribute('preload') ; },
        set : function( value )
        {
            this.setAttribute( 'preload' , value ) ;
        }
    },

    /**
     * The src of the element.
     * @name src
     * @memberof molecule.render.dom.medias.Video
     * @instance
     */
    src :
    {
        get : function() { return this.getAttribute('src') ; },
        set : function( value )
        {
            this.setAttribute( 'src' , value ) ;
        }
    },

    /**
     * The volume of the element.
     * @name volume
     * @memberof molecule.render.dom.medias.Video
     * @instance
     */
    volume :
    {
        get : function() { return this.getAttribute('volume') ; },
        set : function( value )
        {
            this.setAttribute( 'volume' , clamp(value,0,1) ) ;
        }
    }
}) ;
