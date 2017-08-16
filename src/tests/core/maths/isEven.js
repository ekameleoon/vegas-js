"use strict" ;

import { isEven } from '../../../core/maths/isEven.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.isEven' , () =>
{
    it('isEven(0) === true' , () =>
    {
        assert.isTrue( isEven(0) );
    });
    it('isEven(2) === true' , () =>
    {
        assert.isTrue( isEven(2) );
    });
    it('isEven(3) === false' , () =>
    {
        assert.isFalse( isEven(3) );
    });
    it('isEven(5) === false' , () =>
    {
        assert.isFalse( isEven(5) );
    });
});
