"use strict" ;

import { PI2 } from '../../../src/core/maths/PI2.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.PI2' , () =>
{
    it('PI2 === Math.PI * 2' , () =>
    {
        assert.equal( PI2 , 2 * Math.PI );
    });
});
