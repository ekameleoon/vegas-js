"use strict" ;

if ( Math.sign === undefined )
{
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
    Math.sign = function ( x )
    {
        return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;
    };
}