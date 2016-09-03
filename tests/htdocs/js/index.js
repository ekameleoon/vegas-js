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


    var MultiEvaluator    = system.evaluators.MultiEvaluator ;
    var PropertyEvaluator = system.evaluators.PropertyEvaluator ;
    var RomanEvaluator    =  system.evaluators.RomanEvaluator ;

    var obj = { id  : "XII" , count : 100 } ;

    var evaluator1 = new PropertyEvaluator( obj ) ;
    var evaluator2 = new RomanEvaluator() ;

    var evaluator = new MultiEvaluator() ;

    evaluator.add( evaluator1 ) ;
    evaluator.add( evaluator2 ) ;

    trace( evaluator.eval( 'id' ) ) ; // 12
    trace( evaluator.eval( 'count' ) ) ; // C

})( vegas );

