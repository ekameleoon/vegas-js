"use strict" ;

import { log10 } from '../../../core/maths/log10.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.log10' , () =>
{
    it('log10 === ' + (Math.log( 10 ) / Math.LN10) , () =>
    {
        assert.equal( log10(10) ,  Math.log( 10 ) / Math.LN10 );
    });
});
