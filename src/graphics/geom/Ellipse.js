"use strict" ;

import { Dimension } from './Dimension.js' ;
import { Point } from './Point.js' ;

/**
 * The Rectangle class is used to create and modify Rectangle objects.
 * <p>A Rectangle object is an area defined by its position, as indicated by its top-left corner point <code>(x, y)</code>, and by its width and its height.</p>
 * <p>The <code>x</code>, <code>y</code>, <code>width</code>, and <code>height</code> properties of the Rectangle class are independent of each other; changing the value of one property has no effect on the others.</p>
 * @summary The Rectangle class is used to create and modify Rectangle objects.
 * @name Rectangle
 * @extends graphics.geom.Dimension
 * @memberof graphics.geom
 * @class
 * @param {number} x the x value of the object.
 * @param {number} y the y value of the object.
 * @param {number} width the width value of the object.
 * @param {number} height the height value of the object.
 */
export function Ellipse( x = 0 , y = 0 , width = 0 , height = 0 )
{
    Object.defineProperties( this ,
    {
        /**
         * Determinates the x value of this object.
         * @memberof graphics.geom.Rectangle
         * @default 0
         * @type {Number}
         * @instance
         */
        x : { value : isNaN(x) ? 0 : x , writable : true } ,

        /**
         * Determinates the y value of this object.
         * @memberof graphics.geom.Rectangle
         * @default 0
         * @type {Number}
         * @instance
         */
        y : { value : isNaN(y) ? 0 : y , writable : true }
    });
    Dimension.call( this , width , height ) ;
}

