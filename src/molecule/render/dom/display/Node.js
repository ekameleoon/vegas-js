/* jshint -W089*/
"use strict" ;

import { isString }  from 'core/isString.js' ;
import { isHTMLElement } from 'core/dom/isHTMLElement.js' ;
import { DisplayObjectContainer } from 'molecule/display/DisplayObjectContainer.js' ;

/**
 * Creates a new Node instance.
 * @name Node
 * @class
 * @memberof molecule.render.dom.display
 * @extends molecule.render.dom.display.DisplayObjectContainer
 * @param {Object} [init] - The optional generic object to populates and initialize the current node.
 * @param {String|HTMLElement} [tag=null] - The name of the tag to create when the new entity is created or an HTMLElement reference.
 */
export function Node( init = null , tag = null )
{
    let el = null ;

    if( isHTMLElement(tag) )
    {
        el = tag ;
    }
    else if( isString(tag) )
    {
        el = document.createElement( tag ) ;
    }

    Object.defineProperties( this ,
    {
        _element : { value : el , writable : true }
    }) ;

    DisplayObjectContainer.call( this , init ) ;
}

Node.prototype = Object.create( DisplayObjectContainer.prototype ,
{
    constructor : { value : Node , writable : true } ,

    /**
     * Add class to the element.
     * @name addClass
     * @memberof molecule.display.Node
     * @instance
     */
    addClass : { value : function( value )
    {
        if( !this._element.classList.contains( value ) )
        {
            this._element.classList.add( value ) ;
        }
    }},

    /**
     * The id of the element.
     * @name id
     * @memberof molecule.display.Node
     * @instance
     */
    id :
    {
        get : function() { return this._element.id ; },
        set : function( value )
        {
            this._element.id = value;
        }
    },

    /**
     * The class of the element.
     * @name class
     * @memberof molecule.display.Node
     * @instance
     */
    class :
    {
        get : function() { return this.getAttribute( "class" ) ; },
        set : function( value )
        {
            this.setAttribute( "class" , value );
        }
    },

    /**
     * The DOM element of this node.
     * You can affect an HTMLElement reference or a String ID attribute.
     * @name element
     * @memberof molecule.display.Node
     * @instance
     * @example
     * let node1 = new Node(document.createElement('div')) ;
     * node1.setAttribute('id', 'el1') ; // <div id="el1" />
     *
     * let node2 = new Node('div') ;
     * node2.setAttribute('id', 'el2') ; // <div id="el2" />
     *
     * console.log( node.element1 ) ;
     * console.log( node.element2 ) ;
     */
    element :
    {
        get : function() { return this._element ; },
        set : function( value )
        {
            this._element = null ;
            if( isHTMLElement(value) )
            {
                this._element = value ;
            }
            else if( isString(value) )
            {
                this._element = document.getElementById( value ) ;
            }
        }
    },

    /**
     * Returns the value of a specified attribute on the element.
     * @name getAttribute
     * @memberof molecule.display.Node
     * @instance
     * @function
     * @param {String} name - The name of the attribute.
     * @return {String} The value of a specified attribute on the element.
     */
    getAttribute : { value : function( name )
    {
        if( this._element )
        {
            return this._element.getAttribute( name ) ;
        }
        return null ;
    }},

    /**
     * Remove class to the element.
     * @name removeClass
     * @memberof molecule.display.Node
     * @instance
     */
    removeClass : { value : function( value )
    {
        if( this._element.classList.contains( value ) )
        {
            this._element.classList.remove( value ) ;
        }
    }},

    /**
     * Sets the value of a specified attribute on the element.
     * @name setAttribute
     * @memberof molecule.display.Node
     * @function
     * @instance
     * @param {String} name - The name of the attribute.
     * @param {String} value - The value of the attribute.
     */
    setAttribute : { value : function( name , value )
    {
        if( this._element )
        {
            this._element.setAttribute( name , value ) ;
        }
    }},

    /**
     * @private
     */
    _appendChild : { writable : true , value : function( child )
    {
        if( child && child._element && this._element )
        {
            this._element.appendChild( child._element ) ;
        }
    }},

    /**
     * @private
     */
    _insertChildAt : { writable : true , value : function( child , index )
    {
        if( this._element && child && child._element  )
        {
            this._element.insertBefore( child._element, this._element.children[index] ) ;
        }
    }},

    /**
     * @private
     */
    _removeChild : { writable : true , value : function( child )
    {
        if( child && child._element )
        {
            child._element.parentNode.removeChild(child._element);
        }
    }}
}) ;
