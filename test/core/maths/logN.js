"use strict" ;

import { logN } from 'core/maths/logN.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.logN' , () =>
{
    it('logN(10,10) === ' + (Math.log(10)/Math.log(10)) , () =>
    {
        assert.equal( logN(10,10) , Math.log(10)/Math.log(10) );
    });
});
