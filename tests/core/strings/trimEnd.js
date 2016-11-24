"use strict" ;

import { trimEnd } from '../../../src/core/strings/trimEnd.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.trimEnd' , () =>
{
    it('trimEnd() === ""', () =>
    {
        assert.equal( trimEnd() , "" ) ;
    });

    it('trimEnd(null) === ""', () =>
    {
        assert.equal( trimEnd(null) , "" ) ;
    });

    it('trimEnd(1) === ""', () =>
    {
        assert.equal( trimEnd(1) , "" ) ;
    });

    it('trimEnd("foo") === "foo"', () =>
    {
        assert.equal( trimEnd("foo") , "foo" ) ;
    });

    it('trimEnd("hello world   \\t ") == "hello world"', () =>
    {
        assert.equal( trimEnd("hello world   \t ") , "hello world" ) ;
    });

    it('trimEnd("-_hello world_-",["-","_"]) == "-_hello world"', () =>
    {
        assert.equal( trimEnd("-_hello world_-",["-","_"]) , "-_hello world" ) ;
    });
});
