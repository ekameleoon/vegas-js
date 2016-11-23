"use strict" ;

import { gcd } from '../../../src/core/maths/gcd.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.gcd' , () =>
{
    it('gcd(0,0) ===  0' , () => { assert.equal( gcd(0,0) , 0 ); });
    it('gcd(2,0) ===  0' , () => { assert.equal( gcd(2,0) , 2 ); });
    it('gcd(2,2) ===  2' , () => { assert.equal( gcd(3,3) , 3 ); });
    it('gcd(2,4) ===  2' , () => { assert.equal( gcd(2,4) , 2 ); });
    it('gcd(320,240) ===  80' , () => { assert.equal( gcd(320,240) , 80 ); });
});
