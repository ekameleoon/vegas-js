"use strict" ;

import { sinerp } from '../../../core/maths/sinerp.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.sinerp' , () =>
{
    it('sinerp(0,100,0) === 0' , () =>
    {
        assert.equal( sinerp(0,100,0) , 0 );
    });

    it('sinerp(0,100,0.5) === 70.71067811865474' , () =>
    {
        assert.equal( sinerp(0,100,0.5) , 70.71067811865474 );
    });

    it('sinerp(0,100,1) === 100' , () =>
    {
        assert.equal( sinerp(0,100,1) , 100 );
    });
});
