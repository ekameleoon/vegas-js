"use strict" ;

import { toUint } from '../../../core/numbers/toUint.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.numbers.toUint' , () =>
{
    it( 'toUint(0)       ===  0' , () => { assert.equal( toUint(0)       ,  0 ) ; });
    it( 'toUint(0.1)     ===  0' , () => { assert.equal( toUint(0.1)     ,  0 ) ; });
    it( 'toUint(10)      === 10' , () => { assert.equal( toUint(10)      , 10 ) ; });
    it( 'toUint(10.123)  === 10' , () => { assert.equal( toUint(10.123)  , 10 ) ; });
    it( 'toUint(-10.123) === 10' , () => { assert.equal( toUint(-10.123) , 10 ) ; });
});
