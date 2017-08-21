"use strict" ;

import { Layout } from './graphics/Layout.js' ;
import { LayoutEntry } from './graphics/LayoutEntry.js' ;

/**
 * The basic implementation of the layouts.
 * @name LayoutContainer
 * @class
 * @memberof molecule.render.pixi.layouts
 * @extends graphics.Layout
 * @constructor
 */
export function LayoutContainer( container = null , init = null )
{
    Layout.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _children : { writable : false , value : [] }
    });
    this.container = container ;
    if ( init )
    {
        this.lock() ;
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
        this.unlock() ;
    }
}

LayoutContainer.prototype = Object.create( Layout.prototype ,
{
    constructor : { writable : true , value : LayoutContainer },

    /**
     * The collection of all display objects register in the layout buffer.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @type {Array}
     * @instance
     * @readonly
     */
    children : { get : function()
    {
        let result = [] ;
        this._children.forEach( ( entry ) => result.push( entry.child ) ) ;
        return result ;
    }},

    /**
     * The number of children of this object.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @type {number}
     * @instance
     * @readonly
     */
    numChildren : { get : function()
    {
        return this._children.length ;
    }},

    /**
     * Adds a child DisplayObject instance to this layout instance.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @instance
     * @function
     * @param {PIXI.DisplayObject} child - The child to insert in the layout container.
     */
    addChild : { value : function( child )
    {
        let index = this.indexOf( child ) ;
        if( index > -1 )
        {
            this._children.splice( index , 1 ) ;
        }
        this._children.push( new LayoutEntry(child) ) ;
        return child ;
    }},

    /**
     * Adds a child DisplayObject instance to this layout instance. The child is added at the index position specified. An index of 0 represents the back (bottom) of the display list for this layout object.
     * @throws RangeError Throws if the index position does not exist in the child list.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @instance
     * @function
     * @param {PIXI.DisplayObject} child - The child to insert in the layout container.
     * @param {number} index - The numeric position to insert a new child in the container.
     */
    addChildAt : { value : function( child , index )
    {
        if( index < 0 || index > this._children.length )
        {
            throw new RangeError( this + " addChildAt failed, the index position does not exist in the child list." ) ;
        }
        var who = this.indexOf(child) ;
        if( who > -1 )
        {
            this._children.splice( who , 1 ) ;
        }
        this._children.splice( index , 0 , new LayoutEntry( child ) ) ;
        return child ;
    }},

    /**
     * Determines whether the specified display object is a child of the layout instance or the instance itself.
     * @return true if the child object is a child of the layoyt or the container itself; otherwise false.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @instance
     * @function
     * @param {PIXI.DisplayObject} child - The child to insert in the layout container.
     */
    contains : { value : function( child )
    {
        return this.indexOf(child) > -1 ;
    }},

    /**
     * Returns the child display object instance that exists at the specified index.
     * @param {number} index - The numeric position of the child in the container.
     * @return The child display object at the specified index position.
     * @throws RangeError Throws if the index does not exist in the child list.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @instance
     * @function
     */
    getChildAt : { value : function( index )
    {
        if( index < 0 || index >= this._children.length )
        {
            throw new RangeError( this + " getChildAt failed, the index does not exist in the child list." ) ;
        }
        return this._children[index].child ;
    }},

    /**
     * Returns the index position of a child DisplayObject instance.
     * @param child The DisplayObject instance to identify.
     * @return The index position of the child display object to identify.
     * @throws ReferenceError Throws if the child parameter is not a child of this object.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @instance
     * @function
     */
    getChildIndex : { value : function( child )
    {
        let index = this.indexOf( child ) ;
        if( index > -1  )
        {
            return index ;
        }
        else
        {
            throw new ReferenceError( this + " getChildIndex failed, the child parameter is not a child of this object." ) ;
        }
    }},

    /**
     * Returns the index of the specific child in the container or -1.
     * @return the index of the specific child in the container or -1.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @instance
     * @function
     */
    indexOf : { value : function( child )
    {
        let i = 0 ;
        this._children.forEach( ( entry ) =>
        {
            if( entry.child === child )
            {
                return i ;
            }
            i++ ;
        }) ;
        return -1 ;
    }},

    /**
     * Initialize the layout container with the specific elements. This method flush the layout container and remove all old elements register in the collection before initialize it.
     * @param {Array|PIXI.Container} [children=null] - An Array of element PIXI.DisplayObject references or a PIXI.Container to register. If this argument is null the layout is only flushed.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @function
     * @instance
     */
    initialize : { writable : true  , value : function( elements = null )
    {
        let children = this._children ;
        children.length = 0 ;
        if( elements instanceof Array )
        {
            elements.forEach( function( child )
            {
                if( child instanceof PIXI.DisplayObject )
                {
                    children.push( new LayoutEntry( child ) )  ;
                }
            });
        }
        else if ( elements instanceof PIXI.Container )
        {
            let len = elements.children.length ;
            if ( len >  0 )
            {
                for( let i = 0 ; i<len ; i++ )
                {
                    children.push( new LayoutEntry( elements.getChildAt(i) ) ) ;
                }
            }
        }
    }} ,

    /**
     * Removes the specified child DisplayObject instance from the child list of the layout instance.
     * @param {PIXI.DisplayObject} child - The DisplayObject instance to remove.
     * @return The DisplayObject instance that you pass in the child parameter.
     * @throws ReferenceError Throws if the child parameter is not a child of this object.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @function
     * @instance
     */
    removeChild : { value : function( child )
    {
        let index = this.indexOf( child ) ;
        if( index > -1 )
        {
            this._children.splice( index , 1 ) ;
            return child ;
        }
        else
        {
            throw new ReferenceError( this + " removeChild failed, the child parameter is not a child of this object." ) ;
        }
    }},

    /**
     * Removes a child DisplayObject from the specified index position in the child list of the layout.
     * @param {number} index - The child index of the DisplayObject to remove.
     * @return The DisplayObject instance that was removed.
     * @throws RangeError Throws if the index does not exist in the child list.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @function
     * @instance
     */
    removeChildAt : { value : function( index )
    {
        if( index < 0 || index >= this._children.length )
        {
            throw new RangeError( this + " removeChildAt failed, the index does not exist in the child list." ) ;
        }
        let child = this._children[index].child ;
        this._children.splice( index , 1 ) ;
        return child ;
    }},

    /**
     * Removes all child DisplayObject instances from the child list of the layout instance.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @function
     * @instance
     */
    removeChildren : { value : function( beginIndex = 0, endIndex = 0x7FFFFFFF )
    {
        this._children.splice( beginIndex , endIndex - beginIndex + 1 ) ;
    }},

    /**
     * Changes the position of an existing child in the display object container.
     * @param child The child DisplayObject instance for which you want to change the index number.
     * @param index The resulting index number for the child display object.
     * @throws ReferenceError Throws if the child parameter is not a child of this object.
     * @throws RangeError Throws if the index does not exist in the child list.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @function
     * @instance
     */
    setChildIndex : { value : function( child , index )
    {
        if( index < 0 || index >= this._children.length )
        {
            throw new RangeError( this + " setChildIndex failed, the index does not exist in the child list." ) ;
        }
        let who = this.indexOf( child ) ;
        if( who > -1 )
        {
            let entry = this._children[index] ;
            this._children[who]   = this._children[index] ;
            this._children[index] = entry ;
        }
        else
        {
            throw new ReferenceError( this + " setChildIndex failed, the child parameter is not a child of this object." ) ;
        }
    }},

    /**
     * Swaps the z-order (front-to-back order) of the two specified child objects. All other child objects in the layout remain in the same index positions.
     * @param {PIXI.DisplayObject} child1 - The first child object.
     * @param {PIXI.DisplayObject} child2 - The second child object.
     * @throws RererenceError Throws if either child parameter is not a child of this object.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @function
     * @instance
     */
    swapChildren : { value : function( child1, child2 )
    {
        let index1 = this.indexOf( child1 ) ;
        let index2 = this.indexOf( child2 ) ;
        if( index1 > -1 && index2 > -1 )
        {
            let entry = this._children[index1] ;
            this._children[index1] = this._children[index2] ;
            this._children[index2] = entry ;
        }
        else
        {
            throw new ReferenceError( this + " swapChildren failed, either child parameter is not a child of this object.") ;
        }
    }},

    /**
     * Swaps the z-order (front-to-back order) of the child objects at the two specified index positions in the child list.
     * @param {number} index1 - The index position of the first child object.
     * @param {number} index2 - The index position of the second child object.
     * @throws RangeError If either index does not exist in the child list.
     * @memberof molecule.render.pixi.layouts.LayoutContainer
     * @function
     * @instance
     */
    swapChildrenAt : { value : function( index1, index2 )
    {
        if( ( index1 < 0 || index1 >= this._children.length ) || ( index2 < 0 || index2 >= this._children.length ) )
        {
            throw new RangeError( this + " swapChildrenAt failed, either index does not exist in the child list." ) ;
        }
        let entry = this._children[index1] ;
        this._children[index1] = this._children[index2] ;
        this._children[index2] = entry ;
    }}
});