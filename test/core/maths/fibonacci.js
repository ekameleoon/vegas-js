"use strict" ;

import { fibonacci } from 'core/maths/fibonacci.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.fibonacci' , () =>
{
    let nums = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] ;
    nums.forEach( ( element , index ) =>
    {
        it( 'fibonacci(' + index + ') === ' + element , () => { assert.equal( fibonacci(index) , element ) } );
    }) ;
});
