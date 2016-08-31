"use strict" ;

/**
 * Fixs an angle in degrees between 0 and 360 degrees.
 * @param angle the passed angle value in degrees.
 * @return an angle in degrees between 0 and 360 degrees.
 */
export function fixAngle( angle /*Number*/ ) /*Number*/
{
    if ( isNaN(angle) )
    {
        angle = 0 ;
    }
    angle %= 360 ;
    return ( angle < 0 ) ? ( angle + 360 ) : angle ;
}
