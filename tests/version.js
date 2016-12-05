"use strict" ;

import { version } from '../src/vegas.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'vegas.version' , () =>
{
    it('vegas.version === "<@VERSION@>"', () =>
    {
        assert.equal( version , '<@VERSION@>' );
    })
});
