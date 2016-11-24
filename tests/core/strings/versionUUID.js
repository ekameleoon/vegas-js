"use strict" ;

import { versionUUID } from '../../../src/core/strings/validateUUID.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.versionUUID' , () =>
{
    it('validateUUID("c01bfdc3-405c-45a1-9dec-06e6e830bee1") === true', () =>
    {
        assert.equal( versionUUID("c01bfdc3-405c-45a1-9dec-06e6e830bee1") , 4 ) ;
    });
});
