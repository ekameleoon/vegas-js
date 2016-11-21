"use strict" ;

import { Dimension } from './Dimension.js' ;
import { Point } from './Point.js' ;

/**
 * The Rectangle class is used to create and modify Rectangle objects.
 * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y), and by its width and its height.
 * The x, y, width, and height properties of the Rectangle class are independent of each other; changing the value of one property has no effect on the others.
 * @constructor
 * @param width the width value of the object.
 * @param height the height value of the object.
 */
export function Rectangle( x = 0 , y = 0 , width = 0 , height = 0 )
{
    Dimension.call( this , width , height ) ;

    Object.defineProperties( this ,
    {
        /**
         * Determinates the x value of this object.
         */
        x : { value : x , writable : true } ,

        /**
         * Determinates the y value of this object.
         */
        y : { value : y , writable : true }
    });
}

/**
 * @extends Object
 */
Rectangle.prototype = Object.create( Dimension.prototype ,
{
    /**
     * The sum of the y and height properties.
     */
    bottom :
    {
        get : function()
        {
            return this.y + this.height ;
        },
        set : function( value )
        {
            this.height = value - this.y ;
        }
    },

    /**
     * The location of the Rectangle object's bottom-left corner, determined by the values of the left and bottom properties.
     */
    bottomLeft :
    {
        get : function()
        {
            return new Point(this.x, this.y + this.height) ;
        } ,
        set : function( point )
        {
            this.width = this.width + (this.x - point.x) ;
            this.height = point.y - this.y ;
            this.x = point.x ;
        }
    },

    /**
     * The location of the Rectangle object's bottom-right corner, determined by the values of the right and bottom properties.
     */
    bottomRight :
    {
        get : function()
        {
            return new Point(this.x + this.width, this.y + this.height) ;
        } ,
        set : function( point )
        {
            this.width  = point.x - this.x ;
            this.height = point.y - this.y ;
        }
    },

    /**
     * The location of the Rectangle object's center.
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
     * The x coordinate of the top-left corner of the rectangle.
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
     * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
     */
    size :
    {
        get : function()
        {
            return new Point(this.width, this.height) ;
        } ,
        set : function( point )
        {
            this.width  = point.x ;
            this.height = point.y ;
        }
    },

    /**
     * The y coordinate of the top-left corner of the rectangle.
     */
    top :
    {
        get : function()
        {
            return this.x + this.width ;
        } ,
        set : function( value )
        {
            this.height = this.height + (this.y - value);
            this.y = value ;
        }
    },


    /**
     * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
     */
    topLeft :
    {
        get : function()
        {
            return new Point(this.x, this.y) ;
        } ,
        set : function( point )
        {
            this.width  = this.width  + (this.x - point.x) ;
            this.height = this.height + (this.y - point.y) ;
            this.x      = point.x ;
            this.y      = point.y ;
        }
    },

    /**
     * The location of the Rectangle object's top-right corner, determined by the x and y coordinates of the point.
     */
    topRight :
    {
        get : function()
        {
            return new Point( this.x + this.width , this.y ) ;
        } ,
        set : function( point )
        {
            this.width  = point.x - this.x;
            this.height = this.height + (this.y - point.y) ;
            this.y      = point.y ;
        }
    },

    /**
     * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
     * @return a shallow copy of the object.
     */
    clone : { writable : true , value : function()
    {
        return new Rectangle( this.x , this.y , this.width , this.height ) ;
    }},

    /**
     * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
     */
    contains : { value : function( x, y )
    {
        return (this.x <= x) && (this.x + this.width) > x && (this.y <= y) && (this.y + this.height) > y ;
    }},

    /**
     * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
     */
    containsPoint : { value : function( point )
    {
        return (this.x <= point.x) && (this.x + this.width) > point.x && (this.y <= point.y) && (this.y + this.height) > point.y ;
    }},

    /**
     * Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object.
     */
    containsRect : { value : function( rec )
    {
        let a = rec.x + rec.width ;
        let b = rec.y + rec.height ;
        let c = this.x + this.width ;
        let d = this.y + this.height ;
        return (rec.x >= this.x && rec.x < c && rec.y >= this.y && rec.y < d && a > this.x && a <= c && b > this.y && b <= d) ;
    }},

    /**
     * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
     */
    copyFrom : { value : function( rec )
    {
        this.x = rec.x ;
        this.y = rec.y ;
        this.width = rec.width ;
        this.height = rec.height ;
    }},

    /**
     * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object.
     * @return <code>true</code> if the the specified object is equal with this object.
     */
    equals : { writable : true , value : function( toCompare )
    {
        if ( toCompare instanceof Rectangle )
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
     * Increases the size of the Rectangle object by the specified amounts, in pixels.
     * The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
     * @param dx {number} The value to be added to the left and the right of the Rectangle object. The following equation is used to calculate the new width and position of the rectangle:  x -= dx; width += 2 * dx;
     * @param dy {number} The value to be added to the top and the bottom of the Rectangle. The following equation is used to calculate the new height and position of the rectangle: y -= dy; height += 2 * dy;
     */
    inflate : { value : function( dx , dy )
    {
        this.x -= dx;
        this.y -= dy;
        this.width  += 2 * dx;
        this.height += 2 * dy;
    }},

    /**
     * Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
     * @param point {Point} The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
     * @example
     * var rect  = new Rectangle(0,0,2,5);
     * var point = new Point(2,2);
     * rect.inflatePoint(point) ;
     */
    inflatePoint : { value : function( point )
    {
        this.x -= point.x;
        this.y -= point.y;
        this.width  += 2 * point.x;
        this.height += 2 * point.y;
    }},

    /**
     * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
     * @param toIntersect {Rectangle} The Rectangle object to compare against to see if it intersects with this Rectangle object.
     * @return {Rectangle}  A Rectangle object that equals the area of intersection. If the rectangles do not intersect, this method returns an empty Rectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
     */
    intersection : { value : function( toIntersect )
    {
        var rec = new Rectangle() ;

        if ( this.isEmpty() || toIntersect.isEmpty() )
        {
            rec.set();
            return rec ;
        }

        rec.x = Math.max(this.x, toIntersect.x);
        rec.y = Math.max(this.y, toIntersect.y);
        rec.width  = Math.min( this.x + this.width  , toIntersect.x + toIntersect.width  ) - rec.x ;
        rec.height = Math.min( this.y + this.height , toIntersect.y + toIntersect.height ) - rec.y ;

        if ( rec.width <= 0 || rec.height <= 0 )
        {
            rec.set();
        }

        return rec ;
    }},

    /**
     * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object. This method checks the x, y, width, and height properties of the specified Rectangle object to see if it intersects with this Rectangle object.
     * @param toIntersect {Rectangle} The Rectangle object to compare against this Rectangle object.
     * @return {boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
     */
    intersects : { value : function( toIntersect )
    {
        return !this.intersection(toIntersect).isEmpty() ;
    }},

    /**
     * Determines whether or not this Rectangle object is empty.
     * @return {boolean} A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
     */
    isEmpty : { value : function()
    {
        return this.width <= 0 && this.height <= 0;
    }},

    /**
     * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
     * @param dx {number} Moves the x value of the Rectangle object by this amount.
     * @param dy {number} Moves the y value of the Rectangle object by this amount.
     */
    offset : { writable : true , value : function( dx = 0 , dy = 0 )
    {
        this.x += dx ;
        this.y += dy ;
    }},

    /**
     * Adjusts the location of the Rectangle object using a Point object as a parameter. This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
     * @param point {Point} A Point object to use to offset this Rectangle object.
     */
    offsetPoint : { writable : true , value : function( point )
    {
        this.x += point.x ;
        this.y += point.y ;
    }},

    /**
     * Sets the members of Rectangle to the specified values
     * @param x {number} The x coordinate of the top-left corner of the rectangle (default 0).
     * @param y {number} The y coordinate of the top-left corner of the rectangle (default 0).
     * @param width {number} The width of the rectangle, in pixels (default 0).
     * @param height {number} The height of the rectangle, in pixels (default 0).
     */
    set : { value : function( x = 0 , y = 0 , width = 0 , height = 0 )
    {
        this.x = x ;
        this.y = y ;
        this.width = width ;
        this.height = height ;
    }},

    /**
     * Returns the Object representation of this object.
     * @return the Object representation of this object.
     */
    toObject : { value : function()
    {
        return { x:this.x , y:this.y , width:this.width , height:this.height } ;
    }},

    /**
     * Returns the string representation of this instance.
     * @return the string representation of this instance.
     */
    toString : { value : function()
    {
        return "[Rectangle x:" + this.x + " y:" + this.y + " width:" + this.width + " height:" + this.height + "]" ;
    }},

    /**
     * Adds two rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two rectangles.
     * <b>Note:</b> The union() method ignores rectangles with 0 as the height or width value, such as: var rect2 = new Rectangle(300,300,50,0);
     * @param {Rectangle} toUnion A Rectangle object to add to this Rectangle object.
     * @return {Rectangle} A new Rectangle object that is the union of the two rectangles.
     */
    union : { value : function( toUnion )
    {
        if( !(toUnion instanceof Rectangle) )
        {
            return null ; // ignore
        }

        if ( this.width <= 0 || this.height <= 0 )
        {
            return toUnion.clone() ;
        }
        else if ( toUnion.width <= 0 || toUnion.height <= 0 )
        {
            return this.clone() ;
        }
        else
        {
            var rec = new Rectangle();
            rec.x = Math.min(this.x, toUnion.x);
            rec.y = Math.min(this.y, toUnion.y);
            rec.width  = Math.max(this.x + this.width  , toUnion.x + toUnion.width  ) - rec.x ;
            rec.height = Math.max(this.y + this.height , toUnion.y + toUnion.height ) - rec.y ;
            return rec ;
        }
    }}
});