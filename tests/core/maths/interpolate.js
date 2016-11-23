"use strict" ;

import { interpolate } from '../../../src/core/maths/interpolate.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.interpolate' , () =>
{
    it('interpolate(0,0,100) === 0' , () =>
    {
        assert.equal( interpolate(0,0,100) , 0 );
    });

    it('interpolate(0.5,0,100) === 50' , () =>
    {
        assert.equal( interpolate(0.5,0,100) , 50 );
    });

    it('interpolate(1,0,100) === 100' , () =>
    {
        assert.equal( interpolate(1,0,100) , 100 );
    });
});
