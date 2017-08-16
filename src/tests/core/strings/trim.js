"use strict" ;

import { trim } from '../../../core/strings/trim.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.trim' , () =>
{
    it('trim() === ""', () =>
    {
        assert.equal( trim() , "" ) ;
    });

    it('trim(null) === ""', () =>
    {
        assert.equal( trim(null) , "" ) ;
    });

    it('trim(1) === ""', () =>
    {
        assert.equal( trim(1) , "" ) ;
    });

    it('trim("foo") === "foo"', () =>
    {
        assert.equal( trim("foo") , "foo" ) ;
    });

    it('trim("\\r\\t   hello world   \\t ") == "hello world"', () =>
    {
        assert.equal( trim("\r\t   hello world   \t ") , "hello world" ) ;
    });

    it('trim("-_hello world_-",["-","_"]) == "hello world"', () =>
    {
        assert.equal( trim("-_hello world_-",["-","_"]) , "hello world" ) ;
    });
});
