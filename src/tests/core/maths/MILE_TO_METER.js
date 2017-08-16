"use strict" ;

import { MILE_TO_METER } from '../../../core/maths/MILE_TO_METER.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.MILE_TO_METER' , () =>
{
    it('MILE_TO_METER === 1609' , () =>
    {
        assert.equal( MILE_TO_METER , 1609 );
    });
});
