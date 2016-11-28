"use strict" ;

import { replaceNaN } from '../../../src/core/maths/replaceNaN.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.replaceNaN' , () =>
{
    it('replaceNaN(1,2) === 1' , () =>
    {
        assert.equal( replaceNaN(1,2) , 1 );
    });
    it('replaceNaN(NaN) === 0' , () =>
    {
        assert.equal( replaceNaN(NaN) , 0 );
    });
    it('replaceNaN(NaN,2) === 2' , () =>
    {
        assert.equal( replaceNaN(NaN,2) , 2 );
    });
    it('replaceNaN(NaN,NaN) === NaN' , () =>
    {
        assert.isNaN( replaceNaN(NaN,NaN) );
    });
    it('replaceNaN(NaN,"foo") === "foo"' , () =>
    {
        assert.equal( replaceNaN(NaN,"foo") , "foo" );
    });
});
