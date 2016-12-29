"use strict" ;

/**
 * The {@link graphics.tmx.PropertyType|PropertyType} enumeration provides valid values for the <code>tmx.Property.type</code> property.
 * @summary The {@link graphics.tmx.PropertyType|PropertyType} enumeration provides valid values for the <code>tmx.Property.type</code> property.
 * @name PropertyType
 * @namespace graphics.tmx.PropertyType
 * @memberof graphics.tmx
 */
export var PropertyType = Object.defineProperties( {} ,
{
    /**
     * The 'bool' type. Boolean properties have a value of either <code>true</code> or <code>false</code>.
     * @memberof graphics.tmx.PropertyType
     * @type string
     * @default bool
     */
    BOOL : { enumerable : true , value : 'bool' } ,

    /**
     * The 'color' type. Color properties are stored in the format <code>#AARRGGBB</code>.
     * @memberof graphics.tmx.PropertyType
     * @type string
     * @default color
     */
    COLOR : { enumerable : true , value : 'color' } ,

    /**
     * The 'file' type. File properties are stored as paths relative from the location of the map file.
     * @memberof graphics.tmx.PropertyType
     * @type string
     * @default file
     */
    FILE : { enumerable : true , value : 'file' } ,

    /**
     * The 'float' type.
     * @memberof graphics.tmx.PropertyType
     * @type string
     * @default float
     */
    FLOAT : { enumerable : true , value : 'float' } ,

    /**
     * The 'int' type.
     * @memberof graphics.tmx.PropertyType
     * @type string
     * @default int
     */
    INT : { enumerable : true , value : 'int' } ,

    /**
     * The 'string' type.
     * @memberof graphics.tmx.PropertyType
     * @type string
     * @default string
     */
    STRING : { enumerable : true , value : 'string' }
}) ;
