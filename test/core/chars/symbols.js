"use strict" ;

import { symbols } from 'core/chars/symbols.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.symbols' , () =>
{
    it('symbols is Array', () =>
    {
        assert.isArray( symbols );
    });

    it('symbols length 33', () =>
    {
        assert.lengthOf( symbols , 33 );
    });
});
