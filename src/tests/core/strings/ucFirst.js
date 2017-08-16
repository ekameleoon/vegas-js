"use strict" ;

import { ucFirst } from '../../../core/strings/ucFirst.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.ucFirst' , () =>
{
    it('ucFirst() === ""', () =>
    {
        assert.equal( ucFirst() , "" ) ;
    });

    it('ucFirst(null) === ""', () =>
    {
        assert.equal( ucFirst(null) , "" ) ;
    });

    it('ucFirst(1) === ""', () =>
    {
        assert.equal( ucFirst(1) , "" ) ;
    });

    it('ucFirst("foo") === "Foo"', () =>
    {
        assert.equal( ucFirst("foo") , "Foo" ) ;
    });

    it('ucFirst("hello world") == "Hello world"', () =>
    {
        assert.equal( ucFirst("hello world") , "Hello world" ) ;
    });
});
