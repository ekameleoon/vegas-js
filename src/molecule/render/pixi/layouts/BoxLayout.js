"use strict" ;

import { Align } from './graphics/Align.js' ;
import { Direction } from './graphics/Direction.js' ;
import { DirectionOrder } from './graphics/DirectionOrder.js' ;
import { EdgeMetrics } from './graphics/geom/EdgeMetrics.js' ;
import { isMeasurable } from './graphics/isMeasurable.js' ;
import { LayoutContainer } from './LayoutContainer.js' ;
import { Point } from './graphics/geom/Point.js' ;
import { replaceNaN } from './core/maths/replaceNaN.js' ;

/**
 * A Box layout lays out all children of a specific DisplayObjectContainer in a single vertical column or a single horizontal row.
 * @name BoxLayout
 * @memberof molecule.render.pixi.layouts
 * @extends molecule.render.pixi.layouts.LayoutContainer
 * @class
 * @constructor
 * @version 1.0.8
 * @since 1.0.8
 */
export function BoxLayout( container = null , init = null )
{
    Object.defineProperties( this ,
    {
        /**
         * The height property name use in the container to layout all items.
         * @memberof molecule.render.pixi.layouts.BoxLayout
         * @instance
         * @type string
         */
        propHeight : { writable : true , value : 'height' } ,

        /**
         * The x property name use in the container to layout all items.
         * @memberof molecule.render.pixi.layouts.BoxLayout
         * @instance
         * @type string
         */
        propX : { writable : true , value : 'x' } ,

        /**
         * The y property name use in the container to layout all items.
         * @memberof molecule.render.pixi.layouts.BoxLayout
         * @instance
         * @type string
         */
        propY : { writable : true , value : 'y' } ,

        /**
         * The width property name use in the container to layout all items.
         * @memberof molecule.render.pixi.layouts.BoxLayout
         * @instance
         * @type string
         */
        propWidth : { writable : true , value : 'width' } ,

        /**
         * @private
         */
        _childCount    : { writable : true  , value : -1 } ,
        _direction     : { writable : true  , value : Direction.VERTICAL } ,
        _horizontalGap : { writable : true  , value : 0 } ,
        _index         : { writable : true  , value : 0 } ,
        _order         : { writable : true  , value : DirectionOrder.NORMAL } ,
        _padding       : { writable : false , value : new EdgeMetrics() } ,
        _verticalGap   : { writable : true  , value : 0 }
    });
    LayoutContainer.call( this , container, init ) ;
}

