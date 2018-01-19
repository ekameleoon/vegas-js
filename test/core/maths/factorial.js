"use strict" ;

import { factorial } from 'core/maths/factorial.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.factorial' , () =>
{
    it( 'factorial(0) ===  1' , () => { assert.equal( factorial(0) ,  1 ) } );
    it( 'factorial(1) ===  1' , () => { assert.equal( factorial(1) ,  1 ) } );
    it( 'factorial(2) ===  2' , () => { assert.equal( factorial(2) ,  2 ) } );
    it( 'factorial(3) ===  6' , () => { assert.equal( factorial(3) ,  6 ) } );
    it( 'factorial(4) === 24' , () => { assert.equal( factorial(4) , 24 ) } );
});
