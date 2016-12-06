"use strict" ;

import { after } from '../../../src/core/date/after.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.date.after' , () =>
{
    it('after(new Date(2016,1,1),new Date(2016,1,0)) === true)', () =>
    {
        assert.isTrue( after(new Date(2016,1,1),new Date(2016,1,0)) );
    });
    it('after(new Date(2016,1,1),new Date(2016,1,1)) === false)', () =>
    {
        assert.isFalse( after(new Date(2016,1,1),new Date(2016,1,1)) );
    });
    it('after(new Date(2015,1,1),new Date(2016,1,1)) === false)', () =>
    {
        assert.isFalse( after(new Date(2015,1,1),new Date(2016,1,1)) );
    });
});
