/* jshint -W089*/
"use strict" ;

import { isString } from './core/isString.js' ;
import { EventDispatcher } from './system/events/EventDispatcher.js' ;

/**
 * Creates a new DisplayObject instance.
 * @name DisplayObject
 * @class
 * @memberof molecule.display
 * @extends system.events.EventDispatcher
 * @param {Object} [init] - The optional generic object to populates and initialize the current node.
 */
export function DisplayObject( init = null )
{
    EventDispatcher.call( this ) ;

    Object.defineProperties( this ,
    {
        _id       : { value : null  , writable : true } ,
        __isStage : { value : false , writable : true } ,
        _parent   : { value : null  , writable : true }
    }) ;

    if( init )
    {
        for( let prop in init )
        {
            if( prop in this )
            {
                this[prop] = init[prop] ;
            }
        }
    }
}

DisplayObject.prototype = Object.create( EventDispatcher.prototype ,
{
    constructor : { value : DisplayObject , writable : true } ,

    /**
     * The topmost object in the display tree the object is part of.
     * @name base
     * @memberof molecule.display.DisplayObject
     * @instance
     */
    base :
    {
        get : function()
        {
            let current = this ;
            while( current._parent )
            {
                current = current._parent;
            }
            return current ;
        }
    },

    /**
     * The unique 'id' identifier of the node.
     * @name id
     * @memberof molecule.display.DisplayObject
     * @instance
     */
    id :
    {
        get : function() { return this._id ; },
        set : function( value )
        {
            this._id = isString(value) ? value : null ;
            if( this._element )
            {
                this.setAttribute( 'id' , value ) ;
            }
        }
    },

    /**
     * The DisplayObject container that contains this display object.
     * @name parent
     * @memberof molecule.display.DisplayObject
     * @instance
     */
    parent :
    {
        get : function() { return this._parent ; }
    },

    /**
     * The root object the node object is connected to or null if the object is not connected to the stage.
     * @name root
     * @memberof molecule.display.DisplayObject
     * @instance
     */
    root :
    {
        get : function()
        {
            let current = this ;
            while( current._parent )
            {
                if ( current._parent.__isStage )
                {
                    return current ;
                }
                else
                {
                    current = current._parent ;
                }
            }
            return current ;
        }
    },

    /**
     * The stage the display object is connected to, or null if it is not connected to the stage.
     * @name parent
     * @memberof molecule.display.DisplayObject
     * @instance
     */
    stage :
    {
        get : function()
        {
            let base = this.base ;
            return base && base.__isStage ? base : null ;
        }
    },

    /**
     * Disposes all resources of the display object (event listeners are removed).
     * @name dispose
     * @memberof molecule.display.DisplayObject
     * @instance
     * @function
     */
    dispose : { value : function()
    {
        // this.removeEventListeners() ; // FIXME in VEGAS JS, add the removeEventListeners()
    }},

    /**
     * Removes the object from its parent, if it has one, and optionally disposes it.
     * @name removeFromParent
     * @memberof molecule.display.DisplayObject
     * @instance
     * @function
     */
    removeFromParent : { value : function()
    {
        if ( this._parent )
        {
            this._parent.removeChild( this );
        }
    }},

    // ------- private

    /**
     * @private
     * @name createAncestorChain
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     */
    createAncestorChain : { value : function()
    {
        let ancestors = [] ;
        let current = this ;
        while( current._parent )
        {
            ancestors.push( current._parent ) ;
            current = current._parent ;
        }
        return ancestors ;
    }},

    /**
     * @private
     * @name setParent
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     */
    setParent : { value : function( value )
    {
        let ancestor = value ;

        while ( (ancestor !== this) && (ancestor !== null) )
        {
            ancestor = ancestor._parent ;
        }

        if( ancestor === this )
        {
            throw new ReferenceError("An object cannot be added as a child to itself or one of its children.");
        }
        else
        {
            this._parent = value;
        }
    }}
}) ;