Ellipse.prototype = Object.create( Dimension.prototype ,
{
    /**
     * The area of the ellipse.
     * @name area
     * @memberof graphics.geom.Ellipse
     * @default 0
     * @type {Number}
     * @instance
     * @example
     * var ellipse = new Ellipse( 40 , 12 ) ;
     * trace( ellipse.area ) ;
     */
    area : { get : function() { return Math.PI * (this.width * this.height) * 0.5 ; }} ,

    /**
     * The sum of the y and height properties.
     * @memberof graphics.geom.Ellipse
     * @instance
     */
    bottom :
    {
        get : function()
        {
            return this.y + this.height ;
        },
        set : function( value )
        {
            if( value < this.y )
            {
                this.height = 0 ;
            }
            else
            {
                this.height = value - this.y ;
            }
        }
    },

    /**
     * The location of the Rectangle object's center.
     * @memberof graphics.geom.Ellipse
     * @instance
     */
    center :
    {
        get : function()
        {
            return new Point
            (
                this.x + this.width  * 0.5 ,
                this.y + this.height * 0.5
            );
        },
        set : function( point )
        {
            this.x = point.x - ( this.width  * 0.5 ) ;
            this.y = point.y - ( this.height * 0.5 ) ;
        }
    },

    /**
     * Indicates the x coordinate of the Rectangle center.
     * @memberof graphics.geom.Ellipse
     * @instance
     */
    centerX :
    {
        get : function() { return this.x + (this.width*0.5) ; },
        set : function( x )
        {
            this.x = x - (this.width*0.5) ;
        }
    },

    /**
     * Indicates the y coordinate of the Rectangle center.
     * @memberof graphics.geom.Ellipse
     * @instance
     */
    centerY :
    {
        get : function() { return this.y + (this.height*0.5) ; },
        set : function( y )
        {
            this.y = y - (this.height*0.5) ;
        }
    },

    /**
     * The x coordinate of the top-left corner of the rectangle.
     * @memberof graphics.geom.Ellipse
     * @instance
     */
    left :
    {
        get : function()
        {
            return this.x ;
        } ,
        set : function( value )
        {
            this.width = this.width + (this.x - value) ;
            this.x = value ;
        }
    },

    /**
     * The sum of the x and width properties.
     * @memberof graphics.geom.Ellipse
     * @instance
     */
    right :
    {
        get : function()
        {
            return this.x + this.width ;
        } ,
        set : function( value )
        {
            this.width = value - this.x ;
        }
    },

    /**
     * The perimeter of the rectangle.
     * @name perimeter
     * @memberof graphics.geom.Ellipse
     * @default 0
     * @type {Number}
     * @instance
     * @example
     * var rectangle = new Rectangle( 40 , 12 ) ;
     * trace( rectangle.perimeter ) ; // 104
     */
    perimeter : { get : function()
    {
        return (this.width*2) + (this.height*2);
    }},

    /**
     * The y coordinate of the top-left corner of the rectangle.
     * @memberof graphics.geom.Ellipse
     * @instance
     */
    top :
    {
        get : function()
        {
            return this.y ;
        } ,
        set : function( value )
        {
            this.y = value ;
        }
    },

    // ------- methods

    /**
     * Centers this <code>Rectangle</code> so that the center coordinates match the given x and y values.
     * @name centerOn
     * @memberof graphics.geom.Ellipse
     * @instance
     * @function
     * @param {number} x - The x coordinate to place the center of the Rectangle at.
     * @param {number} y - The y coordinate to place the center of the Rectangle at.
     * @return The current reference of the object.
     */
    centerOn : { writable : true , value : function( x , y )
    {
        this.x = x - ( this.width  * 0.5 ) ;
        this.y = y - ( this.height * 0.5 ) ;
        return this;
    }},

    /**
     * Returns a new Ellipse object with the same values for the x, y, width, and height properties as the original Ellipse object.
     * @memberof graphics.geom.Ellipse
     * @instance
     * @function
     * @return a shallow copy of the object.
     */
    clone : { writable : true , value : function()
    {
        return new Ellipse( this.x , this.y , this.width , this.height ) ;
    }},

    /**
     * Determines whether the specified point is contained within the ellipse region.
     * @memberof graphics.geom.Ellipse
     * @instance
     * @function
     * @param {number} x - The x position of the point to check.
     * @param {number} y - The y position of the point to check.
     * @return <code>true</code> if the specified point is contained within the ellipse region.
     */
    contains : { value : function( x , y )
    {
        if ( this.width <= 0 || this.height <= 0)
        {
            return false;
        }

        let normx = ((x - this.x) / this.width) - 0.5 ;
        let normy = ((y - this.y) / this.height) - 0.5 ;

        return ((normx*normx) + (normy*normy)) < 0.25 ;
    }},

    /**
     * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
     * @memberof graphics.geom.Ellipse
     * @instance
     * @function
     * @param {graphics.geom.Ellipse|graphics.geom.Rectangle|Object} obj - The object to copy.
     */
    copyFrom : { value : function( obj )
    {
        this.x      = obj.x ;
        this.y      = obj.y ;
        this.width  = obj.width ;
        this.height = obj.height ;
        return this ;
    }},

    /**
     * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object.
     * @memberof graphics.geom.Ellipse
     * @instance
     * @function
     * @param {object} toCompareThe - object to evaluates.
     * @param {boolean} [strict=true] - If true the method accept only a toCompare Rectangle, else any object with the x, y, width and height properties (default true).
     * @return {boolean} <code>true</code> if the the specified object is equal with this object.
     */
    equals : { writable : true , value : function( toCompare , strict = true )
    {
        var flag = strict ? toCompare instanceof Ellipse
                          : ('x' in toCompare && 'y' in toCompare && 'width' in toCompare && 'height' in toCompare ) ;
        if ( flag )
        {
            return toCompare.x === this.x &&
                   toCompare.y === this.y &&
                   toCompare.width === this.width &&
                   toCompare.height=== this.height ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Sets the members of the Ellipse to the specified values.
     * @param {number} [x=0] - The x coordinate of the top-left corner of the ellipse.
     * @param {number} [y=0] - The y coordinate of the top-left corner of the ellipse.
     * @param {number} [width=0] - The width of the ellipse, in pixels.
     * @param {number} [height=0] - The height of the ellipse, in pixels.
     * @return {graphics.geom.Ellipse} The current object reference.
     * @memberof graphics.geom.Ellipse
     * @function
     * @instance
     */
    setTo : { writable : true , value : function( x = 0 , y = 0 , width = 0 , height = 0 )
    {
        this.x = x ;
        this.y = y ;
        this.width = width ;
        this.height = height ;
        return this ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     * @memberof graphics.geom.Ellipse
     * @function
     * @instance
     */
    toObject : { value : function()
    {
        return { x:this.x , y:this.y , width:this.width , height:this.height } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     * @memberof graphics.geom.Ellipse
     * @name toString
     * @function
     * @instance
     */
    toString : { value : function()
    {
        return "[Ellipse x:" + this.x + " y:" + this.y + " width:" + this.width + " height:" + this.height + "]" ;
    }}
});