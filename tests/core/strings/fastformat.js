"use strict" ;

import { fastformat } from '../../../src/core/strings/fastformat.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.fastformat' , () =>
{
    // ----

    it('fastformat() === ""', () =>
    {
        assert.equal( fastformat() , "" ) ;
    });

    it('fastformat(null) === ""', () =>
    {
        assert.equal( fastformat(null) , "" ) ;
    });

    it('fastformat(1) === ""', () =>
    {
        assert.equal( fastformat(1) , "" ) ;
    });

    // ----

    it('fastformat("hello {0}", "world")', () =>
    {
        assert.equal( fastformat("hello {0}", "world") , "hello world" ) ;
    });

    it('fastformat("hello {0} {1}", "world", "!")', () =>
    {
        assert.equal( fastformat("hello {0} {1}", "world", "!") , "hello world !" ) ;
    });

    it('fastformat("hello {0} {1} {2}", [ "the", "big", "world" ])', () =>
    {
        assert.equal( fastformat("hello {0} {1} {2}", [ "the", "big", "world" ]) , "hello the big world" ) ;
    });

    it('fastformat("hello {0} {1} {2}", [ "the", "big" ] , "world" )', () =>
    {
        assert.equal( fastformat("hello {0} {1} {2}", [ "the", "big" ] , "world" ) , "hello the big world" ) ;
    });
});
