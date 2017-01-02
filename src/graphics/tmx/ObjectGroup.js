"use strict" ;

import { Layer } from './Layer.js' ;
import { TileObject } from './TileObject.js' ;

/**
 * An object group layer definition.
 * @summary An object group layer definition.
 * @name ObjectGroup
 * @memberof graphics.tmx
 * @extends graphics.tmx.Layer
 * @class
 * @constructs
 * @param {Object} [init] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function ObjectGroup( init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The color used to display the objects in this group.
         * @name color
         * @memberof graphics.tmx.ObjectGroup
         * @default null
         * @type string
         * @instance
         */
        color : { enumerable : true , value : null , writable : true } ,

        /**
         * Whether the objects are drawn according to the order of appearance ("index") or sorted by their y-coordinate ("topdown"). Defaults to "topdown".
         * @name draworder
         * @memberof graphics.tmx.ObjectGroup
         * @default topdown
         * @type string
         * @instance
         */
        draworder : { enumerable : true , value : 'topdown' , writable : true } ,

        /**
         * The objects collections
         * @name objects
         * @memberof graphics.tmx.ObjectGroup
         * @default null
         * @type Array
         * @instance
         * @see graphics.tmx.TileObject
         */
        objects : { enumerable : true , value : null , writable : true }
    });

    Layer.call( this , init ) ;
}

ObjectGroup.prototype = Object.create( Layer.prototype ,
{
    constructor : { writable : true , value : ObjectGroup } ,

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.tmx.Layer
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object = Layer.prototype.toObject.call(this) ;

        object.color     = this.color ;
        object.draworder = this.draworder ;
        object.objects   = this.objects ;

        if( (object.objects instanceof Array) && (object.objects.length > 0) )
        {
            object.objects = object.objects.map( ( element ) =>
            {
                return element instanceof TileObject ? element.toObject() : element ;
            });
        }

        return object ;
    }}
});