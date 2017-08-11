"use strict" ;

/**
 * Creates an AFrame a-entity element.
 * @name createEntity
 * @memberof com.ooopener.entities
 * @function
 * @instance
 * @param {Object} init - The generic object to initialize the entity.
 * @return The aframe entity.
 * @example
 * var entity = createEntity( 'a-entity' , { attribute : "material.opacity" , begin : "fade" , to : "0" } ) ;
 * var scene = document.querySelector('a-scene') ;
 * scene.appendChild( entity ) ;
 */
export var createEntity = ( name = 'a-entity' , init = null ) =>
{
    let el = null ;

    if( name instanceof String || (typeof(name) === 'string') )
    {
        el = document.createElement( name ) ;
    }
    else
    {
        el = document.createElement( 'a-entity' ) ;
        if( name !== null )
        {
            init = name ;
        }
    }

    if( init )
    {
        for( let attr in init )
        {
            if( attr in init )
            {
                el.setAttribute( attr , init[attr] ) ;
            }
        }
    }

    return el ;
} ;