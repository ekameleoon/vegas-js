/*jshint bitwise: false*/
"use strict" ;

/**
 * The most common relative directions are horizontal, vertical, both, left, right, forward, backward, none, up, and down.
 */
export var Direction = Object.defineProperties( {} ,
{
    /**
     * Specifies the "backward" value to change the orientation of a Display or a component.
     */
    BACKWARD : { enumerable : true , value : 'backward' } ,

    /**
     * Specifies the "both" value to represent both horizontal and vertical scrolling.
     */
    BOTH : { enumerable : true , value : 'both' } ,

    /**
     * Specifies the "down" value to change the orientation of a Display or a component.
     */
    DOWN : { enumerable : true , value : 'down' } ,

    /**
     * Specifies the "forward" value to change the direction or scrolling of a Display or a component.
     */
    FORWARD : { enumerable : true , value : 'forward' } ,

    /**
      * Specifies the "horizontal" value to change the orientation of a Display or a component.
      */
    HORIZONTAL : { enumerable : true , value : 'horizontal' } ,

    /**
     * Specifies the "left" value to change the orientation of a Display or a component.
     */
    LEFT : { enumerable : true , value : 'left' } ,

    /**
     * Specifies the "none" value to represent no scrolling or an object without direction.
     */
    NONE : { enumerable : true , value : 'none' } ,

    /**
     * Specifies the "right" value to change the orientation of a Display or a component.
     */
    RIGHT : { enumerable : true , value : 'right' } ,

    /**
     * Specifies the "up" value to change the orientation of a Display or a component.
     */
    UP : { enumerable : true , value : 'up' } ,

    /**
     * Specifies the "vertical" value to change the orientation of a Display or a component.
     */
    VERTICAL : { enumerable : true , value : 'vertical' }
}) ;
