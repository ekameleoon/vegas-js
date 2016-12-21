"use strict" ;

import { toInt } from '../../../src/core/numbers/toInt.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.numbers.toInt' , () =>
{
    it('toInt(0)       ===   0' , () => { assert.equal( toInt(0)       ,   0 ); });
    it('toInt(0.1)     ===   0' , () => { assert.equal( toInt(0.1)     ,   0 ); });
    it('toInt(10)      ===   0' , () => { assert.equal( toInt(10)      ,  10 ); });
    it('toInt(10.123)  ===  10' , () => { assert.equal( toInt(10.123)  ,  10 ); });
    it('toInt(-10.123) === -10' , () => { assert.equal( toInt(-10.123) , -10 ); });
});
