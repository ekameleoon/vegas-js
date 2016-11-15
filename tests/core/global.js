"use strict" ;

import { global } from '../../src/core/global.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'src/core/global.js' , () =>
{
    it('global !== null', () =>
    {
        assert.notStrictEqual( global , null );
    })
});
