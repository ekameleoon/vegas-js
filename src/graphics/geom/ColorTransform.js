"use strict" ;

/**
 * The <code>ColorTransform</code> class lets you adjust the color values in a display object.
 * <p>The color adjustment or color transformation can be applied to all four channels: red, green, blue, and alpha transparency.</p>
 * <p>When a ColorTransform object is applied to a display object, a new value for each color channel is calculated like this:</p>
 * <ul>
 * <li>New red value = (old red value * <code>redMultiplier</code>) + <code>redOffset</code></li>
 * <li>New green value = (old green value * <code>greenMultiplier</code>) + <code>greenOffset</code></li>
 * <li>New blue value = (old blue value * <code>blueMultiplier</code>) + <code>blueOffset</code></li>
 * <li>New alpha value = (old alpha value * <code>alphaMultiplier</code>) + <code>alphaOffset</code></li></ul>
 * <p>If any of the color channel values is greater than 255 after the calculation, it is set to 255. If it is less than 0, it is set to 0.</p>
 * <p>You can use ColorTransform objects in the following ways:</p>
 * <ul>
 * <li>In the <code>colorTransform</code> parameter of the <code>colorTransform()</code> method of the BitmapData class</li>
 * <li>As the <code>colorTransform</code> property of a Transform object (which can be used as the <code>transform</code> property of a display object)</li></ul>
 * <p>You must use the <code>new ColorTransform()</code> constructor to create a ColorTransform object before you can call the methods of the ColorTransform object.</p>
 * <p>Color transformations do not apply to the background color of a movie clip (such as a loaded SWF object). They apply only to graphics and symbols that are attached to the movie clip.</p>
 * @param {number} [redMultiplier=1] - The value for the red multiplier, in the range from 0 to 1.
 * @param {number} [greenMultiplier=1] - The value for the green multiplier, in the range from 0 to 1.
 * @param {number} [blueMultiplier=1] - The value for the blue multiplier, in the range from 0 to 1.
 * @param {number} [alphaMultiplier=1] - The value for the alpha transparency multiplier, in the range from 0 to 1.
 * @param {number} [redOffset=0] - The offset value for the red color channel, in the range from -255 to 255.
 * @param {number} [greenOffset=0] - The offset value for the green color channel, in the range from -255 to 255.
 * @param {number} [blueOffset=0] - The offset for the blue color channel value, in the range from -255 to 255.
 * @param {number} [alphaOffset=0] - The offset for alpha transparency channel value, in the range from -255 to 255.
 * @name ColorTransform
 * @memberof graphics.geom
 * @class
 */
export function ColorTransform( redMultiplier = 1, greenMultiplier = 1, blueMultiplier = 1, alphaMultiplier = 1, redOffset = 0, greenOffset = 0, blueOffset = 0, alphaOffset = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * A decimal value that is multiplied with the alpha transparency channel value.
         * <p>If you set the alpha transparency value of a display object directly by using the <code>alpha</code> property of the DisplayObject instance, it affects the value of the <code>alphaMultiplier</code> property of that display object's <code>transform.colorTransform</code> property.</p>
         * @memberof graphics.geom.ColorTransform
         * @default 1
         * @type {Number}
         * @instance
         */
        alphaMultiplier : { value : isNaN(alphaMultiplier) ? 0 : alphaMultiplier , writable : true } ,

        /**
         * A number from <code>-255</code> to <code>255</code> that is added to the alpha transparency channel value after it has been multiplied by the <code>alphaMultiplier</code> value.
         * @memberof graphics.geom.ColorTransform
         * @default 0
         * @type {Number}
         * @instance
         */
        alphaOffset : { value : isNaN(alphaOffset) ? 0 : alphaOffset , writable : true } ,

        /**
         * A decimal value that is multiplied with the blue channel value.
         * @memberof graphics.geom.ColorTransform
         * @default 1
         * @type {Number}
         * @instance
         */
        blueMultiplier : { value : isNaN(blueMultiplier) ? 0 : blueMultiplier , writable : true } ,

        /**
         * A number from <code>-255</code> to <code>255</code> that is added to the blue channel value after it has been multiplied by the <code>blueMultiplier</code> value.
         * @memberof graphics.geom.ColorTransform
         * @default 0
         * @type {Number}
         * @instance
         */
        blueOffset : { value : isNaN(blueOffset) ? 0 : blueOffset , writable : true } ,

        /**
         * A decimal value that is multiplied with the green channel value.
         * @memberof graphics.geom.ColorTransform
         * @default 1
         * @type {Number}
         * @instance
         */
        greenMultiplier : { value : isNaN(greenMultiplier) ? 0 : greenMultiplier , writable : true } ,

        /**
         * A number from <code>-255</code> to <code>255</code> that is added to the green channel value after it has been multiplied by the <code>greenMultiplier</code> value.
         * @memberof graphics.geom.ColorTransform
         * @default 0
         * @type {Number}
         * @instance
         */
        greenOffset : { value : isNaN(greenOffset) ? 0 : greenOffset , writable : true } ,

        /**
         * A decimal value that is multiplied with the red channel value.
         * @memberof graphics.geom.ColorTransform
         * @default 1
         * @type {Number}
         * @instance
         */
        redMultiplier : { value : isNaN(redMultiplier) ? 0 : redMultiplier , writable : true } ,

        /**
         * A number from <code>-255</code> to <code>255</code> that is added to the red channel value after it has been multiplied by the <code>redMultiplier</code> value.
         * @memberof graphics.geom.ColorTransform
         * @default 0
         * @type {Number}
         * @instance
         */
        redOffset : { value : isNaN(redOffset) ? 0 : redOffset , writable : true } ,
    });
}

