"use strict" ;

import { version } from '../src/version.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'version' , () =>
{
    it('version', () =>
    {
        assert.equal( version , '<@VERSION@>' );
    })
});
