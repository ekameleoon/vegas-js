"use strict" ;

import { global } from 'core/global.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.global' , () =>
{
    it('global !== null', () =>
    {
        assert.notStrictEqual( global , null );
    })
});
