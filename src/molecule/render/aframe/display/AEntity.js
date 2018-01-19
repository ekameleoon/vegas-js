"use strict"

import { clamp } from 'core/maths/clamp.js' ;

import { Event as EventType } from 'system/events/Event.js' ;
import { Signal } from 'system/signals/Signal.js' ;

import { Node }  from 'molecule/render/dom/display/Node.js' ;

/**
 * Creates a new AEntity instance.
 * @name AEntity
 * @class
 * @memberof molecule.render.aframe.display
 * @extends molecule.render.dom.display.Node
 * @param {Object} [init=null] - The optional generic object to populates and initialize the current screen.
 * @param {String|HTMLElement} [tag=a-entity] - The name of the tag to create when the new entity is created or an HTMLElement reference.
 */
export function AEntity( init = null , tag = 'a-entity' )
{
    Object.defineProperties( this ,
    {
        /**
         * Emits addedToStage.
         * @name addedToStage
         * @memberof molecule.render.aframe.display.AEntity
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        addedToStage : { value : new Signal() } ,

        /**
         * Emits removedFromStage.
         * @name removedFromStage
         * @memberof molecule.render.aframe.display.AEntity
         * @type {system.signals.Signal}
         * @instance
         * @const
         */
        removedFromStage : { value : new Signal() } ,

        /**
         * @private
         */
        _addedToStage     : { writable : true , value : null } ,
        _onStage          : { writable : true , value : false } ,
        _position         : { writable : false , value : { x : 0 , y : 0 , z : 0 } } ,
        _raycast          : { writable : false , value : 'button' } ,
        _removedFromStage : { writable : true , value : null } ,
        _rotation         : { writable : false , value : { x : 0 , y : 0 , z : 0 } } ,
        _root             : { writable : true  , value : null } ,
        _scale            : { writable : false , value : { x : 1 , y : 1 , z : 1 } }
    }) ;

    Node.call( this , init , tag ) ;

    this._addedToStage = this.__addedToStage.bind( this ) ;
    this._removedFromStage = this.__removedFromStage.bind( this ) ;

    this.addEventListener( EventType.ADDED_TO_STAGE     , this._addedToStage ) ;
    this.addEventListener( EventType.REMOVED_FROM_STAGE , this._removedFromStage ) ;
}

