"use strict" ;

import { bounce } from '../../../core/maths/bounce.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.bounce' , () =>
{
    it('bounce(0) === 0.0031853017931379904' , () =>
    {
        assert.equal( bounce(0) , 0.0031853017931379904 );
    });

    it('bounce(0.5) === 0.4999871587935894' , () =>
    {
        assert.equal( bounce(0.5) , 0.4999871587935894 );
    });

    it('bounce(1) === 1' , () =>
    {
        assert.equal( bounce(1) , 0 );
    });
});
