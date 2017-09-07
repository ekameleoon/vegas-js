"use strict" ;

import { Node } from './Node.js' ;

/**
 * Creates a new Script instance.
 * @name Script
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.Node
 * @param {Object} [init] - The optional generic object to populates and initialize the current node.
 * @example
 * var script = new Script() ;
 * script.src = "myscripts.js" ;
 * script.async = true ;
 * script.chartset = "UTF-8" ;
 *
 * script.element.onload = function( event )
 * {
 *     console.log( "script loaded" ) ;
 *     console.log( event.target ) ;
 * }
 * var body = new Body() ;
 * body.addChild( script ) ;
 */
export function Script ( init = null )
{
    Node.call( this , init , 'script' ) ;
}

Script.prototype = Object.create( Node.prototype ,
{
    constructor : { value : Script , writable : true } ,

    /**
     * Specifies that the script is executed asynchronously (only for external scripts)
     * @name async
     * @memberof molecule.render.aframe.display.Script
     * @instance
     * @example
     * var script = new Script() ;
     * script.src = "myscripts.js" ;
     * script.async = true ;
     * console.log( script.element ) ; // <script src="myscripts.js" async></script>
     */
    async :
    {
        get : function() { return this.element.getAttribute('async') ; },
        set : function( value )
        {
            if( value === true )
            {
                this.element.setAttribute('async','') ;
            }
            else
            {
                this.element.removeAttribute('async') ;
            }
        }
    },

    /**
     * Specifies the character encoding used in an external script file
     * @name charset
     * @memberof molecule.render.aframe.display.Script
     * @instance
     * @example
     * var script = new Script() ;
     * script.src = "myscripts.js" ;
     * script.chartset = "UTF-8" ;
     * console.log( script.element ) ; // <script src="myscripts.js" charset="UTF-8"></script>
     */
    charset :
    {
        get : function() { return this.element.charset ; },
        set : function( value ) { this.element.charset = value; }
    },

    /**
     * Specifies that the script is executed when the page has finished parsing (only for external scripts)
     * @name defer
     * @memberof molecule.render.aframe.display.Script
     * @instance
     * @example
     * var script = new Script() ;
     * script.src = "myscripts.js" ;
     * script.defer = true ;
     * console.log( script.element ) ; // <script src="myscripts.js" defer></script>
     */
    defer :
    {
        get : function() { return this.element.getAttribute('defer') ; },
        set : function( value )
        {
            if( value === true )
            {
                this.element.setAttribute('defer' , '' ) ;
            }
            else
            {
                this.element.removeAttribute('defer') ;
            }
        }
    },

    /**
     * Specifies the URL of an external script file.
     * @name src
     * @memberof molecule.render.aframe.display.Script
     * @instance
     * @example
     * <script src="myscripts.js"></script>
     */
    src :
    {
        get : function() { return this.element.src ; },
        set : function( value ) { this.element.src = value; }
    },

    /**
     * Specifies the media type of the script.
     * @name type
     * @memberof molecule.render.aframe.display.Script
     * @instance
     * @example
     * <script type="application/javascript"></script>
     */
    type :
    {
        get : function() { return this.element.type ; },
        set : function( value ) { this.element.type = value; }
    }
}) ;
