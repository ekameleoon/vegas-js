"use strict" ;

/**
 * Creates a DOM Img element.
 * @name createImg
 * @memberof molecule.render.dom.entities
 * @function
 * @instance
 * @param {Object} init - The generic object to initialize the entity.
 * @return The node element.
 */
export var createImg = ( init = null ) =>
{
    let el = document.createElement( 'img' ) ;

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