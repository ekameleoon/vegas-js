"use strict" ;

import { performance } from '../src/polyfill/performance.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'performance' , () =>
{
    it('performance is not null', () =>
    {
        assert.isNotNull( performance );
    });

    it('performance.now', () =>
    {
        assert.isNotNull( performance.now );
        assert.instanceOf( performance.now , Function );
    });

    it('performance.now() is number', () =>
    {
        var now = performance.now() ;
        assert.isNumber( now );
    });


});
