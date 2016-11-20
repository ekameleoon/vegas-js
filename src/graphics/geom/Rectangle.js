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
export function Rectangle( x = 0 , y = 0 , width = 0 , height = 0)
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
     * Indicates the sum of the y and height properties.
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
     * Indicates the sum of the y and height properties.
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
     * Indicates the location of the Rectangle object's bottom-right corner, determined by the values of the x and y properties.
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
     * Determinates the location of the Rectangle object's center, determined by the values of the x and y properties.
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
     * Indicates the location of the Rectangle object's bottom-right corner, determined by the values of the x and y properties.
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
     * Indicates the sum of the x and width properties.
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
     * Indicates the size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
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
     * Indicates the y coordinate of the top of the rectangle.
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
     * Indicates the location of the Rectangle object's top-left corner determined by the x and y values of the point.
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
     * Indicates the location of the Rectangle object's top-right corner determined by the x and y values of the point.
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
     * Returns a shallow copy of the object.
     * @return a shallow copy of the object.
     */
    clone : { writable : true , value : function()
    {
        return new Rectangle( this.x , this.y , this.width , this.height ) ;
    }},

    /**
     * Compares the passed-in object with this object for equality.
     * @return <code>true</code> if the the specified object is equal with this object.
     */
    equals : { writable : true , value : function( o )
    {
        if ( o instanceof Rectangle )
        {
            return o.x === this.x && o.y === this.y && o.width === this.width && o.height=== this.height ;
        }
        else
        {
            return false ;
        }
    }},

    /**
     * Returns a new bounds area with a specific position.
     * @return a new bounds area with a specific position.
     */
    getBounds : { writable : true , value : function( x = 0 , y = 0)
    {
        return new Rectangle( x , y , this.width , this.height ) ;
    }},

    /**
     * Sets all of the Rectangle object's properties to 0.
     */
    setEmpty : { value : function()
    {
        this.x = this.y = this.width = this.height = 0 ;
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
    }}
});