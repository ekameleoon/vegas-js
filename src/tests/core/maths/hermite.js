"use strict" ;

import { hermite } from '../../../core/maths/hermite.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.hermite' , () =>
{
    it('hermite(0,100,0) === 0' , () =>
    {
        assert.equal( hermite(0,100,0) , 0 );
    });

    it('hermite(0,100,0.5) === 50' , () =>
    {
        assert.equal( hermite(0,100,0.5) , 50 );
    });

    it('hermite(0,100,1) === 100' , () =>
    {
        assert.equal( hermite(0,100,1) , 100 );
    });
});
