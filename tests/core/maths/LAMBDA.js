"use strict" ;

import { LAMBDA } from '../../../src/core/maths/LAMBDA.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.LAMBDA' , () =>
{
    it('LAMBDA === 0.57721566490143' , () =>
    {
        assert.equal( LAMBDA , 0.57721566490143 );
    });
});