AEntity.prototype = Object.create( Node.prototype ,
{
    constructor : { value : AEntity , writable : true } ,

    /**
     * The alpha component to set the opacity of the entity (same as the 'opacity' property).
     * @name alpha
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     * @default 1
     */
    alpha :
    {
        get : function() { return this.getAttribute('opacity') ; },
        set : function( value )
        {
            this.setAttribute( 'opacity' , clamp(value,0,1) ) ;
        }
    },

    /**
     * This method dispose the instance before to be removed.
     * @name dispose
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     * @function
     */
    dispose : { value : function()
    {
        this.removeEventListener( EventType.ADDED_TO_STAGE     , this._addedToStage ) ;
        this.removeEventListener( EventType.REMOVED_FROM_STAGE , this._removedFromStage ) ;
    }},

    /**
     * The geometry of the entity.
     * @name geometry
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    geometry :
    {
        get : function() { return this.getAttribute( 'geometry' ) ; },
        set : function( value ) { this.setAttribute( 'geometry' , value ) ; }
    },

    /**
     * The raycasted set the entity to be hit by a raycaster.
     * @name raycasted
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     * @default false
     */
    raycasted :
    {
        get : function() { return this._element.classList.contains( this._raycast ) ; },
        set : function( value )
        {
            if( value === true )
            {
                this._element.classList.add( this._raycast ) ;
            }
            else
            {
                if( this._element.classList.contains( this._raycast ) )
                {
                    this._element.classList.remove( this._raycast ) ;
                }
            }
        }
    },

    /**
     * The raycast set the value for the raycaster objects.
     * @name raycast
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     * @default button
     */
    raycast :
    {
        get : function() { return this._raycast ; },
        set : function( value )
        {
            if( value !== this._raycast )
            {
                this.raycasted = false ;
            }
            this._raycast = value ;
            this.raycasted = true ;
        }
    },

    /**
     * The opacity component to set the opacity of the entity.
     * @name alpha
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     * @default 1
     */
    opacity :
    {
        get : function() { return this.getAttribute('opacity') ; },
        set : function( value )
        {
            this.setAttribute( 'opacity' , clamp(value,0,1) ) ;
        }
    },

    /**
     * The position of the entity.
     * @name position
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    position :
    {
        get : function() { return this._position ; },
        set : function( value )
        {
            if( 'x' in value )
            {
                this._position.x = value.x ;
            }
            if( 'y' in value )
            {
                this._position.y = value.y ;
            }
            if( 'z' in value )
            {
                this._position.z = value.z ;
            }
            this.setAttribute( 'position' , this._position.x + ' ' + this._position.y + ' ' + this._position.z ) ;
        }
    },

    /**
     * The rotation of the entity.
     * @name rotation
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    rotation :
    {
        get : function() { return this._rotation ; },
        set : function( value )
        {
            if( 'x' in value )
            {
                this._rotation.x = value.x ;
            }
            if( 'y' in value )
            {
                this._rotation.y = value.y ;
            }
            if( 'z' in value )
            {
                this._rotation.z = value.z ;
            }
            this.setAttribute( 'position' , this._rotation.x + ' ' + this._rotation.y + ' ' + this._rotation.z ) ;
        }
    },

    /**
     * The rotationX of the entity.
     * @name rotationX
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    rotationX :
    {
        get : function() { return this._rotation.x ; },
        set : function(value)
        {
            this._rotation.x = value ;
            this.setAttribute( 'rotation' , this._rotation.x + ' ' + this._rotation.y + ' ' + this._rotation.z ) ;
        }
    },

    /**
     * The rotationY of the entity.
     * @name rotationY
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    rotationY :
    {
        get : function() { return this._rotation.y ; },
        set : function( value )
        {
            this._rotation.y = value ;
            this.setAttribute( 'rotation' , this._rotation.x + ' ' + this._rotation.y + ' ' + this._rotation.z ) ;
        }
    },

    /**
     * The rotationZ of the entity.
     * @name rotationZ
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    rotationZ :
    {
        get : function() { return this._rotation.z ; },
        set : function(value)
        {
            this._rotation.z = value ;
            this.setAttribute( 'rotation' , this._rotation.x + ' ' + this._rotation.y + ' ' + this._rotation.z ) ;
        }
    },

    /**
     * The scale component of the entity.
     * @name scale
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    scale :
    {
        get : function() { return this._scale ; },
        set : function( value )
        {
            if( 'x' in value )
            {
                this._scale.x = value.x ;
            }
            if( 'y' in value )
            {
                this._scale.y = value.y ;
            }
            if( 'z' in value )
            {
                this._scale.z = value.z ;
            }
            this.setAttribute( 'scale' , this._scale.x + ' ' + this._scale.y + ' ' + this._scale.z ) ;
        }
    },

    /**
     * The scaleX component of the entity.
     * @name scaleX
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    scaleX :
    {
        get : function() { return this._scale.x ; },
        set : function(value)
        {
            this._scale.x = value ;
            this.setAttribute( 'scale' , this._scale.x + ' ' + this._scale.y + ' ' + this._scale.z ) ;
        }
    },

    /**
     * The scaleY component of the entity.
     * @name scaleY
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    scaleY :
    {
        get : function() { return this._scale.y ; },
        set : function( value )
        {
            this._scale.y = value ;
            this.setAttribute( 'scale' , this._scale.x + ' ' + this._scale.y + ' ' + this._scale.z ) ;
        }
    },

    /**
     * The scaleZ of the entity.
     * @name scaleZ
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    scaleZ :
    {
        get : function() { return this._scale.z ; },
        set : function(value)
        {
            this._scale.z = value ;
            this.setAttribute( 'scale' , this._scale.x + ' ' + this._scale.y + ' ' + this._scale.z ) ;
        }
    },

    /**
     * The visible component determines whether to render an entity.
     * @name visible
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    visible :
    {
        get : function() { return this.getAttribute('visible') === "true" ; },
        set : function(value)
        {
            this.setAttribute( 'visible' , value === true ? 'true' : 'false' ) ;
        }
    },

    /**
     * The x of the entity.
     * @name x
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    x :
    {
        get : function() { return this._position.x ; },
        set : function(value)
        {
            this._position.x = value ;
            this.setAttribute( 'position' , this._position.x + ' ' + this._position.y + ' ' + this._position.z ) ;
        }
    },

    /**
     * The y of the entity.
     * @name y
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    y :
    {
        get : function() { return this._position.y ; },
        set : function( value )
        {
            this._position.y = value ;
            this.setAttribute( 'position' , this._position.x + ' ' + this._position.y + ' ' + this._position.z ) ;
        }
    },

    /**
     * The z of the entity.
     * @name z
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     */
    z :
    {
        get : function() { return this._position.z ; },
        set : function(value)
        {
            this._position.z = value ;
            this.setAttribute( 'position' , this._position.x + ' ' + this._position.y + ' ' + this._position.z ) ;
        }
    },

    /**
     * Notify when the entity is added to stage.
     * @name notifyAddedToStage
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     * @function
     */
    notifyAddedToStage : { value : function()
    {
        this.addedToStage.emit( this ) ;
    }},

    /**
     * Notify when the entity is removed from stage.
     * @name notifyRemovedFromStage
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     * @function
     */
    notifyRemovedFromStage : { value : function()
    {
        this.removedFromStage.emit( this ) ;
    }},

    /**
     * Sets the value of a specified attribute on the element.
     * @name setAttribute
     * @memberof molecule.render.aframe.display.AEntity
     * @function
     * @instance
     * @param {String} name - The name of the attribute.
     * @param {String} value - The value of the attribute.
     */
    setAttribute : { value : function( attr , value , componentAttrValue )
    {
        if( this._element )
        {
            this._element.setAttribute( attr , value , componentAttrValue ) ;
        }
    }},

    /**
     * @private
     * @name __addedToStage
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     * @function
     */
    __addedToStage : { value : function()
    {
        this._onStage = true ;
        this.notifyAddedToStage() ;
    }},

    /**
     * @private
     * @name __removedFromStage
     * @memberof molecule.render.aframe.display.AEntity
     * @instance
     * @function
     */
    __removedFromStage : { value : function()
    {
        this._onStage = false ;
        this.notifyRemovedFromStage() ;
    }}
}) ;