ColorTransform.prototype = Object.create( Object.prototype ,
{
    /**
     * Create a shallow copy of the object.
     * @return a shallow copy of the object.
     * @name clone
     * @memberof graphics.geom.ColorTransform
     * @instance
     * @function
     */
    clone : { writable : true , value : function()
    {
        return new ColorTransform( this.redMultiplier , this.greenMultiplier , this.blueMultiplier , this.alphaMultiplier , this.redOffset , this.greenOffset , this.blueOffset , this.alphaOffset ) ;
    }},

    /**
     * Concatenates the ColorTransform object specified by the <code>second</code> parameter with the current ColorTransform object and sets the current object as the result, which is an additive combination of the two color transformations. When you apply the concatenated ColorTransform object, the effect is the same as applying the <code>second</code> color transformation after the <i>original</i> color transformation.
     * @param {graphics.geom.ColorTransform} color - The ColorTransform object to be combined with the current ColorTransform object.
     * @name concat
     * @memberof graphics.geom.ColorTransform
     * @instance
     * @function
     */
    concat : { value : function( color )
    {
        this.redMultiplier   *= color.redMultiplier ;
        this.greenMultiplier *= color.greenMultiplier ;
        this.blueMultiplier  *= color.blueMultiplier ;
        this.alphaMultiplier *= color.alphaMultiplier ;
        this.redOffset       += color.redOffset ;
        this.greenOffset     += color.greenOffset ;
        this.blueOffset      += color.blueOffset ;
        this.alphaOffset     += color.alphaOffset ;
    }},

    /**
     * Copies all of the matrix data from the source Point object into the calling Matrix object.
     * @name copyFrom
     * @param {graphics.geom.ColorTransform} color - The ColorTransform to copy in the current object.
     * @memberof graphics.geom.ColorTransform
     * @instance
     * @function
     * @param {graphics.geom.ColorTransform} matrix - The Matrix object from which to copy the data.
     */
    copyFrom : { value : function( color )
    {
        this.redMultiplier   = color.redMultiplier ;
        this.greenMultiplier = color.greenMultiplier ;
        this.blueMultiplier  = color.blueMultiplier ;
        this.alphaMultiplier = color.alphaMultiplier ;
        this.redOffset       = color.redOffset ;
        this.greenOffset     = color.greenOffset ;
        this.blueOffset      = color.blueOffset ;
        this.alphaOffset     = color.alphaOffset ;
    }},

    /**
     * Sets the members of the <code>ColorTransform</code> to the specified values.
     * @name setTo
     * @memberof graphics.geom.ColorTransform
     * @instance
     * @function
     * @param {number} [redMultiplier=1] - The value for the red multiplier, in the range from 0 to 1.
     * @param {number} [greenMultiplier=1] - The value for the green multiplier, in the range from 0 to 1.
     * @param {number} [blueMultiplier=1] - The value for the blue multiplier, in the range from 0 to 1.
     * @param {number} [alphaMultiplier=1] - The value for the alpha transparency multiplier, in the range from 0 to 1.
     * @param {number} [redOffset=0] - The offset value for the red color channel, in the range from -255 to 255.
     * @param {number} [greenOffset=0] - The offset value for the green color channel, in the range from -255 to 255.
     * @param {number} [blueOffset=0] - The offset for the blue color channel value, in the range from -255 to 255.
     * @param {number} [alphaOffset=0] - The offset for alpha transparency channel value, in the range from -255 to 255.
     */
    setTo : { value : function( redMultiplier = 1, greenMultiplier = 1, blueMultiplier = 1, alphaMultiplier = 1, redOffset = 0, greenOffset = 0, blueOffset = 0, alphaOffset = 0 )
    {
        this.redMultiplier   = redMultiplier ;
        this.greenMultiplier = greenMultiplier ;
        this.blueMultiplier  = blueMultiplier ;
        this.alphaMultiplier = alphaMultiplier ;
        this.redOffset       = redOffset ;
        this.greenOffset     = greenOffset ;
        this.blueOffset      = blueOffset ;
        this.alphaOffset     = alphaOffset ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @name toObject
     * @memberof graphics.geom.ColorTransform
     * @instance
     * @function
     */
    toObject : { writable : true , value : function()
    {
        let object =
        {
            redMultiplier   : this.redMultiplier ,
            greenMultiplier : this.greenMultiplier ,
            blueMultiplier  : this.blueMultiplier ,
            alphaMultiplier : this.alphaMultiplier ,
            redOffset       : this.redOffset ,
            greenOffset     : this.greenOffset ,
            blueOffset      : this.blueOffset ,
            alphaOffset     : this.alphaOffset ,
        } ;
        return object ;
    }},

    /**
     * Returns a text value listing the properties of the ColorTransform object.
     * @return The text value listing the properties of the ColorTransform object.
     * @name toString
     * @memberof graphics.geom.ColorTransform
     * @name toString
     * @instance
     * @function
     */
    toString : { writable : true , value : function()
    {
        return "[ColorTransform redMultiplier:" + this.redMultiplier +
                            " greenMultiplier:" + this.greenMultiplier +
                             " blueMultiplier:" + this.blueMultiplier +
                            " alphaMultiplier:" + this.alphaMultiplier +
                                  " redOffset:" + this.redOffset +
                                " greenOffset:" + this.greenOffset +
                                 " blueOffset:" + this.blueOffset +
                                " alphaOffset:" + this.alphaOffset + "]" ;
    }}
});