"use strict" ;

import { repeat } from '../../../src/core/strings/repeat.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.repeat' , () =>
{
    it('repeat() === ""', () =>
    {
        assert.equal( repeat() , "" ) ;
    });

    it('repeat(null) === ""', () =>
    {
        assert.equal( repeat(null) , "" ) ;
    });

    it('repeat(1) === ""', () =>
    {
        assert.equal( repeat(1) , "" ) ;
    });

    it('repeat("foo") ==== "foo"', () =>
    {
        assert.equal( repeat("foo") , "foo" ) ;
    });

    it('repeat("foo",0) === ""', () =>
    {
        assert.equal( repeat("foo",0) , "" ) ;
    });

    it('repeat("foo",1) === "foo"', () =>
    {
        assert.equal( repeat("foo",1) , "foo" ) ;
    });

    it('repeat("foo",5) === "foofoofoofoofoo"', () =>
    {
        assert.equal( repeat("foo",5) , "foofoofoofoofoo" ) ;
    });

    it('repeat("foo",-1) throws a RangeError', () =>
    {
        assert.throws( function() { repeat("foo",-1) } , RangeError ) ;
        assert.throws( function() { repeat("foo",-1) } , 'repeat count must be non-negative' ) ;
    });

    it('repeat("foo",Infinity) throws a RangeError', () =>
    {
        assert.throws( function() { repeat("foo",Infinity) } , RangeError ) ;
        assert.throws( function() { repeat("foo",Infinity) } , 'repeat count must be less than infinity' ) ;
    });
});
