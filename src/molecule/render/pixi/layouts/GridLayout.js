"use strict" ;

import { Align } from 'graphics/Align.js' ;
import { Direction } from 'graphics/Direction.js' ;
import { DirectionOrder } from 'graphics/DirectionOrder.js' ;
import { isMeasurable } from 'graphics/isMeasurable.js' ;
import { Orientation } from 'graphics/Orientation.js' ;

import { BoxLayout } from './BoxLayout.js' ;

/**
 * The Grid layout lays out a container's children in a rectangular grid. The container is divided into equal-sized rectangles, and one child is placed in each rectangle.
 * @name GridLayout
 * @memberof molecule.render.pixi.layouts
 * @extends molecule.render.pixi.layouts.BoxLayout
 * @class
 * @constructor
 * @version 1.0.8
 * @since 1.0.8
 */
export function GridLayout( container = null , init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * @private
         */
        _columns     : { writable : true  , value : 1 } ,
        _lines       : { writable : true  , value : 1 } ,
        _orientation : { writable : true  , value : Orientation.NONE }
    });
    BoxLayout.call( this , container, init ) ;
}

GridLayout.prototype = Object.create( BoxLayout.prototype ,
{
    constructor : { writable : true , value : GridLayout } ,

    /**
     * Determinates the number of columns in the grid layout if the direction of this layout is Direction.HORIZONTAL.
     * @memberof molecule.render.pixi.layouts.GridLayout
     * @instance
     * @type number
     */
    columns :
    {
        get : function() { return this._columns ; } ,
        set : function( value )
        {
            this._columns = value > 1 ? value : 1 ;
        }
    },

    /**
     * Determinates the number of lines in the grid layout if the direction of this layout is Direction.VERTICAL.
     * @memberof molecule.render.pixi.layouts.GridLayout
     * @instance
     * @type number
     */
    lines :
    {
        get : function() { return this._lines ; } ,
        set : function( value )
        {
            this._lines = value > 1 ? value : 1 ;
        }
    },

    /**
     * The orientation of the layout.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @instance
     * @see {graphics.Orientation}
     */
    orientation :
    {
        get : function() { return this._orientation } ,
        set : function( value )
        {
            this._orientation = Orientation.validate(value) ? value : Orientation.NONE ;
        }
    },

    /**
     * Indicates if the layout is bottom to top.
     * @memberof molecule.render.pixi.layouts.GridLayout
     * @function
     * @instance
     */
    isBottomToTop : { value : function()
    {
        return this._orientation === Orientation.BOTTOM_TO_TOP ||
               this._orientation === Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP ||
               this._orientation === Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP ;
    }},

    /**
     * Indicates if the layout is right to left.
     * @memberof molecule.render.pixi.layouts.GridLayout
     * @function
     * @instance
     */
    isRightToLeft : { value : function()
    {
        return this._orientation === Orientation.RIGHT_TO_LEFT ||
               this._orientation === Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP ||
               this._orientation === Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM ;
    }},

    /**
     * Calculates the default sizes and minimum and maximum values.
     * If the Box layout's direction property is set to Direction.HORIZONTAL,
     * its measuredWidth property is equal to the sum of default widths of all of the children in the container, plus the thickness of the borders (padding), plus the left and right padding, plus the horizontal gap between each child. The value of the measuredHeight property is the maximum of all the children's default heights, plus room for the borders and padding.
     * If the Box layout's direction property is set to Direction.VERTICAL, these two values are reversed.
     * @memberof molecule.render.pixi.layouts.GridLayout
     * @function
     * @instance
     */
    measure : { value : function()
    {
        this._bounds.setTo() ;
        if ( this._children.length > 0 )
        {
            let i = 0 ;

            const hor = this._direction === Direction.HORIZONTAL ;

            let w = 0 ;
            let h = 0 ;
            let c = hor ? this._columns : 0 ;
            let l = hor ? 0 : this._lines ;

            this._children.forEach( ( entry ) =>
            {
                let child = entry.child ;

                let flag = isMeasurable(child) && this.usePreferredSize ;

                w = Math.max( child[ flag ? "w" : this.propWidth  ] , w ) ;
                h = Math.max( child[ flag ? "h" : this.propHeight ] , h ) ;

                if ( hor )
                {
                    if( i%this._columns === 0 )
                    {
                        l++;
                    }
                }
                else
                {
                    if ( i%this._lines === 0 )
                    {
                        c++ ;
                    }
                }

                i++ ;
            });

            this._bounds.width  += c * ( w  + this._horizontalGap ) ;
            this._bounds.height += l * ( h  + this._verticalGap   ) ;

            this._bounds.width  -= this._horizontalGap ;
            this._bounds.height -= this._verticalGap ;

            this._bounds.width  += this._padding.horizontal ;
            this._bounds.height += this._padding.vertical   ;

            if (this._align === Align.CENTER)
            {
                this._bounds.x -= this._bounds.width  * 0.5 ;
                this._bounds.y -= this._bounds.height * 0.5 ;
            }
            else if ( this._align === Align.BOTTOM )
            {
                this._bounds.x -= this._bounds.width  * 0.5 ;
                this._bounds.y -= this._bounds.height ;
            }
            else if ( this._align === Align.BOTTOM_LEFT )
            {
                this._bounds.y -= this._bounds.height ;
            }
            else if ( this._align === Align.BOTTOM_RIGHT)
            {
                this._bounds.x -= this._bounds.width  ;
                this._bounds.y -= this._bounds.height ;
            }
            else if ( this._align === Align.LEFT)
            {
                this._bounds.y -= this._bounds.height * 0.5 ;
            }
            else if ( this._align ===  Align.RIGHT)
            {
                this._bounds.x -= this._bounds.width  ;
                this._bounds.y -= this._bounds.height * 0.5 ;
            }
            else if ( this._align === Align.TOP)
            {
                this._bounds.x -= this._bounds.width / 2 ;
            }
            else if ( this._align === Align.TOP_RIGHT)
            {
                this._bounds.x -= this._bounds.width ;
            }
            // else // TOP_LEFT
            // {
            //     // nothing
            // }
        }
    }},

    /**
     * Render the layout, refresh and change the position of all childs in a specific container.
     * @memberof molecule.render.pixi.layouts.GridLayout
     * @function
     * @instance
     */
    render : { writable : true , value : function()
    {
        if ( this._children.length > 0 )
        {
            if ( ( this._lines > 1 && this._direction === Direction.VERTICAL) || ( this._columns > 1 && this._direction === Direction.HORIZONTAL ) )
            {
                if ( this._order === DirectionOrder.REVERSE )
                {
                    this._children.reverse() ;
                }

                const left = this._padding.left ;
                const top  = this._padding.top ;
                const hor = this._direction === Direction.HORIZONTAL ;

                var i = 0 ;
                var c ;
                var l ;

                var pw ;
                var ph ;

                this._children.forEach( ( entry ) =>
                {
                    let child = entry.child ;

                    let flag = isMeasurable(child) && this.usePreferredSize ;

                    pw = flag ? "w" : this.propWidth  ;
                    ph = flag ? "h" : this.propHeight ;

                    c = hor ? ( i%this._columns ) : Math.floor( i/this._lines ) ;
                    l = hor ? Math.floor( i/this._columns ) : ( i%this._lines ) ;

                    entry.tx = left + c * ( child[ pw ] + this._horizontalGap ) ;
                    entry.ty = top  + l * ( child[ ph ] + this._verticalGap   ) ;

                    if ( this.isRightToLeft() )
                    {
                        entry.tx *= -1 ;
                        entry.tx += this._bounds.width - child[pw] ;
                    }

                    if ( this.isBottomToTop() )
                    {
                        entry.ty *= -1 ;
                        entry.ty += this._bounds.height - child[ph] ;
                    }

                    i++ ;
                });

                if( this._order === DirectionOrder.REVERSE )
                {
                    this._children.reverse() ;
                }

                this.arrange() ;

                this.renderer.emit( this ) ;
            }
            else
            {
                BoxLayout.prototype.render.call(this) ;
            }
        }
    }}
});