BoxLayout.prototype = Object.create( LayoutContainer.prototype ,
{
    constructor : { writable : true , value : BoxLayout } ,

    /**
     * Determinates the number of childs visible in this layout to calculates size with the measure method.
     * If this value is -1 all childs are used to calculate the visible area size else only the number of childs defines with the childCount attribute.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @instance
     */
    childCount :
    {
        get : function() { return this._childCount ; } ,
        set : function( value )
        {
            this._childCount = ( value > -1 ) ? value : -1 ;
        }
    },

    /**
     * Indicates the direction value of this layout ("horizontal" or "vertical").
     * @see {graphics.Direction}
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @instance
     */
    direction :
    {
        get : function() { return this._direction } ,
        set : function( value )
        {
            this._direction = value === Direction.HORIZONTAL ? Direction.HORIZONTAL : Direction.VERTICAL ;
        }
    },

    /**
     * Number of pixels between children in the horizontal direction.
     * The default value depends on the component class; if not overriden for the class, the default value is 0.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @instance
     */
    horizontalGap :
    {
        get : function() { return this._horizontalGap ; } ,
        set : function( value )
        {
            this._horizontalGap = isNaN(value) ? 0 : value ;
        }
    },

    /**
     * Indicates the direction order of to layout all children in the container.
     * This property can be define with the two constants DirectionOrder.NORMAL and DirectionOrder.REVERSE.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @instance
     * @see {graphics.DirectionOrder}
     */
    order :
    {
        get : function() { return this._order } ,
        set : function( value )
        {
            this._order = ( value === DirectionOrder.REVERSE ) ? DirectionOrder.REVERSE : DirectionOrder.NORMAL ;
        }
    },

    /**
     * Specifies the thickness, in pixels, of the four edge regions around the box layout.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @instance
     * @see {graphics.geom.EdgeMetrics}
     */
    padding :
    {
        get : function() { return this._padding ; } ,
        set : function( em )
        {
            if( em instanceof EdgeMetrics )
            {
                this._padding.left   = em ? replaceNaN(em.left)   : 0 ;
                this._padding.top    = em ? replaceNaN(em.top)    : 0 ;
                this._padding.right  = em ? replaceNaN(em.right)  : 0 ;
                this._padding.bottom = em ? replaceNaN(em.bottom) : 0 ;
            }
        }
    },

    /**
     * Number of pixels between children in the vertical direction.
     * The default value depends on the component class; if not overriden for the class, the default value is 0.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @instance
     */
    verticalGap :
    {
        get : function() { return this._verticalGap ; } ,
        set : function( value )
        {
            this._verticalGap = isNaN(value) ? 0 : value ;
        }
    },

    /**
     * Returns the child position with the specified index and the current direction of this layout.
     * @return the child position with the specified index and the current direction of this layout.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @function
     * @instance
     */
    getChildPositionAt : { value : function ( index )
    {
        if( index < 0 || index >= this._children.length )
        {
            throw new RangeError( this + " getChildPositionAt failed, the index does not exist in the child list." ) ;
        }
        let child = this.getChildAt( index ) ;
        return new Point( child.x , child.y ) ;
    }},

    /**
     * Returns the string representation of the coordinate attribute used in this display with the current direction value.
     * @return the string representation of the coordinate attribute used in this display with the current direction value.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @function
     * @instance
     */
    getCoordinateProperty : { value : function()
    {
        return this._direction === Direction.VERTICAL ? this.propY : this.propX ;
    }},

    /**
     * Returns the string representation of the size attribute with the current direction.
     * @return the string representation of the size attribute with the current direction.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @function
     * @instance
     */
    getSizeProperty : { value : function( target = null )
    {
        if( target && isMeasurable(target) && this.usePreferredSize )
        {
            return (this._direction === Direction.HORIZONTAL) ? "w" : "h" ;
        }
        else
        {
            return (this._direction === Direction.HORIZONTAL) ? this.propWidth : this.propHeight ;
        }
    }},

    /**
     * Indicates if the layout is horizontal.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @function
     * @instance
     */
    isHorizontal : { value : function()
    {
        return this._direction === Direction.HORIZONTAL ;
    }},

    /**
     * Indicates if the layout is vertical.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @function
     * @instance
     */
    isVertical : { value : function()
    {
        return this._direction === Direction.VERTICAL ;
    }},

    /**
     * Calculates the default sizes and minimum and maximum values.
     * If the Box layout's direction property is set to Direction.HORIZONTAL,
     * its measuredWidth property is equal to the sum of default widths of all of the children in the container, plus the thickness of the borders (padding), plus the left and right padding, plus the horizontal gap between each child. The value of the measuredHeight property is the maximum of all the children's default heights, plus room for the borders and padding.
     * If the Box layout's direction property is set to Direction.VERTICAL, these two values are reversed.
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @function
     * @instance
     */
    measure : { value : function()
    {
        this._bounds.setTo() ;
        let len = this._children.length ;
        if ( len > 0 )
        {
            let i = 0 ;
            let n = 0 ;

            let n1 = 0 ;
            let n2 = 0 ;

            const hor  = this.direction === Direction.HORIZONTAL ;
            const gap  = hor ? this._horizontalGap : this._verticalGap ;
            const siz  = hor ? this.propWidth : this.propHeight ;
            const sim  = hor ? "w" : "h" ;
            const isiz = hor ? this.propHeight : this.propWidth ;
            const isim = hor ? "h" : "w" ;

            let child ;
            let prop ;

            n = (this._childCount > -1) ? Math.min(this._childCount,len) : len ;

            for ( i = 0 ; i<n ; i++)
            {
                child = this._children[i].child ;
                prop  = isMeasurable(child) && this.usePreferredSize ? sim : siz ;
                n1 += child[prop] + gap ;
            }
            n1 -= gap ;

            n = len ;
            for ( i = 0  ; i < n ; i++)
            {
                child = this._children[i].child ;
                prop  = isMeasurable(child) && this.usePreferredSize ? isim : isiz ;
                n2 = Math.max(child[prop], n2) ;
            }

            this._bounds.width  = ( hor ? n1 : n2 ) + this._padding.horizontal ;
            this._bounds.height = ( hor ? n2 : n1 ) + this._padding.vertical ;

            if (this._align === Align.CENTER)
            {
                this._bounds.x -= this._bounds.width  * 0.5 ;
                this._bounds.y -= this._bounds.height * 0.5 ;
            }
            else if ( this._align === Align.BOTTOM )
            {
                this._bounds.x -= this._bounds.width * 0.5;
                this._bounds.y -= this._bounds.height ;
            }
            else if ( this._align === Align.BOTTOM_LEFT )
            {
                this._bounds.y -= this._bounds.height ;
            }
            else if (this._align === Align.BOTTOM_RIGHT)
            {
                this._bounds.x -= this._bounds.width  ;
                this._bounds.y -= this._bounds.height ;
            }
            else if (this._align === Align.LEFT)
            {
                this._bounds.y -= this._bounds.height * 0.5 ;
            }
            else if (this._align ===  Align.RIGHT)
            {
                this._bounds.x -= this._bounds.width  ;
                this._bounds.y -= this._bounds.height * 0.5 ;
            }
            else if (this._align === Align.TOP)
            {
                this._bounds.x -= this._bounds.width * 0.5 ;
            }
            else if (this._align === Align.TOP_RIGHT)
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
     * @memberof molecule.render.pixi.layouts.BoxLayout
     * @function
     * @instance
     */
    render : { writable : true , value : function()
    {
        if ( this._children.length > 0 )
        {
            if ( this._order === DirectionOrder.REVERSE )
            {
                this._children.reverse() ;
            }

            const hor = this._direction === Direction.HORIZONTAL ;
            const gap = hor ? this._horizontalGap : this._verticalGap ;

            const left = this._padding.left ;
            const top  = this._padding.top ;

            const pro  = hor ? this.propX : this.propY ;
            const siz  = hor ? this.propWidth : this.propHeight ;
            const sim  = hor ?  "w" : "h" ;
            const inv  = (pro === this.propY) ? this.propX : this.propY ;
            const tpr  = "t" + pro ;
            const tin  = "t" + inv ;

            let child ;
            let prev ;
            let size ;

            this._children.forEach( ( entry ) =>
            {
                if( prev )
                {
                    child = prev.child ;
                    size  = (this.usePreferredSize === true) && isMeasurable(child) ? sim : siz ;
                }
                entry[tpr] = prev ? (prev[tpr] +  child[ size ] + gap) : ( hor ? left : top ) ;
                entry[tin] = hor ? top : left ;
                prev       = entry ;
            });

            if ( this._order === DirectionOrder.REVERSE )
            {
                this._children.reverse() ;
            }

            this.arrange() ;

            this.renderer.emit( this ) ;
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
        if ( this._children.length > 0 )
        {
            let child ;
            this._children.forEach( ( entry ) =>
            {
                child   = entry.child ;
                child.x = entry.x = entry.tx ;
                child.y = entry.y = entry.ty ;
            }) ;
            this.updater.emit( this ) ;
        }
        this.notifyFinished() ;
    }},

    /**
     * @private
     */
    arrange : { value : function()
    {
        if( this._children.length > 0 )
        {
            let align  = this._align ;
            let bounds = this._bounds ;
            this._children.forEach( ( entry ) =>
            {
                if( align === Align.CENTER )
                {
                    entry.tx -= bounds.width  * 0.5 ;
                    entry.ty -= bounds.height * 0.5 ;
                }
                else if ( align === Align.BOTTOM )
                {
                    entry.tx -= bounds.width * 0.5 ;
                    entry.ty -= bounds.height ;
                }
                else if( align === Align.BOTTOM_LEFT )
                {
                    entry.ty -= bounds.height ;
                }
                else if( align === Align.BOTTOM_RIGHT )
                {
                    entry.tx -= bounds.width  ;
                    entry.ty -= bounds.height ;
                }
                else if( align === Align.LEFT )
                {
                    entry.ty -= bounds.height * 0.5 ;
                }
                else if( align === Align.RIGHT )
                {
                    entry.tx -= bounds.width  ;
                    entry.ty -= bounds.height * 0.5 ;
                }
                else if( align === Align.TOP )
                {
                    entry.tx -= bounds.width * 0.5 ;
                }
                else if( align === Align.TOP_RIGHT )
                {
                    entry.tx -= bounds.width ;
                }
            })
        }
    }}
});