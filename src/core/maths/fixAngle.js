"use strict" ;

/**
 * Fixs an angle in degrees between 0 and 360 degrees.
 * @name fixAngle
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} angle - The passed angle value.
 * @return an angle fixed between 0 and 360 degrees.
 */
export function fixAngle( angle )
{
    if ( isNaN(angle) )
    {
        angle = 0 ;
    }

    angle %= 360 ;

    return ( angle < 0 ) ? ( angle + 360 ) : angle ;
}
