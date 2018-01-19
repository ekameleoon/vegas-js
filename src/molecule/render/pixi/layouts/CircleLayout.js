"use strict" ;

import { atan2D } from 'core/maths/atan2D.js' ;
import { degreesToRadians } from 'core/maths/degreesToRadians.js' ;
import { radiansToDegrees } from 'core/maths/radiansToDegrees.js' ;

import { Align } from 'graphics/Align.js' ;
import { isMeasurable } from 'graphics/isMeasurable.js' ;

import { LayoutContainer } from './LayoutContainer.js' ;

/**
 * The Grid layout lays out a container's children in a rectangular grid. The container is divided into equal-sized rectangles, and one child is placed in each rectangle.
 * @name CircleLayout
 * @memberof molecule.render.pixi.layouts
 * @extends molecule.render.pixi.layouts.BoxLayout
 * @class
 * @constructor
 * @version 1.0.8
 * @since 1.0.8
 */
export function CircleLayout( container = null , init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _childAngle       : { writable : true  , value : 0 } ,
        _childCount       : { writable : true  , value : 10 } ,
        _childOrientation : { writable : true  , value : false } ,
        _radius           : { writable : true  , value : 100 } ,
        _startAngle       : { writable : true  , value : 0 } ,
        _pi1              : { writable : false , value : Math.PI * 0.5 } ,
        _pi2              : { writable : false , value : Math.PI * 2 }
    });
    LayoutContainer.call( this , container, init ) ;
}

CircleLayout.prototype = Object.create( LayoutContainer.prototype ,
{
    constructor : { writable : true , value : CircleLayout } ,

    /**
     * Indicates the angle value in degrees of the childs in the container.
     * @memberof molecule.render.pixi.layouts.CircleLayout
     * @instance
     * @type number
     */
    childAngle :
    {
        get : function() { return this._childAngle ; } ,
        set : function( value )
        {
            this._childAngle = isNaN(value) ? 0 : value ;
        }
    },

    /**
     * Indicates the number of childs visible in this container (minimal value is 1).
     * @memberof molecule.render.pixi.layouts.CircleLayout
     * @instance
     * @type number
     */
    childCount :
    {
        get : function() { return this._childCount ; } ,
        set : function( value )
        {
            this._childCount = value > 1 ? value : 1 ;
        }
    },

    /**
     * The orientation of the layout.
     * @memberof molecule.render.pixi.layouts.CircleLayout
     * @instance
     * @type boolean
     * @default false
     */
    childOrientation :
    {
        get : function() { return this._childOrientation } ,
        set : function( value )
        {
            this._childOrientation = value === true ;
        }
    },

    /**
     * Indicates the radius of the circle container.
     * @memberof molecule.render.pixi.layouts.CircleLayout
     * @instance
     * @type number
     */
    radius :
    {
        get : function() { return this._radius ; } ,
        set : function( value )
        {
            this._radius = isNaN(value) ? 0 : value ;
        }
    },

    /**
     * Indicates the radius of the circle container.
     * @memberof molecule.render.pixi.layouts.CircleLayout
     * @instance
     * @type number
     */
    startAngle :
    {
        get : function() { return radiansToDegrees(this._startAngle) ; } ,
        set : function( value )
        {
            this._startAngle = degreesToRadians( isNaN(value) ? 0 : value%360 ) ;
        }
    },

    /**
     * Calculates the default sizes and minimum and maximum values.
     * If the Box layout's direction property is set to Direction.HORIZONTAL,
     * its measuredWidth property is equal to the sum of default widths of all of the children in the container, plus the thickness of the borders (padding), plus the left and right padding, plus the horizontal gap between each child. The value of the measuredHeight property is the maximum of all the children's default heights, plus room for the borders and padding.
     * If the Box layout's direction property is set to Direction.VERTICAL, these two values are reversed.
     * @memberof molecule.render.pixi.layouts.CircleLayout
     * @function
     * @instance
     */
    measure : { value : function()
    {
        this._bounds.width = this._bounds.height = 2 * this._radius ;
        if ( this._align === Align.BOTTOM )
        {
            this._bounds.x = -this._radius ;
            this._bounds.y = -2*this._radius ;
        }
        else if ( this._align === Align.BOTTOM_LEFT )
        {
            this._bounds.x = 0 ;
            this._bounds.y = -2*this._radius ;
        }
        else if (this._align === Align.BOTTOM_RIGHT)
        {
            this._bounds.x = -2*this._radius ;
            this._bounds.y = -2*this._radius ;
        }
        else if (this._align === Align.LEFT)
        {
            this._bounds.x = 0 ;
            this._bounds.y = -this._radius ;
        }
        else if (this._align ===  Align.RIGHT)
        {
            this._bounds.x = -2*this._radius ;
            this._bounds.y = -this._radius ;
        }
        else if (this._align === Align.TOP)
        {
            this._bounds.x = -this._radius ;
            this._bounds.y = 0 ;
        }
        else if( this._align === Align.TOP_LEFT )
        {
            this._bounds.x = 0 ;
            this._bounds.y = 0 ;
        }
        else if (this._align === Align.TOP_RIGHT)
        {
            this._bounds.x = -2*this._radius ;
            this._bounds.y = 0 ;
        }
        else // Align.CENTER
        {
            this._bounds.x = -this._radius ;
            this._bounds.y = -this._radius ;
        }
    }},

    /**
     * Render the layout, refresh and change the position of all childs in a specific container.
     * @memberof molecule.render.pixi.layouts.CircleLayout
     * @function
     * @instance
     */
    render : { writable : true , value : function()
    {
        if ( this._children.length > 0 )
        {
            let i = 0 ;
            let child ;
            this._children.forEach( ( entry ) =>
            {
                child = entry.child ;

                child.x = this._radius * Math.cos( this._startAngle - this._pi1 + i * this._pi2 / this._childCount  ) + this._bounds.x + this._radius ;
                child.y = this._radius * Math.sin( this._startAngle - this._pi1 + i * this._pi2 / this._childCount  )  ;

                if( this._childOrientation )
                {
                    child.rotation = atan2D( child.y , child.x ) + this._childAngle ;
                }
                else
                {
                    let flag = isMeasurable(child) && this.usePreferredSize ;
                    child.rotation = 0 ;
                    child.x -= ( flag ? child.w : child.width  ) * 0.5 ;
                    child.y -= ( flag ? child.h : child.height ) * 0.5 ;
                }

                child.x += this._bounds.x + this._radius ;
                child.y += this._bounds.y + this._radius ;

                i++ ;
            }) ;
        }
    }},

    /**
     * This method is invoked when the rendering is finished to finalize the it after the measure invokation.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @function
     * @instance
     */
    update : { writable : true , value : function()
    {
        this.updater.emit( this ) ;
        this.notifyFinished() ;
    }}
});