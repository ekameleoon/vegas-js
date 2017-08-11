/* jshint -W089*/
/* jshint -W098*/
"use strict" ;

import { Event } from './system/events/Event.js' ;
import { DisplayObject } from './DisplayObject.js' ;

/**
 * Creates a new Node instance.
 * @name DisplayObjectContainer
 * @class
 * @memberof molecule.display
 * @extends molecule.display.DisplayObject
 * @param {Object} [init] - The optional generic object to populates and initialize the current View.
 */
export function DisplayObjectContainer( init = null )
{
    Object.defineProperties( this ,
    {
        _broadcastListeners : { value : [] } ,
        _children           : { value : [] }
    }) ;
    DisplayObject.call( this , init ) ;
}

DisplayObjectContainer.prototype = Object.create( DisplayObject.prototype ,
{
    /**
     * The reference to the Object function that created the instance's prototype.
     */
    constructor : { value : DisplayObjectContainer , writable : true } ,

    /**
     * The children collection of all display register in this container.
     * @name children
     * @memberof molecule.display.DisplayObject
     * @instance
     * @readonly
     */
    children : { get : function()
    {
        return this._children ;
    }},

    /**
     * Returns the number of children of this object.
     * @name numChildren
     * @memberof molecule.display.DisplayObject
     * @instance
     * @readonly
     */
    numChildren : { get : function()
    {
        return this._children.length ;
    }},

    /**
     * Adds a node to the end of the list of children of a specified parent node.
     * If the given child is a reference to an existing node in the document, addChild() moves it from its current position to the new position (there is no requirement to remove the node from its parent node before appending it to some other node).
     * @name addChild
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     * @param {HTMLElement|molecule.display.Node} value - The element to add in the View.
     */
    addChild : { value : function( child )
    {
        return this.addChildAt( child , this._children.length );
    }},

    /**
     * Adds a node at a specific position of the list of children of a specified parent node.
     * If the given child is a reference to an existing node in the document, addChildAt() moves it from its current position to the new position (there is no requirement to remove the node from its parent node before appending it to some other node).
     * @name addChildAt
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     * @param {molecule.display.Node} child - The node element to add in the container.
     * @param {Number} index - The index position to which the child is added.
     */
    addChildAt : { value : function( child , index )
    {
        if( child instanceof DisplayObject )
        {
            let numChildren = this._children.length ;

            if ( index >= 0 && index <= numChildren )
            {
                if( child.parent === this )
                {
                    this.setChildIndex(child, index) ;
                }
                else
                {
                    if ( index >= numChildren )
                    {
                        this._children.push( child ) ;
                        this._appendChild( child ) ;
                    }
                    else
                    {
                        this._children.splice( index , 0 , child ) ;
                        this._insertChildAt( child , index ) ;
                    }

                    child.removeFromParent() ;
                    child.setParent( this );
                    child.dispatchEvent( new Event( Event.ADDED , true ) ) ;

                    if( this.stage )
                    {
                        let event = new Event( Event.ADDED_TO_STAGE ) ;
                        if( child instanceof DisplayObjectContainer )
                        {
                            child.broadcastEvent( event )
                        }
                        else
                        {
                            child.dispatchEvent(event);
                        }
                    }
                }
                return child ;
            }
            else
            {
                throw new RangeError( this + " addChildAt(" + index + ") failed, invalid child index.");
            }
        }
        return null ;
    }} ,

    /**
     * Returns a Boolean value indicating whether a node is a descendant of a given node or not.
     * @name contains
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     * @param {molecule.display.Node} child - The node element to evaluate.
     */
    contains : { value : function( child )
    {
        while (child)
        {
            if (child === this)
            {
                return true;
            }
            else
            {
                child = child._parent;
            }
        }
        return false;
    }},

    /**
     * Returns a child object at a certain index. If you pass a negative index, '-1' will return the last child, '-2' the second to last child, etc.
     * @name getChildAt
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     * @param {Number} index - The index to find a child in the container.
     * @throws {RangeError} If the index is out of the container bounds.
     */
    getChildAt : { value : function( index )
    {
        let numChildren = this._children.length;
        if (index < 0)
        {
            index = numChildren + index;
        }
        if (index >= 0 && index < numChildren)
        {
            return this._children[index];
        }
        else
        {
            throw new RangeError("Invalid child index");
        }
    }},

    /**
     * Returns the index of a child within the container, or "-1" if it is not found.
     * @name getChildIndex
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     * @param {molecule.display.Node} value - The child to find.
     * @return the index of a child within the container, or "-1" if it is not found.
     */
    getChildIndex : { value : function( child )
    {
        return this._children.indexOf(child);
    }},

    /**
     * Removes a node of the list of children of a specified parent node.
     * @name removeChild
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     * @param {molecule.display.Node} child - The child to remove.
     * @param {Boolean} [dispose=false] - If requested, the child will be disposed right away.
     */
    removeChild : { value : function( child , dispose = false )
    {
        let index = this.getChildIndex(child);
        if ( index !== -1 )
        {
            return this.removeChildAt( index , dispose );
        }
        return null ;
    }},

    /**
     * Removes a child at a certain index.
     * @name removeChild
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     * @param {Number} index - The index to remove a specific child.
     * @param {Boolean} [dispose=false] - If requested, the child will be disposed right away.
     */
    removeChildAt : { value : function( index , dispose = false )
    {
        if (index >= 0 && index < this._children.length )
        {
            let child = this._children[index];

            child.dispatchEvent( new Event( Event.REMOVED, true ) );

            if( this.stage )
            {
                let event = new Event( Event.REMOVED_FROM_STAGE ) ;
                if( child instanceof DisplayObjectContainer )
                {
                    child.broadcastEvent(event)
                }
                else
                {
                    child.dispatchEvent(event);
                }
            }

            child.setParent(null);

            index = this._children.indexOf( child ) ; // index might have changed by event handler

            if (index >= 0)
            {
                this._children.splice( index , 0 , child ) ;
                this._removeChild( child ) ;
            }

            if( dispose === true )
            {
                child.dispose() ;
            }

            return child;
        }
        else
        {
            throw new RangeError( this + " removeChildAt failed with an invalid child index");
        }
    }},

    /**
     * Removes all the nodes of the list of children of a specified parent node.
     * @name removeChildren
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     * @param {Number} [beginIndex=0] - The first index to remove the children in the container.
     * @param {Number} [endIndex=0] - The end index to remove the children in the container.
     * @param {Boolean} [dispose=false] - If requested, the child will be disposed right away.
     */
    removeChildren : { value : function( beginIndex = 0 , endIndex = -1 , dispose = false )
    {
        let len = this._children.length ;

        if ( (endIndex < 0) || (endIndex >= len) )
        {
            endIndex = len - 1;
        }

        let children = this._children.slice( beginIndex, endIndex - beginIndex + 1 ) ;

        len = children.length ;

        for( let i = 0 ; i <= len ; i++ )
        {
            this.removeChild(children[i], dispose);
        }
    }},

    /**
     * Moves a child to a certain index. Children at and after the replaced position move up.
     * @name setChildIndex
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     */
    setChildIndex : { value : function( child , index )
    {
        if( child instanceof Node )
        {
            let oldIndex = this.getChildIndex( child ) ;
            if (oldIndex === index)
            {
                return;
            }
            if (oldIndex === -1)
            {
                throw new Error( this + " setChildIndex failed, the passed-in child reference is not a child of this container." );
            }

            this._children.splice( oldIndex, 1 ) ;
            this._children.splice( index , 0 , child ) ;

            if( this._element )
            {
                if ( index >= this._children.length )
                {
                    this._element.appendChild( child._element ) ;
                }
                else
                {
                    this._element.insertBefore( child._element, this._element.children[index] ) ;
                }
            }
        }
    }},

    // ----- private

    /**
     * Dispatches an event on all children (recursively). The event must not bubble.
     * @name broadcastEvent
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     * @private
     * @example
     * // ----------- behaviours
     * var listener = function( event )
     * {
     *     var child = event.target ;
     *     if( child )
     *     {
     *         console.log( "listener " + child.name + " " + event ) ;
     *     }
     * }
     *
     * // ----------- initialize
     *
     * let child1 = new Node('div') ;
     * let child2 = new Node('div') ;
     * let child3 = new Node('div') ;
     * let child4 = new Node('div') ;
     * let child5 = new Node('div') ;
     * let child6 = new Node('div') ;
     * let child7 = new Node('div') ;
     * let child8 = new Node('div') ;
     *
     * let children = [ child1 , child2 , child3 , child4 , child5 , child6 , child7 , child8 ] ;
     *
     * for( var i = 0 ; i<children.length ; i++ )
     * {
     *     let child = children[i] ;
     *     if( child )
     *     {
     *         child.addEventListener( Event.ADDED_TO_STAGE , listener ) ;
     *         child.name = "child" + (i+1) ;
     *         console.log( child.name ) ;
     *     }
     * }
     *
     * let container1 = new Node('div') ;
     * container1.addEventListener( Event.ADDED_TO_STAGE , listener ) ;
     * container1.name = "container1" ;
     *
     * container1.addChild( child1 ) ;
     * container1.addChild( child2 ) ;
     *
     * child1.addChild( child5 ) ;
     * child1.addChild( child6 ) ;
     *
     * child2.addChild( child7 ) ;
     * child2.addChild( child8 ) ;
     *
     * let container2 = new Node('div') ;
     * container2.addEventListener( Event.ADDED_TO_STAGE , listener ) ;
     * container2.name = "container2" ;
     *
     * container2.addChild( child3 ) ;
     * container2.addChild( child4 ) ;
     *
     * // -----------
     *
     * stage.addChild( container1 ) ;
     * stage.addChild( container2 ) ;
     */
    broadcastEvent : { value : function( event )
    {
        if( !(event instanceof Event) )
        {
            throw new ReferenceError( this + " broadcastEvent failed, the event parameter must be a valid system.events.Event reference." ) ;
        }

        if ( event.bubbles )
        {
            throw new ReferenceError("Broadcast of bubbling events is prohibited");
        }

        let fromIndex = this._broadcastListeners.length;

        this.getChildEventListeners( this, event.type , this._broadcastListeners );

        let toIndex = this._broadcastListeners.length;

        for( let i = fromIndex ; i < toIndex ; i++ )
        {
            this._broadcastListeners[i].dispatchEvent( event ) ;
        }

        this._broadcastListeners.length = fromIndex ;
    }},

    /**
     * @name getChildEventListeners
     * @memberof molecule.display.DisplayObject
     * @function
     * @instance
     * @private
     */
    getChildEventListeners : { value : function( object, eventType, listeners )
    {
        try
        {
            if ( object.hasEventListener( eventType ) )
            {
                listeners[listeners.length] = object ;
            }

            if ( object instanceof DisplayObjectContainer )
            {
                let children = object._children;
                let len      = children.length;

                for ( let i = 0 ; i<len ; i++ )
                {
                    this.getChildEventListeners( children[i] , eventType , listeners );
                }
            }
        }
        catch (e)
        {
            console.log( this + " error " + e ) ;
        }
    }},

    //// -----------

    /**
     * @private
     */
    _appendChild : { writable : true , value : function( child )
    {
        //
    }},

    /**
     * @private
     */
    _insertChildAt : { writable : true , value : function( child , index )
    {
        //
    }},

    /**
     * @private
     */
    _removeChild : { writable : true , value : function( child )
    {
        //
    }}

    //// -----------
}) ;
