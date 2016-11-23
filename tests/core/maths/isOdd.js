"use strict" ;

import { isOdd } from '../../../src/core/maths/isOdd.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.isOdd' , () =>
{
    it('isOdd(0) === false' , () =>
    {
        assert.isFalse( isOdd(0) );
    });
    it('isOdd(2) === false' , () =>
    {
        assert.isFalse( isOdd(2) );
    });
    it('isOdd(3) === true' , () =>
    {
        assert.isTrue( isOdd(3) );
    });
    it('isOdd(5) === true' , () =>
    {
        assert.isTrue( isOdd(5) );
    });
});
