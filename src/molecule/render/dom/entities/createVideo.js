"use strict" ;

/**
 * Creates a DOM Video element.
 * @name createImg
 * @memberof molecule.render.dom.entities
 * @function
 * @instance
 * @param {Object} init - The generic object to initialize the entity.
 * @return The node element.
 */
export var createVideo = ( init = null ) =>
{
    let el = document.createElement( 'video' ) ;

    // ----

    el.setAttribute( 'crossorigin'        , 'anonymous' ) ;
    el.setAttribute( 'webkit-playsinline' , 'true'      ) ;
    el.setAttribute( 'autoplay'           , ''          ) ;
    el.setAttribute( 'controls'           , ''          ) ;

    // ----

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

    // ----

    return el ;
} ;