"use strict" ;

import { RAD2DEG } from '../../../src/core/maths/RAD2DEG.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.RAD2DEG' , () =>
{
    it('RAD2DEG === 180 / Math.PI' , () =>
    {
        assert.equal( RAD2DEG , 180 / Math.PI );
    });
});
