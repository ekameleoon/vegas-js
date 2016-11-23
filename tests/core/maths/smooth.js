"use strict" ;

import { smooth } from '../../../src/core/maths/smooth.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.smooth' , () =>
{
    it('smooth(0,1,0) === 0' , () =>
    {
        assert.equal( smooth(0,1,0) , 0 );
    });

    it('smooth(0,1,0.5) === 0.5' , () =>
    {
        assert.equal( smooth(0,1,0.5) , 0.5 );
    });

    it('smooth(0,1,1) === 1' , () =>
    {
        assert.equal( smooth(0,1,1) , 1 );
    });
});
