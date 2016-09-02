/* globals vegas */
( function( vegas )
{
    "use strict" ;

    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }


    var trace  = vegas.trace  ; // jshint ignore:line
    var system = vegas.system ; // jshint ignore:line
    var core   = vegas.core   ; // jshint ignore:line

    var RomanNumber = system.numeric.RomanNumber ;

    trace( RomanNumber.parse(12) ) ; // XII
    trace( RomanNumber.parseRomanString('II') ) ; // 2

})( vegas );

