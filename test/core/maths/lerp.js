"use strict" ;

import { lerp } from 'core/maths/lerp.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.lerp' , () =>
{
    it('lerp(0,100,0) === 0' , () =>
    {
        assert.equal( lerp(0,100,0) , 0 );
    });

    it('lerp(0,100,0.5) === 50' , () =>
    {
        assert.equal( lerp(0,100,0.5) , 50 );
    });

    it('lerp(0,100,1) === 100' , () =>
    {
        assert.equal( lerp(0,100,1) , 100 );
    });
});
