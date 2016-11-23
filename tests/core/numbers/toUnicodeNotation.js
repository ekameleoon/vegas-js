"use strict" ;

import { toUnicodeNotation } from '../../../src/core/numbers/toUnicodeNotation.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.numbers.toUnicodeNotation' , () =>
{
    it('toUnicodeNotation(0) === "0000"' , () =>
    {
        assert.equal( toUnicodeNotation(0) , "0000" );
    });

    it('toUnicodeNotation(10) === "000a"' , () =>
    {
        assert.equal( toUnicodeNotation(10) , "000a" );
    });

    it('toUnicodeNotation(16) === "000f"' , () =>
    {
        assert.equal( toUnicodeNotation(15) , "000f" );
    });

    it('toUnicodeNotation(16) === "0010"' , () =>
    {
        assert.equal( toUnicodeNotation(16) , "0010" );
    });

    it('toUnicodeNotation(255) === "00ff"' , () =>
    {
        assert.equal( toUnicodeNotation(255) , "00ff" );
    });
});
