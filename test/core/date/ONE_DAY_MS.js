"use strict" ;

import { ONE_DAY_MS } from 'core/date/ONE_DAY_MS.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.date.ONE_DAY_MS' , () =>
{
    it('ONE_DAY_MS === 1000*60*60*24' , () =>
    {
        assert.equal( ONE_DAY_MS , 1000*60*60*24 );
    });
    it('ONE_DAY_MS === 86400000' , () =>
    {
        assert.equal( ONE_DAY_MS , 86400000 );
    });
});